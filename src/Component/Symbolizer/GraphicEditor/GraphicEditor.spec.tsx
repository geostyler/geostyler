/* Released under the BSD 2-Clause License
 *
 * Copyright (c) 2018-present, terrestris GmbH & Co. KG
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

import { GraphicEditor, GraphicEditorProps } from './GraphicEditor';
import TestUtil from '../../../Util/TestUtil';
import {
  GraphicType,
  MarkSymbolizer,
  IconSymbolizer
} from 'geostyler-style';
import SymbolizerUtil from '../../../Util/SymbolizerUtil';

describe('GraphicEditor', () => {

  const dummyGraphicType: GraphicType = 'Mark';
  const dummyGraphicMark: MarkSymbolizer = SymbolizerUtil.markSymbolizer;
  const dummyGraphicIcon: IconSymbolizer = SymbolizerUtil.iconSymbolizer;
  const onGraphicChangeSpy = jest.fn();

  let wrapper: any;
  beforeEach(() => {
    const props: GraphicEditorProps = {
      graphic: dummyGraphicMark,
      graphicType: dummyGraphicType,
      onGraphicChange: onGraphicChangeSpy
    };
    wrapper = TestUtil.shallowRenderComponent(GraphicEditor, props);
    onGraphicChangeSpy.mockClear();
  });

  it('is defined', () => {
    expect(GraphicEditor).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  it('renders MarkEditor if graphic is Mark', () => {
    expect(wrapper.instance().getGraphicFields(dummyGraphicMark).props.symbolizer.kind)
      .toEqual('Mark');
  });

  it('renders IconEditor if graphic is Icon', () => {
    expect(wrapper.instance().getGraphicFields(dummyGraphicIcon).props.symbolizer.kind).toEqual('Icon');
  });

  it('renders nothing if graphicType is not Mark or Icon', () => {
    expect(wrapper.instance().getGraphicFields('Text')).toBeUndefined();
  });

  it('handles onGraphicTypeChange', () => {
    expect.assertions(9);
    expect(onGraphicChangeSpy).not.toHaveBeenCalled();
    const wrapperInstance = wrapper.instance();

    wrapperInstance.onGraphicTypeChange('Mark');
    expect(onGraphicChangeSpy).toHaveBeenCalled();
    expect(onGraphicChangeSpy).toHaveBeenCalledWith(dummyGraphicMark);

    wrapperInstance.onGraphicTypeChange('Icon');
    expect(onGraphicChangeSpy).toHaveBeenCalled();
    expect(onGraphicChangeSpy).toHaveBeenCalledWith(dummyGraphicIcon);

    wrapperInstance.onGraphicTypeChange('Wrong');
    expect(onGraphicChangeSpy).toHaveBeenCalled();
    expect(onGraphicChangeSpy).toHaveBeenCalledWith(undefined);

    wrapperInstance.onGraphicTypeChange();
    expect(onGraphicChangeSpy).toHaveBeenCalled();
    expect(onGraphicChangeSpy).toHaveBeenCalledWith(undefined);
  });
});
