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
import React, { useCallback, useEffect, useRef, useState }  from 'react';
import SldStyleParser from 'geostyler-sld-parser';
import _isEqual from 'lodash/isEqual';

import './SLDRenderer.less';
import { Style, Symbolizer } from 'geostyler-style';
import HTTPUtil from '../../../Util/HTTPUtil';
import loading from './LoadingIcon';

interface SLDRendererDefaultProps {
  requestDelay: number;
  width: number;
  height: number;
}

export interface SLDRendererAdditonalProps extends Partial<SLDRendererDefaultProps> {
  wmsBaseUrl: string;
  layer: string;
  rasterLayer?: string;
  additionalHeaders?: any;
  wmsParams?: any;
}

// non default props
export interface SLDRendererProps extends Partial<SLDRendererAdditonalProps> {
  onClick?: (symbolizers: Symbolizer[], event: any) => void;
  symbolizers: Symbolizer[];
}

const styleParser = new SldStyleParser();

/**
 * Symbolizer Renderer UI.
 */
export const SLDRenderer: React.FC<SLDRendererProps> = ({
  requestDelay = 500,
  width = 150,
  height = 100,
  wmsBaseUrl,
  layer,
  rasterLayer,
  additionalHeaders,
  wmsParams,
  onClick,
  symbolizers
}) => {

  const [alt, setAlt] = useState<string>();
  const [legendDataUrl, setLegendDataUrl] = useState<string>();
  const requestTimeout = useRef<any>();

  /**
   * The function that sets the legends graphic for the symbolizers
   *
   * @param {Symbolizer[]} newSymbolizers The passed symbolizer
   */
  const setLegendGraphicUrlForRule = useCallback((newSymbolizers: Symbolizer[]) => {

    setLegendDataUrl(loading);

    if (requestTimeout) {
      clearTimeout(requestTimeout.current);
    }

    requestTimeout.current = setTimeout(async() => {
      const style: Style = {
        name: 'sld-renderer-style',
        rules: [{
          name: '',
          symbolizers: newSymbolizers
        }]
      };
      let lyr: string;
      // As soon as a symbolizer is of type raster symbolizer,
      // we will only create a legendGraphic for raster layers
      // as wms cannot return a mixed legendGraphic
      // TODO
      if (newSymbolizers.some((symbolizer: Symbolizer) => symbolizer.kind === 'Raster')) {
        lyr = rasterLayer || layer;
      } else {
        lyr = layer;
      }
      const {
        output: sld,
        errors = []
      } = await styleParser.writeStyle(style);
      const params = {
        'SERVICE': 'WMS',
        'VERSION': '1.3.0',
        'REQUEST': 'GetLegendGraphic',
        'FORMAT': 'image/png',
        'TRANSPARENT': 'true',
        'LAYER': lyr,
        'SLD_BODY': sld,
        'WIDTH': width,
        'HEIGHT': height,
        ...wmsParams
      };
      try {
        const response = await HTTPUtil.post({
          url: wmsBaseUrl,
          params: params,
          additionalHeaders: additionalHeaders
        });
        if (response && response.ok) {
          response.blob().then((blob: Blob) => {
            setLegendDataUrl(window.URL.createObjectURL(blob));
          });
        }
      } catch (error: any) {
        errors.push(error);
      }
      if (errors.length > 0) {
        setAlt(errors[0]?.message);
      }
    }, requestDelay);
  }, [
    additionalHeaders,
    height,
    layer,
    rasterLayer,
    requestDelay,
    width,
    wmsBaseUrl,
    wmsParams
  ]);

  useEffect(() => {
    setLegendGraphicUrlForRule(symbolizers);
  }, [symbolizers, setLegendGraphicUrlForRule]);

  return (
    <div
      onClick={(event) => {
        if (onClick) {
          onClick(symbolizers, event);
        }
      }}
      className="gs-symbolizer-sldrenderer"
    >
      <img
        width={width}
        height={height}
        src={legendDataUrl}
        alt={alt}
      />
    </div>
  );

};

export default SLDRenderer;
