import React from "react";
import TextSection from '../../app-components/TextSection';
import SearchBox from '../../app-containers/SearchBox';
import Tabs from '../../app-components/Tabs';

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

const TabInfo = {
  activeTab: 'none', //default tab - none selected
  tabLinks: [
    { url: '/reports/CorpOfficeReports', name: 'Corp Office Reports' },
    { url: '/reports/ProjectReports', name: 'Project Reports' },
    { url: '/reports/WatershedReports', name: 'Watershed Reports' },
    { url: '/reports/DistrictReports', name: 'District Reports' }
  ]
}

const ReportsContainer = ( props ) => {

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
              <div style={ { top: '100%', zIndex: '1' } }><SearchBox text={ 'Search Reports' }/></div>
            </div>
          </div>

          <Tabs TabInfo={ TabInfo }></Tabs>
          { sectionTitleBlock ? sectionTitleBlock : '' }
          {props.children}

        </div>
      </div>
    </main>
  );
};

export default ReportsContainer;
