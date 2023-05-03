export const limit = 50;
export const radius = 1500;
export const defaultQuery = "";
// export const api_base_url = "https://liveapi.yext.com/v2/accounts/me/";
export const api_base_url = "https://liveapi-sandbox.yext.com/v2/accounts/me";
export const api_key = "d5b5b3cac1f91f438e82247bf362f549"; // used in api of nearby location
export const liveAPIKey = "2409290e8a72547e077fc424caeb33e6";
export const googleMapsApiKey = "AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18";
export const savedFilterId = "1291446199";
export const GlobalDataId = "8302263132310090372"
export const entityTypes = "location";
export const icon =
  "https://www.Diptyque.co.uk/medias/Diptyque-logo.svg?context=bWFzdGVyfGltYWdlc3w3NzAzfGltYWdlL3N2Zyt4bWx8aW1hZ2VzL2g3ZC9oMGIvODk0OTA3OTE0NjUyNi5zdmd8YzQ4NThlNDQ2OTZmMTNlMmQwOTc4NGUzZjZjYjNhNmY2NjE3ZThmYTAyZThmNjMwYmM5YTczZWMwMzZhMTE2MQ";
export const stagingBaseUrl = "";

export const cookieText =
  "By clicking “Accept All Cookies”, you agree to the storing of cookies on your device to enhance site navigation, analyze site usage, and assist in our marketing efforts.";
export function slugify(slugString: any) {
  slugString.toLowerCase().toString();
  slugString = slugString.replace(/[&\/\\#^+()$~%.'":*?<>{}!@]/g, "");
  slugString = slugString.replaceAll("  ", "-");
  slugString = slugString.replaceAll(" ", "-");
  return slugString.toLowerCase();
}
export const AnalyticsEnableDebugging = true;
export const AnalyticsEnableTrackingCookie = true;
export const logoUrl =
  "https://www.diptyqueparis.com/fstrz/r/s/d1wwvmedxjfrrp.cloudfront.net/logo/default/logo_diptyque_2.png?frz-v=250";
export const liveWebsiteUrl = "https://www.diptyqueparis.com";
export const defaultTimeZone = "Europe/London";
export const callNearByApi = "server-side"; // use "client-side" for client side api calling
export const countrySavedFilterId =
  "dm_diptyque-asia-directory_address_countrycode";
export const citySavedFilterId = "dm_diptyque-asia-directory_address_city";
export const stateSavedFilterId = "dm_diptyque-directory_address_region";
export const rootSavedFilterId = "dm_diptyque-asia-directory";
export const robotsMetaStatus = "noindex, nofollow";
export const author = "Diptyque Paris";
export const productionUrl =
  "https://yawningly-defeated-whippet.pgsdemo.com";
export const favicon =
  "https://www.diptyqueparis.com/fstrz/r/s/d3oi16fyxsm8ns.cloudfront.net/static/version0.0.0.494/frontend/Diptyque/default/default/Magento_Theme/favicon.ico?frz-v=253";

export const livSiteUrl = "https://www.diptyqueparis.com/";
export const staticDescription = "Find the nearest diptyque boutique";
export const locatorPageUrl = "index";
export const bannerText = "Banner Text";

//for locator page
export const AnswerExperienceConfig = {
  experienceKey: "edenpark-experience",
  apiKey: "d5b5b3cac1f91f438e82247bf362f549",
  verticalKey: "locations",
  experienceVersion: "STAGING",
  sessionTrackingEnabled: true,
   limit: 8,
  locationRadius: 804672,

  endpoints: {
    universalSearch: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/query",
    verticalSearch:
      "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/query",
    questionSubmission:
      "https://liveapi-sandbox.yext.com/v2/accounts/me/createQuestion",
    universalAutocomplete:
      "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/autocomplete",
    verticalAutocomplete:
      "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/autocomplete",
    filterSearch:
      "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/filtersearch",
  },
};
// 52.5095146286 -0.1244828354

export const center_latitude = 48.86085835502766;
export const center_longitude = 2.3484044518210587;
export const googleApikey = "AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18";
export const search_icn = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 30.938 30.579"><g id="Icon_feather-search" data-name="Icon feather-search" transform="translate(-3 -3)"><path id="Path_39" data-name="Path 39" d="M24.691,14.6A10.1,10.1,0,1,1,14.6,4.5,10.1,10.1,0,0,1,24.691,14.6Z" transform="translate(0 0)" fill="none" stroke="#111111" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></path><path id="Path_40" data-name="Path 40" d="M35.066,34.707,24.975,24.975" transform="translate(-3.249 -3.249)" fill="none" stroke="#111111" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></path></g></svg>`;
export const UseMylocationsvg = `<svg
xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" >
<path
  
  d="M8.5,5.955A2.545,2.545,0,1,0,11.045,8.5,2.545,2.545,0,0,0,8.5,5.955Zm5.689,1.909A5.724,5.724,0,0,0,9.136,2.811V1.5H7.864V2.811A5.724,5.724,0,0,0,2.811,7.864H1.5V9.136H2.811a5.724,5.724,0,0,0,5.053,5.053V15.5H9.136V14.189a5.724,5.724,0,0,0,5.053-5.053H15.5V7.864ZM8.5,12.955A4.455,4.455,0,1,1,12.955,8.5,4.451,4.451,0,0,1,8.5,12.955Z"
  transform="translate(-1.5 -1.5)"
  fill="#fff"
/>
</svg>`;
export const googleMapsConfig = {
  centerLatitude:44.500000,
  centerLongitude:-89.500000,
  googleMapsApiKey: "AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18",
};
export const headerHeadingText = "Discover the NEW fragrance: L'Eau Papier..."
export const SiteUrl = "https://www.diptyqueparis.com/en_eu/"
