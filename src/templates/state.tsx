import * as React from "react";
import BreadCrumbs from "../components/layouts/BreadCrumbs";
import hero from "../images/hero.jpg";
import Header from "../components/layouts/header";
import Footer from "../components/layouts/footer";

import { slugify, stagingBaseUrl,favicon } from "../types/constants";
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
// import PhotoGallery from "../components/commons/PhotoGallery";

var currentUrl = "";

export const config: TemplateConfig = {
  stream: {
    $id: "states",
    filter: {
      // savedFilterIds: ["dm_wellpharmacy-directory_address_region"],
      entityTypes:["ce_region"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "address",
      "name",
      "description",
      "slug",
      "dm_directoryParents.id",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta.entityType",
      
      "dm_directoryChildren.name",
      "dm_directoryChildren.id",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.dm_baseEntityCount",
      "dm_directoryChildren.meta.entityType",
     
      "dm_directoryChildren.dm_directoryChildren.name",
      "dm_directoryChildren.dm_directoryChildren.id",
      "dm_directoryChildren.dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildren.meta.entityType",

    ],
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  let url = "";
  document.dm_directoryParents?.map((i: any) => {
    if (i.meta.entityType.id == 'Tapestry_country') {
      url += i.slug + "/";
    }
  });
  url += document?.slug?.toString();

  return url + '.html';
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

  let metaDescription =  document.c_metaDescription
  ? document.c_metaDescription
  : `Get the best health services, free prescription deliveries, and consultations in ${document.name}.`;
let metaTitle = document.c_metaTitle
? document.c_metaTitle
: `Find all Tapestry  Stores in ${document.name}`;
  return {
    title: metaTitle,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1, user-scalable=0",
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
            document.c_robotsTag
              ? document.c_robotsTag
              : "noindex, nofollow"
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
          content: `${document.logo ? document.logo.image.url : "https://a.mktgcdn.com/p/JS-wqqEJIMNa50_6p_3-320_haZmByRLBpMVMT9vXDE/115x41.png"}`,
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
          content: `${document.logo ? document.logo.image.url : "https://a.mktgcdn.com/p/JS-wqqEJIMNa50_6p_3-320_haZmByRLBpMVMT9vXDE/115x41.png"}`,
        },
      },
    ],
  };
};

const State: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  document,
}) => {
  const {
    name,
    _site,
    dm_directoryParents,
    address,
    dm_directoryChildren,
    slug
  } = document;
  

  const childrenDivs = dm_directoryChildren ? dm_directoryChildren.map((entity: any) => {
    let detlslug;
    console.log("testurl",entity);
    
    if (typeof entity.dm_directoryChildren != "undefined") {

//start code of Get contry,state,city and location slue 

      let detlslug1: any = "";
      detlslug1 = document?.slug?.toString();
      let detlslug11: any = "";
      detlslug11 = detlslug1.replace(/(\b\S.+\b)(?=.*\1)/g, "").trim();

      let country = document.dm_directoryParents[1].slug;
      let state = slug;

// End code of get country state, city, location slug 


      if (entity.dm_baseEntityCount == 1) {
        entity.dm_directoryChildren.map((res: any) => {

          let detlslug1 = "";
          if (!res.slug) {
            let slugString = res.id + " " + res.name;
            let slug = slugify(slugString);
            detlslug1 = `${slug}.html`;
          } else {
            detlslug1 = `${country+"/"+state+"/"+entity.slug+"/"+res.slug.toString()}`;
          }
          detlslug = detlslug1;

        }) 
      } else {
                detlslug = country+"/"+state+"/"+entity.slug+ ".html";

                // detlslug = "gb/" + slug + "/" + entity.slug + ".html";
      }

    }

    return (
      <li className=" storelocation-category">
        <a
          key={entity.slug}
          href={stagingBaseUrl+detlslug}
        >
          {entity.name} ({entity.dm_baseEntityCount})
        </a>
      </li>
    )
  }) : null;
  

  return (
    <>
        {/* <Header
        wellLogo={_site.c_wellLogo}
        headerLinks={_site.c_headerLinks}
        findPharmacy={_site.c_findAPharmacy}
        _sitedata={_site}
      /> */}

      {dm_directoryParents ? (
            <>
              <BreadCrumbs
                name={name}
                mainparent={undefined}
                parents={dm_directoryParents}
                address={address}
                locale={document.meta.locale}
              ></BreadCrumbs>
            </>
          ) : (
            <></>
          )}

      <div className="hero">
        <img className="heroBanner" src={_site?.c_dMPagesBanner?.url ? _site?.c_dMPagesBanner?.url : hero} alt="" />
        <div className="hero-content">
          <h1 className="small-heading"><strong> Cities in {name} , {document.dm_directoryParents[1].name} {" "}</strong></h1>
        </div>
      </div>
      <div className="content-list">
        <div className="container">
          <ul className="region-list">
            {childrenDivs}
          </ul>

        </div>
      </div>
{/* 
      <Footer
       footerLogo={_site.c_footerLogo}
       footerLinks={_site.c_footerLinks}
       footerDescription={_site.c_footerDescription}
       facebookPageUrl={_site.facebookPageUrl}
       twitterHandle={_site.twitterHandle}
       instagramHandle={_site.instagramHandle}
       linkedInUrl={_site.linkedInUrl}
        copyrightText={_site.c_copyrightText}
        footerLogos={_site.c_footerLogos}
        socialicon={_site.c_socialIcons}
      /> */}

    </>
  );
};

export default State;
