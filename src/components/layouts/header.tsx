import * as React from "react";
import Navbar from "./Navbar";
// import logoUpdated from "../../images/logo_diptyque.png";
// import locationMarker from "../../images/location-marker.png";
// import Info from "../../images/info.png";
// import User from "../../images/user.png";
// import Cart from "../../images/cart.png";
// import SearchIcon from "../../images/search-icon.svg";
// import UtilityIcon from "../../images/utility-icon.png";
// import searchSticky from "../../images/search-sticky.png";
// import { useEffect } from "react";
// import { slugify, headerHeadingText } from "../../types/constants";
// import { DIPTYQUEPARIS } from "../locationDetails/commonFunction";
// import { useTranslation } from "react-i18next";
// import { convertLanguageData, updatelocale, languageSelection } from "../locationDetails/commonFunction/index";
// import $ from "jquery";
type header = {
  header: any;
  // locale: any;
  // template: any;
  // path: any;
  // alternateSlug: any;
 
};



const Header = (props: header) => {

  // console.log("ihhhhhhhh",props?.header?.headerMenuLinks); 
  // const [isStickyHeader, setIsStickyHeader] = React.useState(false);
  // let [language, setlanguage] = React.useState("");
  // let [country, setCountry] = React.useState("");
  // let [isSerachActive, setSearchActive] = React.useState("disable");
  // const [languageOn, setLanguageOn] = React.useState("");
  // const [storeOn, setStoreOn] = React.useState("");
  const [scroll, setScroll] = React.useState(false);
  const [isLocator, setIsLocator] = React.useState("");
  // const [lanugagesData, setLanugagesData]: any = React.useState(null);
  // const [sigleLanguage, isCheckSingleLanguage] = React.useState("")
  // const [multipleItem, isCheckMultipleItem] = React.useState(true)
  // const { t } = useTranslation();
  // let placeholderSerach = t("Search")

  return (
    <>
      <header
        className={
                  scroll
                    ? `has-sticky ${isLocator} border-b-borderGray mb-6 mt-5`
                    : `${isLocator} border-b-borderGray mb-6 mt-5`
                }
            >
              <div className="container-full-width">
              {/* Header Icons and logo Section */}
            <div className="top-header">
             <div className="header-logo">
              {/* Site Logo */}
             
                <img
                  width="200"
                  height="200"
                  alt="logo"
                  src={
                        props?.header?.headerLogo?.url
                      }
                />
             
            </div>
            {/* <div dangerouslySetInnerHTML={{ __html: props?.header?.headerMenuLinks[0] }} /> */}
            
            <Navbar navItem={props?.header?.headerMenuLinks} path={undefined} template={undefined} alternateSlug={undefined} lastLocale={undefined} addClass={undefined}/>
                        {/* Site Logo */}
          </div>
        </div>
      </header>
      {/* Header */}
    </>
  );
};

export default Header;
