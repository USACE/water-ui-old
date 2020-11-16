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

  let items = [];
  if( locationSearchText ) {
    items = locationSearchData.map( ( { description, location_id, nearest_city, county_name } ) => {
      let additionalText = [];
      if( nearest_city ) additionalText.push( `near ${ nearest_city }` )
      if( county_name ) additionalText.push( `${ county_name } county` )

      let dispVal = <>
        <span style={{ marginRight: "5px" }}>{description}</span>
        <span style={{ fontSize: ".8rem" }}>{additionalText.length ? `(${ additionalText.join( ', ' ) })` : "" }</span>
      </>

      return ( { value: location_id, display: dispVal } )
    } )
  }

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
      placeholder="Search by location, city, or county"
      ariaLabel="Search by location, city, or county"
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
