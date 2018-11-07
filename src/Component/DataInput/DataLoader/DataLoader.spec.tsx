import DataLoader, { DataLoaderProps } from './DataLoader';
import TestUtil from '../../../Util/TestUtil';

describe('DataLoader', () => {
  let wrapper: any;
  beforeEach(() => {
    const props: DataLoaderProps = {
      parsers: []
    };
    wrapper = TestUtil.shallowRenderComponent(DataLoader, props);
  });

  it('is defined', () => {
    expect(DataLoader).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });
});
