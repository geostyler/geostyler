import KindField, { KindFieldProps } from './KindField';
import TestUtil from '../../../../Util/TestUtil';

describe('KindField', () => {
  let wrapper: any;
  beforeEach(() => {
    const props: KindFieldProps = {};
    wrapper = TestUtil.shallowRenderComponent(KindField, props);
  });

  it('is defined', () => {
    expect(KindField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });
});
