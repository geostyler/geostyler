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
import OlFormatGeoJSON from 'ol/format/GeoJSON';
import OlGeomPoint from 'ol/geom/Point';
import OlGeomLineString from 'ol/geom/LineString';
import OlGeomPolygon from 'ol/geom/Polygon';
import OlView from 'ol/View';
import OlFeature from 'ol/Feature';
import OlLayerTile from 'ol/layer/Tile';
import OlSourceOSM from 'ol/source/OSM';

import { Style } from 'geostyler-style';

import './PreviewMap.less';

import 'ol/ol.css';

import OlStyleParser from 'geostyler-openlayers-parser';

import { Data, VectorData } from 'geostyler-data';

import { localize } from '../LocaleWrapper/LocaleWrapper';

// default props
export interface PreviewMapDefaultProps {
  /** The projection of the PreviewMap */
  projection: string;
  /** The projection of the data to visualize */
  dataProjection: string;
  /** Whether an OSM basemap should be shown */
  showOsmBackground: boolean;
  /** The height of the map */
  mapHeight: number;
}

// non default props
export interface PreviewMapProps extends Partial<PreviewMapDefaultProps> {
  /** The data to visualize */
  data?: Data;
  /** The GeoStyler Style to preview */
  style: Style;
  /** A custom map used for rendering */
  map?: any;
  /** A list of layers to add to the map */
  layers?: any[];
  /** A list of OpenLayers controls to add to the map */
  controls?: any[];
  /** A list of OpenLayers interactions to add to the map */
  interactions?: any[];
  /** Callback method that is triggered, when the map is mounted */
  onMapDidMount?: (map: any) => void;
}

/**
 * Style preview UI.
 */
export class PreviewMap extends React.PureComponent<PreviewMapProps> {

  /** Openlayers Style Parser instance */
  _styleParser = new OlStyleParser();

  /** reference to the underlying OpenLayers map */
  map: any;

  /** refrence to the vector layer for the passed in features  */
  dataLayer: any;

  /** id of the generated mapdiv */
  _mapTargetId: string = `map_${Math.floor((1 + Math.random()) * 0x10000)}`;

  public static defaultProps: PreviewMapDefaultProps = {
    projection: 'EPSG:3857',
    dataProjection: 'EPSG:4326',
    showOsmBackground: true,
    mapHeight: 267
  };

  static componentName: string = 'PreviewMap';

  public componentDidUpdate() {
    const {
      style
    } = this.props;

    this._styleParser.writeStyle(style)
      .then((olStyles: any) => {
        this.dataLayer.setStyle(olStyles);
      });
    this.setFeatures();
  }

  public componentDidMount() {
    const {
      controls,
      interactions,
      layers,
      onMapDidMount,
      showOsmBackground,
      style,
      projection
    } = this.props;

    let map: any;
    if (!this.props.map) {
      // create a new OL map and bind it to this preview DIV
      map = new OlMap({
        layers: [],
        controls: [],
        interactions: [],
        target: this._mapTargetId,
        view: new OlView({
          projection: projection
        })
      });
    } else {
      // use passed in OL map and bind it to this preview DIV
      map = this.props.map;
      map.setTarget(this._mapTargetId);
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

    this._styleParser.writeStyle(style)
      .then((olStyles: any) => {
        this.dataLayer.setStyle(olStyles);
      });

    this.map = map;

    if (onMapDidMount) {
      onMapDidMount(map);
    }

    this.setFeatures();
  }

  setFeatures = () => {
    const data = this.props.data as VectorData;

    this.dataLayer.getSource().clear();
    if (data && data.exampleFeatures) {
      const format = new OlFormatGeoJSON({
        dataProjection: this.props.dataProjection,
        featureProjection: this.map.getView().getProjection()
      });
      const olFeatures = format.readFeatures(data.exampleFeatures);
      this.dataLayer.getSource().addFeatures(olFeatures);
    } else {
      const geoms = this.getSampleGeomFromStyle();
      geoms.forEach((geometry: any) => {
        const feature = new OlFeature({geometry});
        this.dataLayer.getSource().addFeature(feature);
      });
    }
    this.map.getView().fit(this.dataLayer.getSource().getExtent());
  }

  getSampleGeomFromStyle = () => {
    const {
      style
    } = this.props;

    const kinds: string[] = [];

    style.rules.forEach(rule => {
      rule.symbolizers.forEach(symbolizer => {
        if (!kinds.includes(symbolizer.kind)) {
          kinds.push(symbolizer.kind);
        }
      });
    });

    return kinds.map(kind => {
      switch (kind) {
        case 'Mark':
        case 'Icon':
        case 'Text':
          return (new OlGeomPoint([7.10066, 50.735851]))
            .transform('EPSG:4326', this.props.projection);
        case 'Fill':
          return (new OlGeomPolygon([[
              [7.1031761169433585, 50.734268655851345],
              [7.109270095825195, 50.734268655851345],
              [7.109270095825195, 50.73824770380063],
              [7.1031761169433585, 50.73824770380063],
              [7.1031761169433585, 50.734268655851345]
            ]]))
              .transform('EPSG:4326', this.props.projection);
        case 'Line':
          return (new OlGeomLineString([
            [7.062578201293945, 50.721786104206004],
            [7.077512741088867, 50.729610159968296],
            [7.082319259643555, 50.732435192351126],
            [7.097940444946289, 50.73748722929948],
            [7.106866836547852, 50.73775882875318],
            [7.117509841918945, 50.73889952925885],
            [7.129182815551758, 50.7504679214779]
          ]))
            .transform('EPSG:4326', this.props.projection);
        default:
          return (new OlGeomPoint([7.10066, 50.735851]))
            .transform('EPSG:4326', this.props.projection);
      }
    });
  }

  render() {
    const {
      mapHeight,
    } = this.props;

    return (
      <div
        className="gs-symbolizer-previewmap map"
        id={this._mapTargetId}
        style={{
          height: mapHeight
        }}
      />
    );
  }
}

export default localize(PreviewMap, PreviewMap.componentName);
