/* Released under the BSD 2-Clause License
 *
 * Copyright © 2018-present, terrestris GmbH & Co. KG and GeoStyler contributors
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

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
