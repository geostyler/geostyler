import { OperatorCombo, OperatorComboProps } from './OperatorCombo';
import TestUtil from '../../../Util/TestUtil';

describe('OperatorCombo', () => {

  let wrapper: any;
  let dummyOnOperatorChange = jest.fn();
  beforeEach(() => {
    dummyOnOperatorChange = jest.fn();
    const dummyData = TestUtil.getDummyGsData();
    const props: OperatorComboProps = {
      internalDataDef: dummyData,
      onOperatorChange: dummyOnOperatorChange
    };
    wrapper = TestUtil.shallowRenderComponent(OperatorCombo, props);
  });

  it('is defined', () => {
    expect(OperatorCombo).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
