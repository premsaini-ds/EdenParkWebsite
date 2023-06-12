import * as React from "react";
import { useEffect, useState } from "react";
import "@splidejs/react-splide/css";
import { Link } from "@yext/pages/components";
import { stagingBaseUrl, slugify } from "../../types/constants";
import { phoneNumberFormat } from "../locationDetails/commonFunction/index";
import { useTranslation } from "react-i18next";
import Address from "../commons/Address";
import OpenClosedNearby from "./OpenCloseNearby";
import PhoneNumber from "../commons/PhoneNumber";
type props = {
  prop: any;
  locale: any;
  coords: any;
  slug: any;
  c_nearByLocationCTAText: any;
  c_nearByLocationHeading: any;
};
/**
 * Used to Fetch Near By Locations to a store
 * @param entities
 * @returns
 */
const NearByLocation = (nearByLoc: props) => {
  const [data, setData] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {

    let array: any = [];
    nearByLoc.prop.response.results.map((i: any, index: any) => {
      array.push({
        slug: i.data.slug,
        address: i.data.address,
        hours: i.data.hours,
        geocodedCoordinate: i.data.geocodedCoordinate,
        mainPhone: phoneNumberFormat(i.data.mainPhone),
        name: i.data.name,
        yextDisplayCoordinate: i.data.yextDisplayCoordinate,
        distance: i.distance,
        id: i.data.id,
        timezone: i.data.timezone,
      });
    });
    setData(array);
  }, [setData]);
  const metersToKM = (meters: number) => {
    const km = meters / 1000;
    return km.toFixed(2);
  };
  return (
    <>
      <div className="nearby-sec clear-both">
        {nearByLoc.prop.response.results.length == 0 ? (
          <></>
        ) : (
          <div className="container-full-width">
            <div className="nearby-sec-wrapper">
              <div className="w-full text-center mb-[3.75rem]">
                <h3 className="sec_heading">
                  {nearByLoc.c_nearByLocationHeading
                    ? nearByLoc.c_nearByLocationHeading
                    : t("NEARBY ADDRESSES")}
                </h3>
              </div>
              <div className="location-card-wrapper">
                {data &&
                  data.map((e: any, index: any) => {
                    let url = "";
                    if (!e.slug) {
                      let slugString = e.id + " " + e.name;
                      let slug = slugify(slugString);
                      url = `${slug}`;
                    } else {
                      url = `${e.slug.toString()}`;
                    }

                    if (nearByLoc.slug != url && e.closed != true) {
                      return (
                        <div
                          key={index}
                          className="near-location mx-auto lg:mx-0"
                        >
                          <h4>
                            <a
                              href={`${stagingBaseUrl}/${url}`}
                              style={{ color: "#000000" }}
                            >
                              {e.name}
                            </a>
                            <span className="green-label">
                              {e.hours && (
                                <OpenClosedNearby
                                  timeZone={e.timezone}
                                  hours={e.hours}
                                />
                              )}
                            </span>
                          </h4>
                          <div className="store-address">
                            {e.address && <Address address={e.address} />}

                            <div className="miles relative min-w-[6.25rem] justify-end mt-0.5">
                              <span>{metersToKM(e.distance)} Km</span>
                            </div>
                          </div>

                          {e.mainPhone && (
                            <div className="store-phone">
                              <p>
                                <PhoneNumber phone={e.mainPhone} />
                              </p>
                            </div>
                          )}
                          <div className="more-info-button leading-none">
                            <a
                              href={`/${nearByLoc.locale}${stagingBaseUrl}/${url}`}
                            >
                              {t("More information")}
                            </a>
                          </div>
                        </div>
                      );
                    }
                  })}
              </div>
              <div className="flex justify-center w-full mt-[3.125rem]  md:mt-[3.75rem]">
                <Link
                  className="button"
                  href={`/${nearByLoc.locale}/index.html`}
                  rel="noopener noreferrer"
                  eventName={`storeViewDetails`}
                >
                  {nearByLoc.c_nearByLocationCTAText
                    ? nearByLoc.c_nearByLocationCTAText
                    : t("FIND AN ADDRESS")}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default NearByLocation;
