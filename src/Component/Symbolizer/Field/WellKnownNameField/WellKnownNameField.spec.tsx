import { WellKnownNameField, WellKnownNameFieldProps } from './WellKnownNameField';
import TestUtil from '../../../../Util/TestUtil';
import en_US from '../../../../locale/en_US';

describe('WellKnownNameField', () => {

  let wrapper: any;
  beforeEach(() => {
    const props: WellKnownNameFieldProps = {
      locale: en_US.GsWellKnownNameField
    };
    wrapper = TestUtil.shallowRenderComponent(WellKnownNameField, props);
  });

  it('is defined', () => {
    expect(WellKnownNameField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  it('creates 6 default options', () => {
    expect(wrapper.instance().getWKNSelectOptions()).toHaveLength(15);
  });

  it('can handle wellKnownNames property', () => {
    expect.assertions(2);
    wrapper.setProps({
      wellKnownNames: ['Circle', 'Square']
    });
    expect(wrapper.instance().props.wellKnownNames).toHaveLength(2);
    expect(wrapper.instance().getWKNSelectOptions()).toHaveLength(2);
  });

  it('can handle wellKnownName property', () => {
    expect.assertions(2);
    wrapper.setProps({
      wellKnownName: 'Square'
    });
    expect(wrapper.instance().props.wellKnownName).toEqual('Square');
    const select = wrapper.find('Select');
    const selectValue = select.props().value;
    expect(selectValue).toEqual('Square');
  });
});
