import * as React from 'react';

import OlMap from 'ol/Map';
import OlLayerVector from 'ol/layer/Vector';
import OlSourceVector from 'ol/source/Vector';
import OlGeomPoint from 'ol/geom/Point';
import OlGeomLineString from 'ol/geom/LineString';
import OlGeomPolygon from 'ol/geom/Polygon';
import OlFeature from 'ol/Feature';
import OlView from 'ol/View';

import OlStyleParser from 'geostyler-openlayers-parser';

import { Symbolizer, SymbolizerKind } from 'geostyler-style';

import './Renderer.css';

import 'ol/ol.css';
import './Renderer.css';
import { Data, VectorData } from 'geostyler-data';

const _isEqual = require('lodash/isEqual');
const _get = require('lodash/get');
const _uniqueId = require('lodash/uniqueId');

// non default props
export interface RendererProps {
  data?: Data;
  symbolizers: Symbolizer[];
  symbolizerKind?: SymbolizerKind;
  onClick?: (symbolizers: Symbolizer[], event: any) => void;
}

/**
 * Symbolizer Renderer UI.
 */
export class Renderer extends React.Component<RendererProps> {

  /** reference to the underlying OpenLayers map */
  _map: any;

  _layer: any;

  _mapId: string;

  constructor(props: RendererProps) {
    super(props);
    this._mapId = _uniqueId('map_');
  }

  public componentDidMount() {
    const {
      symbolizers
    } = this.props;

    this._layer = new OlLayerVector({
      source: new OlSourceVector()
    });
    this._map = new OlMap({
        layers: [this._layer],
        controls: [],
        interactions: [],
        target: this._mapId,
        view: new OlView({
          projection: 'EPSG:4326'
        })
    });

    this.updateFeature();
    this.applySymbolizers(symbolizers);
  }

  componentDidUpdate(prevProps: RendererProps) {
    const {
      symbolizers
    } = this.props;

    if (!_isEqual(symbolizers, prevProps.symbolizers)) {
      this.updateFeature();
      this.applySymbolizers(symbolizers);
    }
  }

  updateFeature() {
    const vectorData = this.props.data as VectorData;
    let featureProperties = {};

    if (vectorData.exampleFeatures) {
      featureProperties = vectorData.exampleFeatures.features[0].properties;
    }

    this._layer.getSource().clear();
    const sampleFeature = new OlFeature({
      geometry: this.getSampleGeomFromSymbolizer(),
      Name: 'Sample Feature',
      ...featureProperties
    });
    this._layer.getSource().addFeature(sampleFeature);
    // zoom to feature extent
    const extent = this._layer.getSource().getExtent();
    this._map.getView().fit(extent, {
      maxZoom: 20
    });
  }

  getSampleGeomFromSymbolizer = () => {
    const {
      symbolizerKind,
      symbolizers
    } = this.props;
    const kind: SymbolizerKind = symbolizerKind || _get(symbolizers, '[0].kind');
    switch (kind) {
      case 'Mark':
      case 'Icon':
      case 'Text':
        return new OlGeomPoint([7.10066, 50.735851]);
      case 'Fill':
        return new OlGeomPolygon([[
            [7.1031761169433585, 50.734268655851345],
            [7.109270095825195, 50.734268655851345, ],
            [7.109270095825195, 50.73824770380063],
            [7.1031761169433585, 50.73824770380063],
            [7.1031761169433585, 50.734268655851345, ]
          ]]);
      case 'Line':
        return new OlGeomLineString([
          [7.062578201293945, 50.721786104206004],
          [7.077512741088867, 50.729610159968296],
          [7.082319259643555, 50.732435192351126],
          [7.097940444946289, 50.73748722929948],
          [7.106866836547852, 50.73775882875318],
          [7.117509841918945, 50.73889952925885],
          [7.129182815551758, 50.7504679214779]
        ]);
      default:
        return new OlGeomPoint([7.10066, 50.735851]);
    }
  }

  /**
   * Transforms the incoming symbolizers to an OpenLayers style object the
   * GeoStyler parser and applies it to the vector features on the map.
   *
   * @param {Symbolizer[]} symbolizers The symbolizers holding the style to apply
   */
  applySymbolizers = (symbolizers: Symbolizer[]) => {
    const styleParser = new OlStyleParser();

    // we have to wrap the symbolizer in a Style object since the writeStyle
    // only accepts a Style object
    const style = {
      name: 'WrapperStyle4Symbolizer',
      rules: [{
        symbolizers: symbolizers
      }]
    };
    // parser style to OL style
    styleParser.writeStyle(style)
      .then((olStyles: any) => {
        // apply new OL style to vector layer
        this._layer.setStyle(olStyles);
        return olStyles;
      })
      .catch(() => {
        return;
      });
  }

  render() {
    const {
      onClick,
      symbolizers
    } = this.props;
    return (
      <div
        onClick={(event) => {
          if (onClick) {
            onClick(symbolizers, event);
          }
        }}
        className="gs-symbolizer-renderer"
        id={this._mapId}
      />
    );
  }

}

export default Renderer;
