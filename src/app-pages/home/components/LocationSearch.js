import React from "react";
import PropTypes from "prop-types";
import { connect } from "redux-bundler-react";
import Autocomplete from "../../../app-common/autocomplete/Autocomplete";
import { RoutePaths } from "../../../app-bundles/routes-bundle";

const LocationSearch = ({
  locationSearchText,
  locationSearchItems,
  doSetLocationSearchText,
  debounceFetch,
  doUpdateUrl,
}) => {

  const inputOnChange = (e) => {
    doSetLocationSearchText(e.target.value);
    debounceFetch();
  };

  const items = locationSearchText
    ? locationSearchItems.map(({ description, location_id }) => ({ value: location_id, display: description }))
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
      placeholder="Search by City, State, ZIP, or Project Names"
      ariaLabel="Search by City, State, ZIP, or Project Names"
    />
  );
};

LocationSearch.propTypes = {
  locationSearchText: PropTypes.string.isRequired,
  locationSearchItems: PropTypes.array.isRequired,
  doSetLocationSearchText: PropTypes.func.isRequired,
  debounceFetch: PropTypes.func.isRequired,
  doUpdateUrl: PropTypes.func.isRequired,
};

export default connect(
  "selectLocationSearchText",
  "selectLocationSearchItems",
  "doSetLocationSearchText",
  "doUpdateUrl",
  LocationSearch,
);
