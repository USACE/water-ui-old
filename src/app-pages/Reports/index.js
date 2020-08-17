import React from "react";
import TextSection from '../../app-components/TextSection';
import SearchBox from '../../app-containers/SearchBox';
import Tabs from '../../app-components/Tabs';
import TabsRender from "../../app-components/Tabs";

/*
export default () => (
  <main>

<div>Reports</div>
  </main>
);
*/

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
      <TabsRender/>
      </div>
    </main>
    );
  };
  
  export default ReportsPage;
