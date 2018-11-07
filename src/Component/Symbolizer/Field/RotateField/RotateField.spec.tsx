import RotateField, { RotateFieldProps } from './RotateField';
import TestUtil from '../../../../Util/TestUtil';

describe('RotateField', () => {

  let wrapper: any;
  beforeEach(() => {
    const props: RotateFieldProps = {};
    wrapper = TestUtil.shallowRenderComponent(RotateField, props);
  });

  it('is defined', () => {
    expect(RotateField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
