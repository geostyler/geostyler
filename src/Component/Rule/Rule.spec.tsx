import { Rule, RuleProps } from './Rule';
import TestUtil from '../../Util/TestUtil';
import en_US from '../../locale/en_US';

describe('Rule', () => {

  let wrapper: any;
  let onRuleChangeDummmy: jest.Mock;
  let onRemoveDummmy: jest.Mock;
  beforeEach(() => {
    const dummyData = TestUtil.getDummyGsData();
    onRuleChangeDummmy = jest.fn();
    onRemoveDummmy = jest.fn();
    const props: RuleProps = {
      internalDataDef: dummyData,
      onRuleChange: onRuleChangeDummmy,
      onRemove: onRemoveDummmy,
      locale: en_US.GsRule
    };
    wrapper = TestUtil.shallowRenderComponent(Rule, props);
  });

  it('is defined', () => {
    expect(Rule).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
