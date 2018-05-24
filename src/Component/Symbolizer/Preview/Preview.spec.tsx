import Preview from './Preview';
import TestUtil from '../../../Util/TestUtil';

describe('Preview', () => {

  let wrapper: any;
  beforeEach(() => {
    wrapper = TestUtil.shallowRenderComponent(Preview, {});
  });

  it('is defined', () => {
    expect(Preview).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });
});

