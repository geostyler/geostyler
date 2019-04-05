import { ColorMapEntryField, ColorMapEntryFieldProps } from './ColorMapEntryField';
import TestUtil from '../../../../Util/TestUtil';
import { ColorMapEntry } from 'geostyler-style';

describe('ColorMapEntryField', () => {

  let wrapper: any;
  beforeEach(() => {
    const props: ColorMapEntryFieldProps = {
      onChange: jest.fn()
    };
    wrapper = TestUtil.shallowRenderComponent(ColorMapEntryField, props);
  });

  it('is defined', () => {
    expect(ColorMapEntryField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });
  
  describe('updateColorMapEntry', () => {
    it('calls onChange', () => {
      const color = '#ff0000';
      wrapper.instance().updateColorMapEntry('color', color);
      expect(wrapper.instance().props.onChange).toHaveBeenCalled();
    });
  });

  describe('onColorChange', () => {
    it('calls onChange', () => {
      const color = '#ff0000';
      wrapper.instance().onColorChange(color);
      expect(wrapper.instance().props.onChange).toHaveBeenCalled();
    });
  });

  describe('onQuantityChange', () => {
    it('calls onChange', () => {
      const quantity = 200;
      wrapper.instance().onQuantityChange(quantity);
      expect(wrapper.instance().props.onChange).toHaveBeenCalled();
    });
  });

  describe('onLabelChange', () => {
    it('calls onChange', () => {
      const label = 'dummy label';
      wrapper.instance().onLabelChange(label);
      expect(wrapper.instance().props.onChange).toHaveBeenCalled();
    });
  });

  describe('onOpacityChange', () => {
    it('calls onChange', () => {
      const opacity = 0.5;
      wrapper.instance().onOpacityChange(opacity);
      expect(wrapper.instance().props.onChange).toHaveBeenCalled();
    });
  });
});
