import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "redux-bundler-react";
import { getDamProfileData, renderDamProfileChart } from "./dam-profile-utils";

const DamProfile = ( props ) => {
  const {
    /** @type a2w.models.CwmsDetail */
    cwmsDetailData
  } = props;

  useEffect(() => {
    const damProfileData = getDamProfileData(cwmsDetailData);
    renderDamProfileChart(damProfileData);
  }, [cwmsDetailData]);

  if (!cwmsDetailData) {
    return <p>No dam profile data.</p>
  }
  return (
    <svg
      id="dpc-1"
      viewBox="0 0 1240 650"
      preserveAspectRatio="xMinYMin meet"
    />
  );
};

DamProfile.propTypes = {
  cwmsDetailData: PropTypes.object.isRequired,
};

export default connect(
  "selectCwmsDetailData",
  DamProfile
);
