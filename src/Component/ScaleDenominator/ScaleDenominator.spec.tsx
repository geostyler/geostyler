import { ScaleDenominator } from './ScaleDenominator';
import TestUtil from '../../Util/TestUtil';
import en_US from '../../locale/en_US';

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
      onChange: dummyFn,
      locale: en_US.GsScaleDenominator
    });
  });

  it('is defined', () => {
    expect(ScaleDenominator).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
