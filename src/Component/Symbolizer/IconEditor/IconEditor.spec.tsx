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
import { IconEditor, IconEditorProps } from './IconEditor';
import SymbolizerUtil from '../../../Util/SymbolizerUtil';
import en_US from '../../../locale/en_US';
import { IconSymbolizer } from 'geostyler-style';
import { render, act, fireEvent } from '@testing-library/react';

describe('IconEditor', () => {

  let dummySymbolizer: IconSymbolizer = SymbolizerUtil.generateSymbolizer('Icon') as IconSymbolizer;
  const props: IconEditorProps = {
    symbolizer: dummySymbolizer,
    locale: en_US.IconEditor,
    onSymbolizerChange: jest.fn()
  };

  it('is defined', () => {
    expect(IconEditor).toBeDefined();
  });

  it('renders correctly', () => {
    const iconEditor = render(<IconEditor {...props} />);
    expect(iconEditor.container).toBeInTheDocument();
  });

  describe('onImageSrcChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', async () => {
      const iconEditor = render(<IconEditor {...props} />);
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.image = 'strudel.png';
      const input = await iconEditor.findByPlaceholderText('URL to image');
      await act(async() => {
        fireEvent.change(input, {
          target: { value: 'strudel.png' }
        });
      });
      expect(props.onSymbolizerChange).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onSizeChange', () => {
    it('calls the onSizeChange prop with correct symbolizer ', async () => {
      const iconEditor = render(<IconEditor {...props} />);
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.size = 4;
      const input = iconEditor.container.querySelector('.size-field input');
      await act(async() => {
        fireEvent.change(input!, {
          target: { value: 4 }
        });
      });
      expect(props.onSymbolizerChange).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onOffsetXChange', () => {
    it('calls the onOffsetXChange prop with correct symbolizer ', async () => {
      const textEditor = render(<IconEditor {...props} />);
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.offset = [3, 0];
      const input = textEditor.container.querySelectorAll('.offset-field input')[0];
      await act(async() => {
        fireEvent.change(input, {
          target: { value: 3 }
        });
      });
      expect(props.onSymbolizerChange).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onOffsetYChange', () => {
    it('calls the onOffsetYChange prop with correct symbolizer ', async () => {
      const textEditor = render(<IconEditor {...props} />);
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.offset = [0, 10];
      const input = textEditor.container.querySelectorAll('.offset-field input')[1];
      await act(async() => {
        fireEvent.change(input, {
          target: { value: 10 }
        });
      });
      expect(props.onSymbolizerChange).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onRotateChange', () => {
    it('calls the onRotateChange prop with correct symbolizer ', async() => {
      const iconEditor = render(<IconEditor {...props} />);
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.rotate = 45;
      const input = iconEditor.container.querySelectorAll('.rotate-field input')[0];
      await act(async() => {
        fireEvent.change(input, {
          target: { value: 45 }
        });
      });
      expect(props.onSymbolizerChange).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onOpacityChange', () => {
    it('calls the onOpacityChange prop with correct symbolizer ', async () => {
      const iconEditor = render(<IconEditor {...props} />);
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.opacity = 0.5;
      const input = iconEditor.container.querySelector('.opacity-field input');
      await act(async() => {
        fireEvent.change(input, {
          target: { value: 0.5 }
        });
      });
      expect(props.onSymbolizerChange).toBeCalledWith(newSymbolizer);
    });
  });

});
