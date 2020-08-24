import React from "react";
import classnames from "classnames";
import TextSection from '../../../../app-components/TextSection';
import SearchBox from '../../../../app-containers/SearchBox';
import Tabs from '../../../../app-components/Tabs';
import TabsRender from "../../../../app-components/Tabs";

const ReportsPage = () => {

	return (
		<main>
      <div className="header-section">
      <TextSection
				containerStyle={'text-left bg-gray-400 bg-opacity-50 px-8 lg:px-48 py-8'}
				title={'Reports'}
				titleStyle={'capitalize text-grey-900 text-2xl'}
			/>
      <div className="search-box-container py-4 px-6 mx-8 lg:mx-56 relative bg-white" style={{"top":"-30px"}}>
        <SearchBox text={'Search Reports'}/>
      </div>

      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center hover:text-red-400">
              <a className="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " href="/reports/CorpOfficeReports">
                    Corp Office Reports  
                  </a>
                </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center hover:text-red-400">
              <a className="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " href="/reports/ProjectReports">
                    Project Reports  
                    </a>
                  </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center hover:text-red-400">
              <a className="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " href="/reports/WatershedReports">
                    Watershed Reports  
                    </a>
                  </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center hover:text-red-400">
              <a className="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " href="/DistrictReports">
                    District Reports  
                    </a>
                  </li>
                </ul>
                </div>
          </div>

          <div className="text-left bg-gray-400 bg-opacity-50 px-8 lg:px-48 py-8">Corp Office Reports</div>

          <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center hover:text-red-400">
              <a className="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " href="/reports/CorpOfficeReports">
                    Corp Office Reports (0)
                  </a>
                </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center hover:text-red-400">
              <a className="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " href="/reports/CorpOfficeReports/AllLocations">
                    All Locations (0)
                    </a>
                  </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center hover:text-red-400">
              <a className="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " href="/reports/CorpOfficeReports/SpecialReports">
                    Special Reports (0) 
                    </a>
                  </li>
                </ul>
                </div>
          </div>

          <div className="text-left bg-gray-400 bg-opacity-50 px-8 lg:px-48 py-8">Special Reports</div>

      </div>
    </main>
    );
  };
  
  export default ReportsPage;
