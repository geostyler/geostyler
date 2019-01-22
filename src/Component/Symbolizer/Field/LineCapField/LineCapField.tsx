import * as React from 'react';

import {
  Select
} from 'antd';
const Option = Select.Option;

import {
    LineSymbolizer
} from 'geostyler-style';

// default props
interface LineCapFieldDefaultProps {
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
    capOptions: ['butt', 'round', 'square']
  };

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
      onChange
    } = this.props;

    return (
      <Select
        className="editor-field line-cap"
        value={cap}
        onChange={onChange}
      >
        {this.getCapSelectOptions()}
      </Select>
    );
  }
}

export default LineCapField;
