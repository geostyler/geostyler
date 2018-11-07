import MaxScaleDenominator, { MaxScaleDenominatorProps } from './MaxScaleDenominator';
import TestUtil from '../../Util/TestUtil';

describe('MaxScaleDenominator', () => {

  let wrapper: any;
  let onChangeDummy: jest.Mock;
  beforeEach(() => {
    onChangeDummy = jest.fn();
    const props: MaxScaleDenominatorProps = {
      onChange: onChangeDummy
    };
    wrapper = TestUtil.shallowRenderComponent(MaxScaleDenominator, props);
  });

  it('is defined', () => {
    expect(MaxScaleDenominator).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
