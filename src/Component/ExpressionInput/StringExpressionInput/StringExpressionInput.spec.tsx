/* Released under the BSD 2-Clause License
 *
 * Copyright © 2023-present, terrestris GmbH & Co. KG and GeoStyler contributors
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
import { render } from '@testing-library/react';
import StringExpressionInput from './StringExpressionInput';
import { GeoStylerStringFunction } from 'geostyler-style';

describe('StringExpressionInput', () => {

  const stringValue = '1337';
  const stringFunction: GeoStylerStringFunction = {
    name: 'strToLowerCase',
    args: ['Bretzelbude']
  };

  it('is defined', () => {
    expect(StringExpressionInput).toBeDefined();
  });

  it('renders correctly', () => {
    const stringExpressionInput = render(<StringExpressionInput />);
    expect(stringExpressionInput.container).toBeInTheDocument();
  });

  it('renders Input if value is a string', async () => {
    const stringExpressionInput = render(<StringExpressionInput
      value={stringValue}
    />);
    expect(stringExpressionInput.container).toBeInTheDocument();
    expect(document.body.querySelectorAll('.gs-function-ui').length).toBe(0);
    expect(document.body.querySelectorAll('.ant-input').length).toBe(1);
  });

  it('renders FunctionUI if value is a function', async () => {
    const stringExpressionInput = render(<StringExpressionInput
      value={stringFunction}
    />);
    expect(stringExpressionInput.container).toBeInTheDocument();
    expect(document.body.querySelectorAll('.gs-function-ui').length).toBe(1);
    expect(document.body.querySelectorAll('.ant-input').length).toBe(1);
  });

});
