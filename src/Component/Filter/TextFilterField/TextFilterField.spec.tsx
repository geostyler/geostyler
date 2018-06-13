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

  describe('#onChange', () => {
    it('is defined', () => {
      expect(wrapper.instance().onChange).toBeDefined();
    });

    it('calls onValueChange of props', () => {
      const evtMock = {
        target: {
          value: 'Test'
        }
      };

      wrapper.instance().onChange(evtMock);
      expect(dummyFn.mock.calls).toHaveLength(1);
    });
  });

});
