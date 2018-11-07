import LineDashField, { LineDashFieldProps } from './LineDashField';
import TestUtil from '../../../../Util/TestUtil';

describe('OffsetField', () => {

  let wrapper: any;
  beforeEach(() => {
    const props: LineDashFieldProps = {};
    wrapper = TestUtil.shallowRenderComponent(LineDashField, props);
  });

  it('is defined', () => {
    expect(LineDashField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
