import RuleTable, { RuleTableProps } from './RuleTable';
import TestUtil from '../../Util/TestUtil';

describe('RuleTable', () => {
  let wrapper: any;
  beforeEach(() => {
    const props: RuleTableProps = {
      // rules: TestUtil.getDummyGsRules()
      rules: []
    };
    wrapper = TestUtil.shallowRenderComponent(RuleTable, props);
  });

  it('is defined', () => {
    expect(RuleTable).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });
});
