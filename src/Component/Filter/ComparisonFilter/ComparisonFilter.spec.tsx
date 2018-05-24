import ComparisonFilter from './ComparisonFilter';
import TestUtil from '../../../Util/TestUtil';

describe('ComparisonFilter', () => {

  let wrapper: any;
  beforeEach(() => {
    // wrapper = TestUtil.mountComponent(AttributeCombo);
    let i = 0;
    const dummyFn = () => {
      i = i + 1;
    };
    const dummyData = TestUtil.getDummyGsData();
    wrapper = TestUtil.shallowRenderComponent(ComparisonFilter, {internalDataDef: dummyData, onFilterChange: dummyFn});
  });

  it('is defined', () => {
    expect(ComparisonFilter).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
