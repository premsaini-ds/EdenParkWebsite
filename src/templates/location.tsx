import * as React from "react";
import BreadCrumbs from "../components/layouts/BreadCrumbs";
import LocationInformation from "../components/locationDetails/LocationInformation";
import NearByLocation from "../components/locationDetails/NearByLocation";
import { nearByLocation } from "../types/nearByLocation";
import { JsonLd } from "react-schemaorg";
import Footer from "../components/layouts/Footer";
import Header from "../components/layouts/header";
import Arrow from "../components/locationDetails/Arrow";
// import "../main.css";
import "../index.css";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
} from "@yext/pages/components";
import {
  Template,
  GetPath,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  TransformProps,
  HeadConfig,
} from "@yext/pages";
import {
  slugify,
  AnalyticsEnableDebugging,
  AnalyticsEnableTrackingCookie,
  robotsMetaStatus,
  author,
  logoUrl,
  productionUrl,
  favicon,
  staticDescription,
  radius,
  api_base_url,
  bannerText,
  api_key,
  savedFilterId,
  entityTypes,
  limit,
  AnswerExperienceConfig,
} from "../types/constants";
import WelcomSection from "../components/locationDetails/WelcomSection";
import FrenchFlair from "../components/locationDetails/FrenchFlair";
import Faq from "../components/locationDetails/faq";
// import { useTranslation } from "react-i18next";
// import { withTranslation } from "react-i18next";
// import "../i18n";
// import AboutSection from "../components/locationDetails/AboutSection";
// import PhotoSlider from "../components/locationDetails/PhotoSlider";
export const config: TemplateConfig = {
  stream: {
    $id: "locations",
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "mainPhone",
      "yextDisplayCoordinate",
      "neighborhood",
      "photoGallery.description",
      "photoGallery.image",
      "description",
      "hours",
      "deliveryHours",
       "slug",
      "geocodedCoordinate",
      "additionalHoursText",
      "c_headerBanner",
      "c_headerBannerHeading",
      "c_welcomeSection",
      "c_frenchFlairDetails",
      "c_frenchSectionTitle",
      "c_relatedFAQs.question",
      "c_relatedFAQs.answer",
      // "dm_directoryParents.name",
      // "dm_directoryParents.slug",
      // "dm_directoryParents.meta.entityType",
      // "c_enCeMomentSection",
      // "c_aboutSection",
      // "c_productHeading",
      // "c_productName",
      // "c_serviceHeading",
      // "c_allServices",
      // "c_languagesHeading",
      // "c_languages_name",
      // "c_aboutAddress",
      // "c_candleOfTheMonth",
      // "c_nearByLocationHeading",
      // "c_nearByLocationCTAText",
      // "c_getDirectionCTA",
      // "c_makeAnAppointmentCta",
      // "c_storesType",
      // "c_topSliderImages",
    ],

    filter: {
      entityTypes: [entityTypes]
      // savedFilterIds: [savedFilterId],
    },

    localization: {
      locales: ["en"],
      primary: false,
    },
  },
  // alternateLanguageFields: ["slug", "name", "id"],
};

var url = ""; /** current detail page url */

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  // if (!document.slug) {
  //   let slugString = document.id + " " + document.name;
  //   slugString = slugify(slugString);

  //   url = `${document.meta.locale}/${slugString}.html`;
  // } else {
  //   url = `${document.meta.locale}/${document?.slug?.toString()}.html`;
  // }

  return document.id;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
  path,
}): HeadConfig => {
  let metaDescription = document.c_metaDescription
    ? document.c_metaDescription
    : staticDescription;
  let metaTitle = document.c_metaTitle ? document.c_metaTitle : author;
  let canonical = document.c_canonicalURL
    ? document.c_canonicalURL
    : productionUrl + "/" + path;
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    tags: [
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
          href: favicon,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "description",
          content: metaDescription,
        },
      },

      {
        type: "meta",
        attributes: {
          name: "author",
          content: author,
        },
      },

      {
        type: "meta",
        attributes: {
          name: "robots",
          content: robotsMetaStatus,
        },
      },

      {
        type: "link",
        attributes: {
          rel: "canonical",
          href: canonical,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:url",
          content: `${productionUrl}/${path}`,
        },
      },

      {
        type: "meta",
        attributes: {
          property: "og:description",
          content: metaDescription,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:title",
          content: metaTitle,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:image",
          content: logoUrl,
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
          content: `${productionUrl}/${path}`,
        },
      },

      {
        type: "meta",
        attributes: {
          name: "twitter:description",
          content: metaDescription,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:image",
          content: logoUrl,
        },
      },
    ],
  };
}; 

