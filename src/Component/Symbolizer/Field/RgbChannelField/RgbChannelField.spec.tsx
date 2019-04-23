import { RgbChannelField, RgbChannelFieldProps } from './RgbChannelField';
import TestUtil from '../../../../Util/TestUtil';

describe('RgbChannelField', () => {

  let wrapper: any;
  beforeEach(() => {
    const props: RgbChannelFieldProps = {
      onChange: jest.fn()
    };
    wrapper = TestUtil.shallowRenderComponent(RgbChannelField, props);
  });

  it('is defined', () => {
    expect(RgbChannelField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });
  
  describe('onRedChannelChange', () => {
    it('calls onChange', () => {
      const dummyChannelName = 'dummy band';
      wrapper.instance().onRedChannelChange(dummyChannelName);
      expect(wrapper.instance().props.onChange).toHaveBeenCalled();
    });
  });

  describe('onGreenChannelChange', () => {
    it('calls onChange', () => {
      const dummyChannelName = 'dummy band';
      wrapper.instance().onGreenChannelChange(dummyChannelName);
      expect(wrapper.instance().props.onChange).toHaveBeenCalled();
    });
  });

  describe('onBlueChannelChange', () => {
    it('calls onChange', () => {
      const dummyChannelName = 'dummy band';
      wrapper.instance().onBlueChannelChange(dummyChannelName);
      expect(wrapper.instance().props.onChange).toHaveBeenCalled();
    });
  });
});
