import React from "react";
import { connect } from "redux-bundler-react";
import { fromLonLat } from "ol/proj";
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
    const {
      height,
      isLocationsMapInitialized,
      mapLocationsIsLoading,
    } = this.props;
    return (
      <div className="map-container">
        <div
          style={{
            display:
              isLocationsMapInitialized && !mapLocationsIsLoading
                ? "none"
                : "block",
          }}
          className="overlay"
        >
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>

        <div
          style={{ height: height }}
          ref={(el) => {
            this.el = el;
          }}
        />
        <div id="map-popup" className="ol-popup">
          <button id="map-popup-closer" className="ol-popup-closer" />
          <div id="map-popup-content" />
        </div>
      </div>
    );
  }
}

export default connect(
  "doMapsInitialize",
  "doMapsShutdown",
  "selectMapLocations",
  "selectIsLocationsMapInitialized",
  "selectMapLocationsIsLoading",
  Map
);
