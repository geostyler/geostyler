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
