import { LineCapField, LineCapFieldProps } from './LineCapField';
import TestUtil from '../../../../Util/TestUtil';

describe('LineCapField', () => {

  let wrapper: any;
  beforeEach(() => {
    const props: LineCapFieldProps = {};
    wrapper = TestUtil.shallowRenderComponent(LineCapField, props);
  });

  it('is defined', () => {
    expect(LineCapField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
