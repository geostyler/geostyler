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

import { ComparisonOperator } from 'geostyler-style';
import { Select, Form } from 'antd';
import _indexOf from 'lodash/indexOf';
const Option = Select.Option;

// default props
interface OperatorComboDefaultProps {
  /** Label for this field */
  label: string;
  /** Show title of selected item */
  showTitles: boolean;
  /** The default text to place into the empty field */
  placeholder: string;
  /** List of operators to show in this combo */
  operators: string[];
  /** Mapping function for operator names in this combo */
  operatorNameMappingFunction: (originalOperatorName: string) => string;
  /** Mapping function for operator title in this combo */
  operatorTitleMappingFunction: (originalOperatorName: string) => string;
  /** Validation status */
  validateStatus: 'success' | 'warning' | 'error' | 'validating';
  /** Element to show a help text */
  help: React.ReactNode;
}
// non default props
export interface OperatorComboProps extends Partial<OperatorComboDefaultProps> {
  /** Callback function for onChange */
  onOperatorChange?: ((newOperator: ComparisonOperator) => void);
  /** Initial value set to the field */
  value?: ComparisonOperator | undefined;
  size?: 'large' | 'middle' | 'small';
}

/**
 * Combobox offering different filter operators.
 */
export const OperatorCombo: React.FC<OperatorComboProps> = ({
  label = 'Operator',
  showTitles = true,
  placeholder = 'Select Operator',
  value,
  operators = ['==', '*=', '!=', '<', '<=', '>', '>='],
  operatorNameMappingFunction = n => n,
  operatorTitleMappingFunction = t => t,
  validateStatus = 'error',
  help = 'Please select an operator.',
  onOperatorChange,
  size
}) => {

  // create an option per attribute
  const options = operators.map(operator => {
    const title = showTitles
      ? operatorTitleMappingFunction(operator)
      : ' ';

    return (
      <Option
        key={operator}
        value={operator}
        title={title}
      >
        {operatorNameMappingFunction(operator)}
      </Option>
    );
  });

  let helpText = validateStatus !== 'success' ? help : null;

  if (!operators.includes(value)) {
    helpText = 'Operator is not valid for this attribute.';
  }

  return (
    <div className="gs-operator-combo">
      <Form.Item
        label={label}
        colon={false}
        validateStatus={validateStatus}
        help={helpText}
      >
        <Select
          size={size}
          value={value}
          style={{ width: '100%' }}
          onChange={onOperatorChange}
          placeholder={placeholder}
        >
          {options}
        </Select>

      </Form.Item>

    </div>
  );
};

export default OperatorCombo;
