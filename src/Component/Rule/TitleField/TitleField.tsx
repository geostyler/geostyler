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
import { Input, Form } from 'antd';

import './TitleField.less';

// default props
interface TitleFieldDefaultProps {
  /** Label for this field */
  label: string;
  /** The default text to place into the empty field */
  placeholder: string;
}
// non default props
export interface TitleFieldProps extends Partial<TitleFieldDefaultProps> {
  /** Callback for onChange */
  onChange?: (newValue: string) => void;
}

/**
 * Input field for the rule title.
 * @deprecated
 */
export class TitleField extends React.Component<TitleFieldProps> {

  public static defaultProps: TitleFieldDefaultProps = {
    label: 'Title',
    placeholder: 'Enter Rule Description (Title)'
  };

  /**
   * Extracts the text value of the ChangeEvent
   * and passes it to the passed in 'onChange' handler.
   */
  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      onChange
    } = this.props;
    if (onChange) {
      onChange(e.target.value);
    }
  };

  render() {

    return (
      <div className="gs-rule-titlefield" >

        <Form.Item label={this.props.label} colon={false} >

          <Input
            className="gs-rule-titlefield-input"
            onChange={this.onChange}
            placeholder={this.props.placeholder}
          />

        </Form.Item>

      </div>
    );
  }
}

export default TitleField;
