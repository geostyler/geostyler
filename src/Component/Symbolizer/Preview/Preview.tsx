/* Released under the BSD 2-Clause License
 *
 * Copyright © 2018-present, terrestris GmbH & Co. KG and GeoStyler contributors
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

import * as React from 'react';

import OlMap from 'ol/Map';
import OlLayerVector from 'ol/layer/Vector';
import OlSourceVector from 'ol/source/Vector';
import OlGeomPoint from 'ol/geom/Point';
import OlGeomLineString from 'ol/geom/LineString';
import OlGeomPolygon from 'ol/geom/Polygon';
import OlFormatGeoJSON from 'ol/format/GeoJSON';
import OlFeature from 'ol/Feature';
import OlView from 'ol/View';
import OlLayerTile from 'ol/layer/Tile';
import OlSourceOSM from 'ol/source/OSM';

import { Symbolizer, SymbolizerKind, Style } from 'geostyler-style';

import './Preview.less';

import {
  Button
} from 'antd';

import { EditOutlined } from '@ant-design/icons';

import 'ol/ol.css';

import OlStyleParser from 'geostyler-openlayers-parser';

import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';

import { VectorData } from 'geostyler-data';
import { IconEditorProps } from '../IconEditor/IconEditor';

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import SymbolizerEditorWindow from '../SymbolizerEditorWindow/SymbolizerEditorWindow';
import en_US from '../../../locale/en_US';
import { GeoStylerLocale } from '../../../locale/locale';

// default props
export interface PreviewDefaultProps {
  hideEditButton: boolean;
  projection: string;
  dataProjection: string;
  showOsmBackground: boolean;
  mapHeight: number;
  locale: GeoStylerLocale['Preview'];
}

// non default props
export interface PreviewProps extends Partial<PreviewDefaultProps> {
  internalDataDef?: VectorData;
  symbolizers: Symbolizer[];
  iconEditorProps?: Partial<IconEditorProps>;
  onSymbolizersChange?: (symbolizers: Symbolizer[]) => void;
  onAddSymbolizer?: () => void;
  onRemoveSymbolizer?: (symbolizer: Symbolizer, key: number) => void;
  onMapDidMount?: (map: any) => void;
  map?: any;
  layers?: any[];
  controls?: any[];
  interactions?: any[];
  colorRamps?: {
    [name: string]: string[];
  };
}

// state
interface PreviewState {
  symbolizers: Symbolizer[];
  editorVisible: boolean;
  mapTargetId: string;
  editorId: string;
}

/**
 * Symbolizer preview UI.
 * @deprecated This component is deprecated and will be removed with v10.
 */
export class Preview extends React.Component<PreviewProps, PreviewState> {

  static componentName: string = 'Preview';

  public static defaultProps: PreviewDefaultProps = {
    locale: en_US.Preview,
    hideEditButton: false,
    projection: 'EPSG:3857',
    dataProjection: 'EPSG:4326',
    showOsmBackground: true,
    mapHeight: 267
  };

  /** reference to the underlying OpenLayers map */
  map: any;

  /** reference to the vector layer for the passed features  */
  dataLayer: any;

  /** reference to the editButton */
  _editButton: any;

  constructor(props: PreviewProps) {
    super(props);

    const randomId = Math.floor((1 + Math.random()) * 0x10000);
    this.state = {
      editorVisible: false,
      symbolizers: props.symbolizers,
      mapTargetId: `map_${randomId}`,
      editorId: `gs-edit-preview-button_${randomId}`
    };
  }

  static getDerivedStateFromProps(
    nextProps: PreviewProps): Partial<PreviewState> {

    return {
      symbolizers: nextProps.symbolizers
    };
  }

  public shouldComponentUpdate(nextProps: PreviewProps, nextState: PreviewState): boolean {
    const diffProps = !_isEqual(this.props, nextProps);
    const diffState = !_isEqual(this.state, nextState);
    return diffProps || diffState;
  }

  componentDidUpdate(prevProps: PreviewProps, prevState: PreviewState) {
    if (this.dataLayer) {
      this.applySymbolizersToMapFeatures(this.state.symbolizers);
    }

    const features = this.props.internalDataDef ? this.props.internalDataDef.exampleFeatures : undefined;
    const prevFeatures = prevProps.internalDataDef ? prevProps.internalDataDef.exampleFeatures : undefined;
    let equal: boolean = true;
    if (!_isEqual(features, prevFeatures)) {
      equal = false;
    }
    this.state.symbolizers.some((symb: Symbolizer, idx: number) => {
      if (!prevState.symbolizers[idx] || !_isEqual(symb.kind, prevState.symbolizers[idx].kind)) {
        equal = false;
        return true;
      } else {
        return false;
      }
    });
    if (!equal) {
      this.updateFeatures();
    }
  }

