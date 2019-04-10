import { BrightnessField, BrightnessFieldProps } from './BrightnessField';
import TestUtil from '../../../../Util/TestUtil';

describe('BrightnessField', () => {

  let wrapper: any;
  beforeEach(() => {
    const props: BrightnessFieldProps = {};
    wrapper = TestUtil.shallowRenderComponent(BrightnessField, props);
  });

  it('is defined', () => {
    expect(BrightnessField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
