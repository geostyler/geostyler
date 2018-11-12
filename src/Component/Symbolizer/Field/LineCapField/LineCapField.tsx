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
interface LineCapFieldDefaultProps {
  label: string;
  capOptions: LineSymbolizer['cap'][];
}

// non default props
export interface LineCapFieldProps extends Partial<LineCapFieldDefaultProps> {
  onChange?: (caps: LineSymbolizer['cap']) => void;
  cap?: LineSymbolizer['cap'];
}

/**
 * LineCapField to select between different line-cap options
 */
export class LineCapField extends React.Component<LineCapFieldProps> {

  public static defaultProps: LineCapFieldDefaultProps = {
    label: 'Line-Cap',
    capOptions: ['butt', 'round', 'square']
  };

  public shouldComponentUpdate(nextProps: LineCapFieldProps): boolean {
    const diffProps = !_isEqual(this.props, nextProps);
    return diffProps;
  }

  getCapSelectOptions = () => {
    return this.props.capOptions.map(capOpt => {
        return (
            <Option
                key={capOpt}
                value={capOpt}
            >
            {capOpt}
            </Option>
        );
    });
  }

  render() {
    const {
      cap,
      label,
      onChange
    } = this.props;

    return (
      <div className="editor-field line-cap">
        <span className="label">{`${label}:`}</span>
        <Select
          value={cap}
          onChange={onChange}
        >
          {this.getCapSelectOptions()}
        </Select>
      </div>
    );
  }
}

export default LineCapField;
