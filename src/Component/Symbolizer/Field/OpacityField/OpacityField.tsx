import * as React from 'react';

import {
  InputNumber
} from 'antd';

// non default props
export interface OpacityFieldProps {
  onChange?: (opacity: number) => void;
  opacity?: number;
}

/**
 * OpacityField
 */
export class OpacityField extends React.PureComponent<OpacityFieldProps> {

  render() {
    const {
      onChange,
      opacity
    } = this.props;

    return (
      <InputNumber
        className="editor-field opacity-field"
        min={0}
        max={1}
        step={0.01}
        value={opacity}
        onChange={onChange}
      />
    );
  }
}

export default OpacityField;
