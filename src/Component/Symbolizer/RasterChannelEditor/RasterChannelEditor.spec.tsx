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

import { RasterChannelEditor, RasterChannelEditorProps } from './RasterChannelEditor';
import TestUtil from '../../../Util/TestUtil';
import { ChannelSelection, Channel } from 'geostyler-style';

describe('RasterChannelEditor', () => {
  let wrapper: any;
  let dummyChannelSelection: ChannelSelection;

  beforeEach(() => {
    dummyChannelSelection = {
      grayChannel: {}
    };
    const props: RasterChannelEditorProps = {
      channelSelection: dummyChannelSelection,
      onChange: jest.fn()
    };
    wrapper = TestUtil.shallowRenderComponent(RasterChannelEditor, props);
  });

  it('is defined', () => {
    expect(RasterChannelEditor).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  describe('isRgbChannel', () => {
    it('returns true if it is a RgbChannel', () => {
      const rgbChannel: ChannelSelection = {
        redChannel: {},
        greenChannel: {},
        blueChannel: {}
      };
      const isRgb = wrapper.instance().isRgbChannel(rgbChannel);
      expect(isRgb).toBeTruthy();
    });
    it('returns false if it is not a RgbChannel', () => {
      const grayChannel: ChannelSelection = {
        grayChannel: {}
      };
      const isRgb = wrapper.instance().isRgbChannel(grayChannel);
      expect(isRgb).toBeFalsy();
    });
  });

  describe('isGrayChannel', () => {
    it('returns true if it is a GrayChannel', () => {
      const grayChannel: ChannelSelection = {
        grayChannel: {}
      };
      const isRgb = wrapper.instance().isGrayChannel(grayChannel);
      expect(isRgb).toBeTruthy();
    });
    it('returns false if it is not a GrayChannel', () => {
      const rgbChannel: ChannelSelection = {
        redChannel: {},
        greenChannel: {},
        blueChannel: {}
      };
      const isRgb = wrapper.instance().isGrayChannel(rgbChannel);
      expect(isRgb).toBeFalsy();
    });
  });

  describe('onChannelFieldChange', () => {
    it('calls onChange', () => {
      const dummyChannel: Channel = {};
      wrapper.instance().onChannelFieldChange('gray', dummyChannel);
      expect(wrapper.instance().props.onChange).toHaveBeenCalled();
    });
  });
});
