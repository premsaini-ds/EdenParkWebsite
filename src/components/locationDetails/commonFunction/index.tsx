import { Result } from "@yext/search-headless-react";
import { slugify, headerHeadingText } from "../../../types/constants";
var userLocation: any = false;
const regionNames = new Intl.DisplayNames(["en"], { type: "region" });


export const DIPTYQUEPARIS = "https://www.diptyqueparis.com/"

export default function getDirectionUrl(entitiy: any) {
  var address_string = "";
  if (entitiy.address.line1) address_string += entitiy.address.line1 + ",";
  if (entitiy.address.line2) address_string += entitiy.address.line2 + ",";
  if (entitiy.address.city) address_string += entitiy.address.city + ",";
  if (entitiy.address.region) address_string += entitiy.address.region + ",";
  if (entitiy.address.postalCode)
    address_string += entitiy.address.postalCode + ",";
  address_string += regionNames.of(entitiy.address.countryCode);
  address_string = address_string.replace("undefined,", "");

  let googlePlaceId = entitiy.googlePlaceId ? entitiy.googlePlaceId : false;

  var origin: any = null;
  if (entitiy.address.city) {
    origin = entitiy.address.city;
  } else if (entitiy.address.region) {
    origin = entitiy.address.region;
  } else {
    origin = entitiy.address.country;
  }
  let directionUrl =
    `https://www.google.com/maps/dir/?api=1&destination=` +
    encodeURIComponent(address_string);
  if (googlePlaceId) directionUrl += `&destination_place_id=${googlePlaceId}`;

  if (userLocation) {
    let currentLatitude = userLocation.coords.latitude;
    let currentLongitude = userLocation.coords.longitude;
    directionUrl += `&origin=${currentLatitude},${currentLongitude}`;
    window.open(directionUrl, "_blank");
  } else if (navigator.geolocation) {
    const error = (error: any) => {
      directionUrl += `&origin=` + encodeURIComponent(origin);
      window.open(directionUrl, "_blank");
    };
    navigator.geolocation.getCurrentPosition(
      function (position) {
        userLocation = position;
        let currentLatitude = position.coords.latitude;
        let currentLongitude = position.coords.longitude;
        directionUrl += `&origin=${currentLatitude},${currentLongitude}`;
        window.open(directionUrl, "_blank");
      },
      error,
      {
        timeout: 10000,
      }
    );
  } else {
    directionUrl += `&origin=` + encodeURIComponent(origin);
    window.open(directionUrl, "_blank");
  }
}

export function getPosition(result: Result) {
  const lat = (result.rawData as any).yextDisplayCoordinate.latitude;
  const lng = (result.rawData as any).yextDisplayCoordinate.longitude;
  return { lat, lng };
}

export function removeActiveGrid() {
  let elements = document.querySelectorAll(".result");
  for (let index = 0; index < elements.length; index++) {
    elements[index].classList.remove("active");
  }
}
export function removeFixedActiveGrid() {
  let elements = document.querySelectorAll(".result");
  for (let index = 0; index < elements.length; index++) {
    elements[index].classList.remove("selectedLocation");
  }
}

export function addActiveGrid(index: any) {
  let elements = document.querySelectorAll(".result");
  for (let index = 0; index < elements.length; index++) {
    elements[index].classList.remove("active");
  }
  document.querySelectorAll(".result")[index].classList.add("active");
}
export function addFixedActiveGrid(index: any) {
  let elements = document.querySelectorAll(".result");
  for (let index = 0; index < elements.length; index++) {
    elements[index].classList.remove("selectedLocation");
  }
  document.querySelectorAll(".result")[index].classList.add("selectedLocation");
}
export function scrollToRow(index: any) {
  let result: any = [].slice.call(
    document.querySelectorAll(".result") || []
  )[0];
  let offset: any = 0;
  if (
    typeof [].slice.call(document.querySelectorAll(".result") || [])[index] !=
    "undefined"
  ) {
    offset =
      [].slice.call(document.querySelectorAll(".result") || [])[index]
        .offsetTop - result.offsetTop;
    [].slice
      .call(document.querySelectorAll(".result-list") || [])
      .forEach(function (el) {
        el.scrollTop = offset;
      });
  }
}

