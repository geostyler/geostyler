import * as React from 'react';

import {
  Select
} from 'antd';
const Option = Select.Option;

import {
    LineSymbolizer
} from 'geostyler-style';

// default props
interface LineJoinFieldDefaultProps {
  joinOptions: LineSymbolizer['join'][];
}

// non default props
export interface LineJoinFieldProps extends Partial<LineJoinFieldDefaultProps> {
  onChange?: (caps: LineSymbolizer['join']) => void;
  join?: LineSymbolizer['join'];
}

/**
 * LineJoinField to select between different line-join options
 */
export class LineJoinField extends React.Component<LineJoinFieldProps> {

  public static defaultProps: LineJoinFieldDefaultProps = {
    joinOptions: ['bevel', 'round', 'miter']
  };

  getJoinSelectOptions = () => {
    return this.props.joinOptions.map(joinOpt => {
        return (
            <Option
                key={joinOpt}
                value={joinOpt}
            >
            {joinOpt}
            </Option>
        );
    });
  }

  render() {
    const {
      join,
      onChange
    } = this.props;

    return (
      <Select
        className="editor-field line-join"
        value={join}
        onChange={onChange}
      >
        {this.getJoinSelectOptions()}
      </Select>
    );
  }
}

export default LineJoinField;
