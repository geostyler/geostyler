import {
  ClassificationCombo
} from './ClassificationCombo';
import TestUtil from '../../../Util/TestUtil';

describe('ClassificationCombo', () => {

  let wrapper: any;
  beforeEach(() => {
    wrapper = TestUtil.shallowRenderComponent(ClassificationCombo);
  });

  it('is defined', () => {
    expect(ClassificationCombo).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });
});
