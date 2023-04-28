import { useSearchState } from "@yext/search-headless-react";
let mapLocations: any = [];
const useFetchResults = () => {
  let locationResults = useSearchState((s) => s.vertical.results) || [];
  const Alternateresult =
    useSearchState(
      (s) => s.vertical.noResults?.allResultsForVertical.results
    ) || [];
  const offset: any = useSearchState((s) => s.vertical.offset) || 0;

  if (offset == 0) {
    mapLocations = [];
  }

  if (locationResults.length > 0) {
    for (let i = 0; i < locationResults.length; i++) {
      const location = locationResults[i];
      let pushStatus = true;
      if (mapLocations.length > 0) {
        for (let m = 0; m < mapLocations.length; m++) {
          const existLocation = mapLocations[m];
          if (location.id == existLocation.id) {
            pushStatus = false;
          }
        }
      }
      if (pushStatus) {
        mapLocations.push(location);
      }
    }
  } else {

    for (let i = 0; i < Alternateresult.length; i++) {
      const location = Alternateresult[i];

      if (location.index == 1) {
        let pushStatus = true;
        if (mapLocations.length > 0) {
          for (let m = 0; m < mapLocations.length; m++) {
            const existLocation = mapLocations[m];
            if (location.id == existLocation.id) {
              pushStatus = false;
            }
          }
        }
        if (pushStatus) {
          mapLocations.push(location);
        }
      }
    }
  }

  let mapLocationsResults = mapLocations;

  return mapLocationsResults;
};

export default useFetchResults;
