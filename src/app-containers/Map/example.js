import React from "react";

// Start Openlayers imports
import { Map, View } from "ol";
import { GeoJSON, XYZ } from "ol/format";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import {
  Vector as VectorSource,
  OSM as OSMSource,
  XYZ as XYZSource,
  TileWMS as TileWMSSource,
} from "ol/source";
import {
  Select as SelectInteraction,
  defaults as DefaultInteractions,
} from "ol/interaction";
import {
  Attribution,
  ScaleLine,
  ZoomSlider,
  Zoom,
  Rotate,
  MousePosition,
  OverviewMap,
  defaults as DefaultControls,
} from "ol/control";
import {
  Style,
  Fill as FillStyle,
  RegularShape as RegularShapeStyle,
  Stroke as StrokeStyle,
} from "ol/style";

import { Projection, get as getProjection } from "ol/proj";
import Overlay from "ol/Overlay";
import { fromLonLat } from "ol/proj";
// End Openlayers imports

class Maps extends React.Component {
  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);
  }
  updateDimensions() {
    const h = window.innerWidth >= 992 ? window.innerHeight : 400;
    this.setState({ height: h });
  }
  componentWillMount() {
    window.addEventListener("resize", this.updateDimensions);
    this.updateDimensions();
  }
  componentDidMount() {
    // Create an Openlayer Map instance with two tile layers
    const map = new Map({
      //  Display the map in the div with the id of map
      target: "map",
      layers: [
        new TileLayer({
          source: new XYZSource({
            url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            projection: "EPSG:3857",
          }),
        }),
        // new TileLayer({
        //   source: new TileWMSSource({
        //     url: "https://ahocevar.com/geoserver/wms",
        //     // params: {
        //     //     layers: 'topp:states',
        //     //     'TILED': true,
        //     // },
        //     projection: "EPSG:4326",
        //   }),
        //   name: "USA",
        // }),
      ],
      // Add in the following map controls
      controls: DefaultControls().extend([
        new ZoomSlider(),
        new MousePosition(),
        new ScaleLine(),
        new OverviewMap(),
      ]),
      // Render the tile layers in a map view with a Mercator projection
      view: new View({
        projection: "EPSG:3857",
        center: [-11000000, 4600000],
        zoom: 5,
      }),
    });

    // Déclaration of the Marker
    this.marker = new Overlay({
      position: fromLonLat([-95, 38.895]),
      positioning: "center-center",
      element: document.getElementById("marker"),
      stopEvent: false,
    });
    this.popup = new Overlay({
        position: fromLonLat([-95, 38.895]),
        positioning: "top-right",
        element: document.getElementById('popup')
      });
    // Adding to the Map Object
    map.addOverlay(this.marker);
    map.addOverlay(this.popup);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  render() {
    const style = {
      width: "100%",
      height: "600px",
      backgroundColor: "#cccccc",
    };
    return (
      <>
        <div id="map" style={style} />

        <div
          id="marker"
          title="Marker"
          style={{
            width: "20px",
            height: "20px",
            border: "1px solid black",
            borderRadius: "10px",
            backgroundColor: "black",
          }}
        />
        <div className="blue-circle" id="popup" title="Welcome to OpenLayers"style={{
            width: "auto",
            height: "20px",
            border: "1px solid black",
    
          }}>This is a popup</div>
       
      </>
    );
  }
}
export default Maps;
