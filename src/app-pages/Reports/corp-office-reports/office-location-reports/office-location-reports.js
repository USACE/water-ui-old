import React from "react";
import ReportsContainer from "../../../../app-components/reports/reports-container";
import CorpOfficeReportsContainer from "../../../../app-components/reports/corp-office/corp-office-reports-container";
import { connect } from "redux-bundler-react";

const OfficeLocationReportsPage = ( { corporateOfficeReports, corporateOfficeByRoute: office } ) => {

  return (
    <ReportsContainer activeTab="Corp Office Reports">
      <CorpOfficeReportsContainer
        officeId={ office ? office.office_id : null } subSectionTitle={ office ? office.office_name : "" }
        activeTab="Corp Office Reports" subSectionCode="CRREL">
        <div className="list-group mx-auto">

          {corporateOfficeReports.map((item, i) => (
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
  "selectCorporateOfficeReports",
  "selectCorporateOfficeByRoute",
  OfficeLocationReportsPage
);
