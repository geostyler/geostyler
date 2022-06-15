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

import React, { useEffect, useRef } from 'react';

import OlMap from 'ol/Map';
import OlLayerVector from 'ol/layer/Vector';
import OlSourceVector from 'ol/source/Vector';
import OlFormatGeoJSON from 'ol/format/GeoJSON';
import { ProjectionLike } from 'ol/proj';
import OlFeature from 'ol/Feature';
import OlLayerTile from 'ol/layer/Tile';
import OlSourceOSM from 'ol/source/OSM';

import { Style } from 'geostyler-style';
import { Data, VectorData } from 'geostyler-data';
import OlStyleParser from 'geostyler-openlayers-parser';

import GeometryUtil from '../../Util/GeometryUtil';

import './PreviewMap.less';

// default props
export interface PreviewMapDefaultProps {
  /** The projection of the data to visualize */
  dataProjection: ProjectionLike;
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
  data,
  style,
  map: mapProp,
  onMapDidMount
}) => {

  const containerRef = useRef();

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
        new OlLayerTile({
          source: new OlSourceOSM()
        }),
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
    map.getView().fit(
      dataLayer.getSource().getExtent(),
      {
        maxZoom: 10
      }
    );
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
   * Add the containing exampleFeatures if the passed data changes.
   */
  useEffect(() => {
    const map = mapRef.current;
    const dataLayer = dataLayerRef.current;
    if (dataLayer && (data as VectorData)?.exampleFeatures && map) {
      dataLayer.getSource().clear();
      const format = new OlFormatGeoJSON({
        dataProjection: dataProjection,
        featureProjection: map.getView().getProjection()
      });
      const olFeatures = format.readFeatures((data as VectorData).exampleFeatures);
      dataLayer.getSource().addFeatures(olFeatures);
    }
  }, [data, dataProjection]);

  /**
   * Update the layerStyle if the passed style changes.
   */
  useEffect(() => {
    const dataLayer = dataLayerRef.current;
    const styleParser = new OlStyleParser();
    styleParser.writeStyle(style)
      .then(({ output: olStyles}) => {
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
        const feature = new OlFeature({geometry});
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

export default PreviewMap;
