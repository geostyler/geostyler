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
import NumberExpressionInput, { type NumberExpressionInputProps }
  from '../../../ExpressionInput/NumberExpressionInput/NumberExpressionInput';
import { Expression } from 'geostyler-style';
import { SliderProps } from 'antd/lib/slider';

type InputProps = NumberExpressionInputProps['inputProps'];

export interface OpacityFieldProps extends InputProps {
  slider?: boolean;
  value?: Expression<number>;
  className?: string;
  onChange?: (newValue: Expression<number> | undefined) => void;
}

/**
 * OpacityField
 */
export const OpacityField: React.FC<OpacityFieldProps> = ({
  slider = true,
  onChange,
  value,
  className,
  ...inputNumberProps
}) => {
  function onCancel() {
    onChange(inputNumberProps.defaultValue ? Number(inputNumberProps.defaultValue) : undefined);
  }

  let finalClassName = 'editor-field opacity-field';
  if (className) {
    finalClassName += ` ${className}`;
  }

  const sliderProps: SliderProps = {
    min: 0,
    max: 1,
    step: 0.01,
    defaultValue: inputNumberProps.defaultValue ? [Number(inputNumberProps.defaultValue)] : undefined
  };

  return (
    <NumberExpressionInput
      className={finalClassName}
      slider={slider}
      sliderProps={slider ? sliderProps : undefined}
      value={value}
      onChange={onChange}
      onCancel={onCancel}
      inputProps={slider ? undefined : { ...inputNumberProps }}
    />
  );
};
