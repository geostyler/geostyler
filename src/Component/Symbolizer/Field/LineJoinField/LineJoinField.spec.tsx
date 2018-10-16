import LineJoinField from './LineJoinField';
import TestUtil from '../../../../Util/TestUtil';

describe('LineJoinField', () => {

  let wrapper: any;
  beforeEach(() => {
    wrapper = TestUtil.shallowRenderComponent(LineJoinField, {});
  });

  it('is defined', () => {
    expect(LineJoinField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
