import * as React from "react";
import Footer from "../components/layouts/Footer";
import Header from "../components/layouts/header";
import "../index.css";
import { useTranslation } from "react-i18next";
import { withTranslation } from "react-i18next";
import "../i18n";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
} from "@yext/pages/components";
import {
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  GetPath,
  Template,
  TemplateConfig,
  HeadConfig,
} from "@yext/pages";
import {
  AnalyticsEnableDebugging,
  AnalyticsEnableTrackingCookie,
  liveWebsiteUrl,
  favicon,
} from "../types/constants";
import FooterAccordian from "../components/layouts/FooterAccordian";
import Arrow from "../components/locationDetails/Arrow";

// export const config: TemplateConfig = {
//   stream: {
//     $id: "not-found-page",
//     fields: ["meta"],
//     localization: {
//       locales: ["en"],
//       primary: false,
//     },
//     filter: {
//       entityIds: ["global-data"],
//     },
//   },
// };

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return "404.html";
};

// export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({}) => {
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  path,
  document,
}): HeadConfig => {

  return {
    title: "Page Not Found",
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
          name: "robots",
          content: "noindex, nofollow",
        },
      },
    ],
  };
};

const FourOhFour: Template<TemplateRenderProps> = ({ document }) => {
  const { _site, __meta, path } = document;
  let templateData = { document: document, __meta: __meta };
  const { t, i18n } = useTranslation();
  i18n.changeLanguage(`${document.meta.locale}`);
  let header: any = "";
  let footer: any = "";
  let c_footerpageslinks: any = "";
  let c_footerfollow: any = "";
  let c_newsletter: any = "";
  let c_footerlinkssecondary: any = "";
  let c_footercontact: any = "";
  let c_footerschedule: any = "";
  let c_popupbrowsercompat: any = "";
  header = document._site && document._site.c_header;
  footer = document._site && document._site.c_footer;
  c_footerpageslinks = document._site && document._site.c_footerpageslinks;
  c_footerfollow = document._site && document._site.c_footerfollow;
  c_newsletter = document._site && document._site.c_newsletter;
  c_footerlinkssecondary =
    document._site && document._site.c_footerlinkssecondary;
  c_footercontact = document._site && document._site.c_footercontact;
  c_footerschedule = document._site && document._site.c_footerschedule;
  c_popupbrowsercompat = document._site && document._site.c_popupbrowsercompat;
  return (
    <>
      <AnalyticsProvider
        templateData={templateData}
        enableDebugging={AnalyticsEnableDebugging}
        enableTrackingCookie={AnalyticsEnableTrackingCookie}
      >
        {" "}
        <AnalyticsScopeProvider name={"header"}>
          {/* <Header
            header={header}
            locale={document.meta.locale}
            template="city"
            path={path}
            alternateSlug={document.alternateLanguageFields}
            site={document._site}
          /> */}

          {/* 404 Main Content */}
          <div className="cms-no-route">
            <div className="not-found">
              <div className="not-found-text">
                <div>
                  <span>it seems</span> <span>this page</span>
                  <span>doesn't exist...</span>
                </div>
              </div>
              <div className="not-found-img">
                <span>Page not found</span>
              </div>
            </div>
          </div>
          {/* 404 Main Content */}

          {/* 404 Bottom icons strip */}
          <div className="page-bottom">
            <div className="container-full-width">
              <div className="content">
                <div className="footer-reassurance">
                  <ul>
                    {document._site.c_serviceSection &&
                      document._site.c_serviceSection.map((i: any) => {
                        return (
                          <li>
                            {i.serviceIcon?.image?.url && (
                              <img
                                title="Complimentary shipping for orders over $100"
                                src={i.serviceIcon.image.url}
                                alt="Complimentary shipping on all orders"
                                width="51"
                                height="40"
                              />
                            )}
                            {i.serviceText && <strong>{i.serviceText}</strong>}
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* 404 Bottom icons strip */}
          {/* <Footer
            footerData={footer}
            c_footerpageslinks={c_footerpageslinks}
            c_footerfollow={c_footerfollow}
            c_newsletter={c_newsletter}
            c_footerlinkssecondary={c_footerlinkssecondary}
            c_footercontact={c_footercontact}
            c_footerschedule={c_footerschedule}
            c_popupbrowsercompat={c_popupbrowsercompat}
            locale={document.meta.locale}

            template="city"
            path={path}
            site={undefined}
            alternateSlug={document.alternateLanguageFields}
          /> */}
          <Arrow />
        </AnalyticsScopeProvider>
      </AnalyticsProvider>
    </>
  );
};

export default withTranslation()(FourOhFour);
