import React, { useEffect } from "react";
import TextSection from '../../../app-common/TextSection';
import ReportsContainer from "../ReportsContainer";
import { connect } from "redux-bundler-react";
import { RoutePaths } from "../../../app-bundles/route-paths";

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

const CorpOfficeReportsPage = ( { corporateOfficeData, corporateOfficeIsLoading, doCorporateOfficeFetch } ) => {
  // get the corporate office data on the initial render
  useEffect(() => {
    doCorporateOfficeFetch();
  }, [doCorporateOfficeFetch])

  return (
    <ReportsContainer activeTab="Corp Office Reports">

      <div className="d-flex w-50 justify-content-between mt-5">
        <TextSection
          containerStyle={ TextSubSection }
          title={ 'Corp Office Reports' }
        />
        <p className="mt-2">{ corporateOfficeData.length } Offices</p>
      </div>

      <div style={ pageSectionDivider }></div>

      <div className="list-group w-50">
        { corporateOfficeData.map( ( item, i ) => (
          <div className="list-group-item flex-column" key={ i }>
            <div className="d-flex w-100 justify-content-between">
              <a href={ `${ RoutePaths.CorpOfficeReports.replace( ":corpOfficeId", item.office_id ) }` }
                 className="mb-1">{ item.office_name }</a>
              <small>CREL</small>
            </div>
          </div>
        ) ) }
      </div>

    </ReportsContainer>
  );
};

export default connect(
  "selectCorporateOfficeData",
  "selectCorporateOfficeIsLoading",
  "doCorporateOfficeFetch",
  CorpOfficeReportsPage
);
