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
import SldStyleParser from 'geostyler-sld-parser';
const _isEqual = require('lodash/isEqual');

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

// state
interface SLDRendererState {
  alt: string;
  legendDataUrl: string;
}

/**
 * Symbolizer Renderer UI.
 */
export class SLDRenderer extends React.Component<SLDRendererProps, SLDRendererState> {

  _styleParser: SldStyleParser;

  _requestTimeout: any;

  public static defaultProps: SLDRendererDefaultProps = {
    requestDelay: 500,
    width: 150,
    height: 100
  };

  constructor(props: SLDRendererProps) {
    super(props);
    this.state = {
      alt: 'No Image set',
      legendDataUrl: ''
    };
    this._styleParser = new SldStyleParser();
  }

  public componentDidMount() {
    const {
      symbolizers
    } = this.props;
    this.setLegendGraphicUrlForRule(symbolizers);
  }

  componentDidUpdate(prevProps: SLDRendererProps) {
    const {
      symbolizers
    } = this.props;

    if (!_isEqual(symbolizers, prevProps.symbolizers)) {
      this.setLegendGraphicUrlForRule(symbolizers);
    }
  }

  /**
   * The function that sets the legends graphic for the symbolizers
   *
   * @param {Symbolizer[]} symbolizers The passed symbolizer
   */
  setLegendGraphicUrlForRule = (symbolizers: Symbolizer[]) => {
    const {
      requestDelay,
      additionalHeaders
    } = this.props;

    this.setState({
      legendDataUrl: loading
    });

    if (this._requestTimeout) {
      clearTimeout(this._requestTimeout);
    }

    this._requestTimeout = setTimeout(() => {
      const {
        wmsBaseUrl,
        layer,
        rasterLayer,
        width,
        height,
        wmsParams
      } = this.props;
      const style: Style = {
        name: 'sld-renderer-style',
        rules: [{
          name: '',
          symbolizers: symbolizers
        }]
      };
      let lyr: string;
      // As soon as a symbolizer is of type raster symbolizer,
      // we will only create a legendGraphic for raster layers
      // as wms cannot return a mixed legendGraphic
      // TODO
      if (symbolizers.some((symbolizer: Symbolizer) => symbolizer.kind === 'Raster')) {
        lyr = rasterLayer || layer;
      } else {
        lyr = layer;
      }
      this._styleParser.writeStyle(style)
        .then((sld: string) => {
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
          HTTPUtil.post({
            url: wmsBaseUrl,
            params: params,
            additionalHeaders: additionalHeaders
          })
            .then((response: any) => {
              if (response && response.ok) {
                response.blob().then((blob: Blob) => {
                  const legendDataUrl = window.URL.createObjectURL(blob);
                  this.setState({legendDataUrl});
                });
              }
            })
            .catch((error: any) => {
              this.setState({
                alt: error
              });
            });
        });
    }, requestDelay);
  }

  render() {
    const {
      onClick,
      symbolizers,
      height,
      width
    } = this.props;
    const {
      alt,
      legendDataUrl
    } = this.state;
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
  }

}

export default SLDRenderer;
