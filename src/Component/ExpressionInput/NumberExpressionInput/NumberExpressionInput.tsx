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

import React, { useEffect, useState } from 'react';

import {
  Button,
  Slider,
  InputNumber,
} from 'antd';
import { InputNumberProps } from 'antd/lib/input-number';
import { FunctionUI, FunctionUIProps } from '../../FunctionUI/FunctionUI';
import {
  Expression,
  GeoStylerNumberFunction,
  isGeoStylerFunction
} from 'geostyler-style';
import { FunctionOutlined } from '@ant-design/icons';

import './NumberExpressionInput.css';

type SliderProps = {
  min?: number;
  max?: number;
  step?: number;
};
export interface NumberExpressionInputProps {
  className?: string;
  slider?: boolean;
  sliderProps?: SliderProps;
  functionUiProps?: FunctionUIProps<GeoStylerNumberFunction>;
  inputProps?: Omit<InputNumberProps, 'value' | 'onChange' | 'className'>;
  onCancel?: (type: 'number') => void;
  onChange?: (newValue: Expression<number> | undefined) => void;
  value?: Expression<number>;
}

export const NumberExpressionInput: React.FC<NumberExpressionInputProps> = ({
  slider = false,
  sliderProps = {}, /* more safety */
  onChange,
  onCancel,
  value,
  className,
  inputProps = {},  /* more safety */
  functionUiProps
}) => {
  let finalClassName = 'number-expression-input';
  if (className) {
    finalClassName += ` ${className}`;
  }

  const [inputValue, setInputValue] = useState<number>(() => {
    return isGeoStylerFunction(value) ? undefined : value;
  });

  useEffect(() => {
    if (!isGeoStylerFunction(value)) {
      setInputValue(value);
    }
  }, [value]);

  if (isGeoStylerFunction(value)) {
    return (
      <span className={finalClassName}>
        <FunctionUI<GeoStylerNumberFunction>
          type='number'
          value={value}
          {...functionUiProps}
          onChange={onChange}
          onCancel={() => onCancel?.('number')}
        />
      </span>
    );
  }

  return (
    <span className={finalClassName}>
      {slider ? (
        <div className={'slider-wrapper'}>
          <Slider
            {...sliderProps}
            value={inputValue}
            range={false}
            onChange={(val) => {
              if (val === null) {
                onChange?.(undefined);
              }
              onChange?.(val);
              setInputValue(val === null ? undefined : Number(val));
            }}
          />
          <div className={'number-wrapper'}>
            <InputNumber
              {...sliderProps}
              value={inputValue}
              onChange={(val) => {
                if (val === null) {
                  onChange?.(undefined);
                }
                onChange?.(Number(val));
                setInputValue(val === null ? undefined : Number(val));
              }}
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
          </div>
        </div>
      ) : (
        <>
          <InputNumber
            value={value}
            onChange={(val) => {
              if (val === null) {
                onChange?.(undefined);
              }
              onChange?.(val as number);
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
        </>

      )}
    </span>
  );
};

export default NumberExpressionInput;
