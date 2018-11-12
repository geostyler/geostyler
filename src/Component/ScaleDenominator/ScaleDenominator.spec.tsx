import { ScaleDenominator, ScaleDenominatorProps } from './ScaleDenominator';
import TestUtil from '../../Util/TestUtil';

describe('ScaleDenominator', () => {

  let wrapper: any;
  let onChangeDummy: jest.Mock;
  beforeEach(() => {
    onChangeDummy = jest.fn();
    const props: ScaleDenominatorProps = {
      onChange: onChangeDummy
    };
    wrapper = TestUtil.shallowRenderComponent(ScaleDenominator, props);
  });

  it('is defined', () => {
    expect(ScaleDenominator).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
