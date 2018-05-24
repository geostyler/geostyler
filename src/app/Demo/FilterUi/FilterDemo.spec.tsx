import FilterDemo from './FilterDemo';
import TestUtil from '../../../Util/TestUtil';

describe('FilterDemo', () => {

  let wrapper: any;
  beforeEach(() => {
    wrapper = TestUtil.shallowRenderComponent(FilterDemo, {});
  });

  it('is defined', () => {
    expect(FilterDemo).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });
});
