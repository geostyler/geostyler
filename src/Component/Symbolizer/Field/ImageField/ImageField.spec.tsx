import ImageField, { ImageFieldProps } from './ImageField';
import TestUtil from '../../../../Util/TestUtil';

describe('ImageField', () => {
  let wrapper: any;
  beforeEach(() => {
    const props: ImageFieldProps = {};
    wrapper = TestUtil.shallowRenderComponent(ImageField, props);
  });

  it('is defined', () => {
    expect(ImageField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });
});
