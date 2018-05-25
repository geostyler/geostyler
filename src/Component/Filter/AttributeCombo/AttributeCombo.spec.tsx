import AttributeCombo from './AttributeCombo';
import TestUtil from '../../../Util/TestUtil';

describe('AttributeCombo', () => {

  let wrapper: any;
  beforeEach(() => {
    let i = 0;
    const dummyFn = () => {
      i = i + 1;
    };
    const dummyData = TestUtil.getDummyGsData();
    wrapper = TestUtil.shallowRenderComponent(AttributeCombo, {internalDataDef: dummyData, onAttributeChange: dummyFn});
  });

  it('is defined', () => {
    expect(AttributeCombo).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });
});
