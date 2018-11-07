import TestUtil from '../../../Util/TestUtil';
import BoolFilterField, { BoolFilterFieldProps } from './BoolFilterField';

describe('BoolFilterField', () => {

  let wrapper: any;
  beforeEach(() => {
    const props: BoolFilterFieldProps = {};
    wrapper = TestUtil.shallowRenderComponent(BoolFilterField, props);
  });

  it('is defined', () => {
    expect(BoolFilterField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
