import FontPicker from './FontPicker';
import TestUtil from '../../../../Util/TestUtil';

describe('FontPicker', () => {

  let wrapper: any;
  beforeEach(() => {
    wrapper = TestUtil.shallowRenderComponent(FontPicker, {});
  });

  it('is defined', () => {
    expect(FontPicker).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
