import * as React from 'react';

import * as ol from 'openlayers';

import { FeatureCollection, GeometryObject } from 'geojson';
import { Symbolizer } from 'geostyler-style';

import './Preview.css';

import {
  Button
} from 'antd';

import 'openlayers/css/ol.css';
import './Preview.css';
import Editor from '../Editor/Editor';

import OlStyleParser from 'geostyler-openlayers-parser';

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
  features: FeatureCollection<GeometryObject>;
  symbolizer: Symbolizer;
  onSymbolizerChange: (symbolizer: Symbolizer) => void;
}

// state
interface PreviewState {
  symbolizer: Symbolizer;
  editorVisible: boolean;
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
    interactions: undefined,
    openEditorText: 'Edit Symbolizer',
    closeEditorText: 'Close Editor'
  };

  constructor(props: any) {
    super(props);
    this.state = {
      editorVisible: false,
      symbolizer: props.symbolizer
    };
  }

  static getDerivedStateFromProps(nextProps: PreviewProps, prevState: PreviewState): PreviewState {
    return {
      symbolizer: nextProps.symbolizer,
      ...prevState
    };
  }

  componentDidUpdate() {
    if (this.dataLayer) {
      this.applySymbolizerToMapFeatures(this.state.symbolizer);
    }
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
        })
      });

      this.applySymbolizerToMapFeatures(this.state.symbolizer);

      map.addLayer(vectorLayer);

      this.dataLayer = vectorLayer;

      // zoom to feature extent
      const extent = vectorLayer.getSource().getExtent();
      map.getView().fit(extent);

    }

    this.map = map;
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
        <div id="map" className="map" style={{ height: mapHeight }}>
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
