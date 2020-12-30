import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "redux-bundler-react";
import Loader from "../../../../../app-common/loader/Loader";
import Table from "../../../../../app-common/table/Table";
import { formatUnderscore } from "../../../../../utils"

const NidSection = ({
  queryObject,
  cwmsNidData,
  cwmsNidIsLoading,
  doCwmsNidFetch,
}) => {
  const id = queryObject.id;
  useEffect(() => {
    doCwmsNidFetch();
  }, [id, doCwmsNidFetch]);

  if (cwmsNidIsLoading) {
    return (
      <div style={{ position: "relative" }}>
        <Loader style={{ zIndex: "10" }} />
      </div>
    );
  }
  if (!cwmsNidData || Object.keys(cwmsNidData).length === 0) {
    return <p>No NID data.</p>
  }

  const header = ["Label", "Value"];
  const body = []
  Object.keys(cwmsNidData).forEach((key) => {
    let label = formatUnderscore(key, true);
    label = label.replace(/Nid/, "NID");
    label = label.replace(/Id/, "ID");
    const value = cwmsNidData[key];
    body.push({
      id: key,
      row: [label, value],
    });
  });
  return (
    <Table
      header={header}
      body={body}
    />
  );
};

NidSection.propTypes = {
  queryObject: PropTypes.object.isRequired,
  cwmsNidData: PropTypes.object,
  cwmsNidIsLoading: PropTypes.bool.isRequired,
  doCwmsNidFetch: PropTypes.func.isRequired,
};

export default connect(
  "selectQueryObject",
  "selectCwmsNidData",
  "selectCwmsNidIsLoading",
  "doCwmsNidFetch",
  NidSection
);
