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

import { StyleLoader, StyleLoaderProps } from './StyleLoader';
import SldStyleParser from 'geostyler-sld-parser';
import { StyleParser } from 'geostyler-style';
import TestUtil from '../../../Util/TestUtil';

describe('StyleLoader', () => {
  let wrapper: any;
  const sldStyleParser: StyleParser = new SldStyleParser();
  beforeEach(() => {
    const props: StyleLoaderProps = {
      parsers: [sldStyleParser]
    };
    wrapper = TestUtil.shallowRenderComponent(StyleLoader, props);
  });

  it('is defined', () => {
    expect(StyleLoader).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  describe('parseStyle', () => {
    it('returns undefined if no active parser is set', async () => {
      const got = await wrapper.instance().parseStyle();
      expect(got).toBeUndefined();
    });
    it('calls readFile and onError with the expected arguments', async () => {
      wrapper.setState({
        activeParser: sldStyleParser
      });
      wrapper.instance().readFile = jest.fn();
      const onErrorMock = jest.fn();
      const onSuccessMock = jest.fn();
      const got = await wrapper.instance().parseStyle({
        file: 'peter',
        onError: onErrorMock,
        onSuccess: onSuccessMock
      });
      expect(wrapper.instance().readFile).toHaveBeenCalledWith('peter');
      expect(onErrorMock).toHaveBeenCalled();
      expect(onSuccessMock).not.toHaveBeenCalled();
      jest.restoreAllMocks();
    });
  });

  describe('readFile', () => {
    it('resolves with the filecontent', async () => {
      const fakeFile = new File(['abc123'], 'peter.sld');
      await expect(wrapper.instance().readFile(fakeFile)).resolves.toBe('abc123');
    });
    it('rejects on error', async () => {
      await expect(wrapper.instance().readFile()).rejects.toThrowError();
    });
  });

  describe('onSelect', () => {
    it('sets the parser as active', () => {
      const parserTitle = 'SLD Style Parser';
      expect(wrapper.state('activeParser')).toBeUndefined();
      wrapper.instance().onSelect(parserTitle);
      expect(wrapper.state('activeParser')).toBe(sldStyleParser);
    });
  });
});
