import { Preview } from './Preview';
import TestUtil from '../../../Util/TestUtil';
import en_US from '../../../locale/en_US';

describe('Preview', () => {

  let wrapper: any;
  beforeEach(() => {
    wrapper = TestUtil.shallowRenderComponent(Preview, {
      locale: en_US.GsPreview
    });
  });

  it('is defined', () => {
    expect(Preview).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });
});
