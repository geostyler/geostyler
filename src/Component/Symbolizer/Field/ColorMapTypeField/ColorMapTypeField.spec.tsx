import { ColorMapTypeField, ColorMapTypeFieldProps } from './ColorMapTypeField';
import TestUtil from '../../../../Util/TestUtil';

describe('ColorMapTypeField', () => {

  let wrapper: any;
  beforeEach(() => {
    const props: ColorMapTypeFieldProps = {
      onChange: jest.fn()
    };
    wrapper = TestUtil.shallowRenderComponent(ColorMapTypeField, props);
  });

  it('is defined', () => {
    expect(ColorMapTypeField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });
  
  describe('getColorMapTypeOptions', () => {
    it('returns the right amount of options', () => {
      const options = wrapper.instance().getColorMapTypeOptions();
      expect(options).toHaveLength(3);
      const dummyTypeOptions = ['ramp'];
      wrapper.setProps({colorMapTypeOptions: dummyTypeOptions});
      const newOptions = wrapper.instance().getColorMapTypeOptions();
      expect(newOptions).toHaveLength(1);
    });
  });

  describe('onColorMapTypeChange', () => {
    it('calls onChange', () => {
      const dummyEvent = {
        target: {
          value: 'ramp'
        }
      }
      wrapper.instance().onColorMapTypeChange(dummyEvent);
      expect(wrapper.instance().props.onChange).toHaveBeenCalled();
    });
  });
});