var userLocation: any = false;
export function GetDirection(e: any) {
  let addressComponent = [];

  if (typeof e.target.dataset.line1 != "undefined" && e.target.dataset.line1)
    addressComponent.push(e.target.dataset.line1);
  if (typeof e.target.dataset.line2 != "undefined" && e.target.dataset.line2)
    addressComponent.push(e.target.dataset.line2);
  if (typeof e.target.dataset.city != "undefined" && e.target.dataset.city)
    addressComponent.push(e.target.dataset.city);
  if (typeof e.target.dataset.region != "undefined" && e.target.dataset.region)
    addressComponent.push(e.target.dataset.region);
  if (
    typeof e.target.dataset.postalCode != "undefined" &&
    e.target.dataset.postalCode
  )
    addressComponent.push(e.target.dataset.postalCode);
  if (
    typeof e.target.dataset.countryCode != "undefined" &&
    e.target.dataset.countryCode
  )
    addressComponent.push(regionNames?.of(e.target.dataset.countryCode));
  let address_string = addressComponent.join(", ");
  let googlePlaceId = e.googlePlaceId ? e.googlePlaceId : false;

  var origin: any = null;
  if (e.target.dataset.city) {
    origin = e.target.dataset.city;
  } else if (e.target.dataset.region) {
    origin = e.target.dataset.region;
  } else {
    origin = e.target.dataset.country;
  }
  let directionUrl =
    `https://www.google.com/maps/dir/?api=1&destination=` +
    encodeURIComponent(address_string);
  if (googlePlaceId) directionUrl += `&destination_place_id=${googlePlaceId}`;

  if (userLocation) {
    let currentLatitude = userLocation.coords.latitude;
    let currentLongitude = userLocation.coords.longitude;
    directionUrl += `&origin=${currentLatitude},${currentLongitude}`;
    window.open(directionUrl, "_blank");
  } else if (navigator.geolocation) {
    const error = (error: any) => {
      directionUrl += `&origin=` + encodeURIComponent(origin);
      window.open(directionUrl, "_blank");
    };
    navigator.geolocation.getCurrentPosition(
      function (position) {
        userLocation = position;
        let currentLatitude = position.coords.latitude;
        let currentLongitude = position.coords.longitude;
        directionUrl += `&origin=${currentLatitude},${currentLongitude}`;
        window.open(directionUrl, "_blank");
      },
      error,
      { timeout: 10000 }
    );
  } else {
    directionUrl += `&origin=` + encodeURIComponent(origin);
    window.open(directionUrl, "_blank");
  }
}




