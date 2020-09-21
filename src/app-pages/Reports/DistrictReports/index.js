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
              <div className="flex-column">
                {item.reports.map((value, j) => (
                  <div className="d-flex justify-content-center">
                    <a href={value.url} className="text-center text-info">{value.title}</a>
                    <small>{ new Date( value.date ).toLocaleDateString() }</small>
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
