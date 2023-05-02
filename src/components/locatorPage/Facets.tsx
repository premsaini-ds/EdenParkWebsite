import { useRef } from "react";
import {
  useSearchState,
  useSearchActions,
  DisplayableFacetOption,
} from "@yext/search-headless-react";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  CompositionMethod,
  useComposedCssClasses,
} from "../../hooks/useComposedCssClasses";
import FacetOptions, { FacetConfig, FacetCssClasses } from "./FacetOptions";
import { limit } from "../../types/constants";
import { svgIcons } from "../../svgIcon ";
import * as React from "react";
import { useTranslation } from "react-i18next";

interface FacetsProps {
  searchOnChange?: boolean;
  searchable?: boolean;
  collapsible?: boolean;
  defaultExpanded?: boolean;
  facetConfigs?: Record<string, FacetConfig>;
  customCssClasses?: FacetsCssClasses;
  cssCompositionMethod?: CompositionMethod;
  handleStatusModal?: Function;
  _site: any
  count: any
}

interface FacetsCssClasses extends FacetCssClasses {
  container?: string;
  divider?: string;
  buttonsContainer?: string;
  button?: string;
}

const builtInCssClasses: FacetsCssClasses = {
  searchableInputElement:
    "text-sm bg-white h-9 w-full outline-none p-2 mb-2 rounded-md border border-gray-300 focus:border-blue-600",
  container: "",
  buttonsContainer: "flex justify-between mt-5",
  button: "border border-gray-300 px-2.5 py-1 rounded-md",
  divider: "w-full h-px bg-gray-200 my-4",
};

export default function Facets(props: FacetsProps): JSX.Element {
  const {
    searchOnChange,
    searchable,
    collapsible,
    defaultExpanded,
    facetConfigs = {},
    customCssClasses,
    cssCompositionMethod,
    handleStatusModal,
    _site,
    count

  } = props;
  const cssClasses = useComposedCssClasses(
    builtInCssClasses,
    customCssClasses,
    cssCompositionMethod
  );
  const [check, setCheck] = React.useState(false);
  const searchAction = useSearchActions();
  const [isBtnClick, setIsBtnClick] = React.useState(false);
  const [filterItemCount, setFilterItemCount] = React.useState(0);
  const [totalRecords, setTotalRecords] = React.useState(0);
  const facets = useSearchState((state) => state.filters?.facets) || [];
  const isloding = useSearchState((state) => state.searchStatus.isLoading);
  const countRef = useRef(null);
  const resetAll = useRef(false);
  // const resultsCount = useSearchState((state) => state.vertical.resultsCount);
  // const verticalData = useSearchState((state) => state.vertical.resultsCount);
  // console.log('verticalData', verticalData);

  // React.useEffect(() => {
  //   countRef.current = count
  //   console.log(countRef.current, "countRef")
  //   // if (resultsCount && resultsCount > 0) {
  //   //   const localItem = localStorage.getItem("resultsCount");
  //   //   if (!localItem) {
  //   //     localStorage.setItem("resultsCount", resultsCount.toString());
  //   //   }
  //   // }
  //   // const localTotalRecords = localStorage.getItem("resultsCount");
  //   // if (localTotalRecords && resultsCount) {
  //   //   if (resultsCount >= parseInt(localTotalRecords)) {
  //   //     setIsBtnClick(false);
  //   //     setFilterItemCount(0);
  //   //   } else {
  //   //     setIsBtnClick(true);
  //   //     setFilterItemCount(resultsCount ? resultsCount : 0);
  //   //   }
  //   // }

  // }, [resultsCount]);

  // React.useEffect(() => {
  //   console.log('working')
  //   setCheck(true)


  // }, [count])
  const executeSearch = () => {
    handleStatusModal();
    searchAction.setOffset(0);
    searchAction.setVerticalLimit(limit);
    searchAction.executeVerticalQuery();
  };

  const handleResetFacets = () => {
    if (resetAll.current) {
      resetAll.current = false;
    } else {
      resetAll.current = true;
    }
    searchAction.resetFacets();
    setIsBtnClick(false);
    setFilterItemCount(0);
    searchAction.setOffset(0);
    searchAction.setVerticalLimit(limit);
    searchAction.executeVerticalQuery();
  };

  const handleFacetOptionChange = (
    fieldId: string,
    option: DisplayableFacetOption
  ) => {
    searchAction.setFacetOption(fieldId, option, !option.selected);

    facets
      ?.filter((facet) => facet.options?.length > 0)
      .map((facet, index, facetArray) => {
        if (facet.fieldId !== "c_storesType") {
          facet?.options.forEach((fOption) => {
            if (fOption.selected) {
              setCheck(true);
              if (option.displayName != fOption.displayName) {
              }
            }
          });
        }
      });

    if (searchOnChange) {
      setIsBtnClick(true);
      searchAction.setOffset(0);
      searchAction.setVerticalLimit(limit);
      searchAction.executeVerticalQuery();
    }
  };

  const handleFacetOptionChange2 = (
    fieldId: string,
    option: DisplayableFacetOption
  ) => {

  };

  const facetComponents = facets
    .filter((facet) => facet.options?.length > 0)
    .map((facet, index, facetArray) => {
      if (facet.fieldId !== "c_storesType") {
        const isLastFacet = index === facetArray.length - 1;
        const overrideConfig = facetConfigs?.[facet.fieldId] ?? {};
        const config = {
          searchable,
          collapsible,
          defaultExpanded,
          ...overrideConfig,
        };

        return (
          <div className="single-filter" key={facet.fieldId}>
            <FacetOptions
              facet={facet}
              {...config}
              customCssclasses={cssClasses}
              onToggle={handleFacetOptionChange}
              sellectAll={handleFacetOptionChange2}
              index={index}
              value={filterItemCount}
              resetAll={resetAll}
              _site={_site}
            />
          </div>
        );
      }
    });
  const { t, i18n } = useTranslation();



  return (
    <div className={cssClasses.container + " filter-items"}>
      <div className="filter-header">
        <div className="flex justify-end mb-6">
          <a href="javascript:void(0);" onClick={handleStatusModal}>
            {svgIcons.cross}
          </a>
        </div>
        <div className="flex justify-between">
         


          <button onClick={handleResetFacets} className="filter-reset">
            {props?._site?.c_reset ? props?._site?.c_reset : t("Reset Filters")}

          </button>
        </div>
      </div>
      <PerfectScrollbar>
        <div className="all-filters">{facetComponents}</div>
      </PerfectScrollbar>
      <div className="filterButtons p-2.5">
        <button onClick={executeSearch} className="button w-full">
          {props._site?.c_apply ? props._site?.c_apply : t("Apply")}


          {(isBtnClick && count > 0 && !isloding) ? "(" + count + ")" : ""}
          {/* {t("Apply")}{" "}   { (countRef.current) } */}
        </button>
      </div>
    </div>
  );
}
