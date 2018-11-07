import FontPicker, { FontPickerProps } from './FontPicker';
import TestUtil from '../../../../Util/TestUtil';

describe('FontPicker', () => {

  let wrapper: any;
  beforeEach(() => {
    const props: FontPickerProps = {};
    wrapper = TestUtil.shallowRenderComponent(FontPicker, props);
  });

  it('is defined', () => {
    expect(FontPicker).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
