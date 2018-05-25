import OperatorCombo from './OperatorCombo';
import TestUtil from '../../../Util/TestUtil';

describe('OperatorCombo', () => {

  let wrapper: any;
  beforeEach(() => {
    let i = 0;
    const dummyFn = () => {
      i = i + 1;
    };
    const dummyData = TestUtil.getDummyGsData();
    wrapper = TestUtil.shallowRenderComponent(OperatorCombo, {
      internalDataDef: dummyData,
      onOperatorChange: dummyFn
    });
  });

  it('is defined', () => {
    expect(OperatorCombo).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
