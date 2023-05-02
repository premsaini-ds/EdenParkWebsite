import {
  useSearchState,
} from "@yext/search-headless-react";
import { useState } from "react";
import * as React from "react";
import LocationCard from "./LocationCard";
import { GoogleMaps } from "./GoogleMaps";
import { googleMapsConfig, limit } from "../../types/constants";
import Herobanner from "../commons/Herobanner";
import "react-perfect-scrollbar/dist/css/styles.css";
import InfowindowComponent from "../locatorPage/InfowindowComponent";
import PerfectScrollbar from "react-perfect-scrollbar";
import useFetchResults from "../../hooks/useFetchResults";
import { Wrapper } from "@googlemaps/react-wrapper";
import ViewMore from "./ViewMore";
import { useTranslation } from "react-i18next";
import ResultsCount from "./ResultCount";
import VerticalResults from "../verticalResults";
import CustomFacets from "../locatorPage/CustomFacets";
import FacetsPopup from "./FacetsPopup";
import { consoleLog } from "../locationDetails/commonFunction";
import $ from "jquery";

const SearchLayout = (props: any): JSX.Element => {
  const [locale, setLocale] = React.useState(props.updatedlocale);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [fixed, setFixed] = useState("");
  const facets = useSearchState((state) => state.filters?.facets) || [];
  const [centerLatitude, setCenterLatitude] = useState(
    googleMapsConfig.centerLatitude
  );
  const [centerLongitude, setCenterLongitude]: any = useState(
    googleMapsConfig.centerLongitude
  );
  let locationResults = useFetchResults() || [];
  var data: any = {};
  const [locationData, setlocationData] = React.useState({});
  const [showMap, setShowMap] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [openHeight, setOpenHeight] = useState("");
  const [isMapboxOpen, setMapboxopen] = useState('')
  const [userCurrentLocation, setUserCurrentLocation]: any = useState(null);

  const statusModal = () => {

    facets?.map((i: any) => {
      if (
        i.fieldId == "name" ||
        i.fieldId == "address.region"
      ) {
        if (i.options.length == 0) {
          setIsOpen(false);
        } else {
          if (modalIsOpen) {
            setIsOpen(false);
          } else {
            setIsOpen(true);
          }
        }
      }
    });
  };
  const chooseMessage = (message: any) => {
    setlocationData(message);
    data = message;
  };
  const resultCount: any =
    useSearchState((state) => state.vertical.resultsCount) || 0;

  const { t } = useTranslation();
  const [bannerAndMapConnectivity, setBannerAndMapConnectivity] =
    React.useState({
      latitude: "",
      longitude: "",
      radius: 5000,
      is_search: false
    });

  /* When this component render very first time then this UseEffect will run and Check our screen size
  and call handleMediaQueryChange function */

  React.useEffect(() => {
    console.log(resultCount, 'resultCount')
    $("html, body").animate({ scrollTop: 0 }, "slow");
    localStorage.setItem("IsInputBlank", "false");
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const myElement: any = document.getElementById("result-list");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);
    return () => {
      if (myElement) {
        myElement.remove("scrollbar-container");
      }
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);



  /* This handleMediaQueryChange function check if screen is small it will update ouir state (setIsSmallScreen)*/
  const handleMediaQueryChange = (mediaQuery: any) => {
    if (mediaQuery.matches) {
      setMapboxopen('open')
      setFixed("fixed");
      document.body.classList.add("stop-scrolling");
      setIsSmallScreen(true);
      setShowMap(true);
    } else {
      setMapboxopen('')
      setFixed("");
      setIsSmallScreen(false);
      document.body.classList.remove("stop-scrolling");
    }
  };

  const hideMapInMobile = () => {
    consoleLog("hideMapInMobile::SearchLayout");
    if (isSmallScreen) {
      const myElement = document.getElementById("map-box");

      let checkMap = myElement?.classList.contains("open");
      if (checkMap) {
        myElement?.classList.remove("open");
        setFixed("fixed");
        document.body.classList.remove("stop-scrolling");
      } else {
        myElement?.classList.add("open");
        document.body.classList.add("stop-scrolling");
        setFixed("");
      }
    }
  };
  return (
    <>
      <Wrapper
        apiKey={googleMapsConfig.googleMapsApiKey}
        language={locale}
        libraries={["places", "geometry"]}
      >
        <div className="container-full-width">
          <div className="locator breadcrumb">
                <ul>
                  <li>
                    <a href="#">
                    Home
                    </a>
                  </li>
                
                  <li>Store Locator</li>
                </ul>
            </div>
            <div className="w-full text-center mb-[3.75rem] locatorHeading">
              <h3 className="sec_heading"> {props._site?.c_locatorPageHeading}</h3>
          </div>

        </div>
     
        
       
        <div className=" mx-auto w-full flex flex-col max-h-full">
          <div className="locator-container">
            <div
              id="facets-popup"
              className="facets-popup"
              style={{ display: modalIsOpen ? "block" : "none" }}
            >
              <FacetsPopup
                handleStatusModal={statusModal}
                _site={props._site}
                count={resultCount}
              />
            </div>
            <div
              className="info-window hidden"
              id="info-window"
              style={{ overflowY: "auto" }}
            >
              {Object.keys(locationData).length > 1 && (
                <>
                  <InfowindowComponent
                    result={locationData}
                    _site={props._site}
                  />
                </>
              )}
            </div>
            <div className="search-box">
              <Herobanner
                layoutData={bannerAndMapConnectivity}
                setLayoutData={setBannerAndMapConnectivity}
                handleEndPoimtCallBack=""
                locale={locale}
                _site={props._site}
                userCurrentLocation={userCurrentLocation}
                setUserCurrentLocation={setUserCurrentLocation}
              />

              <div className="standard-filters">
                <CustomFacets
                  layoutData={bannerAndMapConnectivity}
                  fieldId="name"
                  displayName=""
                  language={locale}
                  handleStatusModal={statusModal}
                  isDataAvailable={null}
                />
                
              </div>
            </div>

            <div className={`right-block-locator map-box ${isMapboxOpen}`} id="map-box">
              <GoogleMaps
                layoutData={bannerAndMapConnectivity}
                setLayoutData={setBannerAndMapConnectivity}
                apiKey={googleMapsConfig.googleMapsApiKey}
                centerLatitude={centerLatitude}
                centerLongitude={centerLongitude}
                defaultZoom={2}
                showEmptyMap={true}
                language={locale}
                chooseMessage={chooseMessage}
                userCurrentLocation={userCurrentLocation}
                setUserCurrentLocation={setUserCurrentLocation}
              />
            </div>

            <div className="left-block-locator">
              <PerfectScrollbar className={`${openHeight} result-list`} id="result-list">
              
                <div className="px-5 info-window-wrapper">
                <div className={`total-location ${fixed}`}>
                  <p onClick={() => hideMapInMobile()}>
                    {<ResultsCount />}
                  </p>
                </div>
                  {/* {resultCount > 0 ? <></> : <p>{t("No Location found")}</p>} */}
                  <div id="infowindow">
                    {locationResults && locationResults.length > 0 && (
                      <VerticalResults
                        displayAllOnNoResults={false}
                        locationResults={locationResults}
                        CardComponent={LocationCard}
                        _site={props._site}
                      />
                    )}
                  </div>
                  {resultCount == 0 ? (
                    <></>
                  ) : (
                    <>
                      <div className="button-bx">
                        <ViewMore
                          className={
                            " btn notHighlight !w-full p-2.5 button view-more"
                          }
                          idName={"view-more-button"}
                          buttonLabel={
                            props._site?.c_viewMore
                              ? props._site?.c_viewMore
                              : t("View More")
                          }
                        // noResult={
                        //   locationResults && locationResults.length > 0
                        //     ? true
                        //     : false
                        // }
                        />
                      </div>
                    </>
                  )}
                </div>
              </PerfectScrollbar>

            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default SearchLayout;