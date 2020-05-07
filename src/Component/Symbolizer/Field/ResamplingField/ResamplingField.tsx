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
    RasterSymbolizer
} from 'geostyler-style';

// default props
interface ResamplingFieldDefaultProps {
  resamplingOptions: RasterSymbolizer['resampling'][];
}

// non default props
export interface ResamplingFieldProps extends Partial<ResamplingFieldDefaultProps> {
  onChange?: (resamplings: RasterSymbolizer['resampling']) => void;
  resampling?: RasterSymbolizer['resampling'];
}

/**
 * ResamplingField to select between different resampling options
 */
export class ResamplingField extends React.Component<ResamplingFieldProps> {

  public static defaultProps: ResamplingFieldDefaultProps = {
    resamplingOptions: ['linear', 'nearest']
  };

  getResamplingSelectOptions = () => {
    return this.props.resamplingOptions.map(resamplingOpt => {
        return (
            <Option
                key={resamplingOpt}
                value={resamplingOpt}
            >
            {resamplingOpt}
            </Option>
        );
    });
  }

  render() {
    const {
      resampling,
      onChange
    } = this.props;

    return (
      <Select
        className="editor-field resampling-field"
        allowClear={true}
        value={resampling}
        onChange={onChange}
      >
        {this.getResamplingSelectOptions()}
      </Select>
    );
  }
}

export default ResamplingField;
