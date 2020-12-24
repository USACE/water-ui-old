import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "redux-bundler-react";
import { RoutePaths } from "../../../app-bundles/route-paths";
import Autocomplete from "../../../app-common/inputs/autocomplete/Autocomplete";
import { getMapUrl, displayTypes } from "../../map/map-utils";

const LocationSearch = ({
  pathname,
  queryObject,
  locationSearchText,
  locationSearchData,
  doSetLocationSearchText,
  debounceFetch,
  doUpdateUrl,
}) => {

  useEffect(() => {
    if (pathname === RoutePaths.Home) {
      doSetLocationSearchText("");
    }
  }, [pathname, doSetLocationSearchText]);

  const inputOnChange = (e) => {
    doSetLocationSearchText(e.target.value);
    debounceFetch();
  };

  let items = [];
  if( locationSearchText ) {
    items = locationSearchData.map( ( { description, nearest_city, county_name }, index ) => {
      let additionalText = [];
      if( nearest_city ) additionalText.push( `near ${ nearest_city }` );
      if( county_name ) additionalText.push( `${ county_name } county` );

      const dispVal = (
        <>
          <span style={{ marginRight: "5px" }}>{description}</span>
          <span style={{ fontSize: ".8rem" }}>{additionalText.length ? `(${ additionalText.join( ', ' ) })` : "" }</span>
        </>
      );

      return ( { value: index, display: dispVal } );
    } )
  }

  const itemOnClick = (e) => {
    const index = e.target.value || e.currentTarget.value;
    const location = locationSearchData[index];
    const mapQuery = {
      ...queryObject,
      id: location.location_id,
      lat: location.latitude,
      lon: location.longitude,
      zoom: location.zoom_depth,
      display: displayTypes.opened,
    };
    const mapUrl = getMapUrl(mapQuery);
    doUpdateUrl(mapUrl);
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
  pathname: PropTypes.string.isRequired,
  queryObject: PropTypes.object.isRequired,
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
  "selectPathname",
  "selectQueryObject",
  "selectLocationSearchText",
  "selectLocationSearchData",
  "doSetLocationSearchText",
  "doUpdateUrl",
  LocationSearch,
);
