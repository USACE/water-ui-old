import React, { useEffect,useState } from "react";
import PropTypes from 'prop-types';
import Table from "../../../app-common/table/Table";
import { connect } from "redux-bundler-react";


const damProfileHeaderArr = ["name", "value"];
let damProfileRowsArr;

const DamProfile = ({selectedLocationDetail}) => {

const [damProfileState, setDamProfileState] = useState( [] );

  useEffect (() => {
    if( selectedLocationDetail.dam_profile && Array.isArray( selectedLocationDetail.dam_profile.history ) ) {
      const damProfileJsonObj = selectedLocationDetail.dam_profile.history[0];
      damProfileRowsArr = Object.entries(damProfileJsonObj);
      setDamProfileState(damProfileRowsArr);
    }
  },[selectedLocationDetail]);

  return (
    <div className="dam-profile-wrapper">
      <h5>Dam Profile Data</h5>
    {damProfileState ? <Table rowsArr={damProfileState} headerRowArr={damProfileHeaderArr} /> :null}
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
