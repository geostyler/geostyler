import * as React from 'react';

import * as ol from 'openlayers';

import { FeatureCollection, GeometryObject } from 'geojson';
import { Symbolizer, SymbolizerKind } from 'geostyler-style';

import './Preview.css';

import {
  Button
} from 'antd';

import 'openlayers/css/ol.css';
import './Preview.css';
import Editor from '../Editor/Editor';

import OlStyleParser from 'geostyler-openlayers-parser';
import {
  isEqual as _isEqual,
  get as _get
} from 'lodash';

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
  openEditorText: string;
  closeEditorText: string;
}

// non default props
interface PreviewProps extends Partial<DefaultPreviewProps> {
  features?: FeatureCollection<GeometryObject>;
  symbolizer: Symbolizer;
  onSymbolizerChange: (symbolizer: Symbolizer) => void;
}

// state
interface PreviewState {
  symbolizer: Symbolizer;
  editorVisible: boolean;
  mapTargetId: string;
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
    mapHeight: 267,
    map: undefined,
    layers: undefined,
    controls: undefined,
    interactions: undefined,
    openEditorText: 'Edit Symbolizer',
    closeEditorText: 'Close Editor'
  };

  constructor(props: PreviewProps) {
    super(props);

    const randomId = Math.floor((1 + Math.random()) * 0x10000);
    this.state = {
      editorVisible: false,
      symbolizer: props.symbolizer,
      mapTargetId: `map_${randomId}`
    };
  }

  static getDerivedStateFromProps(
      nextProps: PreviewProps,
      prevState: PreviewState): Partial<PreviewState> {

    return {
      symbolizer: nextProps.symbolizer
    };
  }

  componentDidUpdate(prevProps: PreviewProps) {
    if (this.dataLayer) {
      this.applySymbolizerToMapFeatures(this.state.symbolizer);
    }
    if (!_isEqual(this.props.features, prevProps.features)) {
      this.updateFeatures();
    }
  }

  updateFeatures() {
    // Remove previous features
    this.dataLayer.getSource().clear();

    const format = new ol.format.GeoJSON({
      defaultDataProjection: this.props.dataProjection,
      featureProjection: this.map.getView().getProjection()
    });
    // add data features to style according to symbolizer and zoom to them (when existing)
    if (this.props.features) {
      const olFeatures = format.readFeatures(this.props.features);
      this.dataLayer.getSource().addFeatures(olFeatures);
    // create a simple feature to see the symbolizer anyway
    } else {
      const geom = this.getSampleGeomFromSymbolizer();
      const sampleFeature = new ol.Feature({
        geometry: geom.transform('EPSG:4326', 'EPSG:3857')
      });
      this.dataLayer.getSource().addFeature(sampleFeature);
    }

    // zoom to feature extent
    const extent = this.dataLayer.getSource().getExtent();
    this.map.getView().fit(extent, {
      maxZoom: 12
    });
  }

  public componentDidMount() {
    let map: ol.Map;
    if (!this.props.map) {
      // create a new OL map and bind it to this preview DIV
      map = new ol.Map({
        layers: [],
        controls: [],
        interactions: [],
        target: this.state.mapTargetId,
        view: new ol.View({
          projection: this.props.projection
        })
      });
    } else {
      // use passed in OL map and bind it to this preview DIV
      map = this.props.map;
      map.setTarget(this.state.mapTargetId);
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

    const vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector()
    });

    map.addLayer(vectorLayer);
    this.dataLayer = vectorLayer;

    this.map = map;
    this.updateFeatures();
    this.applySymbolizerToMapFeatures(this.state.symbolizer);
  }

  getSampleGeomFromSymbolizer = () => {
    const kind: SymbolizerKind = _get(this.state, 'symbolizer.kind');
    switch (kind) {
      case 'Circle':
      case 'Icon':
      case 'Text':
        return new ol.geom.Point([7.10066, 50.735851]);
      case 'Fill':
        return new ol.geom.Polygon([[
            [50.734268655851345, 7.1031761169433585],
            [50.734268655851345, 7.109270095825195],
            [50.73824770380063, 7.109270095825195],
            [50.73824770380063, 7.1031761169433585],
            [50.734268655851345, 7.1031761169433585]
          ]]);
      case 'Line':
        return new ol.geom.LineString([
          [50.734268655851345, 7.1031761169433585],
          [50.734268655851345, 7.109270095825195],
          [50.73824770380063, 7.109270095825195]
        ]);
      default:
        return new ol.geom.Point([57, 12]);
    }
  }

  /**
   *
   */
  onEditButtonClicked = () => {
    this.setState({
      editorVisible: !this.state.editorVisible
    });
  }

  /**
   * Transforms the incoming symbolizer to an OpenLayers style object the
   * GeoStyler parser and applies it to the vector features on the map.
   *
   * @param {Symbolizer} symbolizer The symbolizer as holding the style to apply
   */
  applySymbolizerToMapFeatures = (symbolizer: Symbolizer): any => {

    const styleParser = new OlStyleParser();

    // we have to wrap the symbolizer in a Style object since the writeStyle
    // only accepts a Style object
    const style = {
      name: 'WrapperStyle4Symbolizer',
      rules: [{
        symbolizer: symbolizer
      }]
    };

    // parser style to OL style
    styleParser.writeStyle(style)
      .then((olStyles: ol.style.Style[]) => {
        // apply new OL style to vector layer
        this.dataLayer.setStyle(olStyles[0]);
        return olStyles[0];
    });
  }

  render() {
    const {
      mapHeight,
      symbolizer,
      openEditorText,
      closeEditorText,
      onSymbolizerChange
    } = this.props;

    return (
      <div className="gs-symbolizer-preview" >
        <div
          id={this.state.mapTargetId}
          className="map"
          style={{ height: mapHeight }}
        >
          <Button
            className="gs-edit-preview-button"
            icon="edit"
            onClick={this.onEditButtonClicked}
          >
            {this.state.editorVisible ? closeEditorText : openEditorText}
          </Button>
          {
            this.state.editorVisible ?
            <Editor
              symbolizer={symbolizer}
              onSymbolizerChange={onSymbolizerChange}
            /> : null
          }
        </div>
      </div>
    );
  }
}

export default Preview;
