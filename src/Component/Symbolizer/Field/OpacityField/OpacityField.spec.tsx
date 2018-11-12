import { OpacityField, OpacityFieldProps } from './OpacityField';
import TestUtil from '../../../../Util/TestUtil';

describe('OpacityField', () => {

  let wrapper: any;
  beforeEach(() => {
    const props: OpacityFieldProps = {};
    wrapper = TestUtil.shallowRenderComponent(OpacityField, props);
  });

  it('is defined', () => {
    expect(OpacityField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
