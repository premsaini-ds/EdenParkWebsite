import * as React from "react";
import { SiteUrl, stagingBaseUrl } from "../../types/constants";
import { Link } from "@yext/pages/components";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

type data = {
  name: any;
  parents: any;
  address: any;
  locale: any;
  mainparent: any;
};
const BreadCrumbs = (props: data) => {
  const [list, setList] = React.useState(null);
  var breadcrumbs;
  var data: any = [];
  React.useEffect(() => {
    setURL(props);
  }, []);

  const regionNames = new Intl.DisplayNames(
    [props.locale ? props.locale : "en"],
    { type: "region" }
  );
  const [loadingtimeout, setLoadingTimeout] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingTimeout(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const setURL = (res: any) => {

    // for (let i = 0; i < res.mainparent.length; i++) {
    //   data.push({
    //     name: `${t("Store Finder")}`,
    //     slug: "index",
    //   });
    // }
    // console.log(res, 'res')
    // data.push({
    //   name: `${t("Store Finder")}`,
    //   slug: "index",
    // });

    if (typeof res.mainparent != 'undefined' && res.mainparent) {
      for (let i = 0; i < res.mainparent.length; i++) {
        data.push({
          name: res.mainparent[i].name,
          slug: res.mainparent[i].slug,
        });
      }
    }

    if (res.parents) {
      for (let i = 0; i < res.parents.length; i++) {
        if (res.parents[i].meta.entityType.id == "ce_root") {
          res.parents[i].name = res.parents[i].name;
          res.parents[i].slug = res.parents[i].slug;
        } else if (res.parents[i].meta.entityType.id == "ce_country") {
          try {
            res.parents[i].name = regionNames.of(res.parents[i].name);
          } catch (error) {
            res.parents[i].name = res.parents[i].name;
          }
          res.parents[i].slug =
            res.parents[i - 1].slug + "/" + res.parents[i].slug;

          data.push({
            name: res.parents[i].name,
            slug: res.parents[i].slug,
          });
        } else if (res.parents[i].meta.entityType.id == "ce_city") {
          res.parents[i].name = res.parents[i].name;
          res.parents[i].slug =
            res.parents[i - 1].slug + "/" + res.parents[i].slug;
          data.push({
            name: res.parents[i].name,
            slug: res.parents[i].slug,
          });
        }
      }

      console.log(data, 'data')
      breadcrumbs = data.map((crumb: any, index: any) => (

        <SwiperSlide>
          <li key={crumb.slug}>
            <Link
              href={
                "/" + props.locale + stagingBaseUrl + "/" + crumb.slug + ".html"
              }
              rel="noopener noreferrer"
              eventName={"BreadCrumbs" + (index + 1)}
              style={{ color: "#3a356e" }}
            >
              {crumb.name}
            </Link>
          </li>
        </SwiperSlide>
      ));

      setList(breadcrumbs);
    } else {
      setList(null);
    }

  };

  const { t } = useTranslation();

  return (
    <>
      {loadingtimeout ? (
        <Skeleton count={1} />
      ) : (
        <>
          {/* <h1>We are in Development.</h1> */}
          <div
            className="breadcrumb"
            style={{ backgroundColor: "whitesmoke", marginTop: "10px" }}
          >
            <div className="container-full-width">
              <ul>
                <Swiper spaceBetween={0.1} slidesPerView={"auto"}>
                  <SwiperSlide>
                    <li>
                      <a href={SiteUrl}>{t("Home")}</a>
                    </li>
                  </SwiperSlide>
                  <SwiperSlide>
                    <li>
                      <a href={
                        "/" + props.locale + stagingBaseUrl + "/" + "index.html"
                      }>{t("Store Finder")}</a>
                    </li>
                  </SwiperSlide>
                  {list && (
                    list
                  )}
                  <SwiperSlide>
                    <li style={{ color: "#3a356e" }}>{props && props.name ? props.name : ''}</li>
                  </SwiperSlide>
                </Swiper>
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BreadCrumbs;
