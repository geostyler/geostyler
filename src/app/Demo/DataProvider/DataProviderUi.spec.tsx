import DataProviderUi from './DataProviderUi';
import TestUtil from '../../../Util/TestUtil';

describe('FilterDemo', () => {

  let wrapper: any;
  beforeEach(() => {
    wrapper = TestUtil.shallowRenderComponent(DataProviderUi, {});
  });

  it('is defined', () => {
    expect(DataProviderUi).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });
});
