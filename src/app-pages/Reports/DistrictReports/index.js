import React from "react";
import ReportsContainer from "../../../app-components/Reports";
import { connect } from "redux-bundler-react";

const ReportsPage = ( { districtReports, districtReportsIsLoading } ) => {

  return (
    <ReportsContainer activeTab="District Reports" sectionTitle="District Reports">
      <div className="list-group mx-auto">
        {districtReports.map((item, i) => (
          <div className="list-group-item flex-column" key={i}>
            <div className="d-flex w-100">
              <h5>{item.districtName}</h5>
              <div className="flex-column w-100">
                {item.reports.map((value, j) => (
                  <div className="d-flex w-100 justify-content-between justify-content-center">
                    <a href={value.url} className="d-flex w-100 justify-content-center text-info">{value.title}</a>
                    <small><div className="d-flex justify-content-end">{ new Date( value.date ).toLocaleDateString() }</div></small>
                  </div>
                ))}
              </div>
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
