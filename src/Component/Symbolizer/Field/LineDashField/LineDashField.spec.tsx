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
import { render, fireEvent } from '@testing-library/react';
import { LineDashField } from './LineDashField';

describe('OffsetField', () => {

  const dashArray = [20, 10, 1, 10];

  it('is defined', () => {
    expect(LineDashField).toBeDefined();
  });

  it('renders correctly', () => {
    const field = render(<LineDashField />);
    expect(field.container).toBeInTheDocument();
  });

  describe('InputFields', () => {
    it('change handlers call the onChange prop method correctly', async() => {
      const onChangeMock = jest.fn();
      const field = render(<LineDashField dashArray={dashArray} onChange={onChangeMock} />);
      const inputs = await field.findAllByRole('spinbutton');

      // const numberInputs = wrapper.find('InputNumber');
      inputs.forEach((numberInput: any, index: number) => {
        fireEvent.change(numberInput, { target: { value: 12 }});
        const newDashArray = [...dashArray];
        newDashArray[index] = 12;
        expect(onChangeMock).toBeCalledWith(newDashArray);
      });
    });
  });

  describe('onAddDash', () => {
    it('calls a passed onChange function with the new dashArray', async() => {
      const onChangeMock = jest.fn();
      const field = render(<LineDashField dashArray={dashArray} onChange={onChangeMock} />);
      const addButton = field.container.querySelector('button.gs-add-dash-button');
      fireEvent.click(addButton);
      let newDashArray = [...dashArray, 1];
      expect(onChangeMock).toHaveBeenCalledWith(newDashArray);
    });
  });

  describe('onRemoveDash', () => {
    it('calls a passed onChange function with the new dashArray', async() => {
      const onChangeMock = jest.fn();
      const field = render(<LineDashField dashArray={dashArray} onChange={onChangeMock} />);
      const removeButton = field.container.querySelector('button.gs-rm-dash-button');
      fireEvent.click(removeButton);
      let newDashArray = [...dashArray];
      newDashArray.splice(newDashArray.length - 1, 1);
      expect(onChangeMock).toHaveBeenCalledWith(newDashArray);
    });
  });

});
