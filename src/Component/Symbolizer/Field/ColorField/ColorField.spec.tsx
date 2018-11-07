import ColorField, { ColorFieldProps } from './ColorField';
import TestUtil from '../../../../Util/TestUtil';

describe('ColorField', () => {
  let wrapper: any;
  beforeEach(() => {
    const props: ColorFieldProps = {};
    wrapper = TestUtil.shallowRenderComponent(ColorField, props);
  });

  it('is defined', () => {
    expect(ColorField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });
});
