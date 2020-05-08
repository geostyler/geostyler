/* Released under the BSD 2-Clause License
 *
 * Copyright (c) 2018-present, terrestris GmbH & Co. KG
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
  Select
} from 'antd';
const Option = Select.Option;

// default props
interface FontPickerDefaultProps {
  fontOptions: string[];
}

// non default props
export interface FontPickerProps extends Partial<FontPickerDefaultProps> {
  onChange?: (fonts: string[]) => void;
  font?: string[];
}

/**
 * FontPicker to select font types / families
 */
export class FontPicker extends React.Component<FontPickerProps> {

  public static defaultProps: FontPickerDefaultProps = {
    fontOptions: [
      'Arial', 'Verdana', 'Sans-serif',
      'Courier New', 'Lucida Console', 'Monospace',
      'Times New Roman', 'Georgia', 'Serif'
    ]
  };

  render() {
    const {
      font,
      onChange,
      fontOptions
    } = this.props;

    const children: JSX.Element[] = [];
    if (fontOptions) {
      fontOptions.forEach(fontOpt => {
        children.push(<Option key={fontOpt}>{fontOpt}</Option>);
      });
    }

    return (
      <Select
        className="editor-field font-picker"
        mode="tags"
        value={font}
        onChange={onChange}
      >
        {children}
      </Select>
    );
  }
}

export default FontPicker;
