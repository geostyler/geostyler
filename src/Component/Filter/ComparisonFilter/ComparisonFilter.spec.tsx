import { ComparisonFilter, ComparisonFilterProps } from './ComparisonFilter';
import TestUtil from '../../../Util/TestUtil';

describe('ComparisonFilter', () => {

  const dummyFilterFn = jest.fn();
  const onValidationChanged = jest.fn();
  const onFilterChange = jest.fn();
  const attrValidator = jest.fn();
  const operatorValidator = jest.fn();
  // TODO check why jest.fn() / mockReturnValue does not work here
  // use native function and counter as fallback
  let valueValidatorCalled = 0;
  const valueValidator = () => {
    valueValidatorCalled++;
    return {
      isValid: false,
      errorMsg: 'Please enter valid input'
    };
  };

  let wrapper: any;

  beforeEach(() => {
    const dummyData = TestUtil.getDummyGsData();
    const props: ComparisonFilterProps = {
      internalDataDef: dummyData,
      onFilterChange,
      attributeNameFilter: dummyFilterFn,
      onValidationChanged,
      validators: {
        attribute: attrValidator,
        operator: operatorValidator,
        value: valueValidator
      }
    };
    wrapper = TestUtil.shallowRenderComponent(ComparisonFilter, props);
  });

  afterEach(() => {
    dummyFilterFn.mockReset();
    onValidationChanged.mockReset();
    onFilterChange.mockReset();
    attrValidator.mockReset();
    operatorValidator.mockReset();
    valueValidatorCalled = 0;
  });

  it('is defined', () => {
    expect(ComparisonFilter).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  describe('#onAttributeChange', () => {
    it('is defined', () => {
      expect(wrapper.instance().onAttributeChange).toBeDefined();
    });

    it('calls onFilterChange', () => {
      const attribute: string = 'foo';
      wrapper.instance().onAttributeChange(attribute);
      expect(onFilterChange.mock.calls).toHaveLength(1);
    });
  });

  describe('#onOperatorChange', () => {
    it('is defined', () => {
      expect(wrapper.instance().onOperatorChange).toBeDefined();
    });

    it('calls onFilterChange is available', () => {
      const operator: string = '==';
      wrapper.instance().onOperatorChange(operator);
      expect(onFilterChange.mock.calls).toHaveLength(1);
    });
  });

  describe('#onValueChange', () => {
    it('is defined', () => {
      expect(wrapper.instance().onValueChange).toBeDefined();
    });

    it('calls onFilterChange is available', () => {
      const value: string = 'Peter';
      wrapper.instance().onValueChange(value);
      expect(onFilterChange.mock.calls).toHaveLength(1);
    });
  });

  describe('#validateFilter', () => {
    it('is defined', () => {
      expect(wrapper.instance().validateFilter).toBeDefined();
    });

    it('updates state by erroneous validation status if filter is empty', () => {
      wrapper.setProps({
        filter: undefined
      });
      wrapper.instance().validateFilter();

      const promise = new Promise(resolve => {
        setTimeout(resolve, 500);
      });
      expect.assertions(1);

      return promise.then(() => {
        const expectedResult = {
          attribute: 'error',
          operator: 'error',
          value: 'error'
        };

        const stateAfter = wrapper.state();
        expect(stateAfter.validateStatus).toEqual(expectedResult);
      });
    });

    it('calls validator functions if passed as props', () => {
      wrapper.instance().validateFilter();
      expect(attrValidator.mock.calls).toHaveLength(1);
      expect(operatorValidator.mock.calls).toHaveLength(1);
      expect(valueValidatorCalled).toBe(1);
    });

    it('calls onValidationChanged is available', () => {
      wrapper.instance().validateFilter();
      expect(onValidationChanged.mock.calls).toHaveLength(1);
    });
  });
});
