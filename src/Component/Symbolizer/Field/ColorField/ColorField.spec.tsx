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
import { ColorField } from './ColorField';

describe('ColorField', () => {

  it('is defined', () => {
    expect(ColorField).toBeDefined();
  });

  it('renders correctly', () => {
    const field = render(<ColorField />);
    expect(field.container).toBeInTheDocument();
  });

  describe('onColorPreviewClick', () => {
    it('toggles state of colorPickerVisible', async () => {
      const field = render(<ColorField />);
      const button = field.container.querySelector('button.color-preview');
      fireEvent.click(button);
      expect(document.querySelector('.sketch-picker')).toBeInTheDocument();
      fireEvent.click(button);
      expect(document.querySelector('.sketch-picker')).not.toBeInTheDocument();
    });
  });

  // describe('onChangeComplete', () => {
  //   it('calls a passed on Change method with a color hex', async () => {
  //     const onChangeMock = jest.fn();
  //     const field = render(<ColorField onChange={onChangeMock} color="000000"/>);
  //     const button = field.container.querySelector('button.color-preview');
  //     fireEvent.click(button);
  //     const hexInput = await field.findByLabelText('hex');
  //     fireEvent.change(hexInput, { target: { value: '#FFFFFF' }});
  //     expect(onChangeMock).toHaveBeenCalledWith('#FFFFFF');
  //   });
  // });
});