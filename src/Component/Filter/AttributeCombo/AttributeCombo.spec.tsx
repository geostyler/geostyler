import AttributeCombo, { AttributeComboProps } from './AttributeCombo';
import TestUtil from '../../../Util/TestUtil';

describe('AttributeCombo', () => {

  let wrapper: any;
  const dummyFilterFn = jest.fn();
  const dummyData = TestUtil.getDummyGsData();

  beforeEach(() => {
    let i = 0;
    const dummyFn = () => {
      i = i + 1;
    };
    const props: AttributeComboProps = {
      internalDataDef: dummyData,
      onAttributeChange: dummyFn,
      attributeNameFilter: dummyFilterFn
    };
    wrapper = TestUtil.shallowRenderComponent(AttributeCombo, props);
  });

  afterEach(() => {
    dummyFilterFn.mockReset();
  });

  it('is defined', () => {
    expect(AttributeCombo).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  it('calls attribute filter function for each property', () => {
    const numberOfOProps = Object.keys(dummyData.schema.properties).length;
    expect(dummyFilterFn.mock.calls).toHaveLength(numberOfOProps);
  });
});
