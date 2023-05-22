import * as React from "react";
import BreadCrumbs from "../components/layouts/BreadCrumbs";

import hero from "../images/hero.jpg";
import OpenCloseStatus from "../components/commons/OpenCloseStatus";
import Address from "../components/commons/Address";
import getDirectionUrl from "../components/commons/GetDirection";

import PhoneNumber from "../components/commons/PhoneNumber";

// import Header from "../components/layouts/header";
// import Footer from "../components/layouts/footer";
import { slugify, stagingBaseUrl, favicon } from "../types/constants";

import { Link } from "@yext/pages/components";
var currentUrl = "";
import "../index.css";
import {
  Template,
  GetPath,
  GetRedirects,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import { svgIcons } from "../svgIcon ";
import OpenClosedNearby from "../components/locationDetails/OpenCloseNearby";
import Header from "../components/layouts/header";
import Footer from "../components/layouts/Footer";

export const config: TemplateConfig = {
  stream: {
    $id: "city",
    filter: {
      // savedFilterIds: ["dm_wellpharmacy-directory_address_city"],
      entityTypes: ["ce_city"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      // "c_addressRegionDisplayName",
      "slug",
      "dm_directoryParents.id",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta.entityType",
      "dm_directoryChildren.name",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.dm_baseEntityCount",
      "dm_directoryChildren.address",
      "dm_directoryChildren.hours",
      "dm_directoryChildren.mainPhone",
      "dm_directoryChildren.yextDisplayCoordinate",
      "dm_directoryChildren.id",
      "dm_directoryChildren.meta.entityType",
    ],
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  var url: any = "";
  document?.dm_directoryParents?.map((i: any) => {
    if (i?.meta?.entityType?.id == "Tapestry_country") {
      url = `${i.slug}`;
    } else if (i?.meta?.entityType?.id == "Tapestry_region") {
      url = `${url}/${i?.slug}/${document?.slug?.toString()}`;
    }
  });
  return url + ".html";
};

const metersToMiles = (kilometers: number) => {
  const miles = kilometers * 0.62137119;
  return miles.toFixed(2);
};
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  let url = "";
  if (!document.slug) {
    let slugString = document.id + " " + document.name;
    let slug = slugify(slugString);
    url = `${slug}.html`;
  } else {
    url = `${document.slug.toString()}.html`;
  }

  let metaDescription = document.c_metaDescription
    ? document.c_metaDescription
    : `Get the best health services, free prescription deliveries, and consultations in ${document.name}.`;
  let metaTitle = document.c_metaTitle
    ? document.c_metaTitle
    : `Find all Tapestry Stores in ${document.name}`;
  return {
    title: metaTitle,
    charset: "UTF-8",
    viewport:
      "width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1, user-scalable=0",
    tags: [
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/png",
          href: favicon,
        },
      },

      {
        type: "meta",
        attributes: {
          name: "description",
          content: `${metaDescription}`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "author",
          content: "Well Pharma",
        },
      },
      {
        type: "meta",
        attributes: {
          name: "robots",
          content: `${
            document.c_robotsTag ? document.c_robotsTag : "noindex, nofollow"
          }`,
        },
      },

      {
        type: "link",
        attributes: {
          rel: "canonical",
          href: `${
            document.c_canonical
              ? document.c_canonical
              : stagingBaseUrl + "/" + url
          }`,
        },
      },

      //og tag
      {
        type: "meta",
        attributes: {
          property: "og:title",
          content: `${metaTitle}`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:description",
          content: `${metaDescription}`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:url",
          content: stagingBaseUrl + "/" + url,
        },
      },

      {
        type: "meta",
        attributes: {
          property: "og:image",
          content: `${
            document.logo
              ? document.logo.image.url
              : "https://a.mktgcdn.com/p/JS-wqqEJIMNa50_6p_3-320_haZmByRLBpMVMT9vXDE/115x41.png"
          }`,
        },
      },
      //twitter tag
      {
        type: "meta",
        attributes: {
          property: "twitter:title",
          content: `${metaTitle}`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:description",
          content: `${metaDescription}`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:card",
          content: "summary",
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:url",
          content: stagingBaseUrl + "/" + url,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:image",
          content: `${
            document.logo
              ? document.logo.image.url
              : "https://a.mktgcdn.com/p/JS-wqqEJIMNa50_6p_3-320_haZmByRLBpMVMT9vXDE/115x41.png"
          }`,
        },
      },
    ],
  };
};

