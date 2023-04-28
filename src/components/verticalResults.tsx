import { CardComponent, CardConfigTypes } from "../models/cardComponent";
import classNames from "classnames";
import {
  CompositionMethod,
  useComposedCssClasses,
} from "../hooks/useComposedCssClasses";
import { useSearchState, Result } from "@yext/search-headless-react";
import * as React from "react";
import { useEffect, useState } from "react";
import image from "../../src/images/diptyqueBanner.jpg";

interface VerticalResultsCssClasses {
  container?: string;
  labelContainer?: string;
  label?: string;
  selectedLabel?: string;
  leftIconContainer?: string;
  rightIconContainer?: string;
  icon?: string;
  results___loading?: string;
}

const builtInCssClasses: VerticalResultsCssClasses = {
  results___loading: "opacity-50",
};

interface VerticalResultsDisplayProps {
  CardComponent: CardComponent;
  cardConfig?: CardConfigTypes;
  isLoading?: boolean;
  results: Result[];
  customCssClasses?: VerticalResultsCssClasses;
  cssCompositionMethod?: CompositionMethod;
  _site: any
}

export function VerticalResultsDisplay(
  props: VerticalResultsDisplayProps
): JSX.Element | null {
  const {
    CardComponent,
    results,
    cardConfig = {},
    isLoading = false,
    customCssClasses,
    cssCompositionMethod,
    _site
  } = props;

  const cssClasses = useComposedCssClasses(
    builtInCssClasses,
    customCssClasses,
    cssCompositionMethod
  );

  if (results.length === 0) {
    return null;
  }

  const resultsClassNames = classNames({
    [cssClasses.results___loading ?? ""]: isLoading,
  });
  const filterresults: any = [];
  // const[filterresults,setFilterResults]=useState([]);

  const matcharray = results.filter((result: any) => {
    return (
      result.rawData.c_storesType &&
      result.rawData.c_storesType === "Maisons Diptyque"
    );
  });

  const notmatcharray = results.filter((result: any) => {
    return (
      result.rawData.c_storesType &&
      result.rawData.c_storesType != "Maisons Diptyque"
    );
  });

  const otherResult = results.filter((result: any) => {
    if (!result.rawData.c_storesType) return result;
  });

  filterresults.push(...matcharray, ...notmatcharray, ...otherResult);

  return (
    <div className={resultsClassNames}>
      {filterresults &&
        filterresults.map((result: any) =>
          renderResult(CardComponent, cardConfig, result, _site)
        )}
    </div>
  );
}

function renderResult(
  CardComponent: CardComponent,
  cardConfig: CardConfigTypes,
  result: Result,
  _site: any
): JSX.Element {
  return (

    <CardComponent
      result={result}
      configuration={cardConfig}
      key={result.id || result.index}
      _site={_site}
    />
  );
}

interface VerticalResultsProps {
  CardComponent: CardComponent;
  cardConfig?: CardConfigTypes;
  displayAllOnNoResults?: boolean;
  customCssClasses?: VerticalResultsCssClasses;
  cssCompositionMethod?: CompositionMethod;
  allowPagination?: boolean;
  locationResults: any;
  _site: any
}

export default function VerticalResults(
  props: VerticalResultsProps
): JSX.Element | null {
  const {
    displayAllOnNoResults = false,
    allowPagination = true,
    ...otherProps
  } = props;

  const verticalResults = props.locationResults || [];
  const allResultsForVertical =
    useSearchState(
      (state) => state.vertical?.noResults?.allResultsForVertical.results
    ) || [];
  const verticalResultsCount =
    useSearchState((state) => state.vertical.resultsCount) || 0;
  const allResultsCountForVertical =
    useSearchState(
      (state) => state.vertical?.noResults?.allResultsForVertical.resultsCount
    ) || 0;
  const isLoading = useSearchState((state) => state.searchStatus.isLoading);

  let results: any = verticalResults;
  let resultsCount = verticalResultsCount;
  if (verticalResults.length === 0 && displayAllOnNoResults) {
    results = allResultsForVertical;
    resultsCount = allResultsCountForVertical;
  }

  return (
    <>
      {/* <div className="text-sm text-black font-light total-result-count">
        <div className="location-image">
          <img
            width="440"
            height="248"
            alt="location image"
            src={
              results[0]?.rawData?.c_locatorInfoImage
                ? results[0]?.rawData?.c_locatorInfoImage.image.url
                : image
            }
          />
        </div>
      </div> */}
      <VerticalResultsDisplay
        results={results}
        isLoading={isLoading}
        {...otherProps}
        _site={props._site}

      />
    </>
  );
}
