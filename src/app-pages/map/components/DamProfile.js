import React, { useEffect,useState } from "react";
import PropTypes from 'prop-types';
import Table from "../../../app-common/table/Table";
import { connect } from "redux-bundler-react";


const damProfileHeaderArr = ["name", "value"];
let damProfileRowsArr;

const DamProfile = ({ locationDetailData }) => {

const [damProfileState, setDamProfileState] = useState( [] );

  useEffect (() => {
    if(Object.keys(locationDetailData).length > 0){
      const damProfileJsonObj = locationDetailData.dam_profile.history[0];
      damProfileRowsArr = Object.entries(damProfileJsonObj);
      setDamProfileState(damProfileRowsArr);
    }
  },[locationDetailData]);

  return (
    <div className="dam-profile-wrapper">
      <h5>Dam Profile Data</h5>
    {damProfileState ? <Table rowsArr={damProfileState} headerRowArr={damProfileHeaderArr} /> :null}
    </div>
  );
};
DamProfile.propTypes = {
  locationDetailData: PropTypes.object,
};

export default connect(
  "selectLocationDetailData",
  DamProfile
);
