import LineDashField from './LineDashField';
import TestUtil from '../../../../Util/TestUtil';

describe('OffsetField', () => {

  let wrapper: any;
  beforeEach(() => {
    wrapper = TestUtil.shallowRenderComponent(LineDashField, {});
  });

  it('is defined', () => {
    expect(LineDashField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
