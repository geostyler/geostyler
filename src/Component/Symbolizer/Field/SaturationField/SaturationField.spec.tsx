import { SaturationField, SaturationFieldProps } from './SaturationField';
import TestUtil from '../../../../Util/TestUtil';

describe('SaturationField', () => {

  let wrapper: any;
  beforeEach(() => {
    const props: SaturationFieldProps = {};
    wrapper = TestUtil.shallowRenderComponent(SaturationField, props);
  });

  it('is defined', () => {
    expect(SaturationField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
