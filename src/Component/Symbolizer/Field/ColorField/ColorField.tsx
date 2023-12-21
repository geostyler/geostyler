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

import React, { useCallback } from 'react';
import Color from 'color';

import {
  Button,
  ColorPicker,
  ColorPickerProps
} from 'antd';

import './ColorField.less';
import { useGeoStylerLocale } from '../../../../context/GeoStylerContext/GeoStylerContext';
import {
  Expression,
  GeoStylerStringFunction,
  isGeoStylerFunction
} from 'geostyler-style';
import { FunctionUI } from '../../../FunctionUI/FunctionUI';
import { FunctionOutlined } from '@ant-design/icons';

export interface ColorFieldProps extends Omit<ColorPickerProps, 'onChange' | 'value' | 'defaultValue'> {
  value?: Expression<string>;
  onChange?: (color: Expression<string>) => void;
  defaultValue?: Expression<string>;
}

/**
 * ColorField
 */
export const ColorField: React.FC<ColorFieldProps> = ({
  onChange = () => undefined,
  value,
  defaultValue = '#FFFFFF',
  ...passThroughProps
}) => {

  const locale = useGeoStylerLocale('ColorField');

  const onColorPickerChange = useCallback((_: any, hex: string) => {
    // contains 0% opacity --> should only happen when clear is clicked
    if (hex?.length === 9) {
      onChange(undefined);
    } else {
      onChange(hex);
    }
  }, [onChange]);

  function onCancel() {
    onChange(defaultValue);
  }

  if (isGeoStylerFunction(value)) {
    return (
      <span className="editor-field gs-color-field">
        <FunctionUI<GeoStylerStringFunction>
          type='string'
          value={value}
          onChange={onChange}
          onCancel={onCancel}
        />
      </span>
    );
  }

  let textColor;
  try {
    textColor = Color(value || defaultValue).negate().grayscale().string();
  } catch (error) {
    textColor = '#000000';
  }

  const colorString = value ? value
    : !isGeoStylerFunction(defaultValue)
      ? defaultValue
      : '#FFFFF';

  const btnStyle: React.CSSProperties = {
    backgroundColor: colorString,
    color: textColor
  };

  return (
    <span className="editor-field gs-color-field">
      <ColorPicker
        allowClear
        format='hex'
        {...passThroughProps}
        onChange={onColorPickerChange}
        value={colorString}
      >
        <Button style={btnStyle} className="color-picker-trigger">
          {value ? value.toString() : locale.chooseText}
        </Button>
      </ColorPicker>
      <Button
        className="function-ui-trigger"
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
