import * as React from 'react';

import {
  InputNumber
} from 'antd';
import { InputNumberProps } from 'antd/lib/input-number';

// non default props
export interface OpacityFieldProps extends Partial<InputNumberProps> {
  onChange?: (opacity: number | undefined) => void;
  opacity?: number;
}

/**
 * OpacityField
 */
export class OpacityField extends React.PureComponent<OpacityFieldProps> {

  render() {
    const {
      onChange,
      opacity,
      ...inputProps
    } = this.props;

    return (
      <InputNumber
        className="editor-field opacity-field"
        min={0}
        max={1}
        step={0.01}
        value={opacity}
        onChange={onChange}
        {...inputProps}
      />
    );
  }
}

export default OpacityField;
