import { StyleLoader, StyleLoaderProps } from './StyleLoader';
import TestUtil from '../../../Util/TestUtil';

describe('StyleLoader', () => {
  let wrapper: any;
  beforeEach(() => {
    const props: StyleLoaderProps = {
      parsers: []
    };
    wrapper = TestUtil.shallowRenderComponent(StyleLoader, props);
  });

  it('is defined', () => {
    expect(StyleLoader).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });
});
