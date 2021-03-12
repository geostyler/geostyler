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

import { Editor, EditorProps } from './Editor';
import TestUtil from '../../../Util/TestUtil';
import SymbolizerUtil from '../../../Util/SymbolizerUtil';
import MarkEditor from '../MarkEditor/MarkEditor';
import { shallow } from 'enzyme';
import { IconEditor } from '../IconEditor/IconEditor';
import { LineEditor } from '../LineEditor/LineEditor';
import { FillEditor } from '../FillEditor/FillEditor';
import { TextEditor } from '../TextEditor/TextEditor';

describe('SymbolizerEditor', () => {

  let wrapper: any;
  let dummySymbolizer = TestUtil.getPolygonStyle().rules[0].symbolizers[0];
  beforeEach(() => {
    const props: EditorProps = {
      symbolizer: dummySymbolizer
    };
    wrapper = TestUtil.shallowRenderComponent(Editor, props);
  });

  it('is defined', () => {
    expect(Editor).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  describe('onSymbolizerChange', () => {
    it('doesn\'t fail if no method is passed as prop', () => {
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.color = '#00AA00';
      const func = wrapper.instance().onSymbolizerChange;
      func(newSymbolizer);
      expect(func).not.toThrow();
    });
    it('calls the change handler passed via props', () => {
      const newSymbolizer = {...dummySymbolizer};
      const onSymbolizerChangeDummy = jest.fn();
      newSymbolizer.color = '#00AA00';
      wrapper.setProps({
        onSymbolizerChange: onSymbolizerChangeDummy
      });
      wrapper.instance().onSymbolizerChange(newSymbolizer);
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

  describe('getUiFromSymbolizer', () => {
    it('returns a MarkEditor for Symbolizer with kind Mark', () => {
      const symbolizer = SymbolizerUtil.generateSymbolizer('Mark');
      const func = wrapper.instance().getUiFromSymbolizer;
      const returnValue = func(symbolizer);
      expect(returnValue.props.symbolizer.kind).toEqual('Mark');
    });
    it('returns an IconEditor for Symbolizer with kind Icon', () => {
      const symbolizer = SymbolizerUtil.generateSymbolizer('Icon');
      const func = wrapper.instance().getUiFromSymbolizer;
      const returnValue = func(symbolizer);
      expect(returnValue.props.symbolizer.kind).toEqual('Icon');
    });
    it('returns a LineEditor for Symbolizer with kind Line', () => {
      const symbolizer = SymbolizerUtil.generateSymbolizer('Line');
      const func = wrapper.instance().getUiFromSymbolizer;
      const returnValue = func(symbolizer);
      expect(returnValue.props.symbolizer.kind).toEqual('Line');
    });
    it('returns a FillEditor for Symbolizer with kind Fill', () => {
      const symbolizer = SymbolizerUtil.generateSymbolizer('Fill');
      const func = wrapper.instance().getUiFromSymbolizer;
      const returnValue = func(symbolizer);
      expect(returnValue.props.symbolizer.kind).toEqual('Fill');
    });
    it('returns a TextEditor for Symbolizer with kind Text', () => {
      const symbolizer = SymbolizerUtil.generateSymbolizer('Text');
      const func = wrapper.instance().getUiFromSymbolizer;
      const returnValue = func(symbolizer);
      expect(returnValue.props.symbolizer.kind).toEqual('Text');
    });
    it('returns the unknownSymbolizerText prop as default', () => {
      const func = wrapper.instance().getUiFromSymbolizer;
      wrapper.setProps({
        unknownSymbolizerText: 'Go BIG or go Home!'
      });
      const got = func('BIG');
      expect(got).toBe('Go BIG or go Home!');
    });
  });

});
