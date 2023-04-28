import { useSearchState } from "@yext/search-headless-react";
import classNames from "classnames";
import * as React from "react";
import {
  CompositionMethod,
  useComposedCssClasses,
} from "../../hooks/useComposedCssClasses";
import { useTranslation } from "react-i18next";
interface ResultsCountCssClasses {
  container?: string;
  text?: string;
  number?: string;
}

const builtInCssClasses: ResultsCountCssClasses = {
  container: "",
  text: "text-sm text-gray-700",
  number: "font-medium",
};

interface Props {
  customCssClasses?: ResultsCountCssClasses;
  cssCompositionMethod?: CompositionMethod;
}

export interface ResultsCountConfig {
  resultsCount?: number;
  resultsLength?: number;
  offset?: number;
  customCssClasses?: ResultsCountCssClasses;
  cssCompositionMethod?: CompositionMethod;
}

export default function ResultsCount(props: Props) {
  const resultsCount =
    useSearchState((state) => state.vertical?.resultsCount) || 0;

  const resultsLength =
    useSearchState((state) => state.vertical?.results?.length) || 0;
  const offset = useSearchState((state) => state.vertical?.offset) || 0;

  return (
    <ResultsCountDisplay
      resultsCount={resultsCount}
      resultsLength={resultsLength}
      offset={offset}
      {...props}
    />
  );
}

export function ResultsCountDisplay({
  resultsCount = 0,
  resultsLength = 0,
  offset = 0,
  customCssClasses,
  cssCompositionMethod,
}: ResultsCountConfig): JSX.Element | null {
  const cssClasses = useComposedCssClasses(
    builtInCssClasses,
    customCssClasses,
    cssCompositionMethod
  );
  const { t } = useTranslation();
  if (resultsLength === 0) {
    return <></>;
  }

  const messageArray = [resultsCount];

  const spanArray = messageArray.map((value: any, index) => {
    const isNumber = typeof value === "number";
    value = t(value);

    const classes = classNames(cssClasses.text, {
      [cssClasses.number ?? ""]: isNumber,
    });

    return <>{value}</>;
  });

  return <>{spanArray}</>;
}
