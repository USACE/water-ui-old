import React from "react";
import PropTypes from "prop-types";
import { connect } from "redux-bundler-react";
import Table from "../../../../../app-common/table/Table";

const LocationChildren = ({ cwmsChildrenData }) => {
  const header = ["Name", "Location Type"];
  const body = cwmsChildrenData.map((childData) => {
    const name = childData.label;
    const locationType = childData.location_type;
    return ({
      rowId: childData.location_code,
      row: [
        { id: "name", item: name },
        { id: "value", item: locationType }
      ],
    })
  });

  if (body.length === 0) {
    return <p>No location children data.</p>
  }
  return (
    <Table
      header={header}
      body={body}
    />
  );
};

LocationChildren.propTypes = {
  cwmsChildrenData: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    location_code: PropTypes.string,
    location_id: PropTypes.string,
    location_kind_id: PropTypes.string,
    location_type: PropTypes.string,
  })),
};

export default connect(
  "selectCwmsChildrenData",
  LocationChildren
);