/** function is use to format phone number */
export const phoneNumberFormat = (number: any) => {

  if (typeof number != 'undefined' && number) {

    if (number.length == 8) {
      let phoneNumber = number; // current phone number format
      phoneNumber = phoneNumber.replace(/^(\d{2})(\d{2})(\d{2})(\d{2})$/, "$1 $2 $3 $4"); // desired phone number format
      return phoneNumber; // output: 62 53 85 23
    } else if (number.length == 10) {
      let phoneNumber = number; // current phone number format
      phoneNumber = phoneNumber.replace(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, "$1 $2 $3 $4 $5"); // desired phone number format



      return phoneNumber; // output: 52 62 53 85 23
    }
    else if (number.length == 12) {
      let phoneNumber = number; // current phone number format
      phoneNumber = phoneNumber.replace(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, "$1 $2 $3 $4 $5 $6"); // desired phone number format


      return phoneNumber; // output: 25 52 62 53 85 23
    }
    else if (number.length == 9) {
      let phoneNumber = number; // current phone number format
      phoneNumber = phoneNumber.replace(/^(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})$/, "$1 $2 $3 $4 $5"); // desired phone number format

      return phoneNumber; // output: 2 62 53 85 23
    }
    else if (number.length == 11) {
      let phoneNumber = number; // current phone number format
      phoneNumber = phoneNumber.replace(/^(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, "$1 $2 $3 $4 $5 $6"); // desired phone number format

      return phoneNumber; // output: 2 62 53 85 23
    }


    else if (number.length == 13) {
      let phoneNumber = number; // current phone number format
      phoneNumber = phoneNumber.replace(/^(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, "$1 $2 $3 $4 $5 $6 $7"); // desired phone number format
      return phoneNumber;
    } else if (number.length == 14) {
      let phoneNumber = number; // current phone number format
      phoneNumber = phoneNumber.replace(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, "$1 $2 $3 $4 $5 $6 $7"); // desired phone number format


      return phoneNumber;
    }
  } else {
    return "";
  }
}//endof phoneNumberFormat


/** function to seperate phone code with phone number */
export const separatePhoneNumber = (phoneNumber: any) => {
  let countryPhoneCodes = {
    "AF": "+93",
    "AL": "+355",
    "DZ": "+213",
    "AS": "+1-684",
    "AD": "+376",
    "AO": "+244",
    "AI": "+1-264",
    "AQ": "+672",
    "AG": "+1-268",
    "AR": "+54",
    "AM": "+374",
    "AW": "+297",
    "AU": "+61",
    "AT": "+43",
    "AZ": "+994",
    "BS": "+1-242",
    "BH": "+973",
    "BD": "+880",
    "BB": "+1-246",
    "BY": "+375",
    "BE": "+32",
    "BZ": "+501",
    "BJ": "+229",
    "BM": "+1-441",
    "BT": "+975",
    "BO": "+591",
    "BA": "+387",
    "BW": "+267",
    "BR": "+55",
    "IO": "+246",
    "VG": "+1-284",
    "BN": "+673",
    "BG": "+359",
    "BF": "+226",
    "BI": "+257",
    "KH": "+855",
    "CM": "+237",
    "CA": "+1",
    "CV": "+238",
    "KY": "+1-345",
    "CF": "+236",
    "TD": "+235",
    "CL": "+56",
    "CN": "+86",
    "CX": "+61",
    "CC": "+61",
    "CO": "+57",
    "KM": "+269",
    "CK": "+682",
    "CR": "+506",
    "HR": "+385",
    "CU": "+53",
    "CW": "+599",
    "CY": "+357",
    "CZ": "+420",
    "CD": "+243",
    "DK": "+45",
    "DJ": "+253",
    "DM": "+1-767",
    "DO": "+1-809 and 1-829",
    "TL": "+670",
    "EC": "+593",
    "EG": "+20",
    "SV": "+503",
    "GQ": "+240",
    "ER": "+291",
    "EE": "+372",
    "ET": "+251",
    "FK": "+500",
    "FO": "+298",
    "FJ": "+679",
    "FI": "+358",
    "FR": "+33",
    "PF": "+689",
    "GA": "+241",
    "GM": "+220",
    "GE": "+995",
    "DE": "+49",
    "GH": "+233",
    "GI": "+350",
    "GR": "+30",
    "GL": "+299",
    "GD": "+1-473",
    "GU": "+1-671",
    "GT": "+502",
    "GG": "+44-1481",
    "GN": "+224",
    "GW": "+245",
    "GY": "+592",
    "HT": "+509",
    "HN": "+504",
    "HK": "+852",
    "HU": "+36",
    "IS": "+354",
    "IN": "+91",
    "ID": "+62",
    "IR": "+98",
    "IQ": "+964",
    "IE": "+353",
    "IM": "+44-1624",
    "UK": "+44",
    "KR": "+82"

  }
  let phoneCode = '';
  let newnumber = '';

  // Remove any spaces, dashes, or parentheses from the phone number
  phoneNumber = phoneNumber.replace(/[\s\-()]/g, '');
  // Loop through the country phone codes to find the longest matching prefix
  for (const [code, prefix] of Object.entries(countryPhoneCodes)) {
    if (phoneNumber.startsWith(prefix) && prefix.length > phoneCode.length) {
      phoneCode = prefix;
    }
  }
  // If a phone code was found, extract the national number
  if (phoneCode) {
    newnumber = phoneNumber.slice(phoneCode.length);


  } else {
    // If no phone code was found, assume the entire number is the national number

    newnumber = phoneNumber;
  }
  return {
    phoneCode,
    newnumber
  };
}
/** end of get phone code with phone number */


/* Function is use to convert meter to miles */
export const convertMeterToMiles = (kilometers: any) => {
  if (typeof kilometers !== 'undefined' && kilometers) {
    const miles = kilometers / 1000;
    return miles.toFixed(2);
  } else {
    return "";
  }
}//endof convertMeterToMiles

/** function is use to generate unique id */
export const generateUniqueId = () => {
  return Math.random().toString(16).slice(2) + Date.now();
}// endof generateUniqueId


/** getUserLatLng function is use to get users lat long */
export const getUserLatLng = () => {

  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          let params: any = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          return resolve(params);
        }, function (error) {
          return reject(error)
        }
      );
    } else {
      return reject('Location not found');
    }
  })
}; //endof getUserLatLng

