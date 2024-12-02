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
import OlFeature, {
  FeatureLike as OlFeatureLike
} from 'ol/Feature';
import OlView from 'ol/View';

import OlStyleParser from 'geostyler-openlayers-parser';

import { isGeoStylerFunction, Symbolizer, SymbolizerKind } from 'geostyler-style';

import './OlRenderer.less';

import 'ol/ol.css';

import _isEqual from 'lodash/isEqual';
import _get from 'lodash/get';
import _uniqueId from 'lodash/uniqueId';
import placeholder from './placeholder';
import { InfoCircleTwoTone } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { useGeoStylerLocale } from '../../../context/GeoStylerContext/GeoStylerContext';

export interface OlRendererProps {
  symbolizers: Symbolizer[];
  symbolizerKind?: SymbolizerKind;
  onClick?: (symbolizers: Symbolizer[], event: any) => void;
}

/**
 * Symbolizer Renderer UI.
 */
export const OlRenderer: React.FC<OlRendererProps> = ({
  onClick,
  symbolizerKind,
  symbolizers
}) => {

  /** reference to the underlying OpenLayers map */
  const map = useRef<OlMap>();
  const layer = useRef<OlLayerVector<any>>();
  const [ mapId ] = useState(_uniqueId('map_'));
  const [containsFunctions, setContainsFunctions] = useState(false);

  const locale = useGeoStylerLocale('Renderer');

  const getSampleGeomFromSymbolizer = useCallback(() => {
    const kind: SymbolizerKind = symbolizerKind || _get(symbolizers, '[0].kind');
    switch (kind) {
      case 'Mark':
      case 'Icon':
      case 'Text':
        return new OlGeomPoint([7, 50]);
      case 'Fill':
        return new OlGeomPolygon([[
          [7, 50],[8, 51],[9, 51],[10, 50],[9, 49],[8, 48],[7, 48],[6, 49],[6, 50],[7, 50]
        ]]);
      case 'Line':
        return new OlGeomLineString([
          [7, 50], [8, 50], [8.4, 50.75], [9, 49], [9.5, 52], [10, 49.5], [10.2, 50], [12, 50]
        ]);
      default:
        return new OlGeomPoint([7.10066, 50.735851]);
    }
  }, [symbolizerKind, symbolizers]);

  const updateFeature = useCallback(() => {
    layer.current.getSource().clear();
    const sampleFeature = new OlFeature({
      geometry: getSampleGeomFromSymbolizer(),
      Name: 'Sample Feature'
    });
    layer.current.getSource().addFeature(sampleFeature);
    // zoom to feature extent
    const extent = layer.current.getSource().getExtent();
    map.current.getView().fit(extent, {
      maxZoom: 20,
      padding: [10, 10, 10, 10]
    });
  }, [getSampleGeomFromSymbolizer]);

  useEffect(() => {
    layer.current = new OlLayerVector({
      source: new OlSourceVector<OlFeatureLike>()
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
    let clonedSymbolizers = structuredClone(newSymbolizers);
    let hasFunctions = false;

    // no geostyler data provided we replace the expressions with a placeholder symbol
    for (let i = 0; i < newSymbolizers.length; i++) {
      for (const value of Object.values(newSymbolizers[i])) {
        if (isGeoStylerFunction(value)) {
          hasFunctions = true;
          const kind = newSymbolizers[i].kind;
          if (['Mark', 'Icon', 'Text'].includes(kind)) {
            clonedSymbolizers = [{
              kind: 'Mark',
              wellKnownName: 'circle',
              strokeColor: '#000000',
              strokeWidth: 2,
              color: '#FFFFFF',
              radius: 20
            }, {
              kind: 'Icon',
              image: placeholder,
              size: 24,
              offset: [24, -24]
            }];
          }
          if (kind === 'Fill') {
            clonedSymbolizers = [{
              kind: 'Fill',
              outlineColor: '#000000',
              outlineWidth: 2,
              graphicFill: {
                kind: 'Icon',
                image: placeholder,
                size: 24
              }
            }];
          }
          // this is currently not supported by the openlayers parser
          if (kind === 'Line') {
            clonedSymbolizers = [{
              kind: 'Line',
              width: 2
            }, {
              kind: 'Icon',
              image: placeholder,
              size: 24
            }];
          }
          break;
        }
      }
    }

    setContainsFunctions(hasFunctions);

    // we have to wrap the symbolizer in a Style object since the writeStyle
    // only accepts a Style object
    const style = {
      name: 'WrapperStyle4Symbolizer',
      rules: [{
        name: 'WrapperRule4Symbolizer',
        symbolizers: clonedSymbolizers
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
      id={mapId}
      className="gs-symbolizer-olrenderer"
      role="presentation"
      onClick={(event) => {
        if (onClick) {
          onClick(symbolizers, event);
        }
      }}
    >
      {
        containsFunctions &&
          <Tooltip title={locale.placeholderInfo}>
            <InfoCircleTwoTone />
          </Tooltip>
      }
    </div>
  );

};
