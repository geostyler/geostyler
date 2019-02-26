import { TitleField, TitleFieldProps } from './TitleField';
import TestUtil from '../../../Util/TestUtil';

describe('TitleField', () => {

  let wrapper: any;
  let onChangeDummy: jest.Mock;
  beforeEach(() => {
    onChangeDummy = jest.fn();
    const props: TitleFieldProps = {
      onChange: onChangeDummy
    };
    wrapper = TestUtil.shallowRenderComponent(TitleField, props);
  });

  it('is defined', () => {
    expect(TitleField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  it('calls the onChange prop function with the value', () => {
    const value = 'Peter';
    const event = {
      target: {value}
    };
    wrapper.instance().onChange(event);
    expect(onChangeDummy).toHaveBeenCalledWith(value);
  });

});
