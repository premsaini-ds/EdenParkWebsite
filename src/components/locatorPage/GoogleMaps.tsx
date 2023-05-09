import { useSearchState } from "@yext/search-headless-react";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import {
  twMerge,
  useComposedCssClasses,
} from "..//../hooks/useComposedCssClasses";
import addressicon from "../../images/userMarker.png";
import cluster from "../../images/diptyqueCluster.png";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import useFetchResults from "../../hooks/useFetchResults";
import { useSearchActions } from "@yext/search-headless-react";
import {
  addFixedActiveGrid,
  consoleLog,
  getMapStyles,
  getPosition,
  getUserLatLng,
  getUserLocationDetails,
} from "../locationDetails/commonFunction/index";
// import retailersPin from "../../images/diptyqueRetailersPin.png";
import retailersPin from "../../images/multibrand.png";
import retailersHoverPin from "../../images/diptyqueRetailersHoverPin.png";
// import storesPin from "../../images/diptyqueStoresPin.png";
import storesPin from "../../images/bigstore.png";
import storesHoverPin from "../../images/diptyqueStoresHoverPin.png";
import { Matcher, SelectableFilter } from "@yext/search-headless-react";
import transparent from "../../images/transparent.png";
import { getMapRadiusVisibalPart, setMapRadius } from "../locationDetails/commonFunction/GoogleMapHelper";
import { limit } from "../../types/constants";
// import defaultMarker from "../../images/defaultMarker.png";
import defaultMarker from "../../images/shop.png";
import { Map } from "mapbox-gl";
import $ from "jquery";
/**
 * CSS class interface for the {@link GoogleMaps} component
 *
 * @public
 */
export interface GoogleMapsCssClasses {
  googleMapsContainer?: string;
}
/**
 * Props for the {@link GoogleMaps} component
 *
 * @public
 */

export interface GoogleMapsProps {
  apiKey: string;
  centerLatitude: any;
  centerLongitude: any;
  defaultZoom: number;
  showEmptyMap: boolean;
  providerOptions?: google.maps.MapOptions;
  customCssClasses?: GoogleMapsCssClasses;
  language?: string;
  chooseMessage?: any;
}

type UnwrappedGoogleMapsProps = Omit<GoogleMapsProps, "apiKey" | "locale">;
let mapMarkerClusterer: { clearMarkers: () => void } | null = null;

const builtInCssClasses: Readonly<GoogleMapsCssClasses> = {
  googleMapsContainer:
    "map-box-wrapper w-full h-[calc(100vh_-_28.30rem)] md:h-[calc(100vh_-_12.313rem)] lg:h-[calc(170vh_-_13.125rem)] top-0 order-1 lg:order-none z-[1]",
};

/**
 * A component that renders a map with markers to show result locations.
 *
 * @param props - {@link GoogleMapsProps}
 * @returns A React element conatining a Google Map
 *
 * @public
 */

// export function GoogleMaps(props: any) {
//   return (
//     <div>
//       <UnwrappedGoogleMaps {...props} />
//     </div>
//   );
// }

