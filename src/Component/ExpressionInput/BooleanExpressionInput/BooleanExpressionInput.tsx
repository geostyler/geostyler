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
  Switch,
  SwitchProps
} from 'antd';
import { FunctionUI, FunctionUIProps } from '../../FunctionUI/FunctionUI';
import {
  Expression,
  GeoStylerBooleanFunction,
  isGeoStylerFunction
} from 'geostyler-style';
import { FunctionOutlined } from '@ant-design/icons';

import './BooleanExpressionInput.less';

export interface BooleanExpressionInputProps {
  value?: Expression<boolean>;
  switchProps?: Omit<SwitchProps, 'checked' | 'onChange' | 'className'>;
  functionUiProps?: FunctionUIProps<GeoStylerBooleanFunction>;
  labelOn?: string;
  labelOff?: string;
  onChange?: (newValue: Expression<boolean>) => void;
  onCancel?: (type: 'boolean') => void;
  className?: string;
}

export const BooleanExpressionInput: React.FC<BooleanExpressionInputProps> = ({
  onChange,
  onCancel,
  value,
  labelOn,
  labelOff,
  className,
  switchProps,
  functionUiProps
}) => {

  let finalClassName = 'boolean-expression-input';
  if (className) {
    finalClassName += ` ${className}`;
  }
  if (isGeoStylerFunction(value)) {
    return (
      <span className={finalClassName}>
        <FunctionUI<GeoStylerBooleanFunction>
          type='boolean'
          value={value}
          {...functionUiProps}
          onChange={onChange}
          onCancel={() => onCancel('boolean')}
        />
      </span>
    );
  }
  return (
    <span className={finalClassName}>
      <Switch
        checked={value}
        onChange={(checked) => {
          onChange?.(checked);
        }}
        checkedChildren={<span>{labelOn}</span>}
        unCheckedChildren={<span>{labelOff}</span>}
        {...switchProps}
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

export default BooleanExpressionInput;
