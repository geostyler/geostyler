import ScaleDenominator from './ScaleDenominator';
import TestUtil from '../../Util/TestUtil';

describe('ScaleDenominator', () => {

  let wrapper: any;
  beforeEach(() => {
    let i = 0;
    const dummyFn = () => {
      i = i + 1;
    };

    wrapper = TestUtil.shallowRenderComponent(ScaleDenominator, {
      minScaleDenom: 0,
      maxScaleDenom: 1000,
      onChange: dummyFn
    });
  });

  it('is defined', () => {
    expect(ScaleDenominator).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
