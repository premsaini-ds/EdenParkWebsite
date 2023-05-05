import Address from "../commons/Address";
import { Link } from "@yext/pages/components";
import OpenCloseStatus from "../commons/OpenCloseStatus";
import { svgIcons } from "../../svgIcon ";
import * as React from "react";
import { useTranslation } from "react-i18next";
import Hours from "..//../components/commons/hours";
import PerfectScrollbar from "react-perfect-scrollbar";

import GetDirection from "../commons/GetDirection";
import Modal from "react-modal";
import PhoneNumber from "../commons/PhoneNumber";
import { slugify } from "../../types/constants";
const metersToKM = (meters: number) => {
  const km = meters / 1000;
  return km.toFixed(2);
};

function InfoWindowComponent({ result, _site }: any) {

  const { address, hours, mainPhone, timezone } = result.rawData;

  const [modalIsOpen, setIsOpen] = React.useState(false);
  var url = "";
  var name: any = result.rawData.name.toLowerCase();
  var string: any = name.toString();
  let removeSpecialCharacters = string.replace(
    /[&\/\\#^+()$~%.'":*?<>{}!@]/g,
    ""
  );
  let results: any = removeSpecialCharacters.replaceAll(" ", "-");
  if (!result.rawData.slug) {
    url = `${result.id}-${results}`;
    url = slugify(url)
    url = url + ".html"
  } else {
    url = `${result.rawData.slug.toString()}`;
    url = slugify(url)
    url = url + ".html"

  }

  const { t, i18n } = useTranslation();
  const [timeStatus, setTimeStatus] = React.useState("");
  const [service, setService] = React.useState("active");
  const [productActive, setproductActive] = React.useState("");
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
  const onOpenHide = () => {
    if (timeStatus == "") {
      setTimeStatus("active");
    } else {
      setTimeStatus("");
    }
  };

  const onOpenHideServiceProduct = () => {
    if (service == "active") {
      setService("");
      setproductActive("");
    } else {
      setService("active");
      setproductActive("active");
    }
  };

  function closeInfoWindow() {
    const myElement = document.getElementById("info-window");

    myElement?.classList.remove("block");
    myElement?.classList.add("hidden");
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
  function hightlightEvent() {
    var element: any = document.getElementById("myDIV");
    element.classList.add("mystyle");
    let el: any = document?.getElementsByTagName("html");
    el.style.scrollBehavior = "auto";
    // (id).style.property = new style
  }

  console.log("iam king",result);

  return (
    <div
      className={`location result store-information-window`}
      id={`result-${result.index}`}
    >
      <div className="w-full pb-4 md:pb-5 border-b border-b-borderGray mb-5">
        <div
          className="close-window my-6 pr-5 hidden md:block"
          onClick={() => closeInfoWindow()}
        >
          <a className="cursor-pointer">{svgIcons.cross}</a>
        </div>
        <div className="flex justify-between items-start store-name px-5 mt-4 md:mt-0">
          <h2>
            <Link data-ya-track="title" eventName={`title`} href={`${url}`}>
              {result.rawData.name}
            </Link>
          </h2>

          <div className="flex justify-between md:justify-end items-center gap-4 min-w-[4.625rem] md:min-w-0">
            <div className="distance">
              <span>
                {result.distanceFromFilter === undefined ? (
                  <>{metersToKM(result.distance ?? 0)} Km</>
                ) : (
                  <>{metersToKM(result.distanceFromFilter)} Km</>
                )}
                {/* {metersToMiles(result.distance ?? 0)} Km */}
              </span>
            </div>
            <div
              className="close-window block md:hidden"
              onClick={() => closeInfoWindow()}
            >
              <a>{svgIcons.cross}</a>
            </div>
          </div>


        </div>
      </div>
      <PerfectScrollbar>
        <div className="location-info">
          <div className="icon-row px-5">
            <Address address={address} />{" "}
          </div>
          {mainPhone && (
            <div className="icon-row store-phone px-5">

              <PhoneNumber phone={result.rawData.mainPhone} />

            </div>
          )}
          <div className="open-close">
            <div className="hours-sec info-on-locator px-5">
              <div className="OpenCloseStatus ">
                {result.rawData.hours && (
                  <>
                    {Object.keys(result.rawData.hours).length > 1 ? (
                      <>
                        <div className="cursor-default">
                          <a
                            className={timeStatus + " timeStatus flex items-center gap-2.5"}
                            href="javascript:void(0);"
                            onClick={onOpenHide}
                          >
                            <OpenCloseStatus
                              timezone={timezone}
                              hours={hours}
                              _site={_site}
                            ></OpenCloseStatus>

                            <svg
                              onClick={onOpenHide}
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
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )}
                {hours && (
                  <>
                    <div className={timeStatus + " daylist"}>
                      {hours && <> <Hours key={result.rawData.id} hours={hours} _site={_site} /></>

                      }

                    </div>
                  </>
                )}
              </div>
            </div>{" "}
          </div>

          <div
            className={productActive + " products mt-3 m-0 px-5 pt-0"}
            onClick={onOpenHideServiceProduct}
          >
            {(result.rawData.c_productName || result.rawData.c_allservices) && (
              <>
                {" "}
                <h2 className="!text-base !font-normal !font-fontPrimary">

                  {_site?.c_productsAndServicesAvailableText ? _site?.c_productsAndServicesAvailableText : t("Products & Services available")

                  }
                </h2>
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
              </>
            )}
          </div>




          <div className={`${service} product-drawer`}>
            <div className="products-badge px-5">
              {result.rawData.c_productName &&
                result.rawData.c_productName.map((i: any) => {
                  return <span>{i}</span>;
                })}
            </div>
            <div className="services px-5">
              {result.rawData.c_allServices &&
                result.rawData.c_allServices.map((i: any) => {
                  return <span>{i.serviceName}</span>;
                })}
            </div>
          </div>

          {(result.rawData.c_enCeMomentSection?.enCeMomentTitle && result.rawData.c_enCeMomentSection?.enCeMomentDescription) && (
            <>
              <div className="info-bar">
                <p>{result.rawData.c_enCeMomentSection?.enCeMomentTitle}</p>

                <a
                  href={url + "/" + "#current-event"}
                  className="example"
                  id="myDIV"
                  onClick={() => {
                    hightlightEvent();
                  }}
                >
                  {" "}
                  {svgIcons.infoIcon}
                </a>
              </div>
            </>
          )}
        </div>
      </PerfectScrollbar>

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
          className="closeButton bg-closeIcon"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 20.953 20.953"
          >
            <path
              id="Icon_ionic-md-close"
              data-name="Icon ionic-md-close"
              d="M28.477,9.619l-2.1-2.1L18,15.9,9.619,7.523l-2.1,2.1L15.9,18,7.523,26.381l2.1,2.1L18,20.1l8.381,8.381,2.1-2.1L20.1,18Z"
              transform="translate(-7.523 -7.523)"
              fill="#B1B1B1"
            />
          </svg>
        </a>
        {/* {(result.rawData?.c_enCeMomentTitle && result.rawData?.c_enCeMomentDescription) && (
          <>
            <p>{result.rawData.c_enCeMomentTitle}</p>
          </>
        )} */}
      </Modal>
      <div className="cta-buttons px-5">
        {result.rawData.yextDisplayCoordinate && (
          <GetDirection
            label={_site.c_getDirection ? _site.c_getDirection : t("See the route")}
            address={result.rawData.address}
            buttonText={_site.c_getDirection ? _site.c_getDirection : t("See the route")}
            // buttonText={t("See the route")}
            latitude={result.rawData.yextDisplayCoordinate?.latitude}
            longitude={result.rawData.yextDisplayCoordinate?.longitude}
          />
        )}
        <Link
          data-ya-track="getdirections"
          eventName={`viewdetailPage`}
          className="button"
          href={`${url}`}


        >
          {/* {t("More information")} */}
          {_site?.c_loctorMoreInformation ? _site?.c_loctorMoreInformation : t("More information")}
        </Link>
      </div>
    </div>
  );
}
export default InfoWindowComponent;
