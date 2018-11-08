import { WidthField, WidthFieldProps } from './WidthField';
import TestUtil from '../../../../Util/TestUtil';

describe('WidthField', () => {

  let wrapper: any;
  beforeEach(() => {
    const props: WidthFieldProps = {};
    wrapper = TestUtil.shallowRenderComponent(WidthField, props);
  });

  it('is defined', () => {
    expect(WidthField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
