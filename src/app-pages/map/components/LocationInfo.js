import React, { useEffect,useState } from "react";
import PropTypes from 'prop-types';
import Table from "../../../app-common/table/Table";
import { connect } from "redux-bundler-react";


const metaDataHeaderArr = ["name", "value"];
let metaDataRowsArr;

const LocationInfo = ({selectedLocationDetail}) => {

const [metaDataState, setmetaDataState] = useState();
  useEffect (() => {
  const metaDataJsonObj = selectedLocationDetail;
  delete metaDataJsonObj.dam_profile;
  metaDataRowsArr = Object.entries(metaDataJsonObj);
  setmetaDataState(metaDataRowsArr)
  },[selectedLocationDetail]);

  return (
    <div className="LocationInfoWrapper">
      <h5>Metadata</h5>
    {metaDataState ? <Table rowsArr={metaDataState} headerRowArr={metaDataHeaderArr} /> :null}
    </div>
  );
};
LocationInfo.propTypes = {
  selectedlocationDetail: PropTypes.object,
};

export default connect(
  "selectSelectedLocationDetail",
  LocationInfo
);
