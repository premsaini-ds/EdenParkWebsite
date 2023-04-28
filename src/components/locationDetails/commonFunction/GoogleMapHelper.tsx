/**
 * All the functions of this file are releated to google map only
 */
// import transparent from "../../images/transparent.png";
import { Matcher, SelectableFilter } from "@yext/search-headless-react";
import transparent from "../../../images/transparent.png";
import { consoleLog } from "./index";

/** function is use to set map radius */
export const setMapRadius = (map: any, latitude: number, longitude: number, distance: number) => {

  console.log('SETRADIUS::setMapRadius', latitude, longitude, distance);

  var marker = new google.maps.Marker({
    map: map,
    position: new google.maps.LatLng(latitude, longitude),
    icon: transparent
  });
  var circle = new google.maps.Circle({
    map: map,
    radius: distance,
    fillColor: 'transparent',
    strokeColor: "transparent",
  });
  circle.bindTo('center', marker, 'position');
  let radius = circle.getRadius();
  let scale = radius / 500;
  let zoomLevel = (18 - Math.log(scale) / Math.log(2));
  map.setCenter({
    lat: latitude,
    lng: longitude
  })
  map.setZoom(Math.floor(zoomLevel));
  return true;
}//endof setMapRadius


export const getMapRadiusVisibalPart = (map: any) => {

  /** TODO: WORKING CODE FOR GETTING RADIUS 
    var bounds = map.getBounds();
    var center = bounds?.getCenter();
    var ne = bounds?.getNorthEast();
    // r = radius of the earth in statute miles
    var r = 3963.0;  
    // Convert lat or lng from decimal degrees into radians (divide by 57.2958)
    var lat1 = center.lat() / 57.2958; 
    var lon1 = center.lng() / 57.2958;
    var lat2 = ne.lat() / 57.2958;
    var lon2 = ne.lng() / 57.2958;
    const latitude = center.lat();
    const longitude = center.lng();
    // distance = circle radius from center to Northeast corner of bounds
    var dis = r * Math.acos(Math.sin(lat1) * Math.sin(lat2) +  Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1));
    consoleLog(dis, latitude, longitude);
  */


  var bounds = map.getBounds();
  // Then the points
  var swPoint = bounds.getSouthWest();
  var nePoint = bounds.getNorthEast();

  // Now, each individual coordinate
  var center = bounds?.getCenter();

  const latitude = center.lat();
  const longitude = center.lng();

  var proximitymeter = google.maps.geometry.spherical.computeDistanceBetween(swPoint, nePoint);

  const zoom = map.getZoom();

  consoleLog('zoom', zoom);


  if (proximitymeter && latitude && longitude) {
    return {
      proximitymeter,
      latitude,
      longitude
    };
  } else {
    return {
      proximitymeter: 0,
      latitude: 0,
      longitude: 0,
    };
  }
}



export const getLatLongFromSearchQuery = () => {
  return new Promise((resolve, reject) => {

    let params = (new URL(window.location.href)).searchParams;
    let address = params.get("query");
    if (address && address != '') {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK && results) {
          const latitude = results[0].geometry.location.lat();
          const longitude = results[0].geometry.location.lng();
          resolve({
            latitude: latitude,
            longitude: longitude,
            address: address
          });
        } else {
          reject('Location not found');
        }
      });
    } else {
      reject('Location not found');
    }
  });
}
