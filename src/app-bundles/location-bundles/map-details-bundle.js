import { sourceTypes } from "../../app-pages/map/map-utils";

export default {
  name: "mapDetails",
  doFetchMapDetailsData: (id, source) => ({ store }) => {
    if (source === sourceTypes.CWMS) {
      // We want to always call doCwmsDetailFetch, even if the id is null, so that the
      // previous location detail data will be cleared if the id becomes null. However the
      // other api calls do not need to be called if id is null, since their data will not be
      // displayed if id is null, so we do not need to worry about clearing their data.
      store.doCwmsDetailFetch();
      if (id) {
        store.doCwmsLevelFetch();
        store.doCwmsChildrenFetch();
      }
    } else if (source === sourceTypes.WQ) {
      // TODO: Make water quality api calls here
    }
  },
};
