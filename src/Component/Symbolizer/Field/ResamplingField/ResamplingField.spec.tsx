import { ResamplingField, ResamplingFieldProps } from './ResamplingField';
import TestUtil from '../../../../Util/TestUtil';

describe('ResamplingField', () => {

  let wrapper: any;
  beforeEach(() => {
    const props: ResamplingFieldProps = {};
    wrapper = TestUtil.shallowRenderComponent(ResamplingField, props);
  });

  it('is defined', () => {
    expect(ResamplingField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
