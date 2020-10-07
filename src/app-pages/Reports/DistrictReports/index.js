import React from "react";
import ReportsContainer from "../ReportsContainer";
import { connect } from "redux-bundler-react";

const ReportsPage = ( { districtReports, districtReportsIsLoading } ) => {

  return (
    <ReportsContainer activeTab="District Reports" sectionTitle="District Reports">
      <div className="list-group mx-auto">
        {districtReports.map((item, i) => (
          <div className="list-group-item flex-column" key={i}>
            <div><h5>{item.districtName}</h5></div>
            <div className="d-flex w-100 justify-content-between">
              <div className="flex-column w-100 justify-content-start">
                {item.reports.map((value, j) => (
                  <div key={j} className="d-flex w-100 justify-content-between">
                    <a href={value.url} className="text-center text-info">{value.title}</a>
                    <div><small>{ new Date( value.date ).toLocaleDateString() }</small></div>
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
