import React from "react";
import PropTypes from "prop-types";
import { connect } from "redux-bundler-react";
import Autocomplete from "../../../app-common/autocomplete/Autocomplete";
import debounce from "lodash/debounce";

const LocationSearch = ({
  locationSearchText,
  locationSearchItems,
  doSetLocationSearchText,
}) => {

  const debounceDoSetLocationSearchText = debounce(doSetLocationSearchText, 500);

  const inputOnChange = (e) => {
    debounceDoSetLocationSearchText(e.target.value);
  };

  const items = locationSearchText ? locationSearchItems.map(({ description }) => description) : [];

  const itemOnClick = (value) => {
    doSetLocationSearchText(value);
    // TODO: redirect user to location details or map page when user selects a menu item
  }

  return (
    <Autocomplete
      id="location-search-autocomplete"
      input={{
        // value: locationSearchText,
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
};

export default connect(
  "selectLocationSearchText",
  "selectLocationSearchItems",
  "doSetLocationSearchText",
  LocationSearch,
);