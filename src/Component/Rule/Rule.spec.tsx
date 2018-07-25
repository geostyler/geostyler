import Rule from './Rule';
import TestUtil from '../../Util/TestUtil';

describe('Rule', () => {

  let wrapper: any;
  beforeEach(() => {
    let i = 0;
    const dummyFn = () => {
      i = i + 1;
    };
    const dummyData = TestUtil.getDummyGsData();
    wrapper = TestUtil.shallowRenderComponentWithLocale(Rule, {
      keyIndex: 0,
      internalDataDef: dummyData,
      onRuleChange: dummyFn,
      onRemove: dummyFn
    });
  });

  it('is defined', () => {
    expect(Rule).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
