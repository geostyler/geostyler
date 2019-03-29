import { ContrastField, ContrastFieldProps } from './ContrastField';
import TestUtil from '../../../../Util/TestUtil';

describe('ContrastField', () => {

  let wrapper: any;
  beforeEach(() => {
    const props: ContrastFieldProps = {};
    wrapper = TestUtil.shallowRenderComponent(ContrastField, props);
  });

  it('is defined', () => {
    expect(ContrastField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
