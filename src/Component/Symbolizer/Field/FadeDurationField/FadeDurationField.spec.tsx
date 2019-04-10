import { FadeDurationField, FadeDurationFieldProps } from './FadeDurationField';
import TestUtil from '../../../../Util/TestUtil';

describe('FadeDurationField', () => {

  let wrapper: any;
  beforeEach(() => {
    const props: FadeDurationFieldProps = {};
    wrapper = TestUtil.shallowRenderComponent(FadeDurationField, props);
  });

  it('is defined', () => {
    expect(FadeDurationField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
