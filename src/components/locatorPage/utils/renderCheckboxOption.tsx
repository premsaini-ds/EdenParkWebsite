import * as React from "react";
interface CheckboxOption {
  id: string;
  label: string;
  count: any;
}

export interface CheckboxOptionCssClasses {
  option?: string;
  optionLabel?: string;
  optionInput?: string;
}

interface CheckBoxOptionProps {
  option: CheckboxOption;
  onClick: (isChecked: boolean) => void;
  selected?: boolean;
  customCssClasses?: CheckboxOptionCssClasses;
  FUN: any;
  opt: any;
}

const builtInCssClasses: CheckboxOptionCssClasses = {
  option: "flex items-center filter-row",
  optionInput:
    "w-3.5 h-3.5 form-checkbox cursor-pointer border border-gray-300 rounded-sm text-blue-600 focus:ring-blue-500",
  optionLabel: "text-gray-500 text-sm font-normal cursor-pointer",
};

export default function renderCheckboxOption({
  option,
  selected,
  onClick,
  customCssClasses,
  FUN,
  opt,
}: CheckBoxOptionProps) {
  const cssClasses = { ...builtInCssClasses, ...customCssClasses };

  let check: any = selected;

  return (
    <>

      <div className={cssClasses.option} key={option.id}>
        <input
          type="checkbox"
          id={option.id}
          checked={check}
          className={cssClasses.optionInput}
          name="item"
          onChange={(evt) => {
            onClick(evt.target.checked);
            FUN(opt);

          }}
        />
        <label className={cssClasses.optionLabel} htmlFor={option.id}>
          {option.label}
          <sup>{option.count}</sup>
        </label>
      </div>
    </>
  );
}
