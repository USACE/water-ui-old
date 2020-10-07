import React from "react";
import TabLinks from "../../../app-components/TabLinks";
import TextSection from "../../../app-components/TextSection";
import { RoutePaths } from "../../../app-bundles/routes-bundle";

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
      { url: RoutePaths.CorpOfficeReports.replace( ":corpOfficeId", props.officeId ), name: 'Corp Office Reports' },
      { url: RoutePaths.CorpOfficeLocationReports.replace( ":corpOfficeId", props.officeId ), name: 'All Locations' },
      { url: RoutePaths.CorpOfficeSpecialReports.replace( ":corpOfficeId", props.officeId ), name: 'Special Reports' }
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

      <TabLinks TabInfo={ TabInfo }></TabLinks>
      <div style={ pageSectionDivider }></div>
      {props.children}
    </>
  );
};

export default CorpOfficeReportsContainer;
