import LineCapField from './LineCapField';
import TestUtil from '../../../../Util/TestUtil';

describe('LineCapField', () => {

  let wrapper: any;
  beforeEach(() => {
    wrapper = TestUtil.shallowRenderComponent(LineCapField, {});
  });

  it('is defined', () => {
    expect(LineCapField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
