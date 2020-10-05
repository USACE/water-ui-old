import React from 'react';
import Card from '../../app-components/Cards';
import TextSection from '../../app-components/TextSection';
import CirclePics from '../../app-components/CirclePics';
import Map from '../../app-containers/Map';
import SearchBox from '../../app-containers/SearchBox';
import DropDown from '../../app-components/DropDown';
import { cardObj, circlePicObj } from './data.js';
import { connect } from "redux-bundler-react";

const containerTextSection = {
  textAlign: 'center',
  margin: '1rem 0',
  padding: 'auto 12rem',
  width: '100%',
};

const headerContainerStyle = {
  backgroundColor: '#cbd5e0'
}

const HomePage = ( { districts, basinsForDistrict, doSetSelectedDistrict, selectedDistrict, doSetSelectedBasin } ) => {
  const mapOptions = { center: [ -77.0364, 38.895 ], zoom: 4 };

  const districtOptions = districts.map( val => {
    return { id: val.district_office_id, value: val.district_name }
  } );

  const basinOptions = basinsForDistrict.map( val => {
    return { id: val.basin_location_id, value: val.basin_name }
  } );

  const onDistrictChange = ( e, doUpdateUrl ) => {
    doSetSelectedDistrict( e.target.value );
  };

  const onBasinChange = ( e, doUpdateUrl ) => {
    doSetSelectedBasin( e.target.value );
    doUpdateUrl( '/map' );
  };

  return (
    <main>
      <div className="header-section">
        <div style={ headerContainerStyle } className="p-5">
          <TextSection
            containerStyle={ containerTextSection }
            title={ 'find water resources data across the U.S.' }
            body={
              'Access water resources data such as elevation, precipitation, storage, and flow status of more than 700 USACE reservoir and lock & dam projects.'
            }
          />
        </div>

        <div className="search-box-container py-4 px-4 mx-auto container position-relative">
          <div style={ { top: '100%', zIndex: 1, textAlign: "center" } }>
            <SearchBox text={ 'Search by City, State, ZIP, or Project Names' } />
            <p className="mt-3">Or search by district and basin</p>
            <div className="district-basin-dd row">
              <div className="col-md-6">
                <DropDown label={ "Districts Dropdown" } id={ "districts-dropdown" } options={ districtOptions }
                          value={ selectedDistrict }
                          title={ "District" } onChange={ onDistrictChange }/>
              </div>
              <div className="col-md-6">
                <DropDown label={ "Basin Dropdown" } id={ "basins-dropdown" } options={ basinOptions } title={ "Basin" }
                          onChange={ onBasinChange }/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Map mapKey={ 'homePageMap' } options={ mapOptions } height={ '600px' }/>

      <div className="container mx-auto px-5">
        { cardObj && <Card cardObj={ cardObj }/> }
        <div className="container mx-auto my-5">
          <TextSection
            title={ 'The Mission of Access to Water' }
            body={
              'The United States Army Corps of Engineers (USACE) is responsible for operating and maintaining more than 700 lock and dam projects nationwide. The Access to Water Resources Data - Corps Water Management System (CWMS) Data Dissemination tool supports the USACE water control management mission by utilizing visualizations and reports to provide continuous assessment, awareness, and effective decision support of lock and dam projects, which in turn reduces risks to people, property, and the environment.'
            }
          />
          { circlePicObj && <CirclePics cardObj={ circlePicObj }/> }
        </div>
      </div>
    </main>
  );
};

export default connect(
  'selectDistricts',
  'selectBasinsForDistrict',
  'doSetSelectedDistrict',
  'selectSelectedDistrict',
  'doSetSelectedBasin',
  HomePage
);
