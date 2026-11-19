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
import { fireEvent, render } from '@testing-library/react';
import { NumberFilterField } from './NumberFilterField';
import { vi } from 'vitest';
import TestUtil from '../../../Util/TestUtil';
import { GeoStylerContext } from '../../../context/GeoStylerContext/GeoStylerContext';

describe('NumberFilterField', () => {

  it('is defined', () => {
    expect(NumberFilterField).toBeDefined();
  });

  it('renders correctly', () => {
    const field = render(<NumberFilterField />);
    expect(field.container).toBeInTheDocument();
  });

  describe('#onChange', () => {
    it('calls onValueChange of props', async() => {
      const onChangeDummy = vi.fn();
      const value = 1909.09;
      const field = render(<NumberFilterField onValueChange={onChangeDummy} />);
      const input = await field.findByRole('spinbutton');
      fireEvent.change(input, { target: { value }});
      expect(onChangeDummy).toHaveBeenCalledWith(value);
    });
  });

  describe('AutoComplete', () => {
    it.each([',', '.'])('accepts "0%s25" with matching decimalSeparator', async(sep) => {
      const onChangeMock = vi.fn();
      const field = render(
        <GeoStylerContext.Provider value={{data: TestUtil.getDummyGsData()}}>
          <NumberFilterField
            decimalSeparator={sep}
            onValueChange={onChangeMock}
            selectedAttribute="foo"
          />
        </GeoStylerContext.Provider>
      );
      const input = await field.findByRole('combobox');
      fireEvent.change(input, { target: { value: `0${sep}` }});
      fireEvent.change(input, { target: { value: `0${sep}25` }});
      expect(onChangeMock).toHaveBeenLastCalledWith(0.25);
      expect(input).toHaveValue(`0${sep}25`);
    });
  });
});
