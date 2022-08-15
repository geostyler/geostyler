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

import * as React from 'react';
import { InputNumber, Form } from 'antd';

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';
import { GeoStylerLocale } from '../../../locale/locale';

// default props
interface NumberFilterFieldDefaultProps {
  locale: GeoStylerLocale['NumberFilterField'];
  /** Initial value set to the field */
  value: number | undefined;
  /** Validation status */
  validateStatus: 'success' | 'warning' | 'error' | 'validating';
  /** Element to show a help text */
  help: React.ReactNode;
}
// non default props
export interface NumberFilterFieldProps extends Partial<NumberFilterFieldDefaultProps> {
  /** Callback for onChange */
  onValueChange?: ((newValue: number) => void);
  size?: 'large' | 'middle' | 'small';
}

/**
 * Input field for a numeric filter value.
 */
export const NumberFilterField: React.FC<NumberFilterFieldProps> = ({
  locale = en_US.NumberFilterField,
  value,
  validateStatus = 'success',
  help = locale.help,
  onValueChange,
  size
}) => {

  const helpTxt = validateStatus !== 'success' ? help : null;

  return (
    <div
      className="gs-number-filter-field"
      draggable={true}
      onDragStart={(e) => e.preventDefault()}
    >
      <Form.Item
        label={locale.label}
        colon={false}
        validateStatus={validateStatus}
        help={helpTxt}
        hasFeedback={true}
      >
        <InputNumber
          size={size}
          defaultValue={value}
          value={value}
          onChange={onValueChange}
          placeholder={locale.placeholder}
        />
      </Form.Item>
    </div>
  );
};

export default localize(NumberFilterField, 'NumberFilterField');
