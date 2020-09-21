import React from "react";
import ReportsContainer from "../../../app-components/Reports";
import { connect } from "redux-bundler-react";

const ReportsPage = ( { districtReports, districtReportsIsLoading } ) => {

  return (
    <ReportsContainer activeTab="District Reports" sectionTitle="District Reports">
      <div className="list-group mx-auto">
        {districtReports.map((item, i) => (
          <div className="list-group-item flex-column" key={i}>
            <div className="d-flex w-100 justify-content-between">
              <h5>{item.districtName}</h5>
                {item.reports.map((value, j) => (
                  <a href={value.url} className="text-info">{value.title}</a>
                ))}
              <small>30 days ago</small>
            </div>
          </div>
        ))}
      </div>
    </ReportsContainer>
  );
};

export default connect(
  "selectDistrictReports",
  "selectDistrictReportsIsLoading",
  ReportsPage
);
