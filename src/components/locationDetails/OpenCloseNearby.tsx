import * as React from "react";
import { defaultTimeZone } from "../../types/constants";
import { useTranslation } from "react-i18next";

const openClose = {
  formatOpenNowString: (hoursData: any, timeZone: any, t: any, _site: any) => {
    if (!timeZone) {
      timeZone = defaultTimeZone;
    }
    const now = new Date();
    let currentTime = new Date(
      now.toLocaleString("en-US", { timeZone: timeZone })
    );
    const tomorrow = new Date(currentTime.getTime() + 60 * 60 * 24 * 1000);
    const yesterday = new Date(currentTime.getTime() - 60 * 60 * 24 * 1000);
    const nowTimeNumber =
      currentTime.getHours() + currentTime.getMinutes() / 60;
    const intervalsToday = openClose.getIntervalOnDate(currentTime, hoursData);
    const intervalsTomorrow = openClose.getIntervalOnDate(tomorrow, hoursData);
    const intervalsYesterday = openClose.getIntervalOnDate(
      yesterday,
      hoursData
    );
    let openRightNow = false;
    let currentInterval = null;
    let nextInterval = null;

    if (intervalsYesterday) {
      for (let i = 0; i < intervalsYesterday.length; i++) {
        const interval = intervalsYesterday[i];
        const startIntervalNumber = openClose.timeStringToNumber(
          interval.start
        );
        const endIntervalNumber = openClose.timeStringToNumber(interval.end);

        // If end overflows to the next day (i.e. today).
        if (endIntervalNumber < startIntervalNumber) {
          if (nowTimeNumber < endIntervalNumber) {
            currentInterval = interval;
            openRightNow = true;
          }
        }
      }
    }

    // Assumes no overlapping intervals
    if (intervalsToday) {
      for (let i = 0; i < intervalsToday.length; i++) {
        const interval = intervalsToday[i];
        const startIntervalNumber = openClose.timeStringToNumber(
          interval.start
        );
        const endIntervalNumber = openClose.timeStringToNumber(interval.end);

        // If current time doesn't belong to one of yesterdays interval.
        if (currentInterval == null) {
          if (endIntervalNumber < startIntervalNumber) {
            if (nowTimeNumber >= startIntervalNumber) {
              currentInterval = interval;
              openRightNow = true;
            }
          } else if (
            nowTimeNumber >= startIntervalNumber &&
            nowTimeNumber < endIntervalNumber
          ) {
            currentInterval = interval;
            openRightNow = true;
          }
        }

        if (nextInterval == null) {
          if (startIntervalNumber > nowTimeNumber) {
            nextInterval = interval;
          }
        } else {
          if (
            startIntervalNumber > nowTimeNumber &&
            startIntervalNumber <
            openClose.timeStringToNumber(nextInterval.start)
          ) {
            nextInterval = interval;
          }
        }
      }
    }

    let nextIsTomorrow = false;

    // If no more intervals in the day
    if (nextInterval == null) {
      if (intervalsTomorrow) {
        if (intervalsTomorrow.length > 0) {
          nextInterval = intervalsTomorrow[0];
          nextIsTomorrow = true;
        }
      }
    }
    let hoursString = `<strong><span>${_site?.c_closed ? _site?.c_closed : t("CLOSED")}</span></strong>`;
    if (openRightNow) {
      if (
        currentInterval.start === "00:00" &&
        currentInterval.end === "23:59"
      ) {
        hoursString = _site.c_open24Hours ? _site.c_open24Hours : "Open 24 Hours";
      } else {
        hoursString = `<strong><span>${_site?.c_open ? _site?.c_open : t("OPEN")}</span></strong>`;
      }
    } else if (nextInterval) {
      if (nextIsTomorrow) {
        hoursString = `<strong><span>${_site?.c_closed ? _site?.c_closed : t("CLOSED")}</span></strong>`;
      } else {
        hoursString = `<strong><span>${_site?.c_closed ? _site?.c_closed : t("CLOSED")}</span></strong>`;
      }
    }
    return hoursString;
  },
  getYextTimeWithUtcOffset: (entityUtcOffsetSeconds: number) => {
    const now = new Date();
    let utcOffset = 0;
    if (entityUtcOffsetSeconds) {
      utcOffset = entityUtcOffsetSeconds * 1000;
    }
    if (utcOffset !== 0) {
      const localUtcOffset = now.getTimezoneOffset() * 60 * 1000;
      return new Date(now.valueOf() + utcOffset + localUtcOffset);
    }
    return now;
  },
  parseTimeZoneUtcOffset: (timeString: any) => {
    if (!timeString) {
      return 0;
    }
    const parts = timeString.split(":");
    const hours = parseInt(parts[0].replace(/\u200E/g, ""), 10);
    const minutes = parseInt(parts[1].replace(/\u200E/g, ""), 10);
    if (hours < 0) {
      return -(Math.abs(hours) + minutes / 60) * 60 * 60;
    }
    return (hours + minutes / 60) * 60 * 60;
  },

  timeStringToNumber: (timeString: any) => {
    const parts = timeString.split(":");
    const hours = parseInt(parts[0].replace(/\u200E/g, ""), 10);
    const minutes = parseInt(parts[1].replace(/\u200E/g, ""), 10);
    return hours + minutes / 60;
  },
  getIntervalOnDate: (date: any, hoursData: any) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];

    const dateString =
      year +
      "-" +
      (month < 10 ? "0" + month : month) +
      "-" +
      (day < 10 ? "0" + day : day);
    const dayOfWeekString = days[date.getDay()];

    // Check for holiday
    if (hoursData.holidayHours) {
      for (let i = 0; i < hoursData.holidayHours.length; i++) {
        const holiday = hoursData.holidayHours[i];
        if (holiday.date == dateString) {
          if (holiday.openIntervals) {
            return holiday.openIntervals;
          } else if (holiday.isClosed === true) {
            return null; // On holiday but closed
          }
        }
      }
    }

    // Not on holiday
    if (
      hoursData[dayOfWeekString] &&
      hoursData[dayOfWeekString].openIntervals
    ) {
      return hoursData[dayOfWeekString].openIntervals;
    } else {
      return null;
    }
  },
  formatTime: (time: any) => {
    const tempDate = new Date("January 1, 2020 " + time);
    const localeString = "en-US";

    let timeString = tempDate.toLocaleTimeString(
      localeString.replace("_", "-"),
      {
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      }
    );

    if (timeString == "24:00") {
      return "00:00";
    } else {
      return timeString;
    }
  },
};

export default function OpenClosedNearby(props: any) {
  const { t } = useTranslation();
  return (
    <>
      {props.hours && props.hours.reopenDate ? (
        <p className="">{t("Temporarily Closed")}</p>
      ) : props.hours ? (
        <div className="store-open-close-status"
          dangerouslySetInnerHTML={{
            __html: openClose.formatOpenNowString(
              props.hours,
              props.timezone,
              t,
              props._site
            ),
          }}
        />
      ) : (
        <p className="closed">{props?._site?.c_closed ? props?._site?.c_closed : t("CLOSED")}</p>
      )}
    </>
  );
}
