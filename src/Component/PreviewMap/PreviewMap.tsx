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
import React, { useCallback, useEffect, useRef } from 'react';

import OlMap from 'ol/Map';
import OlLayerVector from 'ol/layer/Vector';
import OlSourceVector from 'ol/source/Vector';
import OlFormatGeoJSON from 'ol/format/GeoJSON';
import { Projection, ProjectionLike } from 'ol/proj';
import OlFeature from 'ol/Feature';
import {
  get as getProjection,
} from 'ol/proj';
import {
  register
} from 'ol/proj/proj4.js';
import proj4 from 'proj4';
import { isEmpty } from 'ol/extent';

import { Style } from 'geostyler-style';
import { VectorData } from 'geostyler-data';
import OlStyleParser from 'geostyler-openlayers-parser';

import GeometryUtil from '../../Util/GeometryUtil';

import './PreviewMap.less';
import { StandardLonghandProperties } from 'csstype';
import { isString } from 'lodash';
import { useGeoStylerData } from '../../context/GeoStylerContext/GeoStylerContext';

export interface PreviewMapProps {
  /** The projection of the data to visualize */
  dataProjection?: ProjectionLike;
  /** The height of the map */
  mapHeight?: StandardLonghandProperties['height'];
  /** The GeoStyler Style to preview */
  style: Style;
  /** A custom map used for rendering */
  map?: OlMap;
  /** A list of layers to add to the map */
  onMapDidMount?: (map: OlMap) => void;
}

/**
 * Style preview UI.
 */
export const PreviewMap: React.FC<PreviewMapProps> = ({
  dataProjection = 'EPSG:4326',
  mapHeight = 267,
  style,
  map: mapProp,
  onMapDidMount
}) => {

  const containerRef = useRef();

  const data = useGeoStylerData();

  /** the vector layer for the passed features */
  const dataLayerRef = useRef<OlLayerVector<any>>(new OlLayerVector({
    source: new OlSourceVector()
  }));

  /** the underlying OpenLayers map */
  const mapRef = useRef<OlMap>(
    mapProp ||
    new OlMap({
      controls: [],
      layers: [
        dataLayerRef.current
      ]
    })
  );

  /**
   * Fits the preview extend to the data when the dataLayer changes.
   */
  const zoomToData = () => {
    const map = mapRef.current;
    const dataLayer = dataLayerRef.current;
    const extent = dataLayer.getSource().getExtent();
    if (extent && !isEmpty(extent)) {
      map.getView().fit(extent, { padding: [20, 20, 20, 20] });
    }
  };

  /**
   * Add the dataLayer to the map.
   */
  const addDataLayer = () => {
    const map = mapRef.current;
    const dataLayer = dataLayerRef.current;
    if (!map.getAllLayers().some(layer => layer === dataLayer)) {
      map.addLayer(dataLayer);
    }
  };

  /**
   * Fetches EPSG information from epsg.io registers the definition for openlayers
   * and returns a Promise resolving to the Projection.
   *
   * @param epsgCode An ESPG code string. e. EPSG:32614
   * @returns
   */
  const fetchInfo = async (epsgCode: string): Promise<Projection | undefined> => {
    const response = await fetch('https://epsg.io/?format=json&q=' + epsgCode);
    const json = await response.json();
    const result: any = json.results?.[0];
    if (result) {
      const proj4def = result.wkt;
      proj4.defs(epsgCode, proj4def);
      register(proj4);
      return getProjection(epsgCode);
    }
    return undefined;
  };

  /**
   * Add / refresh the containing exampleFeatures if the passed data changes.
   */
  const refreshData = useCallback(async () => {
    const map = mapRef.current;
    const dataLayer = dataLayerRef.current;
    if (dataLayer && (data as VectorData)?.exampleFeatures && map) {
      dataLayer.getSource().clear();

      let proj: Projection = getProjection(dataProjection);

      if (!proj && isString(dataProjection)) {
        try {
          proj = await fetchInfo(dataProjection);
        } catch (error) {
          throw new Error(`Could not get dataProjection: ${dataProjection}`);
        }
      }
      if (!proj) {
        throw new Error(`Could not get dataProjection: ${dataProjection}`);
      }

      const format = new OlFormatGeoJSON({
        dataProjection: proj,
        featureProjection: map.getView().getProjection()
      });
      const olFeatures = format.readFeatures((data as VectorData).exampleFeatures);
      dataLayer.getSource().addFeatures(olFeatures);
      zoomToData();
    }
  }, [data, dataProjection]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  /**
   * Update the layerStyle if the passed style changes.
   */
  useEffect(() => {
    const dataLayer = dataLayerRef.current;
    const styleParser = new OlStyleParser();
    styleParser.writeStyle(style)
      .then(({ output: olStyles }) => {
        dataLayer.setStyle(olStyles);
      });
  }, [style]);

  /**
   * If no data is provided create sample geometries based on the passed style.
   */
  useEffect(() => {
    const map = mapRef.current;
    const dataLayer = dataLayerRef.current;
    if (!data && dataLayer && map && style) {
      const geoms = GeometryUtil.getSampleGeomFromStyle(style, map.getView().getProjection());
      geoms.forEach((geometry: any) => {
        const feature = new OlFeature({ geometry });
        dataLayer.getSource().addFeature(feature);
      });
      zoomToData();
    }
  }, [style, data]);

  // Set the map if a mapProp is passed
  useEffect(() => {
    if (mapProp) {
      // use passed in OL map and bind it to this preview DIV
      mapRef.current = mapProp;
    }
  }, [mapProp]);

  /**
   * Set the target of the map if the ref is defined.
   */
  useEffect(() => {
    const map = mapRef.current;
    if (containerRef) {
      map.setTarget(containerRef.current);
      map.updateSize();
      addDataLayer();
      zoomToData();
    }
  }, []);

  /**
   * Call the `onMapDidMount` callback if defined.
   */
  useEffect(() => {
    if (containerRef) {
      if (onMapDidMount) {
        onMapDidMount(mapRef.current);
      }
    }
  }, [onMapDidMount]);

  return (
    <div
      ref={containerRef}
      className="gs-symbolizer-previewmap map"
      id={`map_${Math.floor((1 + Math.random()) * 0x10000)}`}
      style={{
        height: mapHeight
      }}
    />
  );
};
