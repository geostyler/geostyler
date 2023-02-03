/* Released under the BSD 2-Clause License
 *
 * Copyright © 2021-present, terrestris GmbH & Co. KG and GeoStyler contributors
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

import React from 'react';

import './Renderer.less';

import { Symbolizer, SymbolizerKind } from 'geostyler-style';
import { Data } from 'geostyler-data';

import OlRenderer from '../OlRenderer/OlRenderer';
import SLDRenderer from '../SLDRenderer/SLDRenderer';
import { useGeoStylerComposition } from '../../../context/GeoStylerContext/GeoStylerContext';

// default props
interface RendererDefaultProps {
  /** The renderer to use for previews. */
  rendererType: 'SLD' | 'OpenLayers';
  /** The callback that is triggered, when the renderer was clicked. */
  onSymbolizerClick: (symbolizers: Symbolizer[], event: any) => void;
}

// non default props
export interface RendererProps extends Partial<RendererDefaultProps> {
  /** The symbolizers to render. */
  symbolizers: Symbolizer[];
  /** Reference to internal data object (holding schema and example features) */
  data?: Data;
  /** The kind of the symbolizer to render */
  symbolizerKind?: SymbolizerKind;
  /** The base URL for the WMS */
  wmsBaseUrl?: string;
  /** Additional WMS parameters */
  wmsParams?: any;
  /** The name of the layer to render the style on */
  layer?: string;
  /** The name of the raster layer to render the style on  */
  rasterLayer?: string;
  /** Additional headers for the WMS HTTP request */
  additionalHeaders?: any;
  /** The delay for triggering the request in ms  */
  requestDelay?: number;
  /** The width of the requested image */
  width?: number;
  /** The height of the requested image */
  height?: number;
}

export const Renderer: React.FC<RendererProps> = (props) => {

  const composition = useGeoStylerComposition('Renderer', {});

  const {
    rendererType = 'OpenLayers',
    onSymbolizerClick = () => {},
    data,
    symbolizers,
    symbolizerKind,
    wmsBaseUrl,
    wmsParams,
    layer,
    rasterLayer,
    additionalHeaders,
    requestDelay,
    width,
    height
  } = {...props, ...composition};

  let renderer = (<div></div>);

  if (rendererType === 'OpenLayers') {
    renderer = (
      <OlRenderer
        symbolizers={symbolizers}
        onClick={onSymbolizerClick}
        data={data}
        symbolizerKind={symbolizerKind}

      />
    );
  }
  else if (rendererType === 'SLD') {
    renderer = (
      <SLDRenderer
        symbolizers={symbolizers}
        onClick={onSymbolizerClick}
        wmsBaseUrl={wmsBaseUrl}
        wmsParams={wmsParams}
        layer={layer}
        rasterLayer={rasterLayer}
        additionalHeaders={additionalHeaders}
        requestDelay={requestDelay}
        width={width}
        height={height}
      />
    );
  }

  return (
    <div className='gs-renderer'>
      { renderer }
    </div>
  );
};

export default Renderer;