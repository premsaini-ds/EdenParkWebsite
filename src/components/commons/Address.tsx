import * as React from "react";
const Address = (props: any) => {
  const { address } = props;
  return (
    <>
      <div className="address-content notHighlight">
        {" "}
        {address.line1 && (
          <span className="notHighlight" style={{ wordSpacing: "-1.3px" }}>
            {address.line1 + "," + " "}
          </span>
         
        )}
         <br/>
        {address.postalCode && address.city ? (
          <span className="notHighlight" style={{ wordSpacing: "-1.3px" }}>
            {address.postalCode + ","}
          </span>
        ) : <span className="notHighlight" style={{ wordSpacing: "-1.3px" }}>
          {address.postalCode}
        </span>}
        {address.city && (
          <span className="notHighlight" style={{ wordSpacing: "-1.3px" }}>
            {" "}
            {address.city}
          </span>
        )}
      </div>
    </>
  );
};

export default Address;
