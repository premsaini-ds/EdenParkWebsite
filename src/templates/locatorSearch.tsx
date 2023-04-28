import * as React from "react";
import "../index.css";
import {
  GetPath,
  Template,
  TemplateProps,
  TemplateRenderProps,
  TemplateConfig,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import { SearchHeadlessProvider } from "@yext/search-headless-react";
import PageLayout from "../components/layouts/PageLayout";
import SearchLayout from "../components/locatorPage/SearchLayout";
import Footer from "../components/layouts/Footer";
import Header from "../components/layouts/header";
import { AnswerExperienceConfig } from "../types/constants";
import {
  AnalyticsScopeProvider,
  AnalyticsProvider,
} from "@yext/pages/components";
import {
  AnalyticsEnableDebugging,
  AnalyticsEnableTrackingCookie,
  productionUrl,
  favicon,
  robotsMetaStatus,
  staticDescription,
  author,
  logoUrl,
} from "../types/constants";
import { JsonLd } from "react-schemaorg";
import { useTranslation } from "react-i18next";
import { withTranslation } from "react-i18next";
import "../i18n";
import useFetchResults from "../hooks/useFetchResults";
import useUpdateTranslation from "../hooks/useUpdateTranslation";
import Arrow from "../components/locationDetails/Arrow";
// export const config: TemplateConfig = {
//   stream: {
//     $id: "locatorsearch",
//     filter: {
//       entityIds: ["global-data"],
//     },
//     fields: [
//       "id",
//       "uid",
//       "meta",
//       "name",
//       // "c_locatorMetaTitle",
//       // "c_locatorMetaDescription",
//       // "c_locatorCanonicalURL",
//     ],
//     localization: {
//       locales: ["fr", "es", "de", "it", "en"],
//       primary: false,
//     },
//   },
//   alternateLanguageFields: ["slug", "name", "id"],
// };

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  var url = "";
  url = 'locatorsearch';
  return url;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  path,
  document,
}): HeadConfig => {
  let metaDescription = "document._site.c_locatorMetaDescription"
    ? "document._site.c_locatorMetaDescription"
    : staticDescription;
  let metaTitle = "document._site.c_locatorMetaTitle"
    ? "document._site.c_locatorMetaTitle"
    : author;

  return {
    title: "Locator",
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
          name: "keywords",
          // content: document._site.keywords,
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
          href: `${productionUrl}/${path}`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "author",
          content: author,
        },
      },

      // og tags

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
      /// twitter tag

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

const locatorSearch: Template<TemplateRenderProps> = ({
  path,
  __meta,
  document,
}) => {
  const { _site, meta } = document;
  let templateData = { document: document, __meta: __meta };

  const { i18n } = useTranslation();
  // i18n.changeLanguage(meta.locale);
  let header: any = "";

 
  header = document._site && document._site.c_headers;

console.log(header,"iamhere");
  useUpdateTranslation(document._site, meta.locale);
  return (
    <>
      <JsonLd<locator>
        item={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "author",
          url: `${productionUrl}/${path}`,
          logo: logoUrl,
          sameAs: [
            "https:https://www.facebook.com/diptyque/?ref=ts",
            "https://www.diptyqueparis.com/en_us/",
            "https://www.instagram.com/diptyque/",
          ],
        }}
      />

      <JsonLd<BreadcrumbList>
        item={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              item: {
                "@id": "#", 
                name: "Home",
              },
            },
            {
              "@type": "ListItem",
              position: 2,
              item: {
                "@id": productionUrl + "/" + path,
                name: "Store Locator",
              },
            },
          ],
        }}
      />

       <AnalyticsProvider
        templateData={templateData}
        enableDebugging={AnalyticsEnableDebugging}
        enableTrackingCookie={AnalyticsEnableTrackingCookie}
      >
        {" "}
        <AnalyticsScopeProvider name={""}>
          <Header header={header}         
          
            
          />
              
        
          <PageLayout>
            <SearchHeadlessProvider
              experienceKey={AnswerExperienceConfig.experienceKey}
              locale={document.meta.locale}
              apiKey={AnswerExperienceConfig.apiKey}
              verticalKey={AnswerExperienceConfig.verticalKey}
              experienceVersion={AnswerExperienceConfig.experienceVersion}
              sessionTrackingEnabled={
                AnswerExperienceConfig.sessionTrackingEnabled
              }
              endpoints={ AnswerExperienceConfig.endpoints}
            >
              <SearchLayout
               currentUrl={path}
               updatedlocale={document.meta.locale}
               _site={_site}
               path={path}
               locale={document.locale}
             
              />
            </SearchHeadlessProvider>
          </PageLayout>
          <Footer
            footerData={document._site}
            // c_footerpageslinks={c_footerpageslinks}
            // c_footerfollow={c_footerfollow}
            // c_newsletter={c_newsletter}
            // c_footerlinkssecondary={c_footerlinkssecondary}
            // c_footercontact={c_footercontact}
            // c_footerschedule={c_footerschedule}
            // c_popupbrowsercompat={c_popupbrowsercompat}
            // locale={document.locale}
            // template="locatorSearch"
            // path={path}
            // alternateSlug={document.alternateLanguageFields}
            // site={document._site}
          />
          <Arrow />
        </AnalyticsScopeProvider>
      </AnalyticsProvider> 
    </>
  );
};
export default locatorSearch;
