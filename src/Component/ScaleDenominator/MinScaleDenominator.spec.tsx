import { MinScaleDenominator, MinScaleDenominatorProps } from './MinScaleDenominator';
import TestUtil from '../../Util/TestUtil';

describe('MinScaleDenominator', () => {

  let wrapper: any;
  let onChangeDummy: jest.Mock;
  beforeEach(() => {
    onChangeDummy = jest.fn();
    const props: MinScaleDenominatorProps = {
      onChange: onChangeDummy
    };
    wrapper = TestUtil.shallowRenderComponent(MinScaleDenominator, props);
  });

  it('is defined', () => {
    expect(MinScaleDenominator).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
