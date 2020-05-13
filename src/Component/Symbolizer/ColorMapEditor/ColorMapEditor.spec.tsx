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

import { ColorMapEditor, ColorMapEditorProps, ColorMapEntryRecord } from './ColorMapEditor';
import TestUtil from '../../../Util/TestUtil';
import { ColorMap, ColorMapEntry } from 'geostyler-style';
import { Input, Popover } from 'antd';
import { mount } from 'enzyme';
import RasterUtil from '../../../Util/RasterUtil';
import OpacityField from '../Field/OpacityField/OpacityField';
import OffsetField from '../Field/OffsetField/OffsetField';

describe('ColorMapEditor', () => {
  let wrapper: any;
  let dummyColorMap: ColorMap;

  beforeEach(() => {
    dummyColorMap = {
      colorMapEntries: [RasterUtil.generateColorMapEntry()],
      type: 'ramp'
    };
    const props: ColorMapEditorProps = {
      colorMap: dummyColorMap,
      onChange: jest.fn()
    };
    wrapper = TestUtil.shallowRenderComponent(ColorMapEditor, props);
  });

  it('is defined', () => {
    expect(ColorMapEditor).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  describe('updateColorMap', () => {
    it('calls onChange with an updated colorMap', () => {
      const newColorMapEntry: ColorMapEntry = {color: '#ff0000'};
      const newColorMapEntries = [newColorMapEntry, ...dummyColorMap.colorMapEntries];
      wrapper.instance().updateColorMap('colorMapEntry', newColorMapEntries);
      expect(wrapper.instance().props.onChange).toHaveBeenCalled();
    });
  });

  describe('onExtendedChange', () => {
    it('calls updateColorMap', () => {
      const mock = wrapper.instance().updateColorMap = jest.fn();
      wrapper.instance().onExtendedChange(true);
      expect(mock).toHaveBeenCalled();
    });
  });

  describe('onTypeChange', () => {
    it('calls updateColorMap', () => {
      const mock = wrapper.instance().updateColorMap = jest.fn();
      wrapper.instance().onTypeChange('intervals');
      expect(mock).toHaveBeenCalled();
    });
  });

  describe('onNrOfClassesChange', () => {
    it('calls updateColorMap', () => {
      const mock = wrapper.instance().updateColorMap = jest.fn();
      wrapper.instance().onNrOfClassesChange(5);
      expect(mock).toHaveBeenCalled();
    });
  });

  describe('onColorRampChange', () => {
    it('calls updateColorMap', () => {
      const mock = wrapper.instance().updateColorMap = jest.fn();
      wrapper.instance().onColorRampChange('GeoStyler');
      expect(mock).toHaveBeenCalled();
    });
  });

  describe('applyColors', () => {
    it('applies colors to existing colorMapEntries', () => {
      const cmEntries = [RasterUtil.generateColorMapEntry()];
      const colorRamp = 'GreenRed';
      wrapper.instance().applyColors(colorRamp, cmEntries);
      expect(cmEntries).not.toEqual(dummyColorMap.colorMapEntries);
    });
  });

  describe('setValuesForColorMapEntry', () => {
    it('calls updateColorMap', () => {
      const mock = wrapper.instance().updateColorMap = jest.fn();
      const opacity = 0.5;
      wrapper.instance().setValueForColorMapEntry(0, 'opacity', opacity);
      expect(mock).toHaveBeenCalled();
    });
  });

  describe('getColorMapRecords', () => {
    it('returns all colorMapRecords', () => {
      const records = wrapper.instance().getColorMapRecords();
      expect(records).toHaveLength(1);
    });
  });

  describe('labelRenderer', () => {
    it('returns an Input with PopOver', () => {
      const record: ColorMapEntryRecord = {
        key: 0,
        color: '#ff0000'
      };
      const got = wrapper.instance().labelRenderer(undefined, record);
      const mountRenderer = mount(got);
      const instance = mountRenderer.instance();
      expect(instance).toBeInstanceOf(Popover);
      expect(mountRenderer.find(Input).length).toEqual(1);
    });
  });

  describe('quantityRenderer', () => {
    it('returns an Input with OffsetField', () => {
      const record: ColorMapEntryRecord = {
        key: 0,
        color: '#ff0000'
      };
      const got = wrapper.instance().quantityRenderer(undefined, record);
      const mountRenderer = mount(got);
      const instance = mountRenderer.instance();
      expect(instance).toBeInstanceOf(OffsetField);
    });
  });

  describe('opacityRenderer', () => {
    it('returns an Input with OpacityField', () => {
      const record: ColorMapEntryRecord = {
        key: 0,
        color: '#ff0000'
      };
      const got = wrapper.instance().opacityRenderer(undefined, record);
      const mountRenderer = mount(got);
      const instance = mountRenderer.instance();
      expect(instance).toBeInstanceOf(OpacityField);
    });
  });
});
