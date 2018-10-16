import TextFilterField from './TextFilterField';
import TestUtil from '../../../Util/TestUtil';

describe('TextFilterField', () => {

  let wrapper: any;
  const dummyFn = jest.fn();
  beforeEach(() => {
    const dummyData = TestUtil.getDummyGsData();
    wrapper = TestUtil.shallowRenderComponent(TextFilterField, {
      internalDataDef: dummyData,
      onValueChange: dummyFn,
      validateStatus: 'success'
    });
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
      expect(dummyFn.mock.calls).toHaveLength(1);
    });
  });

  describe('#onAutoCompleteChange', () => {
    it('is defined', () => {
      expect(wrapper.instance().onAutoCompleteChange).toBeDefined();
    });
  });

});
