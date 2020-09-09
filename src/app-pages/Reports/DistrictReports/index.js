import React from "react";
//import classnames from "classnames";
import TextSection from '../../../app-components/TextSection';
import SearchBox from '../../../app-containers/SearchBox';
import Tabs from '../../../app-components/Tabs';

const containerTextSection = {
	textAlign: 'center',
	margin:'1rem 0',
	padding: 'auto 12rem',
	width: '100%'
}

const headerContainerStyle = {
	backgroundColor: '#cbd5e0'
}

const TabInfo = {
  activeTab: 'District Reports',
  tabList: [
    {url:'/reports/CorpOfficeReports', name:'Corp Office Reports'},
    {url:'/reports/ProjectReports', name:'Project Reports'},
    {url:'/reports/WatershedReports', name:'Watershed Reports'},
    {url:'/reports/DistrictReports', name:'District Reports'}
  ]
}

const ReportsPage = () => {

	return (
    <main>
      <div className="header-section">
      <div style={headerContainerStyle} className="p-5">
      <TextSection
        containerStyle={containerTextSection}
        title={'Reports'}
      />
      <div className="search-box-container py-4 px-4 mx-auto container position-relative">
        <div style={{ top: '100%', zIndex: '1'}}><SearchBox text={'Search Reports'} /></div>
      </div>
  
      <Tabs TabInfo={TabInfo}></Tabs>
      
      </div>
      </div>
    </main>
    );
  };
  
  export default ReportsPage;