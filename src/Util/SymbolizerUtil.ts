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

import {
  Symbolizer,
  MarkSymbolizer,
  IconSymbolizer,
  SymbolizerKind,
  TextSymbolizer,
  LineSymbolizer,
  FillSymbolizer,
  RasterSymbolizer
} from 'geostyler-style';

/**
 * @class SymbolizerUtil
 */
class SymbolizerUtil {

  static markSymbolizer: MarkSymbolizer = {
    kind: 'Mark',
    wellKnownName: 'Circle',
    color: '#0E1058',
    opacity: 1,
    fillOpacity: 1,
    strokeOpacity: 1
  };

  static iconSymbolizer: IconSymbolizer = {
    kind: 'Icon',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Parking_icon.svg/128px-Parking_icon.svg.png',
    opacity: 1
  };

  static fillSymbolizer: FillSymbolizer = {
    kind: 'Fill',
    color: '#0E1058',
    opacity: 1,
    fillOpacity: 1
  };

  static lineSymbolizer: LineSymbolizer = {
    kind: 'Line',
    color: '#0E1058',
    width: 3,
    opacity: 1
  };

  static textSymbolizer: TextSymbolizer = {
    kind: 'Text',
    label: 'Your Label',
    size: 12,
    opacity: 1
  };

  static rasterSymbolizer: RasterSymbolizer = {
    kind: 'Raster'
  };

  static defaultSymbolizer: Symbolizer = SymbolizerUtil.markSymbolizer;

  /**
   * Generates a symbolizer (with kind Mark with wellknownName Circle if none provided).
   * @param {SymbolizerKind} kind An optional SymbolizerKind
   * @param {object} values Optional values
   */
  static generateSymbolizer(kind?: SymbolizerKind, values?: any): Symbolizer {
    switch (kind) {
      case 'Mark':
        return {
          ...SymbolizerUtil.markSymbolizer,
          ...values
        };
      case 'Icon':
        return {
          ...SymbolizerUtil.iconSymbolizer,
          ...values
        };
      case 'Fill':
        return {
          ...SymbolizerUtil.fillSymbolizer,
          ...values
        };
      case 'Line':
        return {
          ...SymbolizerUtil.lineSymbolizer,
          ...values
        };
      case 'Text':
        return {
          ...SymbolizerUtil.textSymbolizer,
          ...values
        };
      case 'Raster':
        return {
          ...SymbolizerUtil.rasterSymbolizer,
          ...values
        };
      default:
        return {
          ...SymbolizerUtil.defaultSymbolizer,
          ...values
        };
    }
  }

}

export default SymbolizerUtil;
