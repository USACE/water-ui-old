import React from "react";
import TextSection from '../../app-common/TextSection';
import SearchBox from '../../app-common/SearchBox';
import TabLinks from '../../app-common/TabLinks';
import { RoutePaths } from "../../app-bundles/routes-bundle";

const containerTextSection = {
  textAlign: 'left',
  margin: '1rem 0',
  padding: 'auto 12rem',
  width: '50%'
}

const titleStyle = {
  fontSize: '3rem'
}

const headerContainerStyle = {
  backgroundColor: '#cbd5e0'
}

const sectionTitleStyle = {
  margin: "2rem 0rem"
}

const ReportsContainer = ( props ) => {
  const TabInfo = {
    activeTab: 'none', //default tab - none selected
    tabLinks: [
      { url: RoutePaths.CorpOfficeList, name: 'Corp Office Reports' },
      { url: RoutePaths.ProjectReports, name: 'Project Reports' },
      { url: RoutePaths.WatershedReports, name: 'Watershed Reports' },
      { url: RoutePaths.DistrictReports, name: 'District Reports' }
    ]
  }

  if( props.activeTab ) TabInfo.activeTab = props.activeTab;

  let sectionTitleBlock = null;
  if( props.sectionTitle ) sectionTitleBlock = <h2 style={sectionTitleStyle}>{ props.sectionTitle }</h2>

  return (
    <main>
      <div className="header-section">
        <div style={ headerContainerStyle } className="p-5">
          <div className="d-flex w-100 justify-content-between">
            <TextSection
              containerStyle={ containerTextSection }
              title={ 'Reports' }
              titleStyle={ titleStyle }
            />
            <div className="search-box-container w-50 py-4 px-4 mx-auto container position-relative">
              <div style={ { top: '100%', zIndex: 1 } }><SearchBox text={ 'Search Reports' }/></div>
            </div>
          </div>

          <TabLinks TabInfo={ TabInfo }></TabLinks>
          { sectionTitleBlock ? sectionTitleBlock : '' }
          {props.children}

        </div>
      </div>
    </main>
  );
};

export default ReportsContainer;
