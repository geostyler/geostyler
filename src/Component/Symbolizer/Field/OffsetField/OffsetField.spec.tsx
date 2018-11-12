import { OffsetField, OffsetFieldProps } from './OffsetField';
import TestUtil from '../../../../Util/TestUtil';

describe('OffsetField', () => {

  let wrapper: any;
  beforeEach(() => {
    const props: OffsetFieldProps = {};
    wrapper = TestUtil.shallowRenderComponent(OffsetField, props);
  });

  it('is defined', () => {
    expect(OffsetField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
