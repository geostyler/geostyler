import { GrayChannelField, GrayChannelFieldProps } from './GrayChannelField';
import TestUtil from '../../../../Util/TestUtil';

describe('GrayChannelField', () => {

  let wrapper: any;
  beforeEach(() => {
    const props: GrayChannelFieldProps = {
      onChange: jest.fn()
    };
    wrapper = TestUtil.shallowRenderComponent(GrayChannelField, props);
  });

  it('is defined', () => {
    expect(GrayChannelField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });
  
  describe('onGrayChannelChange', () => {
    it('calls onChange', () => {
      const dummyChannelName = 'dummy band';
      wrapper.instance().onGrayChannelChange(dummyChannelName);
      expect(wrapper.instance().props.onChange).toHaveBeenCalled();
    });
  });
});
