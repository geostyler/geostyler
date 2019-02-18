import { ColorField, ColorFieldProps } from './ColorField';
import TestUtil from '../../../../Util/TestUtil';

describe('ColorField', () => {
  let wrapper: any;
  let onChangeDummy: jest.Mock;
  beforeEach(() => {
    onChangeDummy = jest.fn();
    const props: ColorFieldProps = {
      onChange: onChangeDummy
    };
    wrapper = TestUtil.shallowRenderComponent(ColorField, props);
  });

  it('is defined', () => {
    expect(ColorField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  describe('onColorPreviewClick', () => {
    it('toggles state of colorPickerVisible', () => {
      const visible = wrapper.state('colorPickerVisible');
      wrapper.instance().onColorPreviewClick();
      expect(wrapper.state('colorPickerVisible')).toBe(!visible);
    });
  });

  describe('onChangeComplete', () => {
    it('calls a passed on Change method with a color hex', () => {
      wrapper.instance().onChangeComplete({hex: 'Peter'});
      expect(onChangeDummy).toHaveBeenCalledWith('Peter');
    });
  });
});
