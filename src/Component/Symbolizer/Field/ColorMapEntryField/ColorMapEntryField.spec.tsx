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
import { ColorMapEntryField } from './ColorMapEntryField';

describe('ColorMapEntryField', () => {

  it('is defined', () => {
    expect(ColorMapEntryField).toBeDefined();
  });

  it('renders correctly', () => {
    const field = render(<ColorMapEntryField />);
    expect(field.container).toBeInTheDocument();
  });

  describe('onQuantityChange', () => {
    it('calls onChange', async() => {
      const onChangeMock = jest.fn();
      render(<ColorMapEntryField onChange={onChangeMock} />);
      // TODO: find a better selector
      const input = document.querySelectorAll('input')[0];
      fireEvent.change(input, { target: { value: 200 }});
      expect(onChangeMock).toHaveBeenCalledWith({ quantity: 200});
    });
  });

  describe('onLabelChange', () => {
    it('calls onChange', async() => {
      const onChangeMock = jest.fn();
      render(<ColorMapEntryField onChange={onChangeMock} />);
      // TODO: find a better selector
      const input = document.querySelectorAll('input')[1];
      fireEvent.change(input, { target: { value: 'Peter' }});
      expect(onChangeMock).toHaveBeenCalledWith({ label: 'Peter'});
    });
  });

  describe('onOpacityChange', () => {
    it('calls onChange', async() => {
      const onChangeMock = jest.fn();
      render(<ColorMapEntryField onChange={onChangeMock} />);
      // TODO: find a better selector
      const input = document.querySelectorAll('input')[2];
      fireEvent.change(input, { target: { value: 0.5 }});
      expect(onChangeMock).toHaveBeenCalledWith({ opacity: 0.5 });
    });
  });
});
