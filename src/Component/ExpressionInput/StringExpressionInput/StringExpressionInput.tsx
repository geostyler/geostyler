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

import {
  Button,
  Input,
  InputProps
} from 'antd';
import { FunctionUI, FunctionUIProps } from '../../FunctionUI/FunctionUI';
import {
  Expression,
  GeoStylerStringFunction,
  isGeoStylerFunction
} from 'geostyler-style';
import { FunctionOutlined } from '@ant-design/icons';

import './StringExpressionInput.css';

export interface StringExpressionInputProps {
  className?: string;
  functionUiProps?: FunctionUIProps<GeoStylerStringFunction>;
  inputProps?: Omit<InputProps, 'value' | 'onChange' | 'className'>;
  onCancel?: (type: 'string') => void;
  onChange?: (newValue: Expression<string> | undefined) => void;
  value?: Expression<string>;
}

export const StringExpressionInput: React.FC<StringExpressionInputProps> = ({
  className,
  functionUiProps,
  inputProps,
  onCancel,
  onChange,
  value
}) => {

  let finalClassName = 'string-expression-input';
  if (className) {
    finalClassName += ` ${className}`;
  }

  if (isGeoStylerFunction(value)) {
    return (
      <span className={finalClassName}>
        <FunctionUI<GeoStylerStringFunction>
          type='string'
          value={value}
          {...functionUiProps}
          onChange={onChange}
          onCancel={() => onCancel?.('string')}
        />
      </span>
    );
  }

  return (
    <span className={finalClassName}>
      <Input
        value={value}
        onChange={(evt) => {
          if (evt.target.value === null) {
            onChange?.(undefined);
          }
          onChange?.(evt.target.value);
        }}
        {...inputProps}
      />
      <Button
        icon={<FunctionOutlined />}
        onClick={() => {
          onChange?.({
            name: 'property',
            args: ['']
          });
        }}
      />
    </span>
  );
};

export default StringExpressionInput;
