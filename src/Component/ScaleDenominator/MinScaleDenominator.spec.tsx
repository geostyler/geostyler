import MinScaleDenominator from './MinScaleDenominator';
import TestUtil from '../../Util/TestUtil';

describe('MinScaleDenominator', () => {

  let wrapper: any;
  beforeEach(() => {
    let i = 0;
    const dummyFn = () => {
      i = i + 1;
    };

    wrapper = TestUtil.shallowRenderComponent(MinScaleDenominator, {
      value: 0,
      onChange: dummyFn
    });
  });

  it('is defined', () => {
    expect(MinScaleDenominator).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
