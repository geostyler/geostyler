import MaxScaleDenominator from './MaxScaleDenominator';
import TestUtil from '../../Util/TestUtil';

describe('MaxScaleDenominator', () => {

  let wrapper: any;
  beforeEach(() => {
    let i = 0;
    const dummyFn = () => {
      i = i + 1;
    };

    wrapper = TestUtil.shallowRenderComponent(MaxScaleDenominator, {
      value: 0,
      onChange: dummyFn
    });
  });

  it('is defined', () => {
    expect(MaxScaleDenominator).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
