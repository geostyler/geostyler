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
  CapType,
  Expression,
  LineSymbolizer
} from 'geostyler-style';
import StringExpressionSelect, { StringExpressionSelectProps }
  from '../../../ExpressionInput/StringExpressionSelect/StringExpressionSelect';

export interface LineCapFieldProps {
  capOptions?: CapType[];
  onChange?: (cap: LineSymbolizer['cap'] | Expression<string>) => void;
  value?: LineSymbolizer['cap'] | Expression<string>;
}

type SelectProps = StringExpressionSelectProps['selectProps'];

/**
 * LineCapField to select between different line-cap options
 */
export const LineCapField: React.FC<LineCapFieldProps & SelectProps> = ({
  onChange,
  value,
  capOptions = ['butt', 'round', 'square'],
  ...selectProps
}) => {

  const options =  capOptions.map(capOpt => ({
    label: capOpt,
    value: capOpt
  }));

  function onCancel() {
    onChange(undefined);
  }

  return (
    <StringExpressionSelect
      className="editor-field line-cap-field"
      value={value}
      onChange={val => onChange(val)}
      onCancel={onCancel}
      selectProps={{
        ...selectProps,
        options
      }}
    />
  );
};

export default LineCapField;
