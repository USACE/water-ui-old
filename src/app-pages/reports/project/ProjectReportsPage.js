import React, { useEffect } from "react";
import ReportsContainer from "../ReportsContainer";
import { connect } from "redux-bundler-react";

const ProjectReportsPage = ( { projectReportsData, projectReportsIsLoading, doProjectReportsFetch } ) => {
  useEffect(() => {
    doProjectReportsFetch();
  }, [doProjectReportsFetch]);

  return (
    <ReportsContainer activeTab="Project Reports" sectionTitle="Project Reports">


      <div className="list-group mx-auto">
        {projectReportsData.map((item, i) => (
          <div className="list-group-item flex-column" key={i}>
            <div className="d-flex w-100 justify-content-between">
              <a href={item.url} className="h5 text-info">{item.title}</a>
              <small>{ new Date( item.date ).toLocaleDateString() }</small>
            </div>
            <p className="mb-1">Report info </p>
          </div>
        ))}
      </div>
    </ReportsContainer>
  );
};

export default connect(
  "selectProjectReportsData",
  "selectProjectReportsIsLoading",
  "doProjectReportsFetch",
  ProjectReportsPage
);
