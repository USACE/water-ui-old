import React from "react";
//import classnames from "classnames";
import TextSection from '../../../../../app-components/TextSection';
import SearchBox from '../../../../../app-containers/SearchBox';
import Tabs from '../../../../../app-components/Tabs';

const containerTextSection = {
  textAlign: 'left',
  margin: '1rem 0',
  padding: 'auto 12rem',
  width: '50%'
}

const TextSubSection = {
  textAlign: 'left',
  margin: '0rem 0',
  padding: '0rem 5rem 0rem 0rem',
  width: '100%'
}

const titleStyle = {
  fontSize: '3rem'
}

const headerContainerStyle = {
  backgroundColor: '#cbd5e0'
}

const pageSectionDivider = {
  height: 0,
  margin: '1.5rem 0',
  overflow: 'hidden',
  borderTop: '2px solid #333',
}

const TabInfo = {
  activeTab: 'Corp Office Reports',
  tabLinks: [
    { url: '/reports/CorpOfficeReports', name: 'Corp Office Reports' },
    { url: '/reports/ProjectReports', name: 'Project Reports' },
    { url: '/reports/WatershedReports', name: 'Watershed Reports' },
    { url: '/reports/DistrictReports', name: 'District Reports' }
  ]
}

const SubTabs = {
  activeTab: 'All Locations',
  tabLinks: [
    { url: '/reports/CorpOfficeReports/CERL', name: 'Corp Office Reports' },
    { url: '/reports/CorpOfficeReports/CERL/AllLocations', name: 'All Locations' },
    { url: '/reports/CorpOfficeReports/CERL/SpecialReports', name: 'Special Reports' }
  ]
}

const ReportsPage = () => {

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

          <div className="d-flex w-100 justify-content-between mt-5">
            <TextSection
              containerStyle={ TextSubSection }
              title={ 'Construction Engineering Research Labratory Reports' }
            />
            <p className="mt-2">CERL</p>
          </div>

          <Tabs TabInfo={ SubTabs }></Tabs>

          <div style={ pageSectionDivider }></div>

          <div className="list-group mx-auto">
            <div className="list-group-item flex-column ">
              <div className="d-flex w-100 justify-content-between">
                <a href="/" className="h5 text-info">Missouri River Basin Water Management Bulletin (PDF)</a>
                <small>30 days ago</small>
              </div>
              <p className="mb-1">Summary report for all reservoirs in the Missouri River Region area of responsibility.
                Produced on a daily basis</p>
            </div>
            <div className="list-group-item flex-column ">
              <div className="d-flex w-100 justify-content-between">
                <a href="/" className="h5 text-info">Missouri River Basin Water Management Bulletin (PDF)</a>
                <small>30 days ago</small>
              </div>
              <p className="mb-1">Summary report for all reservoirs in the Missouri River Region area of responsibility.
                Produced on a daily basis</p>
            </div>
            <div className="list-group-item flex-column ">
              <div className="d-flex w-100 justify-content-between">
                <a href="/" className="h5 text-info">Missouri River Basin Water Management Bulletin (PDF)</a>
                <small>30 days ago</small>
              </div>
              <p className="mb-1">Summary report for all reservoirs in the Missouri River Region area of responsibility.
                Produced on a daily basis</p>
            </div>
            <div className="list-group-item flex-column ">
              <div className="d-flex w-100 justify-content-between">
                <a href="/" className="h5 text-info">Missouri River Basin Water Management Bulletin (PDF)</a>
                <small>30 days ago</small>
              </div>
              <p className="mb-1">Summary report for all reservoirs in the Missouri River Region area of responsibility.
                Produced on a daily basis</p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default ReportsPage;
