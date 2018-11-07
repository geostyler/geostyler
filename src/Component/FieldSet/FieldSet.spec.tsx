import FieldSet, { FieldSetProps } from './FieldSet';
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

});