/**
call server side api
 */


type ExternalApiData = TemplateProps & {
  externalApiData: nearByLocation;   
};
export const transformProps: TransformProps<ExternalApiData> = async (
  data: any
) => {
  const url = `${AnswerExperienceConfig.endpoints.verticalSearch}?experienceKey=${AnswerExperienceConfig.experienceKey}&api_key=${AnswerExperienceConfig.apiKey}&v=20220511&version=${AnswerExperienceConfig.experienceVersion}&locale=${data.document.meta.locale}&location=${data.document.yextDisplayCoordinate.latitude},${data.document.yextDisplayCoordinate.longitude}&verticalKey=${AnswerExperienceConfig.verticalKey}&limit=4&retrieveFacets=true&skipSpellCheck=false&session_id=12727528-aa0b-4558-9d58-12a815eb3761&sessionTrackingEnabled=true&source=STANDARD`;
  const externalApiData = (await fetch(url).then((res: any) =>
    res.json()
  )) as nearByLocation;
  return { ...data, externalApiData };
};


 type ExternalApiRenderData = TemplateRenderProps & {
  externalApiData: '';
};
const Location: Template<ExternalApiRenderData> = ({
  externalApiData,
  path,
  document,
  __meta,
}) => {
  const {
    _site,
    id,
    name,
    hours,
    address,
    mainPhone,
    yextDisplayCoordinate,
    dm_directoryParents,
    deliveryHours,
    additionalHoursText,
    googlePlaceId,
    c_headerBanner,
    c_headerBannerHeading,
    c_welcomeSection,
    c_frenchFlairDetails,
    c_frenchSectionTitle,
    c_relatedFAQs,
    // c_allServices,
    // c_serviceHeading,
    // c_productHeading,
    // c_productName,
    // c_aboutAddress,
    // c_candleOfTheMonth,
    // c_languagesHeading,
    // c_languages_name,
    // c_enCeMomentSection,
    // c_aboutSection,
    // c_getDirectionCTA,
    // c_makeAnAppointmentCta,
    // c_storesType,
  } = document;

  // let templateData = { document: document, __meta: __meta };
  /**  created instance for i18*/
  // const { t, i18n } = useTranslation();
  // i18n.changeLanguage(`${document.meta.locale}`);
  // let header: any = "";
  // let footer: any = "";
  // let c_footerpageslinks: any = "";
  // let c_footerfollow: any = "";
  // let c_newsletter: any = "";
  // let c_footerlinkssecondary: any = "";
  // let c_footercontact: any = "";
  // let c_footerschedule: any = "";
  // let c_popupbrowsercompat: any = "";

  // header = document._site && document._site.c_header;
  // footer = document._site && document._site.c_footer;
  // c_footerpageslinks = document._site && document._site.c_footerpageslinks;
  // c_footerfollow = document._site && document._site.c_footerfollow;
  // c_newsletter = document._site && document._site.c_newsletter;
  // c_footerlinkssecondary =
  //   document._site && document._site.c_footerlinkssecondary;
  // c_footercontact = document._site && document._site.c_footercontact;
  // c_footerschedule = document._site && document._site.c_footerschedule;
  // c_popupbrowsercompat = document._site && document._site.c_popupbrowsercompat;

  /** breadcrumbschema */
  // let breadcrumbScheme: any = [];
  // document.dm_directoryParents &&
    // document.dm_directoryParents.map((i: any, index: any) => {
    //   if (i.meta.entityType.id == "diptyque_country") {
    //     document.dm_directoryParents[index].name =
    //       document.dm_directoryParents[index].name;
    //     document.dm_directoryParents[index].slug =
    //       document.dm_directoryParents[index].slug;

    //     breadcrumbScheme.push({
    //       "@type": "ListItem",
    //       position: index,
    //       item: {
    //         "@id":
    //           productionUrl +
    //           "/" +
    //           document.meta.locale +
    //           "/" +
    //           document.dm_directoryParents[index].slug +
    //           ".html",
    //         name: i.name,
    //       },
    //     });
    //   } else if (i.meta.entityType.id == "diptyque_region") {
    //     let url = "";
    //     document.dm_directoryParents.map((j: any) => {
    //       if (
    //         j.meta.entityType.id != "diptyque_region" &&
    //         j.meta.entityType.id != "diptyque_city" &&
    //         j.meta.entityType.id != "diptyque_root"
    //       ) {
    //         url = url + "/" + j.slug;
    //       }
    //     });
    //     breadcrumbScheme.push({
    //       "@type": "ListItem",
    //       position: index,
    //       item: {
    //         "@id":
    //           productionUrl +
    //           "/" +
    //           document.meta.locale +
    //           url +
    //           "/" +
    //           document.dm_directoryParents[index].slug +
    //           ".html",
    //         name: i.name,
    //       },
    //     });
    //   } else if (i.meta.entityType.id == "diptyque_city") {
    //     let url = "";
    //     document.dm_directoryParents.map((j: any) => {
    //       if (
    //         j.meta.entityType.id != "diptyque_city" &&
    //         j.meta.entityType.id != "diptyque_root"
    //       ) {
    //         url = url + "/" + j.slug;
    //       }
    //     });
    //     breadcrumbScheme.push({
    //       "@type": "ListItem",
    //       position: index,
    //       item: {
    //         "@id":
    //           productionUrl +
    //           "/" +
    //           document.meta.locale +
    //           url +
    //           "/" +
    //           document.dm_directoryParents[index].slug +
    //           ".html",
    //         name: i.name,
    //       },
    //     });
    //   }
    // });

  // breadcrumbScheme.push({
    // "@type": "ListItem",
    // position: 4,
    // item: {
    //   "@id": productionUrl + "/" + path,
    //   name: document.name,
    // },
  // });

  /** hoursschema*/
  // let hoursSchema = [];
  // if (hours) {
  //   for (var key in hours) {
  //     if (hours.hasOwnProperty(key)) {
  //       let openIntervalsSchema: any = "";
  //       if (key !== "holidayHours") {
  //         if (hours[key].isClosed) {
  //           openIntervalsSchema = {
  //             "@type": "OpeningHoursSpecification",
  //             dayOfWeek: key,
  //           };
  //         } else {
  //           let end = "";
  //           let start = "";
  //           if (typeof hours[key].openIntervals != "undefined") {
  //             let openIntervals = hours[key].openIntervals;
  //             for (var o in openIntervals) {
  //               if (openIntervals.hasOwnProperty(o)) {
  //                 end = openIntervals[o].end;
  //                 start = openIntervals[o].start;
  //               }
  //             }
  //           }
  //           openIntervalsSchema = {
  //             "@type": "OpeningHoursSpecification",
  //             closes: end,
  //             dayOfWeek: key,
  //             opens: start,
  //           };
  //         }
  //       } else {
  //       }

  //       hoursSchema.push(openIntervalsSchema);
  //     }
  //   }
  // }

  let header: any = "";
  header = document?._site && document?._site?.c_headers;

  return (
    <>
   
      {/* <JsonLd<BreadcrumbList>
        item={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbScheme,
        }}
      /> */}

      {/* {address && hours && (
        <>
          <JsonLd<Location>
            item={{
              "@context": "https://schema.org",
              "@type": "Store",
              name: name,
              address: {
                "@type": "PostalAddress",
                streetAddress: address.line1,
                addressLocality: address.city,
                addressRegion: address.region,
                postalCode: address.postalCode,
                addressCountry: address.countryCode,
              },
              openingHoursSpecification: hoursSchema,
            }}
          />
        </>
      )} */}
      {/* <JsonLd<locator>
        item={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: author,
          url: `${productionUrl}/${path}`,
          logo: logoUrl,
          sameAs: [
            "https:https://www.facebook.com/diptyque/?ref=ts",
            "https://www.diptyqueparis.com/en_us/",
            "https://www.instagram.com/diptyque/",
          ],
        }}
      /> */}

      {/* <AnalyticsProvider
        templateData={templateData}
        enableDebugging={AnalyticsEnableDebugging}
        enableTrackingCookie={AnalyticsEnableTrackingCookie}
      > */}
       
        {/* <AnalyticsScopeProvider name={""}> */}
        <Header header={header} />
{/* 
          {dm_directoryParents && (
            <>
              <BreadCrumbs
                name={name}
                mainparent={_site.c_relatedContinent}
                parents={dm_directoryParents}
                address={address}
                locale={document.meta.locale}
              ></BreadCrumbs>
            </>
          )} */}


          {/* <PhotoSlider photos={document.c_topSliderImages ? document.c_topSliderImages : {}} /> */}
          
          <div className="w-full">
            <div className="text-center locatorHeading">
             <div className="BannerImage">
                 <img src={c_headerBanner.url} alt="image not found" />
              </div>
              <div className="bannerContent">
                  <h3 className="sec_heading"> {name} </h3>
                  <p>{c_headerBannerHeading}</p>
              </div>
            </div>
          </div>

       <LocationInformation
        prop={hours ? hours : {}}
        deliveryHours={deliveryHours ? deliveryHours : {}}
        coords={yextDisplayCoordinate ? yextDisplayCoordinate : {}}
        address={address}
        phone={mainPhone ? mainPhone : ""}
        timezone={document.timezone}
        name={name}
        googlePlaceId={googlePlaceId}
        path={path}
        locale={document.meta.locale}
        additionalHoursText={additionalHoursText ? additionalHoursText : ""}
        // allservices={c_allServices ? c_allServices : []}
        // serviceheading={c_serviceHeading ? c_serviceHeading : ""}
        // storeheading={c_productHeading ? c_productHeading : ""}
        // storeProductType={c_productName ? c_productName : []}
        // spokenLanguages={c_languages_name ? c_languages_name : []}
        // spokenlanguageTitle={c_languagesHeading ? c_languagesHeading : ""}
        // extratext={c_enCeMomentSection ? c_enCeMomentSection : {}}
        // aboutSection={c_aboutSection ? c_aboutSection : {}}
        // id={id}
        // getDirectionCTA={c_getDirectionCTA ? c_getDirectionCTA : ""}
        // makeAnAppointmentCta={
        //   c_makeAnAppointmentCta ? c_makeAnAppointmentCta : {}
        // }
        // storesType={c_storesType ? c_storesType : ""}
        _site={document?._site} allservices={undefined} serviceheading={undefined} storeheading={undefined} storeProductType={undefined} spokenLanguages={undefined} spokenlanguageTitle={undefined} extratext={undefined} aboutSection={undefined} id={undefined} getDirectionCTA={undefined} makeAnAppointmentCta={undefined} storesType={undefined}          />
         {/* {(c_candleOfTheMonth || c_aboutAddress) && <>
            <AboutSection
              informationsectionPart1={c_candleOfTheMonth}
              informationsectionPart2={c_aboutAddress}
            />
          </>

          }
*/}

     {/* Start Welcome Section component*/}
      <WelcomSection WelcomeSecData={c_welcomeSection} />
    {/* End Welcome Section component*/}

    {/* Start French Section component*/}
      <FrenchFlair frenchFlairDetails={c_frenchFlairDetails} FrenchSectionTitle={c_frenchSectionTitle} />
    {/* End French Section component*/}

       {c_relatedFAQs ? (
          <div className="FaqsSection">
            <Faq
              prop={c_relatedFAQs}
              faq_title={'Frequently Asked Questions'}
            />
          </div>
        ) : (
          <></>
        )}


          {externalApiData && (
            <NearByLocation
              prop={externalApiData}
              coords={yextDisplayCoordinate}
              slug={
                !document.slug
                  ? slugify(document.id + " " + document.name)
                  : document.slug
              }
              c_nearByLocationCTAText={document.c_nearByLocationCTAText}
              c_nearByLocationHeading={document.c_nearByLocationHeading}
              locale={document.meta.locale}
            />
          )}

            {/*<div className="block md:hidden lower-breadcrumb mb-8">
            {dm_directoryParents && (
              <>
                <BreadCrumbs
                  name={name}
                  mainparent={_site.c_relatedContinent}
                  parents={dm_directoryParents}
                  address={address}
                  locale={document.meta.locale}
                ></BreadCrumbs>
              </>
            )}
            </div>*/}
          <Footer footerData={document?._site}/>

          {/* Scroll to top button */}
          <Arrow />
          {/* <div className="page-up on">
            <a className="link-to-top" href="#">
              <span>To top</span>
            </a>
          </div> */}
          {/* Scroll to top button */}
        {/* </AnalyticsScopeProvider> */}
      {/* </AnalyticsProvider> */} 
    </>
  );
};
export default Location;
