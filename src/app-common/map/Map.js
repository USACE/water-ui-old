import React from "react";
import { connect } from "redux-bundler-react";
import { fromLonLat } from "ol/proj";
import Loader, { loaderTypes } from "../loader/Loader";
import "./map.scss";

class Map extends React.Component {
  componentDidMount() {
    const { mapKey, options, doMapsInitialize } = this.props;
    // assume our options.center values are lon lat
    if (options && options.center) options.center = fromLonLat(options.center);
    doMapsInitialize(mapKey, this.el, options);
  }

  componentWillUnmount() {
    const { mapKey, doMapsShutdown } = this.props;
    doMapsShutdown(mapKey);
  }

  render() {
    const { height, isLocationsMapDataSet } = this.props;
    return (
      <>
        <div
          style={{ height: height, position: 'relative' }}
          ref={(el) => {
            this.el = el;
          }}
        >
          {!isLocationsMapDataSet && <Loader type={loaderTypes.SPINNER} />}
        </div>
        <div id="map-popup" className="ol-popup">
          <button id="map-popup-closer" className="ol-popup-closer"/>
          <div id="map-popup-content"/>
        </div>
    </>
    );
  }
}

export default connect(
  "doMapsInitialize",
  "doMapsShutdown",
  "selectIsLocationsMapDataSet",
  Map
);
