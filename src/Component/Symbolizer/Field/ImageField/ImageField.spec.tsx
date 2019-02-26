import { ImageField, ImageFieldProps } from './ImageField';
import TestUtil from '../../../../Util/TestUtil';
import { mount } from 'enzyme';
import { Tooltip, Icon } from 'antd';

describe('ImageField', () => {
  let wrapper: any;
  beforeEach(() => {
    const props: ImageFieldProps = {
      tooltipLabel: 'Peter'
    };
    wrapper = TestUtil.shallowRenderComponent(ImageField, props);
  });

  it('is defined', () => {
    expect(ImageField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  describe('getIconSelectorButton', () => {
    it('returns an InputNumber', () => {
      const got = wrapper.instance().getIconSelectorButton();
      const mountRenderer = mount(got);
      const instance = mountRenderer.instance();
      expect(instance).toBeInstanceOf(Tooltip);
      expect(mountRenderer.prop('title')).toBe(wrapper.instance().props.tooltipLabel);
      expect(mountRenderer.find(Icon).length).toEqual(1);
    });
  });

  describe('openWindow', () => {
    it('sets windowVisible to true', () => {
      wrapper.instance().openWindow();
      expect(wrapper.state('windowVisible')).toBe(true);
    });
  });

  describe('closeWindow', () => {
    it('sets windowVisible to false', () => {
      wrapper.instance().closeWindow();
      expect(wrapper.state('windowVisible')).toBe(false);
    });
  });
});
