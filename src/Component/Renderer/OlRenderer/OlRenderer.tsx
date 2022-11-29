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

import React, { useCallback, useEffect, useRef, useState } from 'react';

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

import './OlRenderer.less';

import 'ol/ol.css';
import { Data } from 'geostyler-data';

import _isEqual from 'lodash/isEqual';
import _get from 'lodash/get';
import _uniqueId from 'lodash/uniqueId';

// non default props
export interface OlRendererProps {
  data?: Data;
  symbolizers: Symbolizer[];
  symbolizerKind?: SymbolizerKind;
  onClick?: (symbolizers: Symbolizer[], event: any) => void;
}

/**
 * Symbolizer Renderer UI.
 */
export const OlRenderer: React.FC<OlRendererProps> = ({
  data,
  onClick,
  symbolizerKind,
  symbolizers
}) => {

  /** reference to the underlying OpenLayers map */
  const map = useRef<OlMap>();
  const layer = useRef<OlLayerVector<any>>();
  const [ mapId ] = useState(_uniqueId('map_'));

  const getSampleGeomFromSymbolizer = useCallback(() => {
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
  }, [symbolizerKind, symbolizers]);

  const updateFeature = useCallback(() => {
    const exampleFeatureProps: object = _get(data, 'exampleFeatures.features[0].properties');

    layer.current.getSource().clear();
    const sampleFeature = new OlFeature({
      geometry: getSampleGeomFromSymbolizer(),
      Name: 'Sample Feature',
      ...exampleFeatureProps
    });
    layer.current.getSource().addFeature(sampleFeature);
    // zoom to feature extent
    const extent = layer.current.getSource().getExtent();
    map.current.getView().fit(extent, {
      maxZoom: 20
    });
  }, [data, getSampleGeomFromSymbolizer]);

  useEffect(() => {
    layer.current = new OlLayerVector({
      source: new OlSourceVector()
    });
    map.current = new OlMap({
      layers: [layer.current],
      controls: [],
      interactions: [],
      target: mapId,
      view: new OlView({
        projection: 'EPSG:4326'
      })
    });
  }, [mapId]);

  useEffect(() => {
    updateFeature();
  }, [updateFeature]);

  useEffect(() => {
    applySymbolizers(symbolizers);
  }, [symbolizers]);

  /**
   * Transforms the incoming symbolizers to an OpenLayers style object the
   * GeoStyler parser and applies it to the vector features on the map.
   *
   * @param {Symbolizer[]} newSymbolizers The symbolizers holding the style to apply
   */
  const applySymbolizers = async(newSymbolizers: Symbolizer[]) => {
    if (!newSymbolizers) {
      return undefined;
    }
    const styleParser = new OlStyleParser();

    // we have to wrap the symbolizer in a Style object since the writeStyle
    // only accepts a Style object
    const style = {
      name: 'WrapperStyle4Symbolizer',
      rules: [{
        name: 'WrapperRule4Symbolizer',
        symbolizers: newSymbolizers
      }]
    };
    // parser style to OL style
    const { output: olStyles, errors = [] } = await styleParser.writeStyle(style);
    if (errors.length > 0) {
      return undefined;
    } else {
      // apply new OL style to vector layer
      layer.current.setStyle(olStyles);
      return olStyles;
    }
  };

  return (
    <div
      onClick={(event) => {
        if (onClick) {
          onClick(symbolizers, event);
        }
      }}
      className="gs-symbolizer-olrenderer"
      id={mapId}
    />
  );

};

export default OlRenderer;
