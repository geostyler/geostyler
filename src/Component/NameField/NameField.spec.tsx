import NameField from './NameField';
import TestUtil from '../../Util/TestUtil';

describe('NameField', () => {

  let wrapper: any;
  beforeEach(() => {
    let i = 0;
    const dummyFn = () => {
      i = i + 1;
    };
    wrapper = TestUtil.shallowRenderComponent(NameField, {
      value: 'foo',
      onChange: dummyFn
    });
  });

  it('is defined', () => {
    expect(NameField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
