import * as React from "react";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

type Hours = {
  title?: string;
  hours: Week;
  additionalHoursText?: string;
  children?: React.ReactNode;
  deliveryHours: any;
  timezone: any;
  _site: any
};

interface Week extends Record<string, any> {
  monday?: Day;
  tuesday?: Day;
  wednesday?: Day;
  thursday?: Day;
  friday?: Day;
  saturday?: Day;
  sunday?: Day;
}

type Day = {
  isClosed: boolean;
  openIntervals: OpenIntervals[];
};

type OpenIntervals = {
  start: string;
  end: string;
};
type DayRow = {
  dayName: any;
  day: Day;
  isToday?: any;
  dayDate: any;
  holidayhours: any;
  _site: any;
  i: any


};

const Hours = (props: Hours) => {
  let a;
  let s;
  let dateNewFormat;
  const { title, hours, additionalHoursText, _site } = props;
  var days_string: any = [_site?.c_monday, _site?.c_tuesday, _site?.c_wednesday, _site?.c_thursday, _site?.c_friday, _site?.c_saturday, _site?.c_sunday];

  const weekDays: any = {
    // "sunday": 0, // << if sunday is first day of week
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
    sunday: 7,
  };

  var objects: any = {};
  let y = 0
  for (var x = 0; x < 7; x++) {
    y++;
    let dayN: any = days_string[x]

    weekDays[x] = { 'day': objects[dayN], "index": x };

  }





  const { t, i18n } = useTranslation();
  function join(t: any, a: any, s: any) {
    function format(m: any) {
      let f = new Intl.DateTimeFormat("en", m);
      return f.format(t);
    }
    return a.map(format).join(s);
  }
  if (hours.reopenDate) {
    a = [{ day: "numeric" }, { month: "long" }, { year: "numeric" }];
    s = join(new Date(hours.reopenDate), a, " ");
    dateNewFormat = s;
  }
  const now = new Date();
  var currentdaynum: number;
  /**
   * Dynamically creates a sort order based on today's day.
   */
  function getSorterForCurrentDay(todayIndex: any): { [key: string]: number } {
    const dayIndexes = [0, 1, 2, 3, 4, 5, 6];

    const updatedDayIndexes = [];
    for (let i = 0; i < dayIndexes.length; i++) {
      let dayIndex = dayIndexes[i];
      if (dayIndex - todayIndex >= 0) {
        dayIndex = dayIndex - todayIndex;
      } else {
        dayIndex = dayIndex + 7 - todayIndex;
      }
      updatedDayIndexes[i] = dayIndex;
    }

    return {
      sunday: updatedDayIndexes[0],
      monday: updatedDayIndexes[1],
      tuesday: updatedDayIndexes[2],
      wednesday: updatedDayIndexes[3],
      thursday: updatedDayIndexes[4],
      friday: updatedDayIndexes[5],
      saturday: updatedDayIndexes[6],
    };
  }

  const defaultSorter: { [key: string]: number } = {
    monday: 0,
    tuesday: 1,
    wednesday: 2,
    thursday: 3,
    friday: 4,
    saturday: 5,
    sunday: 6,
  };


  function sortByDay(week: Week): Week {
    const currentdayuk = useCallback(
      () => {
        return new Date(
          now.toLocaleString("en-US", { timeZone: "Europe/London" })
        ).getDay();

      },
      [now],
    )
    const todayIndex = currentdayuk();
    currentdaynum = currentdayuk();
    const tmp = [];
    for (const [k, v] of Object.entries(week)) {
      tmp[getSorterForCurrentDay(todayIndex)[k]] = { key: k, value: v };
    }

    const orderedWeek: Week = {};
    tmp.forEach((obj) => {
      orderedWeek[obj.key] = obj.value;
    });

    return orderedWeek;
  }

  const renderHours = (week: Week, _site: any) => {
    const dayDom: JSX.Element[] = [];
    var i = 0;
    for (const [k, v] of Object.entries(sortByDay(week))) {

      let a;
      let s;
      var dayDate = new Date();

      function join(t: any, a: any, s: any) {
        function format(m: any) {
          let f = new Intl.DateTimeFormat("en", m);
          return f.format(t);
        }
        return a.map(format).join(s);
      }
      // function formatDate(date: any) {
      //   var d = new Date(date),
      //     month = "" + (d.getMonth() + 1),
      //     day = "" + d.getDate(),
      //     year = d.getFullYear();

      //   if (month.length < 2) month = "0" + month;
      //   if (day.length < 2) day = "0" + day;

      //   return [year, month, day].join("-");
      // }
      if (i > 0) {
        dayDate = new Date(Date.now() + i * 24 * 60 * 60 * 1000);
      }
      a = [{ day: "numeric" }, { month: "long" }, { year: "numeric" }];
      s = join(dayDate, a, " ");
      dayDate = s;
      const object1 = {
        a: 'somestring',
        b: 42
      };

      dayDom.push(
        <DayRow
          key={k}
          i={i}
          dayDate={dayDate}
          dayName={k}
          day={v}
          isToday={isDayToday(k)}
          holidayhours={week.holidayHours}
          _site={_site}
        />
      );
      i++;
    }

    dayDom.sort(function sortByDay(a: any, b: any) {
      const day1 = a.key?.toLowerCase();
      const day2 = b.key?.toLowerCase();

      return weekDays[day1] - weekDays[day2];
    });

    return <tbody className="font-normal">{dayDom}</tbody>;
  };

  function isDayToday(dayName: string) {
    const currentDate = new Date();
    const currentDayNumber = currentDate.getDay();
    return defaultSorter[dayName] === (currentDayNumber - 1);

  }



  const DayRow = (props: DayRow) => {
    const { dayName, day, isToday, dayDate, holidayhours, _site, i } = props;

    const [myDataAccordintToMe, setMyDataAccordintToMe]: any = React.useState({});
    const [currentDay, setCurrentDay] = useState('');
    let a, s, holidayDate: any;
    function join(t: any, a: any, s: any) {
      function format(m: any) {
        let f = new Intl.DateTimeFormat("en", m);
        return f.format(t);
      }
      return a.map(format).join(s);
    }

    const holidayarray: any[] = [];
    const holidayopenintervals: any[] = [];
    const keysFromData = holidayhours
      ? holidayhours.map((holiday: any, index: Number) => {
        a = [{ day: "numeric" }, { month: "long" }, { year: "numeric" }];
        s = join(new Date(holiday.date), a, " ");
        holidayDate = s;
        holidayarray.push(holiday);
        return holidayDate;
      })
      : null;

    React.useEffect(() => {
      if (keysFromData) {
        var keysFromDataUnique = keysFromData.filter(
          (value: any, index: any, self: any) => {
            return self.indexOf(value) === index;
          }
        );
        var dataAccordintToMe: any = {};
        for (let index = 0; index < keysFromDataUnique.length; index++) {
          const element = keysFromDataUnique[index];
          dataAccordintToMe[element] = holidayarray.filter((fe: any) => {
            let adate = [
              { day: "numeric" },
              { month: "long" },
              { year: "numeric" },
            ];
            let matchdate = join(new Date(fe.date), adate, " ");

            return matchdate == element;
          });
        }

        setMyDataAccordintToMe(dataAccordintToMe);
      }
      if (isToday) {
        setCurrentDay("currentDay");
      }

    }, []);

    let Status = false;
    for (var key in myDataAccordintToMe) {
      if (key.includes(dayDate)) {
        Status = true;
        holidayopenintervals.push(myDataAccordintToMe[key]);
      }
    }
    const { t, i18n } = useTranslation();

    return (
      <tr className={`${currentDay} time-row`}>
        {Status ? (
          <td className="dayname">
            {t(dayName)}{" "}
            <span className="text-sm block">{props._site.c_holidayHours ? (props._site.c_holidayHours) : (t("Holiday Hours"))}</span>
          </td>
        ) : (
          <td className="dayname">
            {t(dayName)}
          </td>
        )}
        {!day.isClosed && (
          <td className="pr-2">
            {Status
              ? holidayopenintervals.map((res: any) => {
                return res.map((openint: any) => {
                  if (openint.openIntervals) {
                    return openint.openIntervals.map((res: any) => {
                      return (
                        <>
                          <div className="store-time">
                            <span className="mr-2">{res.start}</span> -
                            <span className="ml-2">{res.end}</span>
                          </div>
                        </>
                      );
                    });
                  } else {
                    return (
                      <td className="pr-2 text-right">
                        <span>{_site?.c_closed ? _site?.c_closed : t("closed")}</span>
                      </td>
                    )
                  }

                });
              })
              : day.openIntervals.map((res: any, index: Number) => {
                return (
                  <>
                    <div className="store-time">
                      <span className="mr-2">{res.start}</span> -
                      <span className="ml-2 ">{res.end}</span>
                    </div>
                  </>
                );
              })}
          </td>
        )}
        {day.isClosed && (
          <td className="pr-2 text-right">
            <span>{_site?.c_closed ? _site?.c_closed : t("closed")}</span>
          </td>
        )}
      </tr>
    );
  };

  return (
    <>
      <div className="hours">
        <table className="w-full">
          {hours && hours.reopenDate ? (
            <tr>
              {additionalHoursText ? (
                <td>{additionalHoursText}</td>
              ) : (
                <td>
                  {" "}
                  {t("The Store will reopen on")} {dateNewFormat}{" "}
                </td>
              )}
            </tr>
          ) : (
            <>{renderHours(hours, _site)}</>
          )}
        </table>
      </div>
    </>
  );
};

export default Hours;