import * as React from "react";

import Facets from "./Facets";

const FacetsPopup = (props: any) => {
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

  return (
    <div className="facets-popup-inner">
      <Facets
        searchOnChange={true}
        searchable={false}
        collapsible={true}
        defaultExpanded={true}
        handleStatusModal={props.handleStatusModal}
        count={props.count}
        _site={props._site}
      />
    </div>
  );
};

export default FacetsPopup;
