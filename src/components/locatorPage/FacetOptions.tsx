import {
  useSearchUtilities,
  DisplayableFacet,
  DisplayableFacetOption,
} from "@yext/search-headless-react";
import { useState } from "react";
import useCollapse from "react-collapsed";
import { useTranslation } from "react-i18next";
import {
  CompositionMethod,
  useComposedCssClasses,
} from "../../hooks/useComposedCssClasses";
import renderCheckboxOption, {
  CheckboxOptionCssClasses,
} from "./utils/renderCheckboxOption";
import dropdownplus from "../../images/plus.svg";
import dropdownminus from "../../images/minus.svg";
import Checkbox from "./Checkbox";
import * as React from "react";

export type onFacetChangeFn = (
  fieldId: string,
  option: DisplayableFacetOption
) => void;

export interface FacetConfig {
  index?: Number;
  searchable?: boolean;
  placeholderText?: string;
  label?: string;
  collapsible?: boolean;
  defaultExpanded?: boolean;
  _site: any
}

interface FacetProps extends FacetConfig {
  facet: DisplayableFacet;
  onToggle: onFacetChangeFn;
  customCssclasses?: FacetCssClasses;
  cssCompositionMethod?: CompositionMethod;
}

export interface FacetCssClasses extends CheckboxOptionCssClasses {
  label?: string;
  labelIcon?: string;
  labelContainer?: string;
  optionsContainer?: string;
  searchableInputElement?: string;
}

const builtInCssClasses: FacetCssClasses = {
  label: "text-black text-sm sm:text-base font-light text-left uppercase",
  labelIcon: "",
  labelContainer: "w-full flex justify-between items-center",
  optionsContainer: "flex flex-col",
};

export default function FacetOptions(props: FacetProps): JSX.Element {
  const {
    index,
    facet,
    onToggle,
    sellectAll,
    searchable,
    collapsible,
    defaultExpanded,
    label,
    placeholderText = "Search here...",
    customCssclasses,
    cssCompositionMethod,
    value,
    resetAll,
    _site

  } = props;
  const cssClasses = useComposedCssClasses(
    builtInCssClasses,
    customCssclasses,
    cssCompositionMethod
  );
  const answersUtilities = useSearchUtilities();
  const hasSelectedFacet = !!facet.options.find((o) => o.selected);
  const [filterValue, setFilterValue] = useState("");
  const [allcheck, setAllCheck] = useState(false);
  const [isCheck, setIsCheck] = useState(false)
  let { getCollapseProps, getToggleProps, isExpanded } = useCollapse({
    defaultExpanded: hasSelectedFacet || defaultExpanded,
  });
  cssClasses.labelIcon = cssClasses.labelIcon ?? "";
  const facetOptions = searchable
    ? answersUtilities.searchThroughFacet(facet, filterValue).options
    : facet.options;
  let Collapsible = collapsible;
  const { t, i18n } = useTranslation();

  return (
    <fieldset>
      <button
        className={cssClasses.labelContainer}
        {...(Collapsible ? getToggleProps() : {})}
      >
        <div className={cssClasses.label}>{label || t(facet.displayName)}</div>
        {Collapsible && <img src={isExpanded ? dropdownminus : dropdownplus} />}
      </button>

      <div className="" {...(collapsible ? getCollapseProps() : {})}>

        <Checkbox
          facet={facet}

          customCssclasses={cssClasses}
          onToggle={onToggle}
          sellectAll={sellectAll}
          index={index}
          value={value}
          resetAll={resetAll}
          _site={_site}

        />

      </div>
    </fieldset>
  );
}
