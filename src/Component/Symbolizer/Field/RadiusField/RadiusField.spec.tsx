import RadiusField, { RadiusFieldProps } from './RadiusField';
import TestUtil from '../../../../Util/TestUtil';

describe('RadiusField', () => {

  let wrapper: any;
  beforeEach(() => {
    const props: RadiusFieldProps = {};
    wrapper = TestUtil.shallowRenderComponent(RadiusField, props);
  });

  it('is defined', () => {
    expect(RadiusField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