/** consoleLog to console  */
export const consoleLog = (...params: any) => {

}// endof consoleLog




function isJsonString(str: any) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

/** get user location details */
export const getUserLocationDetails = () => {
  return new Promise((resolve, reject) => {

    /** Check if current and valid location exists in local storage */
    const locationInfo = localStorage.getItem('__location_info');
    if (locationInfo && isJsonString(locationInfo)) {
      const locationInfojson: { loc: any, latitude: any, longitude: any } = JSON.parse(locationInfo);
      if (locationInfojson.loc && locationInfojson.latitude && locationInfojson.longitude) {
        return resolve(locationInfojson);
      }
    }
    /** Get location from ipinfo API  */
    fetch('https://ipinfo.io/json?token=6b092d192806b1')
      .then(response => response.json())
      .then((response) => {
        if (typeof response.loc != 'undefined' && response.loc) {
          const latLng = response.loc.split(',');
          response.latitude = latLng[0];
          response.longitude = latLng[1];
          localStorage.setItem('__location_info', JSON.stringify(response));
          return resolve(response);
        } else {
          return reject(response);
        }
      }).catch((error) => {
        return reject(error);
      })
  });
}//endof getUserDetails


export const getMapStyles = () => {

  return [

    {
      "featureType": "administrative",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "simplified"
        }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dadada"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#CAD2D3"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#CAD2D3"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#CAD2D3"
        }
      ]
    },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [{ visibility: "off" }],
    },
  ]
}


if (typeof window !== 'undefined' && typeof document !== 'undefined') {

  const handleSidebarLinks = (windowWidth: any) => {
    if (windowWidth < 1025) {
      // TODO: add href
      let menuElementA: any = document.querySelectorAll("li.menu-dropdown-icon.navigation-menu-parent>a");
      for (let index = 0; index < menuElementA.length; index++) {
        const element = menuElementA[index];
        if (element) {
          const hrefAttribute = element.getAttribute('href');
          if (hrefAttribute) {
            const dataHref = element.getAttribute('dataHref');
            element.setAttribute('href', 'javascript:;');
            if (!dataHref) {
              element.setAttribute('dataHref', hrefAttribute);
            }
          }
        }
      }

    } else {
      // TODO: remove href
      let menuElementA: any = document.querySelectorAll("li.menu-dropdown-icon.navigation-menu-parent>a");
      for (let index = 0; index < menuElementA.length; index++) {
        const element = menuElementA[index];
        if (element) {
          const hrefAttribute = element.getAttribute('dataHref');
          if (hrefAttribute) {
            element.setAttribute('href', hrefAttribute);
            // element.setAttribute('dataHref', 'javascript:;');
          }
        }
      }

    }
  }

  handleSidebarLinks(window.innerWidth);
  window.addEventListener('resize', function () {
    const windowWidth = window.innerWidth;
    handleSidebarLinks(windowWidth);
  }, true);
}

export const convertLanguageData = (myData: any) => {
  for (let i = 0; i < myData.length; i++) {
    let primaryLanguage =
      myData[i].primaryAndSecondaryLanguages.primaryLanguage;
    let secondaryLanguage =
      myData[i].primaryAndSecondaryLanguages.secondaryLanguage;
    primaryLanguage["is_primary"] = true;
    let myNewAr = [primaryLanguage];
    if (typeof secondaryLanguage !== "undefined") {
      myNewAr = [...myNewAr, ...secondaryLanguage];
    }
    myData[i]["languages"] = myNewAr;
    delete myData[i]["primaryAndSecondaryLanguages"];
  }
  return myData;
};

