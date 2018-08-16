import { WellKnownNameField } from './WellKnownNameField';
import TestUtil from '../../../../Util/TestUtil';
import en_US from '../../../../locale/en_US';

describe('WellKnownNameField', () => {

  let wrapper: any;
  beforeEach(() => {
    wrapper = TestUtil.shallowRenderComponent(WellKnownNameField, {
      locale: en_US.GsWellKnownNameField
    });
  });

  it('is defined', () => {
    expect(WellKnownNameField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
