import { ExtendedField, ExtendedFieldProps } from './ExtendedField';
import TestUtil from '../../../../Util/TestUtil';

describe('ExtendedField', () => {

  let wrapper: any;
  beforeEach(() => {
    const props: ExtendedFieldProps = {
      onChange: jest.fn()
    };
    wrapper = TestUtil.shallowRenderComponent(ExtendedField, props);
  });

  it('is defined', () => {
    expect(ExtendedField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });
  
  describe('onExtendedChange', () => {
    it('calls onChange', () => {
      const dummyEvent = {
        target: {
          value: false
        }
      }
      wrapper.instance().onExtendedChange(dummyEvent);
      expect(wrapper.instance().props.onChange).toHaveBeenCalled();
    });
  });
});
