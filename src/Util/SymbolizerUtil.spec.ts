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

import SymbolizerUtil from './SymbolizerUtil';
import { MarkSymbolizer, IconSymbolizer, FillSymbolizer, LineSymbolizer, TextSymbolizer } from 'geostyler-style';

describe('SymbolizerUtil', () => {

  describe('generateSymbolizer', () => {
    it('generates symbolizer as expected', () => {
      const markSymbolizer: MarkSymbolizer = {
        kind: 'Mark',
        wellKnownName: 'circle',
        color: '#0E1058'
      };
      const iconSymbolizer: IconSymbolizer = {
        kind: 'Icon',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Parking_icon.svg/128px-Parking_icon.svg.png'
      };
      const fillSymbolizer: FillSymbolizer = {
        kind: 'Fill',
        color: '#0E1058'
      };
      const lineSymbolizer: LineSymbolizer = {
        kind: 'Line',
        color: '#0E1058',
        width: 3
      };
      const textSymbolizer: TextSymbolizer = {
        kind: 'Text',
        label: 'Your Label',
        size: 12
      };

      const noKind = SymbolizerUtil.generateSymbolizer();
      const mark = SymbolizerUtil.generateSymbolizer('Mark');
      const icon = SymbolizerUtil.generateSymbolizer('Icon');
      const fill = SymbolizerUtil.generateSymbolizer('Fill');
      const line = SymbolizerUtil.generateSymbolizer('Line');
      const text = SymbolizerUtil.generateSymbolizer('Text');

      expect(noKind).toEqual(markSymbolizer);
      expect(mark).toEqual(markSymbolizer);
      expect(icon).toEqual(iconSymbolizer);
      expect(fill).toEqual(fillSymbolizer);
      expect(line).toEqual(lineSymbolizer);
      expect(text).toEqual(textSymbolizer);

    });
  });

});
