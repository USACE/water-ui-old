import React from "react";
//import classnames from "classnames";
import TextSection from '../../../app-components/TextSection';
import SearchBox from '../../../app-containers/SearchBox';
import Tabs from '../../../app-components/Tabs';

const containerTextSection = {
	textAlign: 'left',
  margin:'1rem 0rem',
	padding:'auto 12rem',
	width:'50%'
}

const TextSubSection = {
  textAlign: 'left',
    margin:'0rem 0',
	padding: 'auto 0rem',
	width: '50%'
}

const titleStyle = {
  fontSize: '3rem'
}

const headerContainerStyle = {
	backgroundColor: '#cbd5e0'
}

const TabInfo = {
  activeTab: 'Corp Office Reports',
  tabLinks: [
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

      <div class="d-flex w-100 justify-content-between">
        <TextSection
          containerStyle={containerTextSection}
          title={'Reports'}
          titleStyle={titleStyle}
        />
        <div className="search-box-container w-50 py-4 px-4 mx-auto container position-relative">
          <div style={{ top: '100%', zIndex: '1'}}><SearchBox text={'Search Reports'} /></div>
        </div>
      </div>

      <Tabs TabInfo={TabInfo}></Tabs>

      <div class="d-flex w-50 justify-content-between mt-5">
        <TextSection 
          containerStyle={TextSubSection}
          title={'Corp Office Reports'}
        />
        <p class="mt-2">68 Offices</p>
      </div>
        
      <div class="dropdown-divider w-50"></div>

      <div class="list-group w-50">
        <div class="list-group-item flex-column">
          <div class="d-flex w-100 justify-content-between">
            <a href="/reports/CorpOfficeReports/CERL" class="mb-1">Construction Engineering Research Labratory</a>
              <small>CREL</small>
          </div>
        </div>
        <div class="list-group-item flex-column">
          <div class="d-flex w-100 justify-content-between">
            <a href="/reports/CorpOfficeReports/CERL" class="mb-1">Construction Engineering Research Labratory</a>
              <small>CREL</small>
          </div>
        </div>
        <div class="list-group-item flex-column">
          <div class="d-flex w-100 justify-content-between">
            <a href="/reports/CorpOfficeReports/CERL" class="mb-1">Construction Engineering Research Labratory</a>
              <small>CREL</small>
          </div>
        </div>
        <div class="list-group-item flex-column">
          <div class="d-flex w-100 justify-content-between">
            <a href="/reports/CorpOfficeReports/CERL" class="mb-1">Construction Engineering Research Labratory</a>
              <small>CREL</small>
          </div>
        </div>
        <div class="list-group-item flex-column">
          <div class="d-flex w-100 justify-content-between">
            <a href="/reports/CorpOfficeReports/CERL" class="mb-1">Construction Engineering Research Labratory</a>
              <small>CREL</small>
          </div>
        </div>
        <div class="list-group-item flex-column">
          <div class="d-flex w-100 justify-content-between">
            <a href="/reports/CorpOfficeReports/CERL" class="mb-1">Construction Engineering Research Labratory</a>
              <small>CREL</small>
          </div>
        </div>
      </div>
      
      </div>
      </div>
    </main>
    );
  };
  
  export default ReportsPage;
