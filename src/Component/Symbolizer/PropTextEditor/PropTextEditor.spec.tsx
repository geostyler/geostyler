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

import { PropTextEditor, PropTextEditorProps } from './PropTextEditor';
import TestUtil from '../../../Util/TestUtil';
import en_US from '../../../locale/en_US';
import { TextSymbolizer } from 'geostyler-style';
import SymbolizerUtil from '../../../Util/SymbolizerUtil';

describe('PropTextEditor', () => {

  let wrapper: any;
  let dummySymbolizer: TextSymbolizer = SymbolizerUtil.generateSymbolizer('Text') as TextSymbolizer;
  let onSymbolizerChangeDummy: jest.Mock;
  beforeEach(() => {
    onSymbolizerChangeDummy = jest.fn();
    const props: PropTextEditorProps = {
      symbolizer: dummySymbolizer,
      locale: en_US.GsPropTextEditor,
      onSymbolizerChange: onSymbolizerChangeDummy
    };
    wrapper = TestUtil.shallowRenderComponent(PropTextEditor, props);
  });

  it('is defined', () => {
    expect(PropTextEditor).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  describe('onLabelChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', () => {
      const onLabelChange = wrapper.instance().onLabelChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.label = '{{Peter}}';
      onLabelChange('Peter');
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onColorChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', () => {
      const onColorChange = wrapper.instance().onColorChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.color = '#00AA00';
      onColorChange('#00AA00');
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onFontChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', () => {
      const onFontChange = wrapper.instance().onFontChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.font = ['Arial', 'Times new Roman'];
      onFontChange(['Arial', 'Times new Roman']);
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onOpacityChange', () => {
    it('calls the onOpacityChange prop with correct symbolizer ', () => {
      const onOpacityChange = wrapper.instance().onOpacityChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.opacity = 0.7;
      onOpacityChange(0.7);
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onSizeChange', () => {
    it('calls the onSizeChange prop with correct symbolizer ', () => {
      const onSizeChange = wrapper.instance().onSizeChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.size = 7;
      onSizeChange(7);
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onOffsetXChange', () => {
    it('calls the onOffsetXChange prop with correct symbolizer ', () => {
      const onOffsetXChange = wrapper.instance().onOffsetXChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.offset = [7, 0];
      onOffsetXChange(7);
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onOffsetYChange', () => {
    it('calls the onOffsetYChange prop with correct symbolizer ', () => {
      const onOffsetYChange = wrapper.instance().onOffsetYChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.offset = [0, 8];
      onOffsetYChange(8);
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onRotateChange', () => {
    it('calls the onRotateChange prop with correct symbolizer ', () => {
      const onRotateChange = wrapper.instance().onRotateChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.rotate = 45;
      onRotateChange(45);
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onHaloColorChange', () => {
    it('calls the onHaloColorChange prop with correct symbolizer ', () => {
      const onHaloColorChange = wrapper.instance().onHaloColorChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.haloColor = '#FFAA00';
      onHaloColorChange('#FFAA00');
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onHaloWidthChange', () => {
    it('calls the onHaloWidthChange prop with correct symbolizer ', () => {
      const onHaloWidthChange = wrapper.instance().onHaloWidthChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.haloWidth = 12;
      onHaloWidthChange(12);
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

});
