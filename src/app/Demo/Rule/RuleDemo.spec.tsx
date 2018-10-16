import RuleDemo from './RuleDemo';
import TestUtil from '../../../Util/TestUtil';

describe('RuleDemo', () => {

  let wrapper: any;
  beforeEach(() => {
    wrapper = TestUtil.shallowRenderComponent(RuleDemo, {});
  });

  it('is defined', () => {
    expect(RuleDemo).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
