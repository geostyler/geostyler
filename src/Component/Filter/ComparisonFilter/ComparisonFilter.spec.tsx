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

import React, { useState } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { ComparisonFilter } from './ComparisonFilter';
import { ComparisonFilter as GsComparisionFilter} from 'geostyler-style';
import { vi } from 'vitest';
import { GeoStylerContext } from '../../../context/GeoStylerContext/GeoStylerContext';

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
      const onFilterChangeDummy = vi.fn();
      const field = render(<ComparisonFilter filter={filter} onFilterChange={onFilterChangeDummy} />);
      const attribute = 'bar';
      const input = field.container.querySelector('.gs-attribute-combo input');
      fireEvent.change(input as Element, { target: { value: attribute}});
      expect(onFilterChangeDummy).toHaveBeenCalledWith(['==', attribute, 'Peter']);
    });
  });

  describe('#onOperatorChange', () => {
    it('calls onFilterChange is available', async() => {
      const filter: GsComparisionFilter = ['==', 'foo', 'Peter'];
      const onFilterChangeDummy = vi.fn();
      const field = render(<ComparisonFilter filter={filter} onFilterChange={onFilterChangeDummy} />);
      const operator = '!=';
      const input = field.container.querySelector('.gs-operator-combo input');
      // const input = await field.findByRole('combobox');
      await act(async() => {
        fireEvent.mouseDown(input as Element);
      });
      const option = await screen.findByTitle(operator);
      fireEvent.click(option);
      expect(onFilterChangeDummy).toHaveBeenCalledWith([operator, 'foo', 'Peter']);
    });
  });

  describe('#onValueChange', () => {
    it('calls onFilterChange is available', async() => {
      const filter: GsComparisionFilter = ['==', 'foo', 'Peter'];
      const onFilterChangeDummy = vi.fn();
      const field = render(<ComparisonFilter filter={filter} onFilterChange={onFilterChangeDummy} />);
      const value = 'Hilde';
      const input = field.container.querySelector('.gs-text-filter-field input');
      fireEvent.change(input as Element, { target: { value: value}});
      expect(onFilterChangeDummy).toHaveBeenCalledWith(['==', 'foo', value]);
    });
  });

  describe('#validateFilter', () => {
    it('shows an error if attribute is invalid', async() => {
      const filter: GsComparisionFilter = ['==', '', 'Peter'];
      render(<ComparisonFilter filter={filter} />);
      expect(await screen.findByText('Please select an attribute.')).toBeInTheDocument();
    });

    it('calls validator functions if passed as props', () => {
      const filter: GsComparisionFilter = ['==', 'foo', 'Peter'];
      const attributeValidatorDummy = vi.fn();
      const operatorValidatorDummy = vi.fn();
      const valueValidatorDummy = vi.fn();
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

  describe('decimalSeparator', () => {
    const data: any = {
      schema: {
        title: 'd',
        type: 'object',
        properties: { foo: { type: 'number', minimum: 0.1, maximum: 2 } }
      },
      exampleFeatures: {
        type: 'FeatureCollection',
        features: [{ type: 'Feature', properties: { foo: 0.9 }, geometry: { type: 'Point', coordinates: [0, 0] } }]
      }
    };

    const Wrapper = () => {
      const [filter, setFilter] = useState<GsComparisionFilter>(['==', 'foo', 0.9]);
      return (
        <GeoStylerContext.Provider value={{data}}>
          <ComparisonFilter filter={filter} onFilterChange={setFilter} decimalSeparator="," />
          <output data-testid="value">{String(filter[2])}</output>
        </GeoStylerContext.Provider>
      );
    };

    it('accepts "0,25" as valid number', async() => {
      const field = render(<Wrapper />);
      const input = (await field.findAllByRole('combobox'))
        .find(el => (el as HTMLInputElement).value === '0,9') as HTMLInputElement;
      fireEvent.change(input, { target: { value: '0,25' }});
      expect(field.getByTestId('value').textContent).toBe('0.25');
      expect(input.value).toBe('0,25');
      expect(field.container.querySelector('.ant-form-item-explain')).not.toBeInTheDocument();
    });

    it('shows the validator message instead of the generic help text', async() => {
      const field = render(<Wrapper />);
      const input = (await field.findAllByRole('combobox'))
        .find(el => (el as HTMLInputElement).value === '0,9') as HTMLInputElement;
      fireEvent.change(input, { target: { value: '0,' }});
      expect(field.container.querySelector('.ant-form-item-explain')?.textContent).toBe('Minimum Value is 0.1');
    });
  });
});