  updateFeatures() {
    const {
      projection
    } = this.props;
    // Remove previous features
    this.dataLayer.getSource().clear();

    const format = new OlFormatGeoJSON({
      dataProjection: this.props.dataProjection,
      featureProjection: this.map.getView().getProjection()
    });
    // add data features to style according to symbolizer and zoom to them (when existing)
    if (this.props.internalDataDef && this.props.internalDataDef.exampleFeatures) {
      const olFeatures = format.readFeatures(this.props.internalDataDef.exampleFeatures);
      this.dataLayer.getSource().addFeatures(olFeatures);
    // create a simple feature to see the symbolizer anyway
    } else {
      const geom = this.getSampleGeomFromSymbolizer();
      const sampleFeature = new OlFeature({
        geometry: geom.transform('EPSG:4326', projection),
        Name: 'Sample Feature'
      });
      this.dataLayer.getSource().addFeature(sampleFeature);
    }

    // zoom to feature extent
    const extent = this.dataLayer.getSource().getExtent();
    this.map.getView().fit(extent, {
      maxZoom: 20
    });
  }

  public componentDidMount() {
    const {
      controls,
      interactions,
      layers,
      onMapDidMount,
      showOsmBackground
    } = this.props;

    let map: any;
    if (!this.props.map) {
      // create a new OL map and bind it to this preview DIV
      map = new OlMap({
        layers: [],
        controls: [],
        interactions: [],
        target: this.state.mapTargetId,
        view: new OlView({
          projection: this.props.projection
        })
      });
    } else {
      // use passed in OL map and bind it to this preview DIV
      map = this.props.map;
      map.setTarget(this.state.mapTargetId);
    }

    // show an OSM background layer if configured and no map was passed in
    if (!this.props.map && showOsmBackground) {
      const osmLayer = new OlLayerTile({
        source: new OlSourceOSM()
      });
      map.addLayer(osmLayer);
    }

    // add configured OL control to map, when no map was passed in
    if (!this.props.map && controls) {
      this.props.controls.forEach((ctrl) => {
        map.addControl(ctrl);
      });
    }

    // add configured OL interaction to map, when no map was passed in
    if (!this.props.map && interactions) {
      this.props.interactions.forEach((iac) => {
        map.addInteraction(iac);
      });
    }

    // add configured additional layers
    if (layers) {
      layers.forEach((layer) => {
        map.addLayer(layer);
      });
    }

    const vectorLayer = new OlLayerVector({
      source: new OlSourceVector()
    });

    map.addLayer(vectorLayer);
    this.dataLayer = vectorLayer;

    this.map = map;
    this.updateFeatures();
    this.applySymbolizersToMapFeatures(this.state.symbolizers);

    if (onMapDidMount) {
      onMapDidMount(map);
    }
  }

  getSampleGeomFromSymbolizer = () => {
    const kind: SymbolizerKind = _get(this.state, 'symbolizers[0].kind');
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
  };

  /**
   *
   */
  onEditButtonClicked = () => {
    this.setState({
      editorVisible: !this.state.editorVisible
    });
  };

  /**
   * Transforms the incoming symbolizers to an OpenLayers style object the
   * GeoStyler parser and applies it to the vector features on the map.
   *
   * @param {Symbolizer[]} symbolizers The symbolizers holding the style to apply
   */
  applySymbolizersToMapFeatures = async(symbolizers: Symbolizer[]) => {
    const styleParser = new OlStyleParser();

    // we have to wrap the symbolizer in a Style object since the writeStyle
    // only accepts a Style object
    const style: Style = {
      name: 'WrapperStyle4Symbolizer',
      rules: [{
        name: 'WrapperRule4Symbolizer',
        symbolizers: symbolizers
      }]
    };
    // parser style to OL style
    const { output: olStyle, errors = [] } = await styleParser.writeStyle(style);
    if (errors.length < 1) {
      // apply new OL style to vector layer
      this.dataLayer.setStyle(olStyle);
      return olStyle;
    }
    return undefined;
  };

  render() {
    const {
      mapHeight,
      locale,
      symbolizers,
      hideEditButton,
      onSymbolizersChange,
      colorRamps
    } = this.props;

    const {
      editorVisible,
      editorId,
      mapTargetId
    } = this.state;

    let windowX, windowY;

    if (editorVisible && !hideEditButton ) {
      const buttonElement = document.getElementById(editorId);
      const buttonBounds = buttonElement.getBoundingClientRect();
      windowX = buttonBounds.right + window.scrollX;
      windowY = buttonBounds.top + window.scrollY;
    }

    return (
      <div className="gs-symbolizer-preview">
        <div
          id={mapTargetId}
          className="map"
          style={{ height: mapHeight }}
        >
          {
            !hideEditButton &&
          <Button
            id={editorId}
            className="gs-edit-preview-button"
            icon={<EditOutlined />}
            onClick={this.onEditButtonClicked}
          >
            {editorVisible ? locale.closeEditorText : locale.openEditorText}
          </Button>
          }
          {
            editorVisible && !hideEditButton ?
              <SymbolizerEditorWindow
                x={windowX}
                y={windowY}
                onClose={this.onEditButtonClicked}
                symbolizers={symbolizers}
                onSymbolizersChange={onSymbolizersChange}
                colorRamps={colorRamps}
              /> : null
          }
        </div>
      </div>
    );
  }
}

export default localize(Preview, Preview.componentName);
