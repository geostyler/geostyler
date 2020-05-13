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

import {
  InputNumber, Button
} from 'antd';

import './LineDashField.less';

// default props
interface LineDashFieldDefaultProps {
  dashArray: number[];
}

// non default props
export interface LineDashFieldProps extends Partial<LineDashFieldDefaultProps> {
  onChange?: (dashArray: number[]) => void;
}

/**
 * LineDashField to edit dashes for LineSymbolizers
 */
export class LineDashField extends React.Component<LineDashFieldProps> {

  public static defaultProps: LineDashFieldDefaultProps = {
    dashArray: []
  };

  onAddDash = () => {
    const {
      onChange,
      dashArray
    } = this.props;
    // add a new dash (UI)
    let newDashArray = [...dashArray];
    newDashArray.push(1);
    if (onChange) {
      onChange(newDashArray);
    }
  }

  onRemoveDash = () => {
    const {
      onChange,
      dashArray
    } = this.props;
    // remove last dash (UI)
    let newDashArray = [...dashArray];
    newDashArray.splice(newDashArray.length - 1, 1);
    if (onChange) {
      onChange(newDashArray);
    }
  }

  render() {
    const {
      onChange,
      dashArray
    } = this.props;

    return (
      <div className="editor-field linedash-field">
        {
          dashArray.map((dash, idx) => <InputNumber
            key={idx}
            value={dash}
            min={1}
            step={1}
            style={{ width: 55 }}
            onChange={(value: number) => {
              // replace current dash value
              let newDashArray = [...dashArray];
              newDashArray[idx] = value;
              if (onChange) {
                onChange(newDashArray);
              }
            }}
          />)
        }
        <Button
          className="gs-add-dash-button"
          icon="plus"
          onClick={this.onAddDash}
        />
        <Button
          className="gs-rm-dash-button"
          icon="minus"
          onClick={this.onRemoveDash}
        />
      </div>
    );
  }
}

export default LineDashField;
