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
import { TextFilterField } from './TextFilterField';
import TestUtil from '../../../Util/TestUtil';

describe('TextFilterField', () => {

  let dummyData: any;
  beforeEach(() => {
    dummyData = TestUtil.getDummyGsData();
  });

  it('is defined', () => {
    expect(TextFilterField).toBeDefined();
  });

  it('renders correctly', () => {
    const field = render(<TextFilterField />);
    expect(field.container).toBeInTheDocument();
  });

  describe('TextInput', () => {
    it('renders as Input if no data is passed', () => {
      const field = render(<TextFilterField />);
      const autocomplete = field.queryByRole('combobox');
      const textInput = document.querySelector('.ant-input');
      expect(autocomplete).not.toBeInTheDocument();
      expect(textInput).toBeInTheDocument();
    });

    it('calls onValueChange of props', () => {
      const value = 'Test';
      const onChangeMock = jest.fn();
      render(<TextFilterField onValueChange={onChangeMock} />);
      const textInput = document.querySelector('.ant-input');
      fireEvent.change(textInput, { target: { value }});
      expect(onChangeMock).toHaveBeenCalledWith(value);
    });

  });

  describe('AutoComplete', () => {

    it('renders as Autocomplete if data is passed and attribute is selected', () => {
      const field = render(<TextFilterField selectedAttribute="bar" internalDataDef={dummyData} />);
      const autocomplete = field.queryByRole('combobox');
      const textInput = document.querySelector('.ant-input');
      expect(autocomplete).toBeInTheDocument();
      expect(textInput).not.toBeInTheDocument();
    });

    it('calls onValueChange of props', async () => {
      const onChangeMock = jest.fn();
      const field = render(<TextFilterField
        onValueChange={onChangeMock}
        selectedAttribute="bar"
        internalDataDef={dummyData}
      />);
      const input = await field.findByRole('combobox');
      await act(async () => {
        fireEvent.mouseDown(input);
      });
      fireEvent.click(await screen.findByTitle('bar'));
      expect(onChangeMock).toHaveBeenCalledWith('bar');
    });

  });

});
