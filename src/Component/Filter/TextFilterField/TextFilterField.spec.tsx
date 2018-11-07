import TextFilterField, { TextFilterFieldProps } from './TextFilterField';
import TestUtil from '../../../Util/TestUtil';

describe('TextFilterField', () => {

  let wrapper: any;
  let onValueChangeDummy: jest.Mock;
  beforeEach(() => {
    const dummyData = TestUtil.getDummyGsData();
    onValueChangeDummy = jest.fn();
    const props: TextFilterFieldProps = {
      internalDataDef: dummyData,
      onValueChange: onValueChangeDummy,
      validateStatus: 'success'
    };
    wrapper = TestUtil.shallowRenderComponent(TextFilterField, props);
  });

  it('is defined', () => {
    expect(TextFilterField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  describe('#onInputChange', () => {
    it('is defined', () => {
      expect(wrapper.instance().onInputChange).toBeDefined();
    });

    it('calls onValueChange of props', () => {
      const evtMock = {
        target: {
          value: 'Test'
        }
      };
      wrapper.instance().onInputChange(evtMock);
      expect(onValueChangeDummy.mock.calls).toHaveLength(1);
    });
  });

  describe('#onAutoCompleteChange', () => {
    it('is defined', () => {
      expect(wrapper.instance().onAutoCompleteChange).toBeDefined();
    });
  });

});
