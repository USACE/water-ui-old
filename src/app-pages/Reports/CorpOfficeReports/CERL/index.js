import React from "react";
import ReportsContainer from "../../../../app-components/Reports";
import CorpOfficeReportsContainer from "../../../../app-components/Reports/CorpOfficeReports";

const ReportsPage = () => {

  return (
    <ReportsContainer activeTab="Corp Office Reports">
      <CorpOfficeReportsContainer subSectionTitle="Corp Office Reports" activeTab="Corp Office Reports" subSectionCode="CRREL">
        <div className="list-group mx-auto">
          <div className="list-group-item flex-column ">
            <div className="d-flex w-100 justify-content-between">
              <a href="/" className="h5 text-info">Missouri River Basin Water Management Bulletin (PDF)</a>
              <small>30 days ago</small>
            </div>
            <p className="mb-1">Summary report for all reservoirs in the Missouri River Region area of responsibility.
              Produced on a daily basis</p>
          </div>
          <div className="list-group-item flex-column ">
            <div className="d-flex w-100 justify-content-between">
              <a href="/" className="h5 text-info">Missouri River Basin Water Management Bulletin (PDF)</a>
              <small>30 days ago</small>
            </div>
            <p className="mb-1">Summary report for all reservoirs in the Missouri River Region area of responsibility.
              Produced on a daily basis</p>
          </div>
          <div className="list-group-item flex-column ">
            <div className="d-flex w-100 justify-content-between">
              <a href="/" className="h5 text-info">Missouri River Basin Water Management Bulletin (PDF)</a>
              <small>30 days ago</small>
            </div>
            <p className="mb-1">Summary report for all reservoirs in the Missouri River Region area of responsibility.
              Produced on a daily basis</p>
          </div>
        </div>
      </CorpOfficeReportsContainer>
    </ReportsContainer>
  );
};

export default ReportsPage;
