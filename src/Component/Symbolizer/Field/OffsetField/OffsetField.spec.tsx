import OffsetField from './OffsetField';
import TestUtil from '../../../../Util/TestUtil';

describe('OffsetField', () => {

  let wrapper: any;
  beforeEach(() => {
    wrapper = TestUtil.shallowRenderComponent(OffsetField, {});
  });

  it('is defined', () => {
    expect(OffsetField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
