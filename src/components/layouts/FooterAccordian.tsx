import * as React from "react";
import FooterList from "../layouts/FooterList";
import { useTranslation } from "react-i18next";
import { Link } from "@yext/pages/components";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import FooterListAccordian from "./FooterListAccordian";
import { slugify } from "../../types/constants";

var currentTime = new Date();
var year = currentTime.getFullYear();

type footer = {
  c_section1Footer: any;
  c_section2footer: any;
  c_section_3Footer: any;
  c_section4Footer: any;
  c_section5footer: any;
  c_socialIcons: any;
  c_cookie: any;
  c_explorerLeSite: any;
  languageAndCountry: any;
  path: any;
  locale: any;
  template: any;
  alternateSlug: any;
};

const FooterAccordian = (props: footer) => {

  const { t, i18n } = useTranslation();

  const [open, setOpen] = React.useState(0);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };
  const onCountryChange = (e: any) => updatelocale(e.target.value);
  const [country, setCountry] = React.useState("");
  const updatelocale = (locale: any) => {
    if (props.template == "locatorSearch") {
      let path: any = props.path.split("/");
      path = path && path[1];
      path = locale + "/" + path;
      path = path;
      return (window.location.pathname = path);
    } else if (props.template == "continents") {

      let path: any = "";
      for (const key in props.alternateSlug) {
        if (key == locale) {
          let t = props.alternateSlug;

          path = locale + "/" + t[key].slug + ".html";

        }
      }
      return (window.location.pathname = path);
    } else if (props.template == "location") {
      let path: any = "";
      for (const key in props.alternateSlug) {
        if (key == locale) {
          let t = props.alternateSlug;
          if (t[key].slug) {
            path = locale + "/" + t[key].slug + ".html";
          } else {
            let slug = t[key].id + " " + t[key].name;
            slug = slugify(slug);
            path = locale + "/" + slug;
            path = path + ".html";
          }
        }
      }

      return (window.location.pathname = path);
    } else if (props.template == "city") {



      var path: any = "";
      for (const key in props.alternateSlug) {
        if (key == locale) {
          let t: any = props.alternateSlug;



          t[key].dm_directoryParents && t[key].dm_directoryParents.map((i: any) => {
            path = path + '/' + i.slug

          })
          path = locale + path + '/' + t[key].slug + ".html"
        }

      }


      return (window.location.pathname = path);

    }
    else if (props.template == "country") {

      let path: any;
      for (const key in props.alternateSlug) {
        if (key == locale) {
          let t = props.alternateSlug;


          path = locale + "/" + t[key].dm_directoryParents[0].slug + '/' + t[key].slug + ".html";

        }
      }

      return (window.location.pathname = path);
    }


  };
  return (
    <div className="footer-accordian mt-[4.688rem] block md:hidden">
      <div className="container-full-width accordian-wrapper">
        <Accordion open={open === 1}>
          <AccordionHeader onClick={() => handleOpen(1)}>
            <div
              className={
                open === 1
                  ? "accordian-footer-heading open"
                  : "accordian-footer-heading"
              }
            >
              <h4>
                {props.c_section1Footer && props.c_section1Footer[0].heading}
              </h4>
            </div>
          </AccordionHeader>
          <AccordionBody>
            <div className="accordia-footer-links">
              <FooterList
                listItem={props.c_section1Footer && props.c_section1Footer[0]}
              />
            </div>
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 2}>
          <AccordionHeader onClick={() => handleOpen(2)}>
            <div
              className={
                open === 2
                  ? "accordian-footer-heading open"
                  : "accordian-footer-heading"
              }
            >
              {" "}
              <h4>
                {props.c_section2footer && props.c_section2footer[0].heading}
              </h4>
            </div>
          </AccordionHeader>
          <AccordionBody>
            <div className="accordia-footer-links">
              <FooterList
                listItem={props.c_section2footer && props.c_section2footer[0]}
              />
            </div>
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 3}>
          <AccordionHeader onClick={() => handleOpen(3)}>
            <div
              className={
                open === 3
                  ? "accordian-footer-heading open"
                  : "accordian-footer-heading"
              }
            >
              <h4>
                {props.c_section_3Footer && props.c_section_3Footer[0].heading}
              </h4>
            </div>
          </AccordionHeader>
          <AccordionBody>
            <div className="accordia-footer-links">
              <FooterList
                listItem={props.c_section_3Footer && props.c_section_3Footer[0]}
              />
            </div>
          </AccordionBody>
        </Accordion>

        <Accordion open={open === 4}>
          <AccordionHeader onClick={() => handleOpen(4)}>
            <div
              className={
                open === 4
                  ? "accordian-footer-heading open"
                  : "accordian-footer-heading"
              }
            >
              <h4>
                {props.c_section5footer && props.c_section5footer.heading}
              </h4>
            </div>
          </AccordionHeader>
          <AccordionBody>
            <div className="accordia-footer-links">
              <FooterListAccordian listItem={props.c_explorerLeSite} />
            </div>
          </AccordionBody>
        </Accordion>

        <Accordion open={open === 5}>
          <AccordionHeader onClick={() => handleOpen(5)}>
            <div
              className={
                open === 5
                  ? "accordian-footer-heading open"
                  : "accordian-footer-heading"
              }
            >
              <h4>
                {props.c_section4Footer && props.c_section4Footer[0].heading}
              </h4>
            </div>
          </AccordionHeader>
          <AccordionBody>
            <div className="accordia-footer-links">
              <FooterList
                listItem={props.c_section4Footer && props.c_section4Footer[0]}
              />
            </div>
          </AccordionBody>
        </Accordion>

        <Accordion open={open === 6}>
          <AccordionHeader onClick={() => handleOpen(6)}>
            <div
              className={
                open === 6
                  ? "accordian-footer-heading open"
                  : "accordian-footer-heading"
              }
            >
              <h4>{props.c_socialIcons && props.c_socialIcons.heading}</h4>
            </div>
          </AccordionHeader>
          <AccordionBody>
            <div className="accordia-footer-links">
              {/* ??? */}
              <ul className="footer-social">
                {props.c_socialIcons &&
                  props.c_socialIcons.socialicon.map((i: any) => {
                    return (
                      <li>
                        <Link
                          href="#"
                          title=" France Facebook"
                          rel="noopener noreferrer"
                          eventName={`footerSocialIcon`}
                        >
                          {" "}
                          <img alt="footer accordian" src={i.icon.image.url} />
                          <span>{i.cta && i.cta.label}</span>
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </AccordionBody>
        </Accordion>
      </div>
      <div className="footer-bottom-strip">
        <div className="container-full-width">
          <div className="flex justify-between items-center bottom-strip-wrapper">
            {/* <div className="bottom-left text-sm sm:text-base font-light text-black flex items-center gap-5">
              <span className="flex items-baseline gap-2.5">
                {t("Country")} : France: <span>{svgIcons.arrowSmall}</span>
              </span>
              <span className="flex items-baseline gap-2.5">
                {t("Language")} : French <span>{svgIcons.arrowSmall}</span>
              </span>
            </div> */}
            <div className="bottom-left text-sm sm:text-base font-light text-black flex items-center gap-5">
              <span className="flex items-baseline gap-2.5">
                {t("Country")} :
                {/* France: <span>{svgIcons.arrowSmall}</span> */}
                <div>
                  <form>
                    <select onChange={onCountryChange} value={country}>
                      {/* <option value={"International"}>International</option> */}

                      {props.languageAndCountry && props.languageAndCountry.map((i: any) => {
                        if (i.language_code == props.locale) {
                          return (
                            <option value={i.language_code}>
                              {i.country}
                            </option>
                          );
                        }
                      })}
                      {props.languageAndCountry && props.languageAndCountry.map((i: any) => {
                        if (i.language_code != props.locale) {
                          return (
                            <option value={i.language_code}>
                              {i.country}
                            </option>
                          );
                        }
                      })}
                    </select>
                  </form>
                </div>
              </span>
              <span className="flex items-baseline gap-2.5">
                {t("Language")}

                {/*: French <span>{svgIcons.arrowSmall}</span> */}
                <div>

                  {props.languageAndCountry && props.languageAndCountry.map((i: any) => {
                    if (i.language_code == props.locale) {
                      return (
                        <span >
                          {i.language}
                        </span>
                      );
                    }
                  })}
                  {/* {props.languageAndCountry.map((i: any) => {
                          if (i.language_code != props.locale) {
                            return (
                              <option value={i.language_code}>
                                {i.language}
                              </option>
                            );
                          }
                        })} */}

                </div>
              </span>
            </div>
            <div className="bottom-right text-sm font-normal text-textGray">
              <span className="underline">
                {props.c_cookie && props.c_cookie.label}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterAccordian;


