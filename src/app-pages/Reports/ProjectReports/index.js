import React from "react";
import ReportsContainer from "../../../app-components/Reports";

const ReportsPage = () => {

  return (
    <ReportsContainer activeTab="Project Reports" sectionTitle="Project Reports">
      <div className="list-group mx-auto">
        <div className="list-group-item flex-column ">
          <div className="d-flex w-100 justify-content-between">
            <a href="/" className="h5 text-info">Project Report 1 (PDF)</a>
            <small>30 days ago</small>
          </div>
          <p className="mb-1">Project report 1</p>
        </div>
        <div className="list-group-item flex-column ">
          <div className="d-flex w-100 justify-content-between">
            <a href="/" className="h5 text-info">Project Report 2 (PDF)</a>
            <small>33 days ago</small>
          </div>
          <p className="mb-1">Project report 2</p>
        </div>
      </div>
    </ReportsContainer>
  );
};

export default ReportsPage;
