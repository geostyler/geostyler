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
    ChannelSelection
} from 'geostyler-style';

// default props
interface ChannelSelectionFieldDefaultProps {
  channelSelectionOptions: string[];
}

// non default props
export interface ChannelSelectionFieldProps extends Partial<ChannelSelectionFieldDefaultProps> {
  onChange?: (channelSelection: ChannelSelection) => void;
  channelSelection?: ChannelSelection;
}

interface ChannelSelectionFieldState {
  showChannels: boolean;
}

/**
 * ChannelSelectionField to select between different ChannelSelection options
 */
export class ChannelSelectionField extends React.Component<ChannelSelectionFieldProps, ChannelSelectionFieldState> {

  constructor(props: ChannelSelectionFieldProps) {
    super(props);
    this.state = {
      showChannels: false
    };
  }

  public static defaultProps: ChannelSelectionFieldDefaultProps = {
    channelSelectionOptions: ['rgb', 'gray']
  };

  getChannelSelectionSelectOptions = () => {
    return this.props.channelSelectionOptions.map(channelSelectionOpt => {
        return (
            <Option
                key={channelSelectionOpt}
                value={channelSelectionOpt}
            >
            {channelSelectionOpt}
            </Option>
        );
    });
  }

  render() {
    const {
      channelSelection,
      onChange
    } = this.props;
    const {
      showChannels
    } = this.state;

    return (
      <div>
        <Select
          className="editor-field channelSelection-field"
          allowClear={true}
          value={channelSelection}
          onChange={onChange}
          >
          {this.getChannelSelectionSelectOptions()}
        </Select>
        {
          showChannels && (
            <div>Hello World</div>
          )
        }
      </div>
    );
  }
}

export default ChannelSelectionField;
