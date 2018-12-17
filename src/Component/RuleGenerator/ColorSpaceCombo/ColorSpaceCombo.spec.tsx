import {
  ColorSpaceCombo
} from './ColorSpaceCombo';
import TestUtil from '../../../Util/TestUtil';

describe('ColorSpaceCombo', () => {

  let wrapper: any;
  beforeEach(() => {
    wrapper = TestUtil.shallowRenderComponent(ColorSpaceCombo);
  });

  it('is defined', () => {
    expect(ColorSpaceCombo).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });
});
