import * as React from "react";
import { useState } from "react";
import { CardComponent } from "@yext/search-ui-react";
import { Location } from "..//../types/search/locations";
import Hours from "..//../components/commons/hours";
import Address from "..//../components/commons/Address";
import phone from "..//../images/phone.svg";
import GetDirection from "../commons/GetDirection";
import addressicon from "../../images/marker.svg";
import watch from "../../images/watch.svg";
import { formatPhoneNumber } from "react-phone-number-input";
import TimeStatus from "../locatorPage/TimeStatus";
import OpenCloseStatus from "../commons/OpenCloseStatus";
import { Link } from "@yext/pages/components";
import { useTranslation } from "react-i18next";
import image from "../../images/banner.jpg";
import { phoneNumberFormat } from "../locationDetails/commonFunction";
import PhoneNumber from "../commons/PhoneNumber";
import { slugify } from "../../types/constants";

const metersToKM = (meters: number) => {
  const km = meters / 1000;
  return km.toFixed(2);
};

const LocationCard: CardComponent<Location> = (prop): any => {
  const {
    address,
    hours,
    additionalHoursText,
    mainPhone,
    photoGallery,
    timezone,
    c_heading,
  } = prop.result.rawData;


  const formattedPhone = formatPhoneNumber(mainPhone);

  const [timeStatus, setTimeStatus] = useState("");
  const onOpenHide = () => {
    if (timeStatus == "") {
      setTimeStatus("active");
    } else {
      setTimeStatus("");
    }
  };

  const photo = prop.result.rawData.photoGallery;
  const imageurl = photo && photo[0].image.url;

  const updatedPhone = phoneNumberFormat(prop.result.rawData.mainPhone)

  var url = "";
  var name: any = prop.result.rawData.name.toLowerCase();
  var string: any = name.toString();
  let removeSpecialCharacters = string.replace(
    /[&\/\\#^+()$~%.'":*?<>{}!@]/g,
    ""
  );
  let results: any = removeSpecialCharacters.replaceAll(" ", "-");
  if (!prop.result.rawData.slug) {
    url = `${prop.result.id}-${results}`;
    url = slugify(url)
    url = url + ".html"
  } else {
    url = `${prop.result.rawData.slug.toString()}`;
    url = slugify(url)
    url = url + ".html"
  }

  const { t, i18n } = useTranslation();

  return (
    <>

      <div
        className={`location result onhighLight`}
        id={`result-${prop.result.index}`}
      >
        <div className="relative w-full mb-2.5">
          <h2 className="location-heading">
            <Link data-ya-track="title" eventName={`title`} href={`${url}`}>
              {prop.result.rawData.name}
            </Link>
            {hours &&
              <a href={url} className="text-green green-label !font-fontPrimary">
                {" "}
                {hours && <TimeStatus timezone={timezone} hours={hours} _site={prop._site}></TimeStatus>

                }

              </a>}




          </h2>
        </div>

        <div className="location-info onhighLight">
          <div className="icon-row onhighLight !mb-1.5">
            <Address address={address} />{" "}
            <div className="miles">

              {prop.result.distanceFromFilter === undefined ? <>{metersToKM(prop.result.distance ?? 0)} Km</> : <>{metersToKM(prop.result.distanceFromFilter)} Km</>

              }

            </div>
          </div>
          {mainPhone ? (
            <div className="icon-row main-phone">
              {" "}
              <PhoneNumber phone={prop.result.rawData.mainPhone} />
              {/* <Link
                data-ya-track="phoneinfowindow"
                eventName={`phone info window`}
                href={"tel:" + updatedPhone}
              > */}
              {/* {updatedPhone}{" "} */}
              {/* </Link> */}
            </div>
          ) : (
            ""
          )}

        </div>

        <Link
          data-ya-track="getdirections"
          eventName={`getdirections`}
          className="consulation"
          href={`${url}`}
        >

          {prop._site?.c_loctorMoreInformation ? prop._site?.c_loctorMoreInformation : t("More information")}
        </Link>
      </div>
    </>
  );
};

export default LocationCard;
