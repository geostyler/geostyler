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

import {
  ContrastEnhancement
} from 'geostyler-style';

// default props
interface ContrastEnhancementFieldDefaultProps {
  contrastEnhancementOptions: ContrastEnhancement['enhancementType'][];
}

// non default props
export interface ContrastEnhancementFieldProps extends Partial<ContrastEnhancementFieldDefaultProps> {
  onChange?: (contrastEnhancement: ContrastEnhancement['enhancementType']) => void;
  contrastEnhancement?: ContrastEnhancement['enhancementType'];
}

/**
 * ContrastEnhancementField to select between different contrast enhancement options
 */
export class ContrastEnhancementField extends React.Component<ContrastEnhancementFieldProps> {

  public static defaultProps: ContrastEnhancementFieldDefaultProps = {
    contrastEnhancementOptions: ['normalize', 'histogram']
  };

  getContrastEnhancementSelectOptions = () => {
    return this.props.contrastEnhancementOptions.map(contrastEnhancementOpt => {
        return (
            <Option
                key={contrastEnhancementOpt}
                value={contrastEnhancementOpt}
            >
            {contrastEnhancementOpt}
            </Option>
        );
    });
  }

  render() {
    const {
      contrastEnhancement,
      onChange
    } = this.props;

    return (
      <Select
        className="editor-field contrastEnhancement-field"
        allowClear={true}
        value={contrastEnhancement}
        onChange={onChange}
      >
        {this.getContrastEnhancementSelectOptions()}
      </Select>
    );
  }
}

export default ContrastEnhancementField;
