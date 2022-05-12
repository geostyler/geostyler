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
import { render, act, fireEvent } from '@testing-library/react';
import { GraphicTypeField } from './GraphicTypeField';

describe('GraphicTypeField', () => {

  it('is defined', () => {
    expect(GraphicTypeField).toBeDefined();
  });

  it('renders correctly', () => {
    const field = render(<GraphicTypeField />);
    expect(field.container).toBeInTheDocument();
  });

  it('can handle wellKnownNames property', async() => {
  });

  it('gets the right default type select options', async() => {
    const field = render(<GraphicTypeField />);
    const input = await field.findByRole('combobox');
    await act(async() => {
      fireEvent.mouseDown(input);
    });
    expect(document.body.querySelectorAll('.ant-select-item').length).toBe(2);
  });

  it('gets the right default type select options', async() => {
    const field = render(<GraphicTypeField graphicTypes={['Mark']} />);
    const input = await field.findByRole('combobox');
    await act(async() => {
      fireEvent.mouseDown(input);
    });
    expect(document.body.querySelectorAll('.ant-select-item').length).toBe(1);
  });

});
