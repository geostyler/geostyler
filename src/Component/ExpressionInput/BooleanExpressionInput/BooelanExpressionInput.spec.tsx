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
import BooleanExpressionInput from './BooleanExpressionInput';
import { GeoStylerBooleanFunction } from 'geostyler-style';

describe('BooleanExpressionInput', () => {

  const booleanValue: boolean = false;
  const booleanFunction: GeoStylerBooleanFunction = {
    name: 'between',
    args: [12, 11, 13]
  };

  it('is defined', () => {
    expect(BooleanExpressionInput).toBeDefined();
  });

  it('renders correctly', () => {
    const booleanExpressionInput = render(<BooleanExpressionInput />);
    expect(booleanExpressionInput.container).toBeInTheDocument();
  });

  it('renders Checkbox if value is a number', async () => {
    const booleanExpressionInput = render(<BooleanExpressionInput
      value={booleanValue}
    />);
    expect(booleanExpressionInput.container).toBeInTheDocument();
    expect(document.body.querySelectorAll('.gs-function-ui').length).toBe(0);
    expect(document.body.querySelectorAll('.ant-checkbox').length).toBe(1);
  });

  it('renders FunctionUI if value is a function', async () => {
    const booleanExpressionInput = render(<BooleanExpressionInput
      value={booleanFunction}
    />);
    expect(booleanExpressionInput.container).toBeInTheDocument();
    expect(document.body.querySelectorAll('.gs-function-ui').length).toBe(1);
    expect(document.body.querySelectorAll('.ant-checkbox').length).toBe(0);
  });

});
