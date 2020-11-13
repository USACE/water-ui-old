import React from "react";
import PropTypes from "prop-types";
import { connect } from "redux-bundler-react";
import Autocomplete from "../../../app-common/autocomplete/Autocomplete";
import { RoutePaths } from "../../../app-bundles/route-paths";

const LocationSearch = ({
  locationSearchText,
  locationSearchData,
  doSetLocationSearchText,
  debounceFetch,
  doUpdateUrl,
}) => {

  const inputOnChange = (e) => {
    doSetLocationSearchText(e.target.value);
    debounceFetch();
  };

  const items = locationSearchText
    ? locationSearchData.map(({ description, location_id }) => ({ value: location_id, display: description }))
    : [];

  const itemOnClick = (e) => {
    const locationCode = e.target.value;
    doSetLocationSearchText("");
    doUpdateUrl(RoutePaths.Locations.replace(":locationId", locationCode));
  }

  return (
    <Autocomplete
      id="location-search-autocomplete"
      input={{
        value: locationSearchText,
        onChange: inputOnChange,
        className: "form-control",
      }}
      items={items}
      itemOnClick={itemOnClick}
      placeholder="Search by city or project name"
      ariaLabel="Search by city or project name"
    />
  );
};

LocationSearch.propTypes = {
  locationSearchText: PropTypes.string.isRequired,
  locationSearchData: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string.isRequired,
    location_id: PropTypes.string.isRequired,
  })).isRequired,
  doSetLocationSearchText: PropTypes.func.isRequired,
  debounceFetch: PropTypes.func.isRequired,
  doUpdateUrl: PropTypes.func.isRequired,
};

export default connect(
  "selectLocationSearchText",
  "selectLocationSearchData",
  "doSetLocationSearchText",
  "doUpdateUrl",
  LocationSearch,
);
