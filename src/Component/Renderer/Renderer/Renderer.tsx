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

import './Renderer.css';

import { OlRenderer, OlRendererProps } from '../OlRenderer/OlRenderer';
import { SLDRenderer, SLDRendererProps } from '../SLDRenderer/SLDRenderer';
import { useGeoStylerComposition } from '../../../context/GeoStylerContext/GeoStylerContext';

export type RuleRendererType = 'OpenLayers' | 'SLD';

export interface RendererComposableProps {
  rendererType?: RuleRendererType;
}

export type RendererProps = RendererComposableProps & (OlRendererProps | SLDRendererProps);

export const Renderer: React.FC<RendererProps> = (props) => {

  const composition = useGeoStylerComposition('Renderer');
  const composed = {...props, ...composition};
  let {
    rendererType = 'OpenLayers',
    ...rendererProps
  } = composed;

  let renderer = null;

  if (rendererType === 'OpenLayers') {
    renderer = (
      <OlRenderer
        {...rendererProps as OlRendererProps}
      />
    );
  }
  else if (rendererType === 'SLD') {
    renderer = (
      <SLDRenderer
        {...rendererProps as SLDRendererProps}
      />
    );
  }

  return (
    <div className='gs-renderer'>
      { renderer }
    </div>
  );
};
