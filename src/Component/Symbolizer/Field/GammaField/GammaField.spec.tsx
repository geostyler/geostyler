import { GammaField, GammaFieldProps } from './GammaField';
import TestUtil from '../../../../Util/TestUtil';

describe('GammaField', () => {

  let wrapper: any;
  beforeEach(() => {
    const props: GammaFieldProps = {};
    wrapper = TestUtil.shallowRenderComponent(GammaField, props);
  });

  it('is defined', () => {
    expect(GammaField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
