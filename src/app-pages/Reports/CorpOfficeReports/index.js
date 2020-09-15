import React from "react";
import TextSection from '../../../app-components/TextSection';
import ReportsContainer from "../../../app-components/Reports";

const TextSubSection = {
  textAlign: 'left',
  margin: '0rem 0',
  padding: 'auto 0rem',
  width: '50%'
}

const pageSectionDivider = {
  height: 0,
  margin: '1.5rem 0',
  overflow: 'hidden',
  borderTop: '2px solid #333',
}

const ReportsPage = () => {

  return (
    <ReportsContainer activeTab="Corp Office Reports">

      <div className="d-flex w-50 justify-content-between mt-5">
        <TextSection
          containerStyle={ TextSubSection }
          title={ 'Corp Office Reports' }
        />
        <p className="mt-2">68 Offices</p>
      </div>

      <div style={ pageSectionDivider }></div>

      <div className="list-group w-50">
        <div className="list-group-item flex-column">
          <div className="d-flex w-100 justify-content-between">
            <a href="/reports/CorpOfficeReports/CERL" className="mb-1">Construction Engineering Research Labratory</a>
            <small>CREL</small>
          </div>
        </div>
        <div className="list-group-item flex-column">
          <div className="d-flex w-100 justify-content-between">
            <a href="/reports/CorpOfficeReports/CERL" className="mb-1">Construction Engineering Research Labratory</a>
            <small>CREL</small>
          </div>
        </div>
        <div className="list-group-item flex-column">
          <div className="d-flex w-100 justify-content-between">
            <a href="/reports/CorpOfficeReports/CERL" className="mb-1">Construction Engineering Research Labratory</a>
            <small>CREL</small>
          </div>
        </div>
        <div className="list-group-item flex-column">
          <div className="d-flex w-100 justify-content-between">
            <a href="/reports/CorpOfficeReports/CERL" className="mb-1">Construction Engineering Research Labratory</a>
            <small>CREL</small>
          </div>
        </div>
        <div className="list-group-item flex-column">
          <div className="d-flex w-100 justify-content-between">
            <a href="/reports/CorpOfficeReports/CERL" className="mb-1">Construction Engineering Research Labratory</a>
            <small>CREL</small>
          </div>
        </div>
        <div className="list-group-item flex-column">
          <div className="d-flex w-100 justify-content-between">
            <a href="/reports/CorpOfficeReports/CERL" className="mb-1">Construction Engineering Research Labratory</a>
            <small>CREL</small>
          </div>
        </div>
      </div>

    </ReportsContainer>
  );
};

export default ReportsPage;
