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

import './MinScaleDenominator.less';

// default props
interface MinScaleDenominatorDefaultProps {
  /** The label of the minScaleDenominator */
  label: string;
  /** The placeholder text to display if no value is set */
  placeholder: string;
}
// non default props
export interface MinScaleDenominatorProps extends Partial<MinScaleDenominatorDefaultProps> {
  /** The minScaleDenominator value */
  value?: number;
  /** The callback function that is triggered when the state changes */
  onChange?: (newMinScale: number) => void;
}

/**
 * Input field for the minimum scale of a rule.
 */
export class MinScaleDenominator extends React.PureComponent<MinScaleDenominatorProps> {

  public static defaultProps: MinScaleDenominatorDefaultProps = {
    label: 'Min. Scale',
    placeholder: 'Enter min. Scale (Optional)'
  };

  render() {
    const {
      placeholder,
      label,
      value,
      onChange,
      ...passThroughProps
    } = this.props;

    return (
      <Form.Item
        className="gs-min-scaledenominator"
        label={label}
        colon={false}
        {...passThroughProps}
      >
        <InputNumber
          className="gs-min-scaledenominator-input"
          value={value}
          min={0}
          placeholder={placeholder}
          onChange={onChange}
        />
      </Form.Item>
    );
  }
}

export default MinScaleDenominator;
