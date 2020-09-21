import React from "react";
import ReportsContainer from "../../../app-components/Reports";
import { connect } from "redux-bundler-react";

const ReportsPage = ( { projectReports, projectReportsIsLoading } ) => {
  console.log(projectReports);
  return (
    <ReportsContainer activeTab="Project Reports" sectionTitle="Project Reports">


      <div className="list-group mx-auto">
        {projectReports.map((item, i) => (
          <div className="list-group-item flex-column" key={i}>
            <div className="d-flex w-100 justify-content-between">
              <a href={item.url} className="h5 text-info">{item.title}</a>
              <small>30 days ago</small>
            </div>
            <p className="mb-1">Project report 1</p>
          </div>
        ))}
      </div>
    </ReportsContainer>
  );
};

export default connect(
  "selectProjectReports",
  "selectProjectReportsIsLoading",
  ReportsPage
);
