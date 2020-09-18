import React from "react";
import ReportsContainer from "../../../../../app-components/Reports";
import CorpOfficeReportsContainer from "../../../../../app-components/Reports/CorpOfficeReports";
import { connect } from "redux-bundler-react";

const ReportsPage = ( { corporateOfficeSpecialReports, corporateOfficeByRoute: office } ) => {

  return (
    <ReportsContainer activeTab="Corp Office Reports">
      <CorpOfficeReportsContainer
        officeId={ office ? office.office_id : null } subSectionTitle={ office ? office.office_name : "" }
        activeTab="Special Reports" subSectionCode="CRREL">
        <div className="list-group mx-auto">

          {corporateOfficeSpecialReports.map((item, i) => (
            <div className="list-group-item flex-column" key={i}>
              <div className="d-flex w-100 justify-content-between">
                <a href={ item.url } className="mb-1">{ item.title }</a>
                <small>{ new Date( item.date ).toLocaleDateString() }</small>
              </div>
            </div>
          ))}

        </div>
      </CorpOfficeReportsContainer>
    </ReportsContainer>
  );
};

export default connect(
  "selectCorporateOfficeSpecialReports",
  "selectCorporateOfficeByRoute",
  ReportsPage
);