export function GoogleMaps(props: any) {

  let centerLatitude = props.centerLatitude;
  let centerLongitude = props.centerLongitude;
  let zoom = props.defaultZoom;
  let showEmptyMap = props.showEmptyMap;
  let providerOptions = props.providerOptions;
  let customCssClasses = props.customCssClasses;
  let chooseMessage = props.chooseMessage;

  const bannerAndMapConnectivity = props.layoutData;
  const setBannerAndMapConnectivity = props.setLayoutData;

  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [called, setCalled] = useState(false);
  const [center] = useState({
    lat: centerLatitude,
    lng: centerLongitude,
  });
  const locationResults = useFetchResults() || [];
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses);
  const noResults = !locationResults.length;
  const searchActions = useSearchActions();
  let containerCssClass = cssClasses.googleMapsContainer;
  let marker_icon = {
    url: storesPin,
  };
  let marker_hover_icon = {
    url: storesHoverPin,
  };
  let openInfoWindow: any = false;
  let searchCenter: any = null;
  let searchZoom: any = null;
  let stopAnimation = false;
  let currentMapZoom: any = 0;
  let infoWindow = new google.maps.InfoWindow();
  const bounds = new google.maps.LatLngBounds();
  const markerPins = useRef<google.maps.Marker[]>([]);
  const usermarker = useRef<google.maps.Marker[]>([]);
  var locations: any;
  const resultsLength =
    useSearchState((state) => state.vertical?.results?.length) || 0;
  const offset = useSearchState((state) => state.vertical?.offset) || 0;
  const isShiftMarker = useRef(true);
  var info = false;
  let locationCenter: any = {
    lat: centerLatitude,
    lng: centerLongitude,
  };
  if (noResults && !showEmptyMap) {
    containerCssClass = twMerge(cssClasses.googleMapsContainer, "hidden");
  }

  deleteMarkers();
  userdeleteMarkers();



  for (let index = 0; index < locationResults.length; index++) {
    const locationElement = getPosition(locationResults[index]);
    let location = new google.maps.LatLng(locationElement.lat, locationElement.lng);
    bounds.extend(location);
    map?.fitBounds(bounds)
  }

  // locationResults.map((result: any, i: number) => {
  //   if (i == 0) {
  //     locationCenter = {
  //       lat: centerLatitude,
  //       lng: centerLongitude,
  //     };
  //     if (map) {
  //       const location = new google.maps.LatLng(centerLatitude, centerLongitude);
  //       bounds.extend(location);
  //       map.setCenter(locationCenter);
  //     }
  //   }
  // });

  let zoomLevel = map?.getZoom()
  if (zoomLevel && zoomLevel > 10) {
    map?.setZoom(12)
  }


  if (props.userCurrentLocation == null) {
  const position = {
    lat: parseFloat(centerLatitude),
    lng: parseFloat(centerLongitude),
  };
   new google.maps.Marker({
      position,
      map,
      icon: addressicon,
      });
    }

  useEffect(() => {
    // console.log('userCurrentLocation first map', props.userCurrentLocation);
    if (props.userCurrentLocation && props.userCurrentLocation.latitude && props.userCurrentLocation.longtitude && props.userCurrentLocation != null) {
      const position = {
        lat: parseFloat(props.userCurrentLocation.latitude),
        lng: parseFloat(props.userCurrentLocation.longtitude),
      };
      new google.maps.Marker({
        position: position,
        map: map,
        icon: addressicon,
      });
    }

  }, [props.userCurrentLocation])


    // const position = {
    //   lat: parseFloat(centerLatitude),
    //   lng: parseFloat(centerLongitude),
    // };
    //  new google.maps.Marker({
    //     position,
    //     map,
    //     icon: addressicon,
    //     });
        
  // })

  // const position = {
  //         lat: parseFloat(centerLatitude),
  //         lng: parseFloat(centerLongitude),
  //       };
  // const Usermarker1 = new google.maps.Marker({
  //   position,
  //   map,
  //   icon: addressicon,
  // });
  // usermarker.current.push(Usermarker1);

  try {
    if (mapMarkerClusterer) {
      mapMarkerClusterer.clearMarkers();
    }
  } catch (e) { }

  let index = 0;
  for (const result of locationResults) {
    marker_icon = getMarkerPin(result);
    const position = getPosition(result);
    const marker = new google.maps.Marker({
      position,
      map,
      icon: marker_icon,
    });
    const location = new google.maps.LatLng(position.lat, position.lng);
    bounds.extend(location);
    markerPins.current.push(marker);
    index++;
  }

  if (markerPins.current.length > 0) {

    let markers = markerPins.current;
    mapMarkerClusterer = new MarkerClusterer({
      map,
      markers,
      renderer: {
        render: ({ markers, position: position }) => {
          return new google.maps.Marker({
            position: {
              lat: position.lat(),
              lng: position.lng(),
            },
            icon: cluster,
            label: {
              text: String(markers?.length),
              color: "black",
            },
          });
        },
      },
    });

    // google.maps.event.addListener(mapMarkerClusterer, 'click', function () {

    //   consoleLog('CLICK ON CLUSTER');

    //   setTimeout(() => {
    //     const visibilityDetails = getMapRadiusVisibalPart(map);
    //     if (visibilityDetails.latitude && visibilityDetails.longitude && visibilityDetails.proximitymeter) {
    //       const locationFilter: SelectableFilter = {
    //         selected: true,
    //         fieldId: "builtin.location",
    //         value: {
    //           lat: visibilityDetails.latitude,
    //           lng: visibilityDetails.longitude,
    //           radius: visibilityDetails.proximitymeter,
    //         },
    //         matcher: Matcher.Near,
    //       };

    //       searchActions.setOffset(0)
    //       searchActions.setStaticFilters([locationFilter]);
    //       // searchActions.executeVerticalQuery();
    //     }
    //   });

    //   let zoomValue = map?.getZoom()
    //   if (zoomValue && zoomValue < 10) {
    //     map?.setZoom(12)
    //   }
    //   console.log(zoomValue, "zoomValue")
    // });
  }


  // function getCoordinates(Address: any) {
  //   var geocoder = new google.maps.Geocoder();
  //   var latitude: any;
  //   var longitude: any;
  //   geocoder.geocode({ address: Address }, function (results: any, status) {
  //     if (status == google.maps.GeocoderStatus.OK) {
  //       latitude = results[0].geometry.location.lat();
  //       longitude = results[0].geometry.location.lng();   
  //       if(map){
  //         map.setCenter({
  //           lat: latitude,
  //           lng: longitude
  //         });          
  //         setBannerAndMapConnectivity({
  //           ...bannerAndMapConnectivity,
  //           latitude: latitude,
  //           longitude: longitude,
  //           radius: 5000
  //         });
  //       }
  //     }
  //     else {
  //     }
  //   });
  // }




  function updateParam(latestUserInput: any) {
    // consoleLog('Update param');
    // var paramValue = latestUserInput; // Replace with your updated value
    // var searchParams = new URLSearchParams(window.location.search);
    // searchParams.set('query', paramValue);
    // var newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
    // window.history.replaceState({}, '', newUrl);
  };

  useEffect(() => {
    if (typeof google === "object" && typeof google.maps === "object") {
      console.log('after search')
      let pacInput: any = document?.getElementById("pac-input");
      let autocomplete = new google.maps.places.Autocomplete(pacInput);
      autocomplete.addListener('place_changed', function () {

        /** Update page url */
        var place = autocomplete.getPlace();
        if (place.formatted_address) {
          updateParam(place.formatted_address);
        }

        var latitude = place && place.geometry && place.geometry.location ? place.geometry.location.lat() : 0;
        var longitude = place && place.geometry && place.geometry.location ? place.geometry.location.lng() : 0;

        const location = new google.maps.LatLng(latitude, longitude);

        if (latitude && longitude) {
          // setAutocompletePlaceId(placeId);
          if (map) {
            map.setCenter({
              lat: latitude,
              lng: longitude
            });

            const filterItem = [];
            const locationFilter: SelectableFilter = {
              selected: true,
              fieldId: "builtin.location",
              value: {
                lat: latitude,
                lng: longitude,
                radius: 5000, //(visiableRadius*1000),
              },
              matcher: Matcher.Near,
            };
            filterItem.push(locationFilter);

            const filterActive = document.getElementsByClassName('filter-active')
            if (filterActive && filterActive.length) {
              const isAll = filterActive[0].getAttribute('data-isall');
              const itemName = filterActive[0].getAttribute('data-itemname');
              if (isAll != 'true' && itemName) {
                console.log('isAll', 'FilterADDED')
                const itemFilter: SelectableFilter = {
                  selected: true,
                  fieldId: "c_storesType",
                  value: itemName,
                  matcher: Matcher.Equals,
                };
                filterItem.push(itemFilter);
              }
            }

            searchActions.setOffset(0)
            searchActions.setStaticFilters(filterItem);
            searchActions.executeVerticalQuery();
            // map.setZoom(12)


            console.log(map.getZoom(), "currentZoom")

            setBannerAndMapConnectivity({
              ...bannerAndMapConnectivity,
              latitude: latitude,
              longitude: longitude,
              radius: 5000,
              is_search: true
            });

            let zoomLevel = map.getZoom();

            if (zoomLevel && zoomLevel < 10) {
              map.setZoom(12)
            }
          }
        }
      });
    }
    setCalled(false);
  }, [center, map, providerOptions, zoom]);

  /** 
   * This useEffect only works when commen data of 
   * hero banner and  google map will change
   */
  useEffect(() => {
    if (map && map.getRenderingType() == "RASTER" && bannerAndMapConnectivity.latitude && bannerAndMapConnectivity.longitude && bannerAndMapConnectivity.radius) {
      setMapRadius(map, bannerAndMapConnectivity.latitude, bannerAndMapConnectivity.longitude, bannerAndMapConnectivity.radius);
    }

  }, [bannerAndMapConnectivity, map?.getRenderingType()]);




  useEffect(() => {
    console.log("called main ----------------")

    map?.setZoom(6)
  }, [map])




  /**
   * This useEffect only works when user landing on the page
   */
  useEffect(() => {
    if (ref.current && !map) {
      const mapStyle = getMapStyles();
      const createMap = new window.google.maps.Map(ref.current, {
        center,
        zoom,
        // styles: mapStyle,
        ...providerOptions,
      });
      // createMap.addListener("dragend", function () {
      //   updateMarkers(createMap);
      // });
      setMap(createMap);
    }
    console.log(map?.getZoom(), "effect second ")
    map?.setZoom(14)
  }, []);

  const updateMarkers = (map: any) => {
    consoleLog('updateMarkers', updateMarkers)
    if (map) {
      // var bounds: any = map.getBounds();
      // var ne = bounds.getNorthEast();
      // var sw = bounds.getSouthWest();
      // var width = google.maps.geometry.spherical.computeDistanceBetween(ne, new google.maps.LatLng(ne.lat(), sw.lng()));
      // var height = google.maps.geometry.spherical.computeDistanceBetween(
      //   ne,
      //   new google.maps.LatLng(sw.lat(), ne.lng())
      // );
      // var diagonal = google.maps.geometry.spherical.computeDistanceBetween(
      //   ne,
      //   sw
      // );
      // var Finalradius = diagonal / 2;
      // var miles = width / 1609.34; // 1 mile = 1609.34 meters
      // var kilometers = width / 1000; // 1 kilometer = 1000 meters
      // const visiableArea = getMapRadiusVisibalPart(map);
      /**
       * latitude
        longitude
       */
      const { proximitymeter, latitude, longitude } = getMapRadiusVisibalPart(map);
      // consoleLog('bannerAndMapConnectivity', bannerAndMapConnectivity);
      const locationFilter: SelectableFilter = {
        selected: true,
        fieldId: "builtin.location",
        value: {
          lat: latitude,
          lng: longitude,
          radius: proximitymeter,
        },
        matcher: Matcher.Near,
      };
      searchActions.setStaticFilters([locationFilter]);
      searchActions.setVerticalLimit(limit);
      searchActions.setOffset(0);
      searchActions.executeVerticalQuery();
    }
  }

  for (let i = 0; i < markerPins.current.length; i++) {
    var markerclicked: any = { lat: 0.0, lng: 0.0 };
    let zoomLevel: any = map?.getZoom()
    let maxZoomlevel = zoomLevel + 2;
    markerPins.current[i].addListener("click", () => {
      markerclicked = {
        lat: markerPins.current[i].getPosition()?.lat(),
        lng: markerPins.current[i].getPosition()?.lng(),
      };
      let mapCenter: any = map?.getCenter()
      Infowindow(i, locationResults[i]);
      map?.setCenter(markerclicked)


      map?.setZoom(maxZoomlevel)

      $(".close-window").click(function () {
        map?.setZoom(zoomLevel)
        map?.setCenter({ lat: mapCenter.lat(), lng: mapCenter.lng() })
      })

    });

    // if (!called && isShiftMarker.current) {
    //   console.log('isShiftMarkertrue')
    //   google.maps.event.addListener(map, "zoom_changed", updateMarkers);
    //   google.maps.event.addListener(map, "center_changed", updateMarkers);
    //   setCalled(true);
    // }
  }

  /**tushar */

  // infoWindow.addListener("closeclick", () => {
  //   info = false;
  //   zoomMapTo(searchZoom, searchCenter);
  //   openInfoWindow = false;
  //   locationResults.map((e: any, i: any) => { });
  // });
  // function gridHover(
  //   markerPins: any,
  //   marker_hover_icon: any,
  //   marker_icon: any
  // ) {
  //   let elements = document.querySelectorAll(".result");
  //   for (let index = 0; index < elements.length; index++) {
  //     elements[index].addEventListener("mouseover", () => { });
  //     elements[index].addEventListener("mouseout", () => {
  //       if (openInfoWindow) {
  //         let check = elements[index].classList.contains("selectedLocation");
  //         if (check) {
  //           // markerPins.current[index].setIcon(marker_hover_icon);
  //         } else {
  //           // markerPins.current[index].setIcon(marker_icon);
  //         }
  //       } else {
  //         // markerPins.current[index].setIcon(marker_icon);
  //       }
  //       // removeActiveGrid();
  //     });
  //   }
  // }

  function Infowindow(i: any, result: any): void {
    info = true;
    let url = "";
    if (!result.rawData.slug) {
      url = `${result.rawData.id}-${result}.html`;
    } else {
      url = `${result.rawData.slug.toString()}.html`;
    }
    chooseMessage(result);
    const myElement = document.getElementById("info-window");
    myElement?.classList.remove("hidden");
    myElement?.classList.add("block");
  }

  function deleteMarkers(): void {
    for (let i = 0; i < markerPins.current.length; i++) {
      markerPins.current[i].setMap(null);
    }
    markerPins.current = [];
  }

  function userdeleteMarkers(): void {
    for (let i = 0; i < usermarker.current.length; i++) {
      usermarker.current[i].setMap(null);
    }
    usermarker.current = [];
  }


  function getMarkerPin(result: any) {

    // console.log("premsaini123",result?.rawData?.c_itemCategory);
    let m_icon = marker_icon;
    if (result?.rawData?.c_itemCategory) {

      if (result?.rawData?.c_itemCategory == "Multi-brand") {
            m_icon = {
                   url: retailersPin,
            };
      } else if (result?.rawData?.c_itemCategory == "Big Store") {
        m_icon = {
                url: storesPin,
        };
      }else{
           m_icon = {
                  url: defaultMarker,
        };
      }

    } 
    // else {
    //          m_icon = {
    //                   url: defaultMarker,
    //         };

    // }
    return m_icon;
  }

  return (<div className={containerCssClass} ref={ref} />);
}