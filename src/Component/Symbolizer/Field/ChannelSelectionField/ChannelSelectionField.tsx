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
