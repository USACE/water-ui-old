import React from "react";
import Tabs from "../../Tabs";
import TextSection from "../../TextSection";

const pageSectionDivider = {
  height: 0,
  margin: '1.5rem 0',
  overflow: 'hidden',
  borderTop: '2px solid #333',
}

const textSubSection = {
  textAlign: 'left',
  margin: '0rem 0',
  padding: '0rem 5rem 0rem 0rem',
  width: '100%'
}

const CorpOfficeReportsContainer = ( props ) => {
  const { subSectionTitle, subSectionCode } = props;

  const TabInfo = {
    activeTab: 'Corp Office Reports',
    tabLinks: [
      { url: `/reports/CorpOfficeReports/${ props.officeId }`, name: 'Corp Office Reports' },
      { url: `/reports/CorpOfficeReports/${ props.officeId }/AllLocations`, name: 'All Locations' },
      { url: `/reports/CorpOfficeReports/${ props.officeId }/SpecialReports`, name: 'Special Reports' }
    ]
  }

  if( props.activeTab ) TabInfo.activeTab = props.activeTab;

  return (
    <>
      <div className="d-flex w-100 justify-content-between mt-5">
        <TextSection
          containerStyle={ textSubSection }
          title={ subSectionTitle }
        />
        <p className="mt-2">{ subSectionCode }</p>
      </div>

      <Tabs TabInfo={ TabInfo }></Tabs>
      <div style={ pageSectionDivider }></div>
      {props.children}
    </>
  );
};

export default CorpOfficeReportsContainer;
