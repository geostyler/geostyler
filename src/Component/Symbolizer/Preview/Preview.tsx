import * as React from 'react';

import * as ol from 'openlayers';

import { FeatureCollection, GeometryObject } from 'geojson';
import { Symbolizer } from 'geostyler-style';

import 'openlayers/css/ol.css';
import './Preview.css';

// default props
interface DefaultPreviewProps {
  projection: string;
  dataProjection: string;
  showOsmBackground: boolean;
  mapHeight: number;
  map: ol.Map | undefined;
  layers: ol.layer.Base[] | undefined;
  controls: ol.control.Control[] | undefined;
  interactions: ol.interaction.Interaction[] | undefined;
}
// non default props
interface PreviewProps extends Partial<DefaultPreviewProps> {
  features: FeatureCollection<GeometryObject>;
  symbolizer: Symbolizer;
  onSymbolizerChange: ((changedSymb: Symbolizer) => void);
}
// state
interface PreviewState {
  symbolizer: Symbolizer;
}

/**
 * Symbolizer preview UI.
 */
class Preview extends React.Component<PreviewProps, PreviewState> {

  /** reference to the underlying OpenLayers map */
  map: ol.Map;

  /** refrence to the vector layer for the passed in features  */
  dataLayer: ol.layer.Vector;

  public static defaultProps: DefaultPreviewProps = {
    projection: 'EPSG:3857',
    dataProjection: 'EPSG:4326',
    showOsmBackground: true,
    mapHeight: 200,
    map: undefined,
    layers: undefined,
    controls: undefined,
    interactions: undefined
  };

  constructor(props: PreviewProps) {
    super(props);

    this.state = {
      symbolizer: this.props.symbolizer
    };
  }

  public componentDidMount() {

    let map: ol.Map;
    if (!this.props.map) {
      // create a new OL map and bind it to this preview DIV
      map = new ol.Map({
        layers: [],
        controls: [],
        interactions: [],
        target: 'map',
        view: new ol.View({
          projection: this.props.projection
        })
      });
    } else {
      // use passed in OL map and bind it to this preview DIV
      map = this.props.map;
      map.setTarget('map');
    }

    // show an OSM background layer if configured and no map was passed in
    if (!this.props.map && this.props.showOsmBackground) {
      const osmLayer = new ol.layer.Tile({
        source: new ol.source.OSM()
      });
      map.addLayer(osmLayer);
    }

    // add configured OL control to map, when no map was passed in
    if (!this.props.map && this.props.controls) {
      this.props.controls.forEach((ctrl) => {
        map.addControl(ctrl);
      });
    }

    // add configured OL interaction to map, when no map was passed in
    if (!this.props.map && this.props.interactions) {
      this.props.interactions.forEach((iac) => {
        map.addInteraction(iac);
      });
    }

    // add configured additional layers
    if (this.props.layers) {
      this.props.layers.forEach((layer) => {
        map.addLayer(layer);
      });
    }

    // add data features to style according to symbolizer and zoom to them (when existing)
    if (this.props.features) {

      const format = new ol.format.GeoJSON({
        defaultDataProjection: this.props.dataProjection,
        featureProjection: map.getView().getProjection()
      });

      const vectorLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
          features: format.readFeatures(this.props.features)
        }),
        style: this.symbolizer2OlStyle(this.state.symbolizer)
      });

      map.addLayer(vectorLayer);

      this.dataLayer = vectorLayer;

      // zoom to feature extent
      const extent = vectorLayer.getSource().getExtent();
      map.getView().fit(extent);

    }

    this.map = map;
  }

  /**
   * Adapts the style of the vector data in the map according to the changed symbolizer.
   * Also passes the changed symbolizer to the parent's 'onSymbolizerChange' function.
   */
  onSymbolizerChange = (symb: Symbolizer) => {

    if (this.dataLayer) {
      this.dataLayer.setStyle(this.symbolizer2OlStyle(symb));
    }

    this.props.onSymbolizerChange(symb);
  }

  /**
   * Dummy implementation to transform the incoming symbolizer to an OpenLayers
   * style object.
   * Will be replaced by an appropiate GeoStyler parser (once it is ready)
   *
   * TODO replace parsing logic with appropriate GeoStyler parser
   */
  symbolizer2OlStyle = (symbolizer: Symbolizer): any => {
    if (symbolizer.kind === 'Circle') {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: symbolizer.radius || 4,
          stroke: new ol.style.Stroke({
            color: symbolizer.strokeColor || symbolizer.color,
            width: symbolizer.strokeWidth || 1
          }),
          fill: new ol.style.Fill({
            color: symbolizer.color
          })
        })
      });
    }
  }

  render() {

    return (
      <div className="gs-symbolizer-preview" >
        <div id="map" className="map" style={{ height: this.props.mapHeight }} />
      </div>
    );
  }
}

export default Preview;
