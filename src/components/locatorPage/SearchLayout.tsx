import { useSearchState, useSearchActions, SelectableFilter, Matcher} from "@yext/search-headless-react";
import { useState } from "react";
import * as React from "react";
import LocationCard from "./LocationCard";
import { GoogleMaps } from "./GoogleMaps";
import {
  AnswerExperienceConfig,
  googleMapsConfig,
  limit,
} from "../../types/constants";
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
import { svgIcons } from "../../svgIcon ";
import Geocode from "react-geocode";
import { clearStorage } from "mapbox-gl";

const SearchLayout = (props: any): JSX.Element => {
  const searchActions = useSearchActions();
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
  const [isMapboxOpen, setMapboxopen] = useState("");
  const [userCurrentLocation, setUserCurrentLocation]: any = useState(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [zoomlevel, setZoomlevel] = React.useState(8);
  const [allowlocation, setallowLocation] = React.useState("");
  const [modelopen, setModelOpen] = useState(false);
  const [isUserLocation, setIsUserLocation] = React.useState<boolean>(false);
  const [check, setCheck] = useState(false);

  const statusModal = () => {
    facets?.map((i: any) => {
      if (i.fieldId == "name" || i.fieldId == "address.region") {
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
      is_search: false,
    });

  /* When this component render very first time then this UseEffect will run and Check our screen size
  and call handleMediaQueryChange function */

  React.useEffect(() => {
    console.log(resultCount, "resultCount");
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
      setMapboxopen("open");
      setFixed("fixed");
      document.body.classList.add("stop-scrolling");
      setIsSmallScreen(true);
      setShowMap(true);
    } else {
      setMapboxopen("");
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

// Custom message for use my location
  let userMyLocationBlockMessage = "Please Allow Your Location";
  var params1: any = { };
  const [newparam, SetNewparam] = React.useState({
    latitude: 0,
    longitude: 0,
  });
  var mapzoom = 8;
  const FirstLoad = () => {
    setCheck(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const params: any = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          params1 = params;
          SetNewparam(params1);
          setUserCurrentLocation(params1);
          mapzoom = 3;
          const locationFilter: SelectableFilter = {
            selected: true,
            fieldId: "builtin.location",
            value: {
              lat: params.latitude,
              lng: params.longitude,
              radius: 50000000000,
            },

            matcher: Matcher.Near,
          };

          searchActions.setOffset(0);
          searchActions.setStaticFilters([locationFilter]);

          searchActions.setUserLocation(params1);
          searchActions.setVerticalLimit(limit);
          searchActions.executeVerticalQuery();
        },
        function (error) {
          if (error.code == error.PERMISSION_DENIED) {
          }
        }
      );
    }

    params1 = {
      latitude: googleMapsConfig.centerLatitude,
      longitude: googleMapsConfig.centerLongitude,   
    };
    SetNewparam(params1);
    // mapzoom=8;
    const locationFilter: SelectableFilter = {
      selected: true,
      fieldId: "builtin.location",
      value: {
        lat: params1.latitude,
        lng: params1.longitude,
        radius: 1000000000,
      },

      matcher: Matcher.Near,
    };

    // searchActions.setOffset(0);
    searchActions.setStaticFilters([locationFilter]);
    searchActions.setUserLocation(params1);
    searchActions.setVerticalLimit(limit);
    searchActions.executeVerticalQuery();
    setTimeout(() => {
      setIsloading(false);
      $("body").removeClass("overflow-hidden");
    }, 3100);
  };
// console.log(userCurrentLocation,"userCurrentLocation"); 

          

  const onClick = () => {
    setZoomlevel(4);
    if (navigator.geolocation) {
      const error = (error: any) => {
        if (error.code == 1) {
          setallowLocation(userMyLocationBlockMessage);
          setModelOpen(true);
        }
        setUserCurrentLocation(false);
      };
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setIsUserLocation(true);
          Geocode.setApiKey(googleMapsConfig.googleMapsApiKey);
          Geocode.fromLatLng(
            position.coords.latitude,
            position.coords.longitude
          ).then(
            (response: any) => {
              console.log("response", response);

              if (response.results[0]) {
                if (inputRef.current) {
                  inputRef.current.value =
                    response.results[0].formatted_address;
                }

                let pacInput: any = document?.getElementById("pac-input");
                if (pacInput) {
                  pacInput.value = response.results[0].formatted_address;
                  pacInput.focus();
                }

                setallowLocation("");
                searchActions.setUserLocation({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                });
              }
            },
            (error: any) => {
              console.error(error);
              setCheck(false);
            }
          );
          searchActions.setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          searchActions.setVertical(AnswerExperienceConfig.verticalKey);
          searchActions.setOffset(0);
          searchActions.setVerticalLimit(limit);
          searchActions.executeVerticalQuery();
        },
        error,
        {
          timeout: 10000,
        }
      );
    }
  };

  var firstTimeRunners = true;
  const [isLoading, setIsloading] = React.useState(true);
  React.useEffect(() => {
    if (firstTimeRunners) {
        firstTimeRunners = false;
        FirstLoad();
    }

if (isLoading) {
         $("body").addClass("overflow-hidden");
}

}, []);
console.log(locationData,"locationData")
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
                <a href="#">Home</a>
              </li>

              <li>Store Locator</li>
            </ul>
          </div>
          <div className="w-full text-center mb-[3.75rem] locatorHeading">
            <h3 className="sec_heading">
              {" "}
              {props._site?.c_locatorPageHeading}
            </h3>
            <p className="sec_description">
              {" "}
              {props._site?.c_locatorPageDescription}
            </p>
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
              <div className="searchBox-Box bg-black p-[1.125rem]">
            {allowlocation?.length > 0 ? (
                <div className="for-allow">{allowlocation}</div>
              ) : (
                ""
              )}
              <div className="location-with-filter mb-[2rem]">
                {/* Use My Location button */}
                <div className="UseMyLocation">
                <p className="findStore">Find Store</p>
                <button
                  className="ghost-button before-icon"
                  title="Search using your current location!"
                  id="useLocation"
                  onClick={onClick}
                >
                  {svgIcons.UseMylocationIcon}
                  Use My Location
                </button>
                </div>
              </div>
              <Herobanner
                layoutData={bannerAndMapConnectivity}
                setLayoutData={setBannerAndMapConnectivity}
                handleEndPoimtCallBack=""
                locale={locale}
                _site={props._site}
                userCurrentLocation={userCurrentLocation}
                setUserCurrentLocation={setUserCurrentLocation}
              />

            
            </div>
          </div>
            <div
              className={`right-block-locator map-box ${isMapboxOpen}`}
              id="map-box"
            >
              <GoogleMaps
                layoutData={bannerAndMapConnectivity}
                setLayoutData={setBannerAndMapConnectivity}
                apiKey={googleMapsConfig.googleMapsApiKey}
                centerLatitude={googleMapsConfig.centerLatitude}
                centerLongitude={googleMapsConfig.centerLongitude}
                defaultZoom={2}
                showEmptyMap={true}
                language={locale}
                chooseMessage={chooseMessage}
                userCurrentLocation={userCurrentLocation}
                setUserCurrentLocation={setUserCurrentLocation}
              />
            </div>

            <div className="left-block-locator">
              
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
              <div className={`total-location ${fixed}`}>
                    <p onClick={() => hideMapInMobile()}>{<ResultsCount />}</p>
                  </div>
              <PerfectScrollbar
                className={`${openHeight} result-list`}
                id="result-list"
              >
                <div className="px-5 info-window-wrapper">
                 
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
