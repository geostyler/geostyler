import {
  ColorRampCombo
} from './ColorRampCombo';
import TestUtil from '../../../Util/TestUtil';

describe('ColorRampCombo', () => {

  let wrapper: any;
  beforeEach(() => {
    wrapper = TestUtil.shallowRenderComponent(ColorRampCombo);
  });

  it('is defined', () => {
    expect(ColorRampCombo).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });
});
