import React from "react";
import ReportsContainer from "../../../../../app-components/Reports";
import CorpOfficeReportsContainer from "../../../../../app-components/Reports/CorpOfficeReports";

const ReportsPage = () => {

  return (
    <ReportsContainer activeTab="Corp Office Reports">
      <CorpOfficeReportsContainer subSectionTitle="Special Reports" activeTab="Special Reports" subSectionCode="CRREL">
        <div className="list-group mx-auto">
          <div className="list-group-item flex-column ">
            <div className="d-flex w-100 justify-content-between">
              <a href="/" className="h5 text-info">Special Report 1 (PDF)</a>
              <small>30 days ago</small>
            </div>
            <p className="mb-1">Special report 1</p>
          </div>
          <div className="list-group-item flex-column ">
            <div className="d-flex w-100 justify-content-between">
              <a href="/" className="h5 text-info">Special Report 2 (PDF)</a>
              <small>33 days ago</small>
            </div>
            <p className="mb-1">Special report 2</p>
          </div>
        </div>
      </CorpOfficeReportsContainer>
    </ReportsContainer>
  );
};

export default ReportsPage;
