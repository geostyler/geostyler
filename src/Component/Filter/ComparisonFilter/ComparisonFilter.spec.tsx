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

import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { ComparisonFilter } from './ComparisonFilter';
import { ComparisonFilter as GsComparisionFilter} from 'geostyler-style';

describe('ComparisonFilter', () => {

  it('is defined', () => {
    expect(ComparisonFilter).toBeDefined();
  });

  it('renders correctly', () => {
    const field = render(<ComparisonFilter />);
    expect(field.container).toBeInTheDocument();
  });

  describe('#onAttributeChange', () => {
    it('calls onFilterChange', () => {
      const filter: GsComparisionFilter = ['==', 'foo', 'Peter'];
      const onFilterChangeDummy = jest.fn();
      const field = render(<ComparisonFilter filter={filter} onFilterChange={onFilterChangeDummy} />);
      const attribute = 'bar';
      const input = field.container.querySelector('.gs-attribute-combo input');
      fireEvent.change(input, { target: { value: attribute}});
      expect(onFilterChangeDummy).toHaveBeenCalledWith(['==', attribute, 'Peter']);
    });
  });

  describe('#onOperatorChange', () => {
    it('calls onFilterChange is available', async () => {
      const filter: GsComparisionFilter = ['==', 'foo', 'Peter'];
      const onFilterChangeDummy = jest.fn();
      const field = render(<ComparisonFilter filter={filter} onFilterChange={onFilterChangeDummy} />);
      const operator = '!=';
      const input = field.container.querySelector('.gs-operator-combo input');
      // const input = await field.findByRole('combobox');
      await act(async () => {
        fireEvent.mouseDown(input);
      });
      const option = await screen.findByTitle(operator);
      fireEvent.click(option);
      expect(onFilterChangeDummy).toHaveBeenCalledWith([operator, 'foo', 'Peter']);
    });
  });

  describe('#onValueChange', () => {
    it('calls onFilterChange is available', async () => {
      const filter: GsComparisionFilter = ['==', 'foo', 'Peter'];
      const onFilterChangeDummy = jest.fn();
      const field = render(<ComparisonFilter filter={filter} onFilterChange={onFilterChangeDummy} />);
      const value = 'Hilde';
      const input = field.container.querySelector('.gs-text-filter-field input');
      fireEvent.change(input, { target: { value: value}});
      expect(onFilterChangeDummy).toHaveBeenCalledWith(['==', 'foo', value]);
    });
  });

  describe('#validateFilter', () => {
    it('shows an error if attribute is invalid', async () => {
      const filter: GsComparisionFilter = ['==', , 'Peter'];
      render(<ComparisonFilter filter={filter} />);
      const errorWarnings = await screen.findAllByRole('alert');
      expect(errorWarnings).toHaveLength(1);
      expect(errorWarnings[0]).toBeInTheDocument();
      expect(errorWarnings[0].innerHTML).toBe('Please select an attribute.');
    });

    it('calls validator functions if passed as props', () => {
      const filter: GsComparisionFilter = ['==', 'foo', 'Peter'];
      const attributeValidatorDummy = jest.fn();
      const operatorValidatorDummy = jest.fn();
      const valueValidatorDummy = jest.fn();
      valueValidatorDummy.mockReturnValue({
        isValid: false,
        errorMsg: 'MOCK MESSAGE'
      });
      const validators = {
        attribute: attributeValidatorDummy,
        operator: operatorValidatorDummy,
        value: valueValidatorDummy
      };

      // initial
      const field = render(<ComparisonFilter filter={filter} validators={validators} />);
      expect(valueValidatorDummy).toHaveBeenCalledWith('Peter', undefined, 'foo');
      expect(attributeValidatorDummy).toHaveBeenCalledWith('foo');
      expect(operatorValidatorDummy).toHaveBeenCalledWith('==');

      // value
      field.rerender(<ComparisonFilter filter={['==', 'foo', 'Hilde']} validators={validators} />);
      expect(valueValidatorDummy).toHaveBeenCalledWith('Hilde', undefined, 'foo');

      // attribute
      field.rerender(<ComparisonFilter filter={['==', 'bar', 'Hilde']} validators={validators} />);
      expect(attributeValidatorDummy).toHaveBeenCalledWith('bar');

      // operator
      field.rerender(<ComparisonFilter filter={['!=', 'bar', 'Hilde']} validators={validators} />);
      expect(operatorValidatorDummy).toHaveBeenCalledWith('!=');
    });

  });
});