const City: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const {
    name,
    _site,
    description,
    // c_addressRegionDisplayName,
    dm_directoryParents,
    dm_directoryChildren,
    yextDisplayCoordinate,
    // c_globalData,
  } = document;
  var address;

  let header: any = "";
  header = document?._site && document?._site?.c_headers;

  var sortedChildren = dm_directoryChildren.sort(function (a: any, b: any) {
    var a = a.name;
    var b = b.name;
    return a < b ? -1 : a > b ? 1 : 0;
  });

  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  const childrenDivs = dm_directoryChildren.map((entity: any) => {
    if (entity.meta.entityType.id == "location") {
      // let url = "";
      // if (!entity.slug) {
      //   let slugString = entity.id + " " + entity.name;
      //   let slug = slugify(slugString);
      //   url = `${slug}.html`;
      // } else {
      //   url = `${entity.slug.toString()}.html`;
      // }

      var origin: any = null;
      if (entity?.address?.city) {
        origin = entity?.address?.city;
      } else if (entity?.address?.region) {
        origin = entity?.address?.region;
      } else {
        origin = entity?.address?.country;
      }



      
      let key: any = Object.keys(entity?.hours)[0];
      let url = "";
      let countrycode = "";
      let statecode = "";
      var name: any = entity?.name?.toLowerCase();
      var string: any = name?.toString();
      let removeSpecialCharacters = string?.replace(
        /[&\/\\#^+()$~%.'":*?<>{}!@]/g,
        ""
      );
      let result: any = removeSpecialCharacters?.replaceAll(" ", "-");
      if (!entity?.slug || entity?.slug == "undefined") {
        url = `${entity?.id}-${result}`;
      } else {
        countrycode = `${entity?.address?.countryCode
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, "")}`;
        statecode = `${entity?.address?.region
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, "")}`;
        url = `${
          countrycode +
          "/" +
          statecode +
          "/" +
          document?.slug +
          "/" +
          entity?.slug.toString()
        }`;
      }

      // console.log("pksaini");
      // console.log(url);

 

      return (
        <div className="store-box">
          <div className="store-detail">
            <div className="flex justify-between items-center my-2.5 sm:my-4">
              <h2 className="">
                <a key={entity.slug} href={`${stagingBaseUrl + url}`}>
                  {entity.name}
                </a>
              </h2>
              <span className="text-green green-label">
                {entity.hours && (
                  <OpenClosedNearby
                    timeZone={entity.timezone}
                    hours={entity.hours}
                  />
                )}
              </span>
            </div>

            {entity.address && (
              <div className="store-address">
                <Address address={entity.address} />
              </div>
            )}

        {entity.hours ? (
              <div className="OpenCloseStatus icon-row mb-5">
                {/* <div className="icon">{svgIcons.openclosestatus}</div> */}
                <OpenCloseStatus
                  timezone={"Europe/London"}
                  hours={entity.hours}
                ></OpenCloseStatus>
              </div>
            ) : (
              " "
            )}

            {entity.mainPhone && (
              <>
                <div className="store-phone !mt-0">
                  <p>
                    <PhoneNumber phone={entity.mainPhone} />
                  </p>
                </div>
              </>
            )}

          

            <div className="buttons">
              {/* <div className="ctaBtn">
                <Link
                  data-ya-track="directions"
                  className="direction button before-icon"
                  onClick={() => {
                    getDirectionUrl(entity);
                  }}
                  href="javascript:void(0);"
                  rel="noopener noreferrer"
                  eventName={`getdirections"`}
                  //conversionDetails={conversionDetailsDirection}
                >
                  {svgIcons.getDirection} Map and Direction
                </Link>
              </div> */}
              <div className="ctaBtn">
                <a
                  className="button before-icon dmdetailButton"
                  href={`${stagingBaseUrl + url}`}
                >
                  {svgIcons.viewDetails}
                  View Details
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }
  });

  return (
    <>
     <Header header={header} />
      <BreadCrumbs
        name={name}
        parents={dm_directoryParents}
        stagingBaseUrl={relativePrefixToRoot}
        address={address}
      ></BreadCrumbs>

      <div className="hero">
        <img
          className="heroBanner"
          src={_site?.c_dMPagesBanner?.url ? _site?.c_dMPagesBanner?.url : hero}
          alt=""
        />
        <div className="hero-content">
          <h1 className="small-heading">
            <strong>
              {" "}
              Available Pharmacies in {name}
              {/* , {" "}
              {document?.dm_directoryParents[2]?.name
          ? document?.dm_directoryParents[2]?.name
          : " "}, {document?.dm_directoryParents[1]?.name}{" "} */}
            </strong>
          </h1>
        </div>
      </div>

      <div className="directory-country DM-state">
        <div className="container-full-width px-5 sm:!px-[3.75rem]">
          <div className="directory-stores-wrapper">
            <div className="directory-stores">
            <div className="store-inner-box">
              <div className="all-stores">
                {childrenDivs}
            </div>
            </div>
            </div>
          </div>
        </div>
      </div>

      <Footer footerData={document?._site}/>
    </>
  );
};
export default City;
