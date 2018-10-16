import TestUtil from '../../../Util/TestUtil';
import BoolFilterField from './BoolFilterField';

describe('BoolFilterField', () => {

  let wrapper: any;
  beforeEach(() => {
    let i = 0;
    const dummyFn = () => {
      i = i + 1;
    };
    const dummyData = TestUtil.getDummyGsData();
    wrapper = TestUtil.shallowRenderComponent(BoolFilterField, {internalDataDef: dummyData, onValueChange: dummyFn});
  });

  it('is defined', () => {
    expect(BoolFilterField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
