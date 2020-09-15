import React from "react";
import ReportsContainer from "../../../../../app-components/Reports";
import CorpOfficeReportsContainer from "../../../../../app-components/Reports/CorpOfficeReports";

const ReportsPage = () => {

  return (
    <ReportsContainer activeTab="Corp Office Reports">
      <CorpOfficeReportsContainer subSectionTitle="All Locations" activeTab="All Locations" subSectionCode="CRREL">
        <div className="list-group mx-auto">
          <div className="list-group-item flex-column ">
            <div className="d-flex w-100 justify-content-between">
              <a href="/" className="h5 text-info">Location 1 (PDF)</a>
              <small>30 days ago</small>
            </div>
            <p className="mb-1">Report for location 1</p>
          </div>
          <div className="list-group-item flex-column ">
            <div className="d-flex w-100 justify-content-between">
              <a href="/" className="h5 text-info">Location 2 (PDF)</a>
              <small>40 days ago</small>
            </div>
            <p className="mb-1">Report for location 2</p>
          </div>
        </div>
      </CorpOfficeReportsContainer>
    </ReportsContainer>
  );
};

export default ReportsPage;
