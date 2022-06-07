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

import { Symbolizer } from 'geostyler-style';
import { Data } from 'geostyler-data';

import { Renderer as OlRenderer } from '../Symbolizer/Renderer/Renderer';
import { SLDRenderer, SLDRendererAdditonalProps } from '../Symbolizer/SLDRenderer/SLDRenderer';

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
  /** Properties of the SLD renderer */
  sldRendererProps?: SLDRendererAdditonalProps;
}

export const Renderer: React.FC<RendererProps> = ({
  rendererType = 'OpenLayers',
  onSymbolizerClick = () => {},
  data,
  sldRendererProps,
  symbolizers
}) => {

  return (
    <div className='gs-renderer'>
      {
        rendererType === 'OpenLayers' && (
          <OlRenderer
            symbolizers={symbolizers}
            onClick={onSymbolizerClick}
            data={data}
          />
        )
      }
      {
        rendererType === 'SLD' && (
          <SLDRenderer
            symbolizers={symbolizers}
            onClick={onSymbolizerClick}
            {...sldRendererProps}
          />
        )
      }
    </div>
  );
};

export default Renderer;
