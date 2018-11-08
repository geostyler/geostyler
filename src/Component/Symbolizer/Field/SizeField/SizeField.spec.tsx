import { SizeField, SizeFieldProps } from './SizeField';
import TestUtil from '../../../../Util/TestUtil';

describe('SizeField', () => {

  let wrapper: any;
  beforeEach(() => {
    const props: SizeFieldProps = {};
    wrapper = TestUtil.shallowRenderComponent(SizeField, props);
  });

  it('is defined', () => {
    expect(SizeField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
