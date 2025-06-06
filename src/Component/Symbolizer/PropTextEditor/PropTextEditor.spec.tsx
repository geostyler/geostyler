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
import { PropTextEditor, PropTextEditorProps } from './PropTextEditor';
import { act, render, fireEvent } from '@testing-library/react';

import { TextSymbolizer } from 'geostyler-style';
import SymbolizerUtil from '../../../Util/SymbolizerUtil';

import { vi } from 'vitest';

describe('PropTextEditor', () => {

  const dummySymbolizer = SymbolizerUtil.generateSymbolizer('Text') as TextSymbolizer;
  const props: PropTextEditorProps = {
    symbolizer: dummySymbolizer,
    onSymbolizerChange: vi.fn()
  };

  it('is defined', () => {
    expect(PropTextEditor).toBeDefined();
  });

  it('renders correctly', () => {
    const textEditor = render(<PropTextEditor {...props} />);
    expect(textEditor.container).toBeInTheDocument();
  });

  // describe('onLabelChange', () => {
  // it('calls the onSymbolizerChange prop with correct symbolizer ', async () => {
  //   const textEditor = render(<PropTextEditor {...props} />);
  //   const newSymbolizer = {...dummySymbolizer};
  //   newSymbolizer.label = '{{Peter}}';
  //   const input = (await textEditor.findAllByRole('combobox'))[0];
  //   await act(async() => {
  //     fireEvent.change(input, {
  //       target: { value: '{{Peter}}' }
  //     });
  //   });
  //   expect(props.onSymbolizerChange).toBeCalledWith(newSymbolizer);
  // });
  // });

  // describe('onColorChange', () => {
  // it('calls the onSymbolizerChange prop with correct symbolizer ', () => {
  //   const onColorChange = wrapper.instance().onColorChange;
  //   const newSymbolizer = {...dummySymbolizer};
  //   newSymbolizer.color = '#00AA00';
  //   onColorChange('#00AA00');
  //   expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
  // });
  // });

  // describe('onFontChange', () => {
  // it('calls the onSymbolizerChange prop with correct symbolizer ', () => {
  //   const onFontChange = wrapper.instance().onFontChange;
  //   const newSymbolizer = {...dummySymbolizer};
  //   newSymbolizer.font = ['Arial', 'Times new Roman'];
  //   onFontChange(['Arial', 'Times new Roman']);
  //   expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
  // });
  // });

  describe('onOpacityChange', () => {
    it('calls the onOpacityChange prop with correct symbolizer ', async () => {
      const wellKnownNameEditor = render(<PropTextEditor {...props} />);
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.opacity = 0.5;
      const input = wellKnownNameEditor.container.querySelector('.opacity-field input');
      await act(async() => {
        fireEvent.change(input as Element, {
          target: { value: 0.5 }
        });
      });
      expect(props.onSymbolizerChange).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onSizeChange', () => {
    it('calls the onSizeChange prop with correct symbolizer ', async () => {
      const wellKnownNameEditor = render(<PropTextEditor {...props} />);
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.size = 4;
      const input = wellKnownNameEditor.container.querySelectorAll('.width-field input')[0];
      await act(async() => {
        fireEvent.change(input, {
          target: { value: 4 }
        });
      });
      expect(props.onSymbolizerChange).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onOffsetXChange', () => {
    it('calls the onOffsetXChange prop with correct symbolizer ', async () => {
      const wellKnownNameEditor = render(<PropTextEditor {...props} />);
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.offset = [3, 0];
      const input = wellKnownNameEditor.container.querySelectorAll('.offset-field input')[0];
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
      const wellKnownNameEditor = render(<PropTextEditor {...props} />);
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.offset = [0, 10];
      const input = wellKnownNameEditor.container.querySelectorAll('.offset-field input')[1];
      await act(async() => {
        fireEvent.change(input, {
          target: { value: 10 }
        });
      });
      expect(props.onSymbolizerChange).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onRotateChange', () => {
    it('calls the onRotateChange prop with correct symbolizer ', async () => {
      const wellKnownNameEditor = render(<PropTextEditor {...props} />);
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.rotate = 45;
      const input = wellKnownNameEditor.container.querySelectorAll('.rotate-field input')[0];
      await act(async() => {
        fireEvent.change(input, {
          target: { value: 45 }
        });
      });
      expect(props.onSymbolizerChange).toBeCalledWith(newSymbolizer);
    });
  });

  // describe('onHaloColorChange', () => {
  // it('calls the onHaloColorChange prop with correct symbolizer ', () => {
  //   const onHaloColorChange = wrapper.instance().onHaloColorChange;
  //   const newSymbolizer = {...dummySymbolizer};
  //   newSymbolizer.haloColor = '#FFAA00';
  //   onHaloColorChange('#FFAA00');
  //   expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
  // });
  // });

  describe('onHaloWidthChange', () => {
    it('calls the onHaloWidthChange prop with correct symbolizer ', async () => {
      const wellKnownNameEditor = render(<PropTextEditor {...props} />);
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.haloWidth = 4;
      const input = wellKnownNameEditor.container.querySelectorAll('.width-field input')[1];
      await act(async() => {
        fireEvent.change(input, {
          target: { value: 4 }
        });
      });
      expect(props.onSymbolizerChange).toBeCalledWith(newSymbolizer);
    });
  });

});