/** update language according country and also update country according to language */
export const updatelocale = (locale: any, country: any, props: any) => {
  if (props.template == "locatorSearch") {
    let path: any = props.path.split("/");
    path = path && path[1];
    path = "/" + locale + "/" + path;
    path = path + "?country=" + country;
    return (window.location.href = path);
  } else if (props.template == "continents") {
    let localesAr = ["en", "ja", "zh_Hans_CN", "de", "fr", "es", "it"];
    var url = new URL(window.location.href);
    url.searchParams.set("country", country);
    let newUrl: any = null;
    for (const locales of localesAr) {
      if (url.href.includes("/" + locales + "/")) {
        newUrl = url.href.replace("/" + locales + "/", "/" + locale + "/");
      }
    }
    if (newUrl) {
      return (window.location.href = newUrl);
    }
  } else if (props.template == "location") {
    let path: any = "";

    for (const key in props.alternateSlug) {
      if (key == locale) {
        let t = props.alternateSlug;
        if (t[key].slug) {
          path =
            "/" + locale + "/" + t[key].slug + ".html?country=" + country;
        } else {
          let slug = t[key].id + " " + t[key].name;
          slug = slugify(slug);

          path = "/" + locale + "/" + slug;
          path = path + ".html?country=" + country;
        }

        return (window.location.href = path);
      }
    }
    for (const key in props.alternateSlug) {
      if (key != locale) {
        let localesAr = ["en", "ja", "zh_Hans_CN", "de", "fr", "es", "it"];
        var url = new URL(window.location.href);
        url.searchParams.set("country", country);

        for (const locales of localesAr) {
          if (url.href.includes("/" + locales + "/")) {
            path = url.href.replace("/" + locales + "/", "/" + locale + "/");
          }
        }

        return (window.location.href = path);
      }
    }
  } else if (props.template == "city") {
    let localesAr = ["en", "ja", "zh_Hans_CN", "de", "fr", "es", "it"];
    var url = new URL(window.location.href);
    url.searchParams.set("country", country);
    let newUrl: any = null;
    for (const locales of localesAr) {
      if (url.href.includes("/" + locales + "/")) {
        newUrl = url.href.replace("/" + locales + "/", "/" + locale + "/");
      }
    }
    if (newUrl) {
      return (window.location.href = newUrl);
    }
  } else if (props.template == "country") {
    let localesAr = ["en", "ja", "zh_Hans_CN", "de", "fr", "es", "it"];
    var url = new URL(window.location.href);
    url.searchParams.set("country", country);
    let newUrl: any = null;
    for (const locales of localesAr) {
      if (url.href.includes("/" + locales + "/")) {
        newUrl = url.href.replace("/" + locales + "/", "/" + locale + "/");
      }
    }
    if (newUrl) {
      return (window.location.href = newUrl);
    }
  }
};
export const languageSelection = (element: any, props: any, country: any) => {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("country");
  if (props.template == "location") {

    let path: any = "";
    if (myParam) {
      for (const key in props.alternateSlug) {
        if (key == element.languageCode) {
          let t = props.alternateSlug;
          if (t[key].slug) {
            path =
              "/" +
              element.languageCode +
              "/" +
              t[key].slug +
              ".html?country=" +
              country;
          } else {
            let slug = t[key].id + " " + t[key].name;
            slug = slugify(slug);

            path = "/" + element.languageCode + "/" + slug;
            path = path + ".html?country=" + country;
          }
          return (window.location.href = path);
        }
      }
    } else {
      for (const key in props.alternateSlug) {
        if (key == element.languageCode) {
          let t = props.alternateSlug;
          if (t[key].slug) {
            path =
              "/" +
              element.languageCode +
              "/" +
              t[key].slug +
              ".html";
          } else {
            let slug = t[key].id + " " + t[key].name;
            slug = slugify(slug);

            path = "/" + element.languageCode + "/" + slug;
            path = path + ".html";
          }
          return (window.location.href = path);
        }
      }
    }
  } else {

    let localesAr = ["en", "ja", "zh_Hans_CN", "de", "fr", "es", "it"];
    var url = new URL(window.location.href);
    let newUrl: any = null;
    for (const locales of localesAr) {
      if (url.href.includes("/" + locales + "/")) {
        newUrl = url.href.replace(
          "/" + locales + "/",
          "/" + element.languageCode + "/"
        );
      }
    }
    if (newUrl) {
      window.location.href = newUrl;
    }
  }
};