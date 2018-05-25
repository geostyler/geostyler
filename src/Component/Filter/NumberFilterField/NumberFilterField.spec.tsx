import NumberFilterField from './NumberFilterField';
import TestUtil from '../../../Util/TestUtil';

describe('NumberFilterField', () => {

  let wrapper: any;
  beforeEach(() => {
    let i = 0;
    const dummyFn = () => {
      i = i + 1;
    };
    const dummyData = TestUtil.getDummyGsData();
    wrapper = TestUtil.shallowRenderComponent(NumberFilterField, {
      internalDataDef: dummyData,
      onValueChange: dummyFn,
      selectedAttribute: 'foo'
    });
  });

  it('is defined', () => {
    expect(NumberFilterField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
