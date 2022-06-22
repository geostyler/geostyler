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
import { LineEditor, LineEditorProps } from './LineEditor';
import SymbolizerUtil from '../../../Util/SymbolizerUtil';
import en_US from '../../../locale/en_US';
import { LineSymbolizer } from 'geostyler-style';
import { render, act, fireEvent } from '@testing-library/react';

describe('LineEditor', () => {

  let dummySymbolizer: LineSymbolizer = SymbolizerUtil.generateSymbolizer('Line') as LineSymbolizer;

  const props: LineEditorProps = {
    symbolizer: dummySymbolizer,
    locale: en_US.LineEditor,
    onSymbolizerChange: jest.fn()
  };

  it('is defined', () => {
    expect(LineEditor).toBeDefined();
  });

  it('renders correctly', () => {
    const rasterEditor = render(<LineEditor {...props} />);
    expect(rasterEditor.container).toBeInTheDocument();
  });

  // describe('onColorChange', () => {
  //   it('calls the onSymbolizerChange prop with correct symbolizer ', () => {
  //     const onColorChange = wrapper.instance().onColorChange;
  //     const newSymbolizer = {...dummySymbolizer};
  //     newSymbolizer.color = '#00AA00';
  //     onColorChange('#00AA00');
  //     expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
  //   });
  // });

  describe('onWidthChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', async () => {
      const wellKnownNameEditor = render(<LineEditor {...props} />);
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.width = 5;
      const input = wellKnownNameEditor.container.querySelectorAll('.width-field input')[0];
      await act(async() => {
        fireEvent.change(input, {
          target: { value: 5 }
        });
      });
      expect(props.onSymbolizerChange).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onOpacityChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', async () => {
      const wellKnownNameEditor = render(<LineEditor {...props} />);
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

  // describe('onDasharrayChange', () => {
  //   it('calls the onSymbolizerChange prop with correct symbolizer ', () => {
  //     const onDasharrayChange = wrapper.instance().onDasharrayChange;
  //     const newSymbolizer = {...dummySymbolizer};
  //     newSymbolizer.dasharray = [0, 8, 15];
  //     onDasharrayChange([0, 8, 15]);
  //     expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
  //   });
  // });

  describe('onDashOffsetChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', async () => {
      const passedSymbolizer = {
        ...dummySymbolizer,
        dasharray: [5, 10, 40]
      };
      const wellKnownNameEditor = render(
        <LineEditor
          symbolizer={passedSymbolizer}
          onSymbolizerChange={props.onSymbolizerChange}
          locale={props.locale}
        />
      );
      const newSymbolizer = {...passedSymbolizer};
      newSymbolizer.dashOffset = 7;
      const input = wellKnownNameEditor.container.querySelectorAll('.offset-field input')[0];
      await act(async() => {
        fireEvent.change(input, {
          target: { value: 7 }
        });
      });
      expect(props.onSymbolizerChange).toBeCalledWith(newSymbolizer);
    });
  });

  // describe('onCapChange', () => {
  //   it('calls the onSymbolizerChange prop with correct symbolizer ', () => {
  //     const onCapChange = wrapper.instance().onCapChange;
  //     const newSymbolizer = {...dummySymbolizer};
  //     newSymbolizer.cap = 'square';
  //     onCapChange('square');
  //     expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
  //   });
  // });

  // describe('onJoinChange', () => {
  //   it('calls the onSymbolizerChange prop with correct symbolizer ', () => {
  //     const onJoinChange = wrapper.instance().onJoinChange;
  //     const newSymbolizer = {...dummySymbolizer};
  //     newSymbolizer.join = 'bevel';
  //     onJoinChange('bevel');
  //     expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
  //   });
  // });

  // describe('onGraphicStrokeChange', () => {
  //   it('calls the onSymbolizerChange prop with correct symbolizer ', () => {
  //     const onGraphicStrokeChange = wrapper.instance().onGraphicStrokeChange;
  //     const newSymbolizer = {...dummySymbolizer};
  //     const markSymbolizer = SymbolizerUtil.generateSymbolizer('Mark') as MarkSymbolizer;
  //     newSymbolizer.graphicStroke = markSymbolizer;
  //     onGraphicStrokeChange(markSymbolizer);
  //     expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
  //   });
  // });

  // describe('onGraphicFillChange', () => {
  //   it('calls the onSymbolizerChange prop with correct symbolizer ', () => {
  //     const onGraphicFillChange = wrapper.instance().onGraphicFillChange;
  //     const newSymbolizer = {...dummySymbolizer};
  //     const markSymbolizer = SymbolizerUtil.generateSymbolizer('Mark') as MarkSymbolizer;
  //     newSymbolizer.graphicFill = markSymbolizer;
  //     onGraphicFillChange(markSymbolizer);
  //     expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
  //   });
  // });

});
