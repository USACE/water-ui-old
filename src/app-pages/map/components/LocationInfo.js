import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Table from "../../../app-common/table/Table";
import { connect } from "redux-bundler-react";

const metaDataHeaderArr = ["name", "value"];
let metaDataRowsArr;

const LocationInfo = ({ locationDetailData }) => {

const [metaDataState, setmetaDataState] = useState( null );
  useEffect (() => {
    const metaDataJsonObj = { ...locationDetailData };
    delete metaDataJsonObj.dam_profile;
    metaDataRowsArr = Object.entries(metaDataJsonObj);
    setmetaDataState(metaDataRowsArr);
  }, [locationDetailData]);

  return (
    <div className="location-info-wrapper">
      <h5>Metadata</h5>
      {metaDataState ? (
        <Table rowsArr={metaDataState} headerRowArr={metaDataHeaderArr} />
      ) : null}
    </div>
  );
};

LocationInfo.propTypes = {
  locationDetailData: PropTypes.object,
};

export default connect("selectLocationDetailData", LocationInfo);
