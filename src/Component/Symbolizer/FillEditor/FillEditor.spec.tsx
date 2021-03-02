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

import { FillEditor, FillEditorProps } from './FillEditor';
import SymbolizerUtil from '../../../Util/SymbolizerUtil';
import TestUtil from '../../../Util/TestUtil';
import en_US from '../../../locale/en_US';
import { FillSymbolizer, MarkSymbolizer } from 'geostyler-style';

describe('FillEditor', () => {

  let wrapper: any;
  let dummySymbolizer: FillSymbolizer = SymbolizerUtil.generateSymbolizer('Fill') as FillSymbolizer;
  let onSymbolizerChangeDummy: jest.Mock;
  beforeEach(() => {
    onSymbolizerChangeDummy = jest.fn();
    const props: FillEditorProps = {
      symbolizer: dummySymbolizer,
      locale: en_US.GsFillEditor,
      onSymbolizerChange: onSymbolizerChangeDummy
    };
    wrapper = TestUtil.shallowRenderComponent(FillEditor, props);
  });

  it('is defined', () => {
    expect(FillEditor).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  describe('onFillColorChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', () => {
      const onFillColorChange = wrapper.instance().onFillColorChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.color = '#00AA00';
      onFillColorChange('#00AA00');
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onFillOpacityChange', () => {
    it('calls the onOpacityChange prop with correct symbolizer ', () => {
      const onFillOpacityChange = wrapper.instance().onFillOpacityChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.fillOpacity = 0.7;
      onFillOpacityChange(0.7);
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onOutlineColorChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', () => {
      const onOutlineColorChange = wrapper.instance().onOutlineColorChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.outlineColor = '#FFAA00';
      onOutlineColorChange('#FFAA00');
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onOutlineWidthChange', () => {
    it('calls the onSizeChange prop with correct symbolizer ', () => {
      const onOutlineWidthChange = wrapper.instance().onOutlineWidthChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.outlineWidth = 7;
      onOutlineWidthChange(7);
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onOutlineDasharrayChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', () => {
      const onOutlineDasharrayChange = wrapper.instance().onOutlineDasharrayChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.outlineDasharray = [0, 8, 15];
      onOutlineDasharrayChange([0, 8, 15]);
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onGraphicChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', () => {
      const onGraphicChange = wrapper.instance().onGraphicChange;
      const newSymbolizer = {...dummySymbolizer};
      const markSymbolizer = SymbolizerUtil.generateSymbolizer('Mark') as MarkSymbolizer;
      newSymbolizer.graphicFill = markSymbolizer;
      onGraphicChange(markSymbolizer);
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

});
