import * as React from 'react';

import {
  Select
} from 'antd';
const Option = Select.Option;

import {
    LineSymbolizer
} from 'geostyler-style';

const _isEqual = require('lodash/isEqual');

// default props
interface LineJoinFieldDefaultProps {
  label: string;
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
    label: 'Line-Join',
    joinOptions: ['bevel', 'round', 'miter']
  };

  public shouldComponentUpdate(nextProps: LineJoinFieldProps): boolean {
    const diffProps = !_isEqual(this.props, nextProps);
    return diffProps;
  }

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
      label,
      onChange
    } = this.props;

    return (
      <div className="editor-field line-join">
        <span className="label">{`${label}:`}</span>
        <Select
          value={join}
          onChange={onChange}
        >
          {this.getJoinSelectOptions()}
        </Select>
      </div>
    );
  }
}

export default LineJoinField;
