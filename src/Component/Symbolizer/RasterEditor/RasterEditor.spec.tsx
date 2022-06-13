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
import React from 'react';
import { RasterEditor, RasterEditorProps } from './RasterEditor';
import SymbolizerUtil from '../../../Util/SymbolizerUtil';
import en_US from '../../../locale/en_US';
import { RasterSymbolizer } from 'geostyler-style';
import { act, render, fireEvent } from '@testing-library/react';

describe('RasterEditor', () => {

  let dummySymbolizer: RasterSymbolizer = SymbolizerUtil.generateSymbolizer('Raster') as RasterSymbolizer;
  const props: RasterEditorProps = {
    symbolizer: dummySymbolizer,
    locale: en_US.RasterEditor,
    onSymbolizerChange: jest.fn(),
    defaultValues: undefined
  };

  it('is defined', () => {
    expect(RasterEditor).toBeDefined();
  });

  it('renders correctly', () => {
    const rasterEditor = render(<RasterEditor {...props} />);
    expect(rasterEditor.container).toBeInTheDocument();
  });

  describe('onOpacityChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', async () => {
      const wellKnownNameEditor = render(<RasterEditor {...props} />);
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.opacity = 0.5;
      const input = wellKnownNameEditor.container.querySelectorAll('.opacity-field input')[0];
      await act(async() => {
        fireEvent.change(input, {
          target: { value: 0.5 }
        });
      });
      expect(props.onSymbolizerChange).toBeCalledWith(newSymbolizer);
    });
  });
});
