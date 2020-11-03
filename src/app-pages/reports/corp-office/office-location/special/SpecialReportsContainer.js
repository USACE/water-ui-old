import React, { useEffect } from "react";
import ReportsContainer from "../../../ReportsContainer";
import CorpOfficeReportsContainer from "../../CorpOfficeReportsContainer";
import { connect } from "redux-bundler-react";

const ReportsPage = ({
  corporateOfficeSpecialReportsData,
  corporateOfficeByRoute: office,
  doCorporateOfficeSpecialReportsFetch,
}) => {
  useEffect(() => {
    doCorporateOfficeSpecialReportsFetch();
  }, [doCorporateOfficeSpecialReportsFetch]);

  return (
    <ReportsContainer activeTab="Corp Office Reports">
      <CorpOfficeReportsContainer
        officeId={ office ? office.office_id : null }
        subSectionTitle={ office ? office.office_name : "" }
        activeTab="Special Reports"
        subSectionCode="CRREL"
      >
        <div className="list-group mx-auto">

          {corporateOfficeSpecialReportsData.map((item, i) => (
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
  "selectCorporateOfficeSpecialReportsData",
  "selectCorporateOfficeByRoute",
  "doCorporateOfficeSpecialReportsFetch",
  ReportsPage
);
