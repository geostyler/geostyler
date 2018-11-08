import { LineJoinField, LineJoinFieldProps } from './LineJoinField';
import TestUtil from '../../../../Util/TestUtil';

describe('LineJoinField', () => {

  let wrapper: any;
  beforeEach(() => {
    const props: LineJoinFieldProps = {};
    wrapper = TestUtil.shallowRenderComponent(LineJoinField, props);
  });

  it('is defined', () => {
    expect(LineJoinField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
