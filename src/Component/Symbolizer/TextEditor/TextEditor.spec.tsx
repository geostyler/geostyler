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
import { act, render, fireEvent } from '@testing-library/react';
import { TextEditor, TextEditorProps } from './TextEditor';
import SymbolizerUtil from '../../../Util/SymbolizerUtil';
import en_US from '../../../locale/en_US';
import { TextSymbolizer } from 'geostyler-style';

describe('TextEditor', () => {

  let dummySymbolizer: TextSymbolizer = SymbolizerUtil.generateSymbolizer('Text') as TextSymbolizer;
  const props: TextEditorProps = {
    symbolizer: dummySymbolizer as TextSymbolizer,
    locale: en_US.GsTextEditor,
    onSymbolizerChange: jest.fn(),
    defaultValues: undefined
  };

  it('is defined', () => {
    expect(TextEditor).toBeDefined();
  });

  it('renders correctly', () => {
    const wellKnownNameEditor = render(<TextEditor {...props} />);
    expect(wellKnownNameEditor.container).toBeInTheDocument();
  });

  describe('onLabelChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', async () => {
      const textEditor = render(<TextEditor {...props} />);
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.label = 'Peter {{age}} Pan';
      const input = await textEditor.findByPlaceholderText('Template');
      await act(async() => {
        fireEvent.change(input, {
          target: { value: 'Peter {{age}} Pan' }
        });
      });
      expect(props.onSymbolizerChange).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onColorChange', () => {
  //   it('calls the onSymbolizerChange prop with correct symbolizer ', () => {
  //     const onColorChange = wrapper.instance().onColorChange;
  //     const newSymbolizer = {...dummySymbolizer};
  //     newSymbolizer.color = '#00AA00';
  //     onColorChange('#00AA00');
  //     expect(props.onSymbolizerChange).toBeCalledWith(newSymbolizer);
  //   });
  });

  describe('onFontChange', () => {
    // it('calls the onSymbolizerChange prop with correct symbolizer ', () => {
    //   const onFontChange = wrapper.instance().onFontChange;
    //   const newSymbolizer = {...dummySymbolizer};
    //   newSymbolizer.font = ['Arial', 'Times new Roman'];
    //   onFontChange(['Arial', 'Times new Roman']);
    //   expect(props.onSymbolizerChange).toBeCalledWith(newSymbolizer);
    // });
  });

  describe('onOpacityChange', () => {
    it('calls the onOpacityChange prop with correct symbolizer ', async () => {
      const wellKnownNameEditor = render(<TextEditor {...props} />);
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.opacity = 0.5;
      const input = wellKnownNameEditor.container.querySelector('.opacity-field input');
      await act(async() => {
        fireEvent.change(input, {
          target: { value: 0.5 }
        });
      });
      expect(props.onSymbolizerChange).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onSizeChange', () => {
    it('calls the onSizeChange prop with correct symbolizer ', async () => {
      const wellKnownNameEditor = render(<TextEditor {...props} />);
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
      const wellKnownNameEditor = render(<TextEditor {...props} />);
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
      const wellKnownNameEditor = render(<TextEditor {...props} />);
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
      const wellKnownNameEditor = render(<TextEditor {...props} />);
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

  describe('onHaloColorChange', () => {
  //   it('calls the onHaloColorChange prop with correct symbolizer ', () => {
  //     const onHaloColorChange = wrapper.instance().onHaloColorChange;
  //     const newSymbolizer = {...dummySymbolizer};
  //     newSymbolizer.haloColor = '#FFAA00';
  //     onHaloColorChange('#FFAA00');
  //     expect(props.onSymbolizerChange).toBeCalledWith(newSymbolizer);
  //   });
  });

  describe('onHaloWidthChange', () => {
    it('calls the onHaloWidthChange prop with correct symbolizer ', async () => {
      const wellKnownNameEditor = render(<TextEditor {...props} />);
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
