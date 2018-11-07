import NameField, { NameFieldProps } from './NameField';
import TestUtil from '../../Util/TestUtil';

describe('NameField', () => {

  let wrapper: any;
  let onChangeDummy: jest.Mock;
  beforeEach(() => {
    onChangeDummy = jest.fn();
    const props: NameFieldProps = {
      value: 'foo',
      onChange: onChangeDummy
    };
    wrapper = TestUtil.shallowRenderComponent(NameField, props);
  });

  it('is defined', () => {
    expect(NameField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
