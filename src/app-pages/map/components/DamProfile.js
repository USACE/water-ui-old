import React, { useEffect,useState } from "react";
import PropTypes from 'prop-types';
import Table from "../../../app-common/table/Table";
import { connect } from "redux-bundler-react";


const metaDataHeaderArr = ["name", "value"];
let metaDataRowsArr;

const DamProfile = ({selectedLocationDetail}) => {

const [metaDataState, setmetaDataState] = useState();

  useEffect (() => {
    if(Object.keys(selectedLocationDetail).length !== 0){
      const metaDataJsonObj = selectedLocationDetail.dam_profile.history[0];
      metaDataRowsArr = Object.entries(metaDataJsonObj);
      setmetaDataState(metaDataRowsArr);
    }
  },[selectedLocationDetail]);

  return (
    <div className="dam-profile-wrapper">
      <h5>Dam Profile Data</h5>
    {metaDataState ? <Table rowsArr={metaDataState} headerRowArr={metaDataHeaderArr} /> :null}
    </div>
  );
};
DamProfile.propTypes = {
  selectedlocationDetail: PropTypes.object,
};

export default connect(
  "selectSelectedLocationDetail",
  DamProfile
);
