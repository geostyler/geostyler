/* eslint-disable no-undef */
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

import { CodeEditor, CodeEditorProps } from './CodeEditor';
import TestUtil from '../../Util/TestUtil';

import SldStyleParser from 'geostyler-sld-parser';

describe('CodeEditor', () => {
  let wrapper: any;
  let dummyStyle = TestUtil.getMarkStyle();
  let onStyleChangeDummy: jest.Mock;
  let sldParser = new SldStyleParser();
  const delay = 1337;
  beforeEach(() => {
    onStyleChangeDummy = jest.fn();
    const props: CodeEditorProps = {
      style: dummyStyle,
      onStyleChange: onStyleChangeDummy,
      parsers: [
        sldParser
      ],
      delay
    };
    wrapper = TestUtil.shallowRenderComponent(CodeEditor, props);
  });

  it('is defined', () => {
    expect(CodeEditor).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  describe('defaultParser', () => {
    it('sets the defaultParser if passed as prop', () => {
      const defaultParserProps: CodeEditorProps = {
        style: dummyStyle,
        onStyleChange: onStyleChangeDummy,
        parsers: [
          sldParser
        ],
        defaultParser: sldParser,
        delay
      };
      const defaultValueWrapper = TestUtil.shallowRenderComponent(CodeEditor, defaultParserProps);
      const select = defaultValueWrapper.find('.gs-code-editor-format-select');
      expect(select.props().value).toEqual(SldStyleParser.title);
    });
  });

  describe('generates an option for every parser', () => {
    it('returns a Select.Option for every passed parser', () => {
      const gots = wrapper.find('Option');
      expect(gots.length).toBe(2);
    });
  });

});
