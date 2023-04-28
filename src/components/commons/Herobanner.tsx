import * as React from "react";
import {
  Matcher,
  SelectableFilter,
  useSearchActions,
} from "@yext/search-headless-react";
import { useEffect, useState } from "react";
import { googleMapsConfig } from "../../types/constants";
import { limit } from "../../types/constants";
import $ from "jquery";
import { svgIcons } from "../../svgIcon ";
import { useTranslation } from "react-i18next";
import { consoleLog, getUserLatLng, getUserLocationDetails } from "../locationDetails/commonFunction";
import { getLatLongFromAddress, getLatLongFromSearchQuery } from "../locationDetails/commonFunction/GoogleMapHelper";


var params1: any = {
  latitude: googleMapsConfig.centerLatitude,
  longitude: googleMapsConfig.centerLongitude,
};

const Herobanner = (props: any) => {
  const [check, setCheck] = useState(false);
  const [inputvalue, setInputValue] = React.useState("");
  const [allowlocation, setallowLocation] = React.useState("");
  const [queryString, setQueryString] = useState(null)
  let googleLib = typeof google !== "undefined" ? google : null;
  const searchActions = useSearchActions();
  var firstTimeRunners = true;
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete>();
  const bannerAndMapConnectivity = props.layoutData;
  const setBannerAndMapConnectivity = props.setLayoutData;

  const FirstLoad = async () => {
    consoleLog('HIT FIRST LOAD');
    getLatLongFromSearchQuery().then((response: any) => {
      consoleLog('GET DATA FROM SEARCJ QUERY', response);
      var locationlatLng: any = {
        latitude: parseFloat(response.latitude),
        longitude: parseFloat(response.longitude),
      };

      /** Set state from search layout */
      setBannerAndMapConnectivity({
        ...bannerAndMapConnectivity,
        latitude: parseFloat(response.latitude),
        longitude: parseFloat(response.longitude),
        radius: 5000,
        is_search: true,
      });

      searchActions.setUserLocation(locationlatLng);
      searchActions.setVerticalLimit(limit);
      searchActions.executeVerticalQuery();
    }).catch(() => {

      /** get user location from allowed location */
      getUserLatLng().then((param: any) => {
        props.setUserCurrentLocation({
          latitude: parseFloat(param.latitude),
          longtitude: parseFloat(param.longitude),
        })
        /** Set state from search layout */
        setBannerAndMapConnectivity({
          ...bannerAndMapConnectivity,
          latitude: param.latitude,
          longitude: param.longitude,
        });

        searchActions.setUserLocation(param);
        searchActions.setVerticalLimit(limit);
        searchActions.executeVerticalQuery();
        // TODO: NOT IN USE setIsloading(false);
      }).catch(() => {

        /** get user location from ip */
        getUserLocationDetails().then((response: any) => {
          props.setUserCurrentLocation({
            latitude: parseFloat(response.latitude),
            longtitude: parseFloat(response.longitude),
          })
          var locationlatLng: any = {
            latitude: parseFloat(response.latitude),
            longitude: parseFloat(response.longitude),
          };

          /** Set state from search layout */
          setBannerAndMapConnectivity({
            ...bannerAndMapConnectivity,
            latitude: parseFloat(response.latitude),
            longitude: parseFloat(response.longitude),
          });

          searchActions.setUserLocation(locationlatLng);
          searchActions.setVerticalLimit(limit);
          searchActions.executeVerticalQuery();
        }).catch(() => {

          /** Set state from search layout */
          setBannerAndMapConnectivity({
            ...bannerAndMapConnectivity,
            latitude: parseFloat(params1.latitude),
            longtitude: parseFloat(params1.longitude),
          });

          searchActions.setUserLocation(params1);
          searchActions.setVerticalLimit(limit);
          searchActions.executeVerticalQuery();
        });
      });
    });
  };


  function updateParam(latestUserInput: any) {
    consoleLog('Update param');
    var paramValue = latestUserInput; // Replace with your updated value
    var searchParams = new URLSearchParams(window.location.search);
    searchParams.set('query', paramValue);
    var newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
    window.history.replaceState({}, '', newUrl);
  };

  // const Findinput = () => {
  //   let searchKey: any = document.getElementsByClassName("FilterSearchInput");
  //   let Search: any = searchKey[0].value;
  //   if (searchKey[0].value) {
  //     updateParam(searchKey[0].value);
  //     localStorage.setItem('IsInputBlank', "false");
  //     setInputValue("");
  //     getCoordinates(Search);
  //   }
  // };
  // const Findinput2 = () => {
  //   var isInputBlank = localStorage.getItem('IsInputBlank');
  //   if (isInputBlank != 'true') {
  //     const searchInput: any = document.getElementsByClassName('pac-item');
  //     selectAllCheckRef.current = searchInput;
  //     let searchKey: any = document.getElementsByClassName("FilterSearchInput");
  //     let Search = searchKey[0]?.value;
  //     if (Search.length == 0) {
  //       updateParam("");
  //       localStorage.setItem('IsInputBlank', "true");
  //       searchActions.setVertical("locations");
  //       searchActions.setQuery("");
  //       searchActions.setOffset(0);
  //       searchActions.setVerticalLimit(limit);
  //       searchActions.executeVerticalQuery();
  //     }
  //   }
  // };

  useEffect(() => {

    if (firstTimeRunners) {
      firstTimeRunners = false;
      FirstLoad();
    }

    if (typeof google === "object" && typeof google.maps === "object") {
      //let pacInput: any = document?.getElementById("pac-input");
      // let autocomplete = new google.maps.places.Autocomplete(pacInput);
      // google.maps.event.addListenerOnce(autocomplete, "place_changed", function () {
      //   consoleLog('WORKING HERE ALSO');
      //   let searchKey: any = document.getElementsByClassName("FilterSearchInput");
      //   let Search: any = searchKey[0].value;
      //   updateParam(Search);
      //   getCoordinates(Search);
      // });
    }

    /* redirect searchbar */
    const urlParams = new URLSearchParams(window.location.search);
    const currentValue: any = urlParams.get('query');
    consoleLog('FIRSTRUN::2')
    setQueryString(currentValue)
    var text: any = document.getElementById("pac-input");
    text.value = currentValue;
    getCoordinates(currentValue);

    /* redirect searchbar */
  }, []);

  /** TODO: WORKING CODE TODO: */
  useEffect(() => {

    if (googleLib && typeof google.maps === "object") {
      let pacInput: any = document?.getElementById("pac-input");
      let options: any = {
        options: {
          fields: ["address_component", "geometry"],
        },
      };
      const autoComplete = new google.maps.places.Autocomplete(
        pacInput,
        options
      );
      if (autoComplete) {
        function pacSelectFirst(input: HTMLInputElement) {
          var _addEventListener = input.addEventListener;

          function addEventListenerWrapper(type: string, listener: any) {
            if (type == "keydown") {
              var orig_listener = listener;

              listener = function (event: { which: number }) {
                var suggestion_selected = $(".pac-item-selected").length > 0;

                if (
                  (event.which == 13 || event.which == 9) &&
                  !suggestion_selected
                ) {

                  var simulated_downarrow = $.Event("keydown", {
                    keyCode: 40,
                    which: 40,
                  });
                  orig_listener.apply(input, [simulated_downarrow]);
                }

                orig_listener.apply(input, [event]);
              };
            }

            _addEventListener.apply(input, [type, listener]);
          }

          if (input.addEventListener) {
            input.addEventListener = addEventListenerWrapper;
          }
        }

        setAutocomplete(autoComplete);
        pacSelectFirst(pacInput);
      }
    }
    return () => {
      if (autocomplete) {
        autocomplete.unbindAll();
      }
    };
  }, [googleLib]);



  function getCoordinates(Address: any) {
    consoleLog("getCoordinates::HEROBANNER");
    setInputValue("");
    setCheck(true);
    var geocoder = new google.maps.Geocoder();
    var latitude: any;
    var longitude: any;
    geocoder.geocode({ address: Address }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        latitude = results && results[0].geometry.location.lat();
        longitude = results && results[0].geometry.location.lng();

        const locationFilter: SelectableFilter = {
          selected: true,
          fieldId: "builtin.location",
          value: {
            lat: latitude,
            lng: longitude,
            radius: 5000,
          },

          matcher: Matcher.Near,
        };

        searchActions.setOffset(0)
        searchActions.setStaticFilters([locationFilter]);
        searchActions.executeVerticalQuery();
      } else {
        // searchActions.setVertical("locations");
        // searchActions.setQuery(Address);
        // searchActions.setOffset(0);
        // searchActions.setVerticalLimit(limit);
        // searchActions.executeVerticalQuery();
      }
    });
  }


  function reset() {
    var text: any = document.getElementById("pac-input");
    if (text.value.length > 0) {
      text.value = "";
      updateParam("");
      searchActions.resetFacets();
      searchActions.setOffset(0);
      searchActions.setVerticalLimit(limit)


      searchActions.setVertical("locations");
      searchActions.setQuery("");
      searchActions.setOffset(0);
      searchActions.setVerticalLimit(limit);
      searchActions.executeVerticalQuery();

      if (props.userCurrentLocation) {
        setBannerAndMapConnectivity({
          ...bannerAndMapConnectivity,
          latitude: parseFloat(props.userCurrentLocation.latitude),
          longitude: parseFloat(props.userCurrentLocation.longtitude),
          radius: 5000,
          is_search: false,
        });
      }
    }


    /** commented for further use */
    // const filterItem = [];
    // const filterActive =  document.getElementsByClassName('filter-active')
    // if(filterActive && filterActive.length){
    //   const isAll = filterActive[0].getAttribute('data-isall');
    //   const itemName = filterActive[0].getAttribute('data-itemname');
    //   if(isAll!='true' && itemName){
    //     console.log('isAll', 'FilterADDED')
    //     const itemFilter: SelectableFilter = {
    //       selected: true,
    //       fieldId: "c_storesType",
    //       value: itemName,
    //       matcher: Matcher.Equals,
    //     };
    //     filterItem.push(itemFilter);
    //   }
    // }
    // console.log('filterItem', filterItem);
    // searchActions.setStaticFilters(filterItem);
    // searchActions.executeVerticalQuery();
    // setBannerAndMapConnectivity({
    //   ...bannerAndMapConnectivity,
    //   is_search: false,
    // });
    /** commented for further use */
    // var isInputBlank = localStorage.getItem('IsInputBlank');
    // text.value = "";
    // if (isInputBlank == 'false') {
    //   updateParam("")
    //   text.value = "";
    //   localStorage.setItem('IsInputBlank', "true");
    //   searchActions.setVertical("locations");
    //   searchActions.setQuery("");
    //   searchActions.setOffset(0);
    //   searchActions.setVerticalLimit(limit);
    //   searchActions.executeVerticalQuery();
    //   /** Set state from search layout */
    //   setBannerAndMapConnectivity({
    //     ...bannerAndMapConnectivity,
    //     radius : (100000 * 100)
    //   });
    // }

  }

  const searchLocation = (e: any) => {
    if (e.target.value.length === 0) {
      localStorage.setItem('IsInputBlank', "true");
    } else {
      localStorage.setItem('IsInputBlank', "false");
    }
  }

  const { t } = useTranslation();

  return (
    <>
      <div className="locator-find-block pb-[1.125rem]">
        {allowlocation.length > 0 ? (
          <div className="for-allow">{allowlocation}</div>
        ) : (
          ""
        )}
        <div className="search-form">

          <input
            id="pac-input"
            type="text"
            placeholder={props._site?.c_placeholderText ? props._site?.c_placeholderText : t("Search by address, city, country...")}
            className="FilterSearchInput"
            onKeyUp={searchLocation}
          />

          <button
            className="cus_btn search-submit"
            aria-label="Search bar icon"
            onClick={reset}
          >
            {svgIcons.searchClose}
          </button>
        </div>
      </div>
    </>
  );

};
export default Herobanner;