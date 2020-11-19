import React from "react";
import PropTypes from "prop-types";
import { connect } from "redux-bundler-react";
import debounce from "lodash/debounce";
import Cards from "../../app-common/Cards";
import TextSection from "../../app-common/TextSection";
import CirclePics from "../../app-common/CirclePics";
import { cardObj, circlePicObj } from "./data.js";
import LocationSearch from "./components/LocationSearch";
import DistrictsDropdown from "./components/DistrictsDropdown";
import BasinsDropdown from "./components/BasinsDropdown";
import "./homePage.scss";
import background from "../../img/yellowstone-national-park.jpg";

const containerTextSection = {
  textAlign: "center",
  margin: "1rem 0",
  padding: "auto 12rem",
  width: "100%",
  color: "black"
};

const titleStyle = {
  textTransform: "capitalize",
  fontSize: "2.5rem",
  color: "black",
  fontWeight: "600",
}

const bodyStyle = {
  marginTop: "1rem",
  marginBottom: "1rem",
  fontSize: "1.25rem",
  fontWeight: "300",
  opacity: "1",
  color: "black",
}

const HomePage = ({ doSetLocationSearchCriteriaUpdated }) => {
  const debounceFetch = debounce(doSetLocationSearchCriteriaUpdated, 500);

  return (
    <div className="home-page-container">
      <div className="banner-img-container">
        <img className="banner-img" src={ background } alt="" />
        <div className="p-5 header-container">
          <TextSection
            containerStyle={ containerTextSection }
            titleStyle={ titleStyle }
            bodyStyle={ bodyStyle }
            title="find water resources data across the U.S."
            body="Access water resources data such as elevation, precipitation, storage, and flow status of more than 700 USACE reservoir and lock & dam projects."
          />
        </div>
        <div className="search-box-container py-4 px-4 mx-auto container position-relative text-center">
          <LocationSearch debounceFetch={debounceFetch} />
          <p className="mt-3">Or search by district and basin</p>
          <div className="district-basin-dd row">
            <div className="col-md-6">
              <DistrictsDropdown />
            </div>
            <div className="col-md-6">
              <BasinsDropdown />
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-5 home-info-content-container">
        { cardObj && <Cards cardObj={ cardObj }/> }
        <div className="container mx-auto my-5">
          <TextSection
            title="The Mission of Access to Water"
            body="The United States Army Corps of Engineers (USACE) is responsible for operating and maintaining more than 700 lock and dam projects nationwide. The Access to Water Resources Data - Corps Water Management System (CWMS) Data Dissemination tool supports the USACE water control management mission by utilizing visualizations and reports to provide continuous assessment, awareness, and effective decision support of lock and dam projects, which in turn reduces risks to people, property, and the environment."
          />
          { circlePicObj && <CirclePics cardObj={ circlePicObj }/> }
        </div>
      </div>
    </div>
  );
};

HomePage.propTypes = {
  doSetLocationSearchCriteriaUpdated: PropTypes.func.isRequired,
};

export default connect("doSetLocationSearchCriteriaUpdated", HomePage);
