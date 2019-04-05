import { ChannelSelectionField, ChannelSelectionFieldProps } from './ChannelSelectionField';
import TestUtil from '../../../../Util/TestUtil';

describe('ChannelSelectionField', () => {

  let wrapper: any;
  beforeEach(() => {
    const props: ChannelSelectionFieldProps = {
      onChange: jest.fn()
    };
    wrapper = TestUtil.shallowRenderComponent(ChannelSelectionField, props);
  });

  it('is defined', () => {
    expect(ChannelSelectionField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });
  
  describe('getChannelSelectionSelectOptions', () => {
    it('returns the right number of options', () => {
      const options = wrapper.instance().getChannelSelectionSelectOptions();
      expect(options).toHaveLength(2);
      const selectOpts = ['rgb'];
      wrapper.setProps({channelSelectionOptions: selectOpts});
      const newOptions = wrapper.instance().getChannelSelectionSelectOptions();
      expect(newOptions).toHaveLength(1);
    });
  });
});
