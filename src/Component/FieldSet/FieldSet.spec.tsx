import FieldSet from './FieldSet';
import TestUtil from '../../Util/TestUtil';

describe('FieldSet', () => {

  let wrapper: any;
  beforeEach(() => {
    wrapper = TestUtil.mountComponent(FieldSet);
  });

  it('is defined', () => {
    expect(FieldSet).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
