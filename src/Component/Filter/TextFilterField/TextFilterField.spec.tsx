import TextFilterField from './TextFilterField';
import TestUtil from '../../../Util/TestUtil';

describe('TextFilterField', () => {

  let wrapper: any;
  beforeEach(() => {
    let i = 0;
    const dummyFn = () => {
      i = i + 1;
    };
    const dummyData = TestUtil.getDummyGsData();
    wrapper = TestUtil.shallowRenderComponent(TextFilterField, {
      internalDataDef: dummyData,
      onOperatorChange: dummyFn
    });
  });

  it('is defined', () => {
    expect(TextFilterField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
