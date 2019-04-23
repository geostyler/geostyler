import { SourceChannelNameField, SourceChannelNameFieldProps } from './SourceChannelNameField';
import TestUtil from '../../../../Util/TestUtil';

describe('SourceChannelNameField', () => {

  let wrapper: any;
  beforeEach(() => {
    const props: SourceChannelNameFieldProps = {
      onChange: jest.fn()
    };
    wrapper = TestUtil.shallowRenderComponent(SourceChannelNameField, props);
  });

  it('is defined', () => {
    expect(SourceChannelNameField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });
  
  describe('getSourceChannelNameSelectOptions', () => {
    it('returns the right number of optiosn', () => {
      const sourceChannelNames = ['red', 'green'];
      wrapper.setProps({sourceChannelNames});
      const options = wrapper.instance().getSourceChannelNameSelectOptions();
      expect(options).toHaveLength(2);
    });
  });
});
