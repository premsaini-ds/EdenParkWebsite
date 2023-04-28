import * as React from "react";
import logoUpdated from "../../images/logo_diptyque.png";
import locationMarker from "../../images/location-marker.png";
import Info from "../../images/info.png";
import User from "../../images/user.png";
import Cart from "../../images/cart.png";
import SearchIcon from "../../images/search-icon.svg";
import UtilityIcon from "../../images/utility-icon.png";
import searchSticky from "../../images/search-sticky.png";
import { useEffect } from "react";
import { slugify, headerHeadingText } from "../../types/constants";
import { DIPTYQUEPARIS } from "../locationDetails/commonFunction";
import $ from "jquery";
type header = {
    header: any;
    locale: any;
    c_countryAndLanguages: any;
    template: any;
    path: any;
    alternateSlug: any;
    site: any;
};

const Header = (props: header) => {
    const [isStickyHeader, setIsStickyHeader] = React.useState(false);
    let [language, setlanguage] = React.useState("");
    let [country, setCountry] = React.useState("");
    let [isSerachActive, setSearchActive] = React.useState("disable");
    // const isSerachActive = React.useRef('disable');

    React.useEffect(() => {
        const currentFullUrl = window.location.href;
        const urlArItem = currentFullUrl.split("/");
        const pageName = urlArItem[urlArItem.length - 1];
        const isSticky = pageName == "index.html" ? false : true;
        setIsStickyHeader(isSticky);
    }, []);

    const [languageOn, setLanguageOn] = React.useState("");
    const [storeOn, setStoreOn] = React.useState("");
    const [scroll, setScroll] = React.useState(false);
    const [isLocator, setIsLocator] = React.useState("");

    React.useEffect(() => {
        if (props.template == "locatorSearch") {
            setIsLocator("border-b");
        } else {
            setIsLocator("border-0");
        }
    }, []);


    const convertLanguageData = (myData: any) => {
        // console.log("myData::convertLanguageData", myData);
        for (let i = 0; i < myData.length; i++) {
            let primaryLanguage = myData[i].primaryAndSecondaryLanguages.primaryLanguage;
            let secondaryLanguage = myData[i].primaryAndSecondaryLanguages.secondaryLanguage;
            primaryLanguage['is_primary'] = true;
            let myNewAr = [primaryLanguage];
            if (typeof secondaryLanguage !== 'undefined') {
                myNewAr = [...myNewAr, ...secondaryLanguage];
            }
            myData[i]['languages'] = myNewAr;
            delete myData[i]['primaryAndSecondaryLanguages']
        };
        return myData;
    }

    const [lanugagesData, setLanugagesData]: any = React.useState(null);
    const [defaultCountrySelected, setDefaultCountrySelected]: any = React.useState(null);
    useEffect(() => {
        // console.log("Languages", props.site.c_countryWithPrimaryAndSecondaryLanguage)
        // console.log("Countries", props.site.c_countryList);
        // setTimeout(() => {
        // let innerSubMenu: any = document.querySelectorAll(".megaNormalMenu > h2");
        // for (let index = 0; index < innerSubMenu.length; index++) {
        // const element = innerSubMenu[index];
        // element.addEventListener('click', function () {
        // element.classList.toggle('active');
        // element.nextElementSibling.classList.toggle('active');
        // });
        // }
        // // props.header
        // let menuElement = document.querySelectorAll("li.menu-dropdown-icon.navigation-menu-parent>a");
        // for (let i = 0; i < menuElement.length; i++) {
        // if (menuElement[i]) {
        // menuElement[i].addEventListener('click', function (event) {
        // // console.log(event.target.parentNode);
        // const element = event?.target?.parentNode;
        // if (element.classList.contains('open')) {
        // element.classList.remove('open');
        // } else {
        // element.classList.add('open');
        // }
        // });
        // }
        // }
        // }, 2000)
        // props.c_countryAndLanguages.map((i: any) => {
        // if (props.locale == i.languageAndLanguageCode.languageCode) {
        // setlanguage(i.languageAndLanguageCode.language)
        // setCountry(i.country)
        // }
        // })

        // const urlParams = new URLSearchParams(window.location.search);
        // const myParam = urlParams.get('country');

        const countryLanguages = convertLanguageData(props.site.c_countryWithPrimaryAndSecondaryLanguage);

        console.log("countryLanguages", countryLanguages);

        let urlParams = new URLSearchParams(window.location.search);
        let myParam = urlParams.get('country') ? urlParams.get('country') : "International";
        const selectedItem = countryLanguages.find((item: any) => { return item.counrty === myParam });
        const selectedLanguage = selectedItem.languages.find((lang: any) => { return lang.languageCode === props.locale });
        setlanguage(selectedLanguage.language);
        setDefaultCountrySelected(selectedItem);
        setLanugagesData(countryLanguages);



        // if (myParam) {
        //   console.log(myParam, 'myParam')
        //   if (props.site.c_countryWithPrimaryAndSecondaryLanguage) {
        //     console.log(props.site.c_countryWithPrimaryAndSecondaryLanguage, 'props.site.c_countryWithPrimaryAndSecondaryLanguage')
        //     props.site.c_countryWithPrimaryAndSecondaryLanguage.map((i: any) => {
        //       console.log(i, i.country, myParam, "hhhh")
        //       if (
        //         i.counrty ==
        //         myParam
        //       ) {
        //         console.log(i.counrty, "fjfjjfjskdjfksjfkdsfks")
        //         setCountry(i.counrty);
        //         setlanguage(i.primaryAndSecondaryLanguages.primaryLanguage.language);
        //       }
        //     });
        //   }
        // } else {
        //   setCountry("International");
        //   setlanguage("English");
        // }



        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 150);
        });
    }, []);

    const handleLanguageSwitcherClick = () => {
        if (languageOn == "") {
            setLanguageOn("active");
            setStoreOn("");
        } else {
            setLanguageOn("");
        }
    };

    const handleStoreSwitcherClick = () => {
        if (storeOn == "") {
            setStoreOn("active");
            setLanguageOn("");
        } else {
            setStoreOn("");
        }
    };

    const handleMenuOpenClick = () => {
        document.body.classList.add("nav-opened");
    };

    const handleMenuCloseClick = () => {
        document.body.classList.remove("nav-opened");
    };

    // const updateUrl = (e: any) => {
    //   props?.site?.c_countryWithPrimaryAndSecondaryLanguage &&
    //     props?.site?.c_countryWithPrimaryAndSecondaryLanguage.map((i: any) => {
    //       if (i.counrty == e) {
    //         var country = i.counrty
    //         if (i.primaryAndSecondaryLanguages.primaryLanguage) {
    //           let locale = slugify(i.primaryAndSecondaryLanguages.primaryLanguage.languageCode)
    //           updatelocale(
    //             locale, country
    //           );
    //         }
    //       }
    //     });

    //   // if (e.languageAndLanguageCode.languageCode == props.locale) {
    //   // } else {
    //   // updatelocale(e.languageAndLanguageCode.languageCode)
    //   // }
    // };

    const generateNewUrl = (languageData: any, newLocale: any) => {
        const country = languageData.counrty;
        let primaryLanguage = languageData.languages.find((lang: any) => { return lang.is_primary });

        let localesAr = ['en', 'ja', 'zh_Hans_CN', 'de', 'fr', 'es', 'it']
        var url = new URL(window.location.href);
        url.searchParams.set('country', country);
        let newUrl: any = null;
        for (const locales of localesAr) {
            if (url.href.includes("/" + locales + "/")) {
                newUrl = url.href.replace('/' + locales + '/', "/" + primaryLanguage.languageCode + "/");
            }
        }
        return newUrl;
    }

    /** update language according country and also update country according to language */
    const updatelocale = (locale: any, country: any) => {

        let localesAr = ['en', 'ja', 'zh_Hans_CN', 'de', 'fr', 'es', 'it']
        var url = new URL(window.location.href);
        url.searchParams.set('country', country);
        // console.log('url', url);

        var newUrl = "";
        for (const locales of localesAr) {
            if (url.href.includes("/" + locales + "/")) {
                newUrl = url.href.replace('/' + locales + '/', "/" + locale + "/");
            }
        }
        if (newUrl) {
            // console.log(newUrl, "newUrl")
            window.location.href = newUrl;
        }
    };

    const searchRedirect = (e: any) => {
        if (e.target.value) {
            if (e.keyCode === 13) {
                if (window) {
                    window.location.href =
                        props.site.c_searchBar.searchBarUrl +
                        "catalogsearch/result/index?q=" +
                        e.target.value;
                }
            }
        }
    };

    const searchRedirectButton = (value: any) => {
        if (window) {
            window.location.href =
                props.site.c_searchBar.searchBarUrl +
                "catalogsearch/result/index?q=" +
                value;
        }
    };

    const countrySelection = (element: any) => {
        const newUrl = generateNewUrl(element, null);
        window.location.href = newUrl;
    }

    const languageSelection = (element: any) => {
        let localesAr = ['en', 'ja', 'zh_Hans_CN', 'de', 'fr', 'es', 'it']
        var url = new URL(window.location.href);
        let newUrl: any = null;
        for (const locales of localesAr) {
            if (url.href.includes("/" + locales + "/")) {
                newUrl = url.href.replace('/' + locales + '/', "/" + element.languageCode + "/");
            }
        }
        if (newUrl) {
            window.location.href = newUrl;
        }
    }

    return (
        <>
            <header
                className={
                    scroll
                        ? `has-sticky ${isLocator} border-b-borderGray`
                        : `${isLocator} border-b-borderGray`
                }
            >
                {/* Header */}
                <div className="header-detail-bar hidden lg:block">
                    {" "}
                    {/* Top Detail Bar Only shows in large screens */}
                    <a
                        href={
                            props.site?.c_topPromotionBar?.uRL
                                ? props.site?.c_topPromotionBar?.uRL
                                : "#"
                        }
                    >
                        {props.site?.c_topPromotionBar?.text
                            ? props.site?.c_topPromotionBar?.text
                            : headerHeadingText}
                    </a>
                </div>{" "}
                {/* Top Detail Bar Only shows in large screens */}
                <div className="container-full-width">
                    {/* Header Icons and logo Section */}
                    <div className="top-header">
                        <div className="left-section">
                            {/* Language switcher and location section */}
                            <div className="left-section-links">
                                <ul>
                                    <li>
                                        <div className="switcher language-switcher">
                                            <div className="switcher-options">
                                                <div
                                                    className={`${languageOn} action toggle switcher-trigger`}
                                                    onClick={handleLanguageSwitcherClick}
                                                >
                                                    <span>
                                                        {defaultCountrySelected && language ? language : "Loading..."}
                                                    </span>
                                                </div>

                                                <ul className={`${languageOn} switcher-dropdown language-dropdown`}>
                                                    {
                                                        defaultCountrySelected && defaultCountrySelected.languages ?
                                                            defaultCountrySelected.languages.map((element: any) => {

                                                                return (
                                                                    props.locale === element.languageCode ? <></> :
                                                                        <li>
                                                                            <a
                                                                                href="javascript:void(0)"
                                                                                onClick={() => languageSelection(element)}
                                                                            >
                                                                                {element.language}
                                                                            </a>
                                                                        </li>)
                                                            })
                                                            : <></>
                                                    }
                                                </ul>


                                                {/* <ul
                          className={`${languageOn} switcher-dropdown language-dropdown`}
                        >
                          {props?.site
                            ?.c_countryWithPrimaryAndSecondaryLanguage &&
                            props?.site?.c_countryWithPrimaryAndSecondaryLanguage.map(
                              (i: any) => {
                                if (i.counrty == country) {
                                  if (
                                    i.primaryAndSecondaryLanguages
                                      .secondaryLanguage != undefined
                                  ) {
                                    return (
                                      <>
                                        {i.primaryAndSecondaryLanguages.secondaryLanguage.map(
                                          (j: any) => {
                                            return (
                                              <li>
                                                <a
                                                  href="javascript:void(0)"
                                                  onClick={() => updateUrl(j)}
                                                >
                                                  {j.language}
                                                </a>
                                              </li>
                                            );
                                          }
                                        )}
                                      </>
                                    );
                                  }
                                }
                              }
                            )}
                        </ul> */}

                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="switcher store-switcher">
                                            <div className="switcher-options">
                                                <div
                                                    className={`${storeOn} action toggle switcher-trigger`}
                                                    onClick={handleStoreSwitcherClick}
                                                >
                                                    <span>Ship to:</span>
                                                    <span>{defaultCountrySelected ? defaultCountrySelected.counrty : "Loading..."}</span>
                                                </div>

                                                <ul className={`${storeOn} switcher-dropdown language-dropdown`}>
                                                    {lanugagesData ? lanugagesData.map((e: any) => {
                                                        return (
                                                            defaultCountrySelected.counrty === e.counrty ? <></> :
                                                                <li>
                                                                    <a
                                                                        href="javascript:void(0)"
                                                                        onClick={() => countrySelection(e)}
                                                                    >
                                                                        {e.counrty}
                                                                    </a>
                                                                </li>)

                                                    }) : <></>}
                                                </ul>

                                                {/* <ul
                          className={`${storeOn} switcher-dropdown store-dropdown`}
                        >
                          {props?.site?.c_countryList &&
                            props?.site?.c_countryList.map((i: any) => {
                              if (i != country) {
                                return (
                                  <li>
                                    <a
                                      href="javascript:void(0)"
                                      onClick={() => updateUrl(i)}
                                    >
                                      {i}
                                    </a>
                                  </li>
                                );
                              }
                            })}
                        </ul> */}

                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="current-location">
                                            <a
                                                href={
                                                    props.site?.c_storeFinderIcon?.storeFinderUrl
                                                        ? props.site?.c_storeFinderIcon?.storeFinderUrl
                                                        : "#"
                                                }
                                            >
                                                <img
                                                    width="12"
                                                    height="17"
                                                    alt="Location marker for select user current location"
                                                    src={
                                                        props.site?.c_storeFinderIcon?.storeFinderIcon
                                                            ?.image.url
                                                            ? props.site?.c_storeFinderIcon?.storeFinderIcon
                                                                ?.image.url
                                                            : locationMarker
                                                    }
                                                />
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            {/* Language switcher and location section */}
                        </div>
                        {/* Menu open / close Button */}
                        <button
                            type="button"
                            data-action="toggle-nav"
                            className="action nav-toggle js-toggle-nav js-no-close"
                        >
                            <span className="menu-open" onClick={handleMenuOpenClick}></span>
                            <span className="menu-close-text" onClick={handleMenuCloseClick}>
                                Close
                            </span>
                        </button>
                        {/* Menu open / close Button */}
                        <div className="header-logo">
                            {/* Site Logo */}
                            <a
                                href={
                                    props.site?.c_headerLogo?.clickthroughUrl
                                        ? props.site?.c_headerLogo?.clickthroughUrl
                                        : "#"
                                }
                            >
                                <img
                                    width="60"
                                    height="60"
                                    alt="Diptyque logo"
                                    src={
                                        props.site?.c_headerLogo?.image.url
                                            ? props.site?.c_headerLogo?.image.url
                                            : logoUpdated
                                    }
                                />
                            </a>
                        </div>
                        {/* Site Logo */}
                        <div className="right-section">
                            <div className="top-bar-icons">
                                <div className="info-icon-top">
                                    <a href="#">
                                        <img
                                            width="22"
                                            height="22"
                                            alt="Info Icon"
                                            src={
                                                props.site?.c_helpIcon?.c_helpIcon?.image.url
                                                    ? props.site?.c_helpIcon?.c_helpIcon?.image.url
                                                    : Info
                                            }
                                        />
                                    </a>
                                </div>
                                <div className="user-icon-top">
                                    <a href="#">
                                        <img
                                            width="22"
                                            height="22"
                                            alt="User Icon"
                                            src={
                                                props.site?.c_accounticon?.accountImage.image.url
                                                    ? props.site?.c_accounticon?.accountImage?.image.url
                                                    : User
                                            }
                                        />
                                    </a>
                                </div>
                                <div className="cart-icon-top">
                                    <a
                                        href={
                                            props.site?.c_cartIcon?.cartUrl
                                                ? props.site?.c_cartIcon?.cartUrl
                                                : "#"
                                        }
                                    >
                                        <img
                                            width="18"
                                            height="20"
                                            alt="Cart Icon"
                                            src={
                                                props.site?.c_cartIcon?.cartImage?.image.url
                                                    ? props.site?.c_cartIcon?.cartImage?.image.url
                                                    : Cart
                                            }
                                        />
                                    </a>
                                </div>

                                <div className="sticky-search hidden">
                                    <img
                                        width="30"
                                        height="26"
                                        alt="Search Icon"
                                        src={searchSticky}
                                    />
                                </div>
                            </div>
                            <div className="search-block hidden lg:block">
                                {/* Search Bar Hides on mobile */}
                                <div className="form-group">
                                    <input
                                        type="text"
                                        id="myInput"
                                        placeholder="Search"
                                        onKeyDown={searchRedirect}
                                        onChange={(e) => {
                                            if (e.target.value.length > 0) {
                                                setSearchActive("");
                                            } else {
                                                setSearchActive("disable");
                                            }
                                        }}
                                    />
                                    <div
                                        className={`search-icon-top ${isSerachActive}`}
                                        onClick={() => {
                                            let value = $("#myInput").val();
                                            if (value.length > 0) {
                                                searchRedirectButton(value);
                                            }
                                        }}
                                    >
                                        <img
                                            width="16"
                                            height="16"
                                            alt="search icon for input box"
                                            src={SearchIcon}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Search Bar Hides on mobile */}
                        </div>
                    </div>
                    <div className="search-block flex justify-between gap-3 lg:hidden mb-5 mt-2.5">
                        {/* Search Bar Only appears on mobile */}
                        <div className="form-group w-full xs:w-[85%] mx-auto">
                            <input
                                type="text"
                                id="myInput2"
                                placeholder="Search"
                                onKeyDown={searchRedirect}
                                onChange={(e) => {
                                    if (e.target.value.length > 0) {
                                        setSearchActive("");
                                    } else {
                                        setSearchActive("disable");
                                    }
                                }}
                            />
                            {/* <div className="search-icon-top">
<img src={SearchIcon} />
</div> */}
                            <div
                                className={`search-icon-top ${isSerachActive}`}
                                onClick={() => {
                                    let value = $("#myInput2").val();
                                    if (value.length > 0) {
                                        searchRedirectButton(value);
                                    }
                                }}
                            >
                                <img
                                    width="16"
                                    height="16"
                                    alt="search icon for input box"
                                    src={SearchIcon}
                                />
                            </div>
                        </div>
                    </div>
                    {/* Search Bar Only appears on mobile */}
                </div>
                {/* Header Icons and logo Section */}
                <div className="container-full-width nav-wrapper">
                    {/* Crawled Header From Live Site */}
                    <div className="sections nav-sections">
                        <div dangerouslySetInnerHTML={{ __html: props.header }} />
                        {/* Language switcher and location section */}
                        <div className="left-section-links flex lg:hidden">
                            <ul>
                                <li>
                                    <div className="switcher language-switcher">
                                        <div className="switcher-options">
                                            <div
                                                className={`${languageOn} action toggle switcher-trigger`}
                                                onClick={handleLanguageSwitcherClick}
                                            >
                                                <span>{language}</span>
                                            </div>
                                            <ul
                                                className={`${languageOn} switcher-dropdown language-dropdown`}
                                            >
                                                {/* {props.c_countryAndLanguages &&
props.c_countryAndLanguages.map((i: any) => {
return (
<li>
<a
href="javascript:void(0)"
onClick={() => updateUrl(i)}
>
{i.languageAndLanguageCode.language}
</a>
</li>
);
})} */}
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="switcher store-switcher">
                                        <div className="switcher-options">
                                            <strong>
                                                <span>Ship to:</span>
                                            </strong>
                                            <div
                                                className={`${storeOn} action toggle switcher-trigger`}
                                                onClick={handleStoreSwitcherClick}
                                            >
                                                <span>{country}</span>
                                            </div>
                                            <ul
                                                className={`${storeOn} switcher-dropdown store-dropdown`}
                                            >
                                                {/* {props.c_countryAndLanguages &&
props.c_countryAndLanguages.map((i: any) => {
return (
<li>
<a
href="javascript:void(0)"
onClick={() => updateUrl(i)}
>
{i.country}
</a>
</li>
);
})} */}
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="current-location">
                                        <a
                                            href={
                                                props.site?.c_storeFinderIcon?.storeFinderUrl
                                                    ? props.site?.c_storeFinderIcon?.storeFinderUrl
                                                    : "#"
                                            }
                                        >
                                            <img
                                                width="12"
                                                height="17"
                                                alt="Location marker for select user current location"
                                                src={
                                                    props.site?.c_storeFinderIcon?.storeFinderIcon?.image
                                                        .url
                                                        ? props.site?.c_storeFinderIcon?.storeFinderIcon
                                                            ?.image.url
                                                        : locationMarker
                                                }
                                            />
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        {/* Language switcher and location section */}
                    </div>
                </div>
                {/* Crawled Header From Live Site */}
                <div className="header-detail-bar block lg:hidden">
                    {" "}
                    {/* Top Detail Bar Only shows in Mobile */}
                    <a href="javascript:void(0)">
                        Discover the NEW fragrance: L'Eau Papier...
                    </a>
                </div>{" "}
                {/* Top Detail Bar Only shows in Mobile */}
            </header>
            {/* Header */}
        </>
    );
};

export default Header;
