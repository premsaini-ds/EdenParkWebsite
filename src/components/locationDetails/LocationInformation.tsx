import * as React from "react";
import Hours from "../commons/hours";
import Modal from "react-modal";
import Holidayhour from "../locationDetails/Holidayhours";
import { Link } from "@yext/pages/components";
import OpenCloseStatus from "../commons/OpenCloseStatus";
import getDirectionUrl, {
  phoneNumberFormat,
} from "../locationDetails/commonFunction/index";
import { defaultTimeZone } from "../../types/constants";
import { useTranslation } from "react-i18next";
import Address from "../commons/Address";
import { useEffect, useState } from "react";
import PhoneNumber from "../commons/PhoneNumber";

type props = {
  prop: any;
  coords: any;
  address: any;
  phone: any;
  deliveryHours: any;
  locale: any;
  timezone: any;
  name: any;
  googlePlaceId: any;
  additionalHoursText: any;
  path: any;
  allservices: any;
  serviceheading: any;
  storeheading: any;
  storeProductType: any;
  spokenLanguages: any;
  spokenlanguageTitle: any;
  extratext: any;
  aboutSection: any;
  id: any;
  getDirectionCTA: any;
  makeAnAppointmentCta: any;
  storesType: any;
  _site: any
};
const LocationInformation = (data: props) => {
  const [time, setTime] = React.useState({});
  const [delHours, setDelHours] = React.useState({});
  const [coordinates, setCoordinate] = React.useState({});
  const [timezone, setTimeZone] = React.useState("");
  const [withoutHourClass, setWithoutHourClass] = React.useState("");
  const [isShow, setIsShow] = React.useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [active, setactive] = useState("");
  const { t, i18n } = useTranslation();
  // const updatedPhone = phoneNumberFormat(data.phone);

  const onOpenHide = () => {
    // setIsSmallScreen(!isSmallScreen);
    if (active == "") {
      setactive("active");
    } else {
      setactive("");
    }
  };
  var array: any = [];
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  React.useEffect(() => {
    checkHolidayHoursDate();
    if (array.length > 0) {
      setIsShow(true);
    }
    setTime(data.prop);
    setCoordinate(data.coords);
    setDelHours(data.deliveryHours);
    setTimeZone(data.timezone);
    if (Object.keys(data.prop).length == 0) {
      setWithoutHourClass("withoutHours");
    }
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);
    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);
  const handleMediaQueryChange = (mediaQuery: any) => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  function checkHolidayHoursDate() {
    const date = new Date();
    let Day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${year}-${month}-${Day}`;
    data.prop.holidayHours &&
      data.prop.holidayHours.map((i: any) => {
        let d1 = new Date(`${currentDate}`);
        let d2 = new Date(`${i.date}`);
        if (d2.getTime() >= d1.getTime()) {
          array.push(i);
        }
      });
  }
  function openModal() {
    document.body.classList.add("overflow-hidden");
    setIsOpen(true);
  }
  function closeModal() {
    document.body.classList.remove("overflow-hidden");
    setIsOpen(false);
  }
  function handleCloseModal() {
    document.body.classList.remove("overflow-hidden");
    setIsOpen(false);
  }

  return (
    <>
      <div className={`location-information ${withoutHourClass}`}>
        <div className="container-full-width px-5 sm:!px-[3.75rem]">
          <div className="boxes">
            <div className="location_details">
              <div className="inner-box address-box">
                <p className="store-name">{data.name ? data.name : ""}</p>
                {data.storesType && (
                  <div className="shop-badge">
                    <span>{data.storesType}</span>
                  </div>
                )}

                {data.address && (
                  <div className="store-phone storeAddress">
                    <Address address={data.address} />{" "}
                  </div>
                )}

                {data.phone && (
                  <>
                    <div className="store-phone pb-5 md:pb-[3.125rem] mt-2.5 md:mt-5 md:border-b md:border-b-borderGray">
                      <p>
                        <PhoneNumber phone={data.phone} />
                      </p>
                    </div>
                  </>
                )}
              </div>
              {/* Houes section start */}
              {data.prop && (
                <>
                  {Object.keys(data.prop).length > 0 && (
                    <>
                      <div className="box store-timing">
                        <div className="inner-box">
                          {/* openClose status of store for mobile view start */}
                          <div className="flex justify-center items-center gap-7 md:hidden">
                            <a
                              className={
                                active +
                                ` store-time-status flex justify-center items-center gap-2.5`
                              }
                              href="javascript:void(0);"
                              onClick={() => onOpenHide()}
                            >
                              {data.prop && Object.keys(data.prop).length > 1 ? (
                                <OpenCloseStatus
                                  timezone={timezone ? timezone : defaultTimeZone}
                                  hours={time ? time : {}}
                                  _site={data._site ? data._site : {}}

                                ></OpenCloseStatus>

                              ) : (
                                <></>
                              )}

                              <svg
                                icon-row
                                xmlns="http://www.w3.org/2000/svg"
                                width="9.585"
                                height="4.793"
                                viewBox="0 0 9.585 4.793"
                              >
                                <path
                                  id="hrd-drop"
                                  d="M9,13.5l4.793,4.793L18.585,13.5Z"
                                  transform="translate(-9 -13.5)"
                                  fill="#00363f"
                                ></path>
                              </svg>
                            </a>
                            <div className="relative">
                              {data.prop.holidayHours && isShow && (
                                <>
                                  <button
                                    className="holiday-hours-title font-medium underline"
                                    onClick={openModal}
                                  >
                                    {t("Holiday Hours")}
                                  </button>
                                </>
                              )}
                            </div>
                          </div>


                          {/* openClose status of store for mobile view end */}

                          <div className="store-buttons">
                            {data && (
                              <Link
                                data-ya-track="getdirections"
                                eventName={`getdirections`}
                                onClick={() => getDirectionUrl(data)}
                                href="javascript:void(0);"
                                rel="noopener noreferrer"
                              >
                                <button className="store-btn active">
                                  <span>
                                    {data.getDirectionCTA
                                      ? data.getDirectionCTA
                                      : t("SEE THE ITINERARY")}
                                  </span>
                                </button>
                              </Link>
                            )}
                            {(data.makeAnAppointmentCta.label && data.makeAnAppointmentCta.link) &&
                              <Link


                                href={data.makeAnAppointmentCta.link}
                                rel="noopener noreferrer"
                              >
                                <button className="store-btn">
                                  <span>
                                    {data.makeAnAppointmentCta.label
                                      ? data.makeAnAppointmentCta.label
                                      : t("MAKE AN APPOINTMENT")}
                                  </span>
                                </button>

                              </Link>
                            }

                          </div>
                          <div className="justify-between items-center hidden md:flex">
                            {/* openClose status of store for desktop view start */}
                            <div className="store-time-status">
                              {data.prop && Object.keys(data.prop).length > 1 ? (
                                <OpenCloseStatus
                                  timezone={timezone ? timezone : defaultTimeZone}
                                  hours={time ? time : {}}
                                  _site={data._site ? data._site : {}}
                                ></OpenCloseStatus>
                              ) : (
                                <></>
                              )}
                            </div>
                            {/* openClose status of store for desktop view start */}
                            <div className="relative mb-5 pr-2">
                              {data.prop.holidayHours && isShow && (
                                <>
                                  <button
                                    className="holiday-hours-title font-medium underline"
                                    onClick={openModal}
                                  >
                                    {t("Holiday Hours")}
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                          <Modal
                            onRequestClose={handleCloseModal}
                            shouldCloseOnOverlayClick={true}
                            isOpen={modalIsOpen}
                            style={customStyles}
                          >
                            <a
                              onClick={closeModal}
                              type="button"
                              id="closeButton"
                              data-modal-toggle="allergens-pdf"
                              className="closeButton top-4 right-4 bg-black flex w-[1.875rem] h-[1.875rem] justify-center items-center rounded-full"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 20.953 20.953"
                              >
                                <path
                                  id="Icon_ionic-md-close"
                                  data-name="Icon ionic-md-close"
                                  d="M28.477,9.619l-2.1-2.1L18,15.9,9.619,7.523l-2.1,2.1L15.9,18,7.523,26.381l2.1,2.1L18,20.1l8.381,8.381,2.1-2.1L20.1,18Z"
                                  transform="translate(-7.523 -7.523)"
                                  fill="#FFF"
                                />
                              </svg>
                            </a>

                            <span className="text-xl font-bold text-center w-full inline-block">
                              {t("Holiday Hours Calendar")}
                            </span>
                            <div className="pop-up-holyhrs holyhrs-heading">
                              <div>{t("Date")}</div>

                              <div>{t("Day")}</div>
                              <div> {t("Opening Hours")}</div>
                            </div>
                            {data.prop.holidayHours &&
                              <Holidayhour hours={data.prop.holidayHours} _site={data._site} />

                            }

                          </Modal>

                          {data.prop && (
                            <>
                              {/* {!isSmallScreen && ( */}

                              <div className={`${active} hours-wrap`}>
                                <Hours
                                  hours={data.prop ? data.prop : {}}
                                  deliveryHours={delHours ? delHours : {}}
                                  timezone={timezone ? timezone : ""}
                                  additionalHoursText={
                                    data.additionalHoursText
                                  }
                                  key={data.id}
                                  _site={data._site}
                                />
                              </div>

                              {/* )} */}
                            </>
                          )}

                          {data.extratext &&
                            data.extratext.enCeMomentTitle &&
                            data.extratext.enCeMomentDescription && (
                              <div className="current-event" id="current-event">
                                <h3>{data.extratext.enCeMomentTitle}</h3>
                                <p>{data.extratext.enCeMomentDescription}</p>
                              </div>
                            )}

                          {data.aboutSection &&
                            data.aboutSection.aboutSectionTitle &&
                            data.aboutSection.aboutSectionDescription && (
                              <div className="in-regards hidden md:block">
                                <h2>{data.aboutSection.aboutSectionTitle}</h2>
                                <div className="regards-content">
                                  <p>
                                    {data.aboutSection.aboutSectionDescription}
                                  </p>
                                </div>
                              </div>
                            )}
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}

              <div className="box store-info">
                <div className="products">
                  {/* PRODUCT TYPE  START*/}
                  {data.storeProductType.length > 0 && (
                    <>
                      {data.storeheading ? (
                        <h2>{data.storeheading}</h2>
                      ) : (
                        <h2>{t("Produits")}</h2>
                      )}
                      <div className="products-badge">
                        {data.storeProductType &&
                          data.storeProductType?.map((i: any) => {
                            return (
                              <>
                                <span>{i}</span>
                              </>
                            );
                          })}
                      </div>
                    </>
                  )}
                  {/* PRODUCT TYPE END */}

                  {/* SERVICE SECTION  START*/}
                  {data.allservices.length > 0 && (
                    <div className="available-services">
                      {data.serviceheading ? (
                        <h2>{data.serviceheading}</h2>
                      ) : (
                        <h2>{t("Services available")}</h2>
                      )}
                      <div className="services-icon">
                        {data.allservices &&
                          data.allservices?.map((i: any) => {
                            return (
                              <>
                                <div className="icon">
                                  {(i.serviceImage?.image.url && i.serviceName) && <img width="82" height="104" alt="Available services image" src={i.serviceImage?.image.url} />}

                                  <div className="service-title">
                                    <p>{i.serviceName}</p>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                      </div>
                    </div>
                  )}
                  {/* SERVICE SECTION END*/}

                  {/* SPOKEN LANGUAGE START*/}
                  {data.spokenLanguages.length > 0 && (
                    <div className="spoken-language">
                      {data.spokenlanguageTitle ? (
                        <h2>{data.spokenlanguageTitle}</h2>
                      ) : (
                        <h2>{t("Langues parlées")}</h2>
                      )}
                      <div className="all-languages">
                        {data.spokenLanguages &&
                          data.spokenLanguages.map((i: any) => {
                            return (
                              <>
                                <span>{i}</span>
                              </>
                            );
                          })}
                      </div>
                    </div>
                  )}
                  {/* SPOKEN LANGUAGE END*/}

                  {/* in-regards On mobile view */}

                  {data.aboutSection ? (
                    <div className="in-regards block md:hidden pt-10 pb-0">
                      <h2>{data.aboutSection.aboutSectionTitle}</h2>
                      <div className="regards-content">
                        <p>{data.aboutSection.aboutSectionDescription}</p>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  {/* in-regards On mobile view */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LocationInformation;
