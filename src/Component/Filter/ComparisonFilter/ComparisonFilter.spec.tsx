import ComparisonFilter from './ComparisonFilter';
import TestUtil from '../../../Util/TestUtil';

describe('ComparisonFilter', () => {

  const dummyFilterFn = jest.fn();
  let wrapper: any;

  beforeEach(() => {
    // wrapper = TestUtil.mountComponent(AttributeCombo);
    let i = 0;
    const dummyFn = () => {
      i = i + 1;
    };
    const dummyData = TestUtil.getDummyGsData();
    const defaultProps = {
      internalDataDef: dummyData,
      onFilterChange: dummyFn,
      attributeNameFilter: dummyFilterFn
    };
    wrapper = TestUtil.shallowRenderComponent(ComparisonFilter, defaultProps);
  });

  it('is defined', () => {
    expect(ComparisonFilter).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });
});
