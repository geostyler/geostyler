import { FieldSet, FieldSetProps } from './FieldSet';
import TestUtil from '../../Util/TestUtil';

describe('FieldSet', () => {
  let wrapper: any;
  beforeEach(() => {
    const props: FieldSetProps = {};
    wrapper = TestUtil.mountComponent(FieldSet, props);
  });

  it('is defined', () => {
    expect(FieldSet).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  describe('onCheckChange', () => {
    it('calls passed function', () => {
      const onCheckChangeDummy = jest.fn();
      wrapper.setProps({
        onCheckChange: onCheckChangeDummy
      });
      wrapper.instance().onCheckChange('Peter');
      expect(onCheckChangeDummy).toHaveBeenCalledWith('Peter');
    });
  });

});
