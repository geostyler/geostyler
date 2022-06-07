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
import { WellKnownNameEditor, WellKnownNameEditorProps } from './WellKnownNameEditor';
import SymbolizerUtil from '../../../Util/SymbolizerUtil';
import en_US from '../../../locale/en_US';
import { MarkSymbolizer } from 'geostyler-style';

describe('WellKnownNameEditor', () => {

  let dummySymbolizer: MarkSymbolizer = SymbolizerUtil.generateSymbolizer('Mark') as MarkSymbolizer;
  const props: WellKnownNameEditorProps = {
    symbolizer: dummySymbolizer,
    locale: en_US.GsWellKnownNameEditor,
    onSymbolizerChange: jest.fn(),
    defaultValues: undefined
  };

  it('is defined', () => {
    expect(WellKnownNameEditor).toBeDefined();
  });

  it('renders correctly', () => {
    const wellKnownNameEditor = render(<WellKnownNameEditor {...props} />);
    expect(wellKnownNameEditor.container).toBeInTheDocument();
  });

  describe('onRadiusChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', async () => {
      const wellKnownNameEditor = render(<WellKnownNameEditor {...props} />);
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.radius = 12;
      const input = wellKnownNameEditor.container.querySelector('.radius-field input');
      await act(async() => {
        fireEvent.change(input, {
          target: { value: 12 }
        });
      });
      expect(props.onSymbolizerChange).toBeCalledWith(newSymbolizer);
    });
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

  describe('onOpacityChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', async () => {
      const wellKnownNameEditor = render(<WellKnownNameEditor {...props} />);
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

  describe('onFillOpacityChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', async () => {
      const wellKnownNameEditor = render(<WellKnownNameEditor {...props} />);
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.fillOpacity = 0.76;
      const input = wellKnownNameEditor.container.querySelectorAll('.opacity-field input')[1];
      await act(async() => {
        fireEvent.change(input, {
          target: { value: 0.76 }
        });
      });
    });
  });

  // describe('onStrokeColorChange', () => {
  //   it('calls the onSymbolizerChange prop with correct symbolizer ', () => {
  //     const onStrokeColorChange = wrapper.instance().onStrokeColorChange;
  //     const newSymbolizer = {...dummySymbolizer};
  //     newSymbolizer.strokeColor = '#00AA00';
  //     onStrokeColorChange('#00AA00');
  //     expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
  //   });
  // });

  describe('onStrokeWidthChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', async () => {
      const wellKnownNameEditor = render(<WellKnownNameEditor {...props} />);
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.strokeWidth = 0.76;
      const input = wellKnownNameEditor.container.querySelector('.width-field input');
      await act(async() => {
        fireEvent.change(input, {
          target: { value: 0.76 }
        });
      });
    });
  });

  describe('onStrokeOpacityChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', async () => {
      const wellKnownNameEditor = render(<WellKnownNameEditor {...props} />);
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.strokeOpacity = 0.9;
      const input = wellKnownNameEditor.container.querySelectorAll('.opacity-field input')[2];
      await act(async() => {
        fireEvent.change(input, {
          target: { value: 0.9 }
        });
      });
    });
  });

  describe('onRotateChange', () => {
    it('calls the onRotateChange prop with correct symbolizer ', async () => {
      const wellKnownNameEditor = render(<WellKnownNameEditor {...props} />);
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.strokeOpacity = 0.9;
      const input = wellKnownNameEditor.container.querySelector('.rotate-field input');
      await act(async() => {
        fireEvent.change(input, {
          target: { value: 0.9 }
        });
      });
    });
  });

});
