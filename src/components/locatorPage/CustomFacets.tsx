import * as React from "react";
import { limit } from "../../types/constants";

import { useTranslation } from "react-i18next";
import {
  // Matcher and NumberRangeValue will be used in step 3
  Matcher,
  NumberRangeValue,
  SelectableFilter,
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
import classNames from "classnames";
import { svgIcons } from "../../svgIcon ";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { consoleLog } from "../locationDetails/commonFunction";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";

interface CustomFacetsProps {
  fieldId: string;
  displayName?: string;
  language?: string;
  handleStatusModal: any;
  isDataAvailable: any;
  layoutData: any
}
const CustomFacets = ({
  fieldId,
  displayName,
  handleStatusModal,
  layoutData
}: CustomFacetsProps) => {

  const { t } = useTranslation();
  const searchActions = useSearchActions();
  const [isChecked, setIsChecked] = React.useState(true);
  // const [isBtnClick, setIsBtnClick] = React.useState(false);
  const [resultCount, setResultCount] = React.useState(0);
  const [isDataAvailable, setIsDataAvailable] = useState(true);
  const facets = useSearchState((state) => state.filters?.facets) || [];
  const facet = useSearchState((state) => state.filters.facets?.find((f) => f.fieldId === fieldId));

  const count: any = useSearchState((state) => state.vertical?.resultsCount) || 0;
  /**used for futher use in cout  */
  // const loading = useSearchState((state) => state.searchStatus.isLoading);
  /** update result count  */
  // React.useEffect(() => {
  //   if (count > resultCount) {
  //     setResultCount(count);
  //   }
  // }, [count]);

  React.useEffect(() => {
    setResultCount(count);
  }, [count]);

  React.useEffect(() => {
    facets?.map((i: any) => {
      if (
        i.fieldId == "c_productName" ||
        i.fieldId == "c_allServices.serviceName"
      ) {
        if (i.options.length == 0) {
          setIsDataAvailable(false)
        } else {
          setIsDataAvailable(true)
        }
      }
    });
  });


  // React.useEffect(() => {
  //   console.log('layoutData', layoutData)
  // }, [layoutData]);

  const [filterActive, setFilterActive]: any = React.useState('all');
  const handleFacetClick = (item: any, matcher = Matcher.Equals) => {
    searchActions.resetFacets();
    searchActions.setOffset(0);
    let staticFilter = [];
    if (Object.keys(item).length) {
      const itemFilter: SelectableFilter = {
        selected: true,
        fieldId: fieldId,
        value: item.value,
        matcher: matcher,
      };
      staticFilter.push(itemFilter);
    }

    if (layoutData && layoutData.latitude && layoutData.longitude && layoutData.is_search) {
      const locationFilter: SelectableFilter = {
        selected: true,
        fieldId: "builtin.location",
        value: {
          lat: parseFloat(layoutData.latitude),
          lng: parseFloat(layoutData.longitude),
          radius: 5000,
        },
        matcher: Matcher.Near,
      };
      staticFilter.push(locationFilter);
    }
    searchActions.setStaticFilters(staticFilter);
    searchActions.executeVerticalQuery();

    if (Object.keys(item).length) {
      setFilterActive(item.value);
    } else {
      setFilterActive('all');
    }

  };


  function getAllData() {
    searchActions.setVertical("locations");
    searchActions.setQuery("");
    searchActions.setOffset(0);
    searchActions.setVerticalLimit(limit);
    searchActions.executeVerticalQuery();
    const myElement = document.getElementById("result count");
    myElement?.classList.remove("hidden");
    myElement?.classList.add("block");
  }


  let defaultOptions = [
    {
      displayName: "All Diptyque store",
      count: 0,
      selected: false,
      is_all: true,
      matcher: "$eq",
      value: "All Diptyque store",
    },
    {
      displayName: "Boutique",
      count: 0,
      selected: false,
      matcher: "$eq",
      value: "Boutique",
    },
    {
      displayName: "Maisons Diptyque",
      count: 0,
      selected: false,
      matcher: "$eq",
      value: "Maisons Diptyque",
    },
    {
      displayName: "Retailer",
      count: 0,
      selected: false,
      matcher: "$eq",
      value: "Retailer",
    },
  ];
  console.log(t("All Diptyque store"), '????')

  return (
    <>
      <Skeleton count={1} />
      {facet ? <>
        <SwiperSlide>
                <div className="flex items-center space-x-3 peer filter-btn customFilters">
                  <a
                    className={isDataAvailable ? "cursor-pointer" : "cursor-auto"}
                    href="javascript:void(0);"
                    onClick={handleStatusModal}
                  >
                    {svgIcons.filter}
                  </a>
                </div>
                <div className="listingCategorized">
                  <ul>
                    <li><span className="shopBlack"></span><span>Shop</span></li>
                    <li><span className="bigsGray"></span>Big Store</li>
                    <li><span className="multibPink"></span>Multi-brand</li>
                  </ul>
                </div>
              </SwiperSlide>
              
        {/* <Swiper spaceBetween={5} slidesPerView={3}>
          <div className="">
            <div className="flex flex-nowrap gap-2.5">

             <SwiperSlide>
                <div className="flex items-center space-x-3 peer filter-btn">
                  <a
                    className={isDataAvailable ? "cursor-pointer" : "cursor-auto"}
                    href="javascript:void(0);"
                    onClick={handleStatusModal}
                  >
                    {svgIcons.filter}
                  </a>
                </div>
              </SwiperSlide> 
               <SwiperSlide>
                <div
                  className="flex items-center space-x-3 peer all-store"
                  id="allStore"
                  onClick={
                    () => { handleFacetClick({}); }
                  }
                >
                  <input
                    type="checkbox"
                    id="see-all-store"
                    checked={filterActive === 'all'}
                    onChange={() => { consoleLog('onChange') }}
                    className="w-3.5 h-3.5 hidden form-checkbox cursor-pointer border border-gray-300 rounded-sm text-primary focus:ring-primary"
                  />
                  <label htmlFor="see-all-store" id="allresult">
                    {" "}
                    {t("All Diptyque store")}
                    {resultCount > 0 && <sup>{resultCount}</sup>}
                  </label>
                </div>
              </SwiperSlide>

              {facet && facet?.options.map((item: any, index: number) => {
                return (
                  <SwiperSlide key={`${fieldId}_${index}`}>
                    <div className={`filter-options ${(item.value === filterActive) ? 'filter-active bg-[#000] text-white !rounded-[3px] selected' : 'bg-[#FFF] text-textGray'} `}
                      onClick={(e) => {
                        handleFacetClick(item);
                      }}
                    >
                      <div
                        className="filter-label"
                        onClick={() => {
                          setIsChecked(false);
                        }}
                      >
                        <span className="mr-0.5">
                          {t(item.displayName)}
                          {resultCount >= 0 && item.is_all ? <sup>{resultCount}</sup> : <></>}
                        </span>
                      </div>
                    </div>
                  </SwiperSlide>
                )
              })}
            </div>
          </div>
        </Swiper> */}


      </> : <Skeleton count={1} />

      }

    </>
  )
};

export default CustomFacets;
