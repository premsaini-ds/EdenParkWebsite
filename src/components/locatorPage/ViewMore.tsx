import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import * as React from "react";
import { AnswerExperienceConfig } from "../../types/constants";
interface viewMoreProps {
  className: string;
  idName: string;
  buttonLabel: string;
}

export default function ViewMore(props: viewMoreProps): JSX.Element | null {
  const { className, idName, buttonLabel } = props;
  const searchAction = useSearchActions();
  const offset = useSearchState((state) => state.vertical.offset) || 0;
  const limit =
    useSearchState((state) => state.vertical.limit) ||
    AnswerExperienceConfig.limit;
  let numResults = useSearchState((state) => state.vertical.resultsCount) || 0;
  const allResultsCountForVertical =
    useSearchState(
      (state) => state.vertical?.noResults?.allResultsForVertical.resultsCount
    ) || 0;
  const executeSearchWithNewOffset = (newOffset: number) => {
    let elements = document.querySelectorAll(".result");
    for (let index = 0; index < elements.length; index++) {
      elements[index].classList.remove("selectedLocation");
    }
    searchAction.setOffset(newOffset);
    searchAction.executeVerticalQuery();
  };
  if (numResults == 0) {
    numResults = allResultsCountForVertical;
  }

  const maxPageCount = Math.ceil(numResults / limit);
  if (maxPageCount <= 1) {
    return null;
  }
  const pageNumber = offset / limit + 1;

  return (
    <>
      <div>
        {pageNumber !== maxPageCount ? (
          <div className="buttons !pl-0">
            <div className="ctaBtn">
              <button
                className={className}
                id={idName}
                onClick={() => executeSearchWithNewOffset(offset + limit)}
              >
                {buttonLabel}
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
