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

import { Checkbox, Form } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox';

// default props
interface BoolFilterFieldDefaultProps {
  /** Label for this field */
  label: string;
  /** Initial value set to the field */
  value: boolean;
}
// non default props
export interface BoolFilterFieldProps extends Partial<BoolFilterFieldDefaultProps> {
  /** Callback function for onChange */
  onValueChange?: ((newValue: boolean) => void);
}
// state
interface BoolFilterFieldState {
  value: boolean;
}

/**
 * Checkbox field for a boolean filter value.
 */
export class BoolFilterField extends React.Component<BoolFilterFieldProps, BoolFilterFieldState> {

  public static defaultProps: BoolFilterFieldDefaultProps = {
    label: 'Value',
    value: false
  };

  constructor(props: BoolFilterFieldProps) {
    super(props);
    this.state = {
      value: this.props.value ? true : false
    };
  }

  static getDerivedStateFromProps(
      nextProps: BoolFilterFieldProps,
      prevState: BoolFilterFieldState): Partial<BoolFilterFieldState> {
    return {
      value: nextProps.value
    };
  }

  /**
   * Extracts the boolean value out of the CheckboxChangeEvent of 'onChange'
   * and passes it to the passed in 'onValueChange' handler.
   */
  onChange = (e: CheckboxChangeEvent) => {
    const {
      onValueChange
    } = this.props;

    if (onValueChange) {
      onValueChange(e.target.checked);
    }

    this.setState({value: e.target.checked});
  }

  render() {

    return (
      <div className="gs-text-filter-fld">

        <Form.Item label={this.props.label} colon={false} >

          <Checkbox
            checked={this.state.value === true}
            onChange={this.onChange}
          />

        </Form.Item>

      </div>
    );
  }
}

export default BoolFilterField;
