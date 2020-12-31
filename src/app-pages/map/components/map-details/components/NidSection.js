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
      rowId: key,
      row: [
        { id: "label", item: label },
        { id: "value", item: value },
      ],
    });
  });

  // display link to the NID site
  // TODO: Currently this link doesn't work since we don't have the correct record id. Also
  // when you click on the link it doesn't take you to the full url, the nid site redirects
  // you to https://nid.sec.usace.army.mil/ords/f?p=105:1:::::: for some reason.
  const nidUrl = `https://nid.sec.usace.army.mil/ords/f?p=105:113:9558438802427::NO:113,2:P113_RECORDID:${cwmsNidData.record_id}`;
  body.push({
    rowId: "nid-link",
    row: [
      { id: "label", item: "NID Link" },
      { id: "value", item: <a href={nidUrl} target="_blank" rel="noopener noreferrer">{cwmsNidData.owner_name}</a> },
    ]
  })
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
