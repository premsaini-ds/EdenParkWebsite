import * as React from "react";
type Cta = {
  buttonText: string;
  address: any;
  latitude?: number;
  longitude?: number;
  label: any;
};

const GetDirection = (props: Cta) => {
  const { buttonText, label } = props;

  const getDirectionUrl = () => {
    // alert("Hello");
    var origin: any = null;
    if (props.address.city) {
      origin = props.address.city;
    } else if (props.address.region) {
      origin = props.address.region;
    } else {
      origin = props.address.country;
    }
    if (navigator.geolocation) {
      const error = (error: any) => {
        var getDirectionUrl =
          "https://www.google.com/maps/dir/?api=1&destination=" +
          props.latitude +
          "," +
          props.longitude +
          "&origin=" +
          origin;

        window.open(getDirectionUrl, "_blank");
      };
      navigator.geolocation.getCurrentPosition(
        function (position) {
          let currentLatitude = position.coords.latitude;
          let currentLongitude = position.coords.longitude;
          let getDirectionUrl =
            "https://www.google.com/maps/dir/?api=1&destination=" +
            props.latitude +
            "," +
            props.longitude +
            "&origin=" +
            currentLatitude +
            "," +
            currentLongitude;
          window.open(getDirectionUrl, "_blank");
        },
        error,
        {
          timeout: 10000,
        }
      );
    }
  };

  return (
    <>
      <button
        id="getDirection"
        onClick={getDirectionUrl}
        className="consulation button"
      // rel="noopener noreferrer"
      >
        {" "}
        {label}
      </button>
    </>
  );
};

export default GetDirection;
