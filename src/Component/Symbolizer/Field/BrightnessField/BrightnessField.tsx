import * as React from 'react';

import {
  InputNumber
} from 'antd';

// non default props
export interface BrightnessFieldProps {
  onChange?: (opacity: number) => void;
  brightness?: number;
}

/**
 * Brightness Field
 */
export class BrightnessField extends React.PureComponent<BrightnessFieldProps> {

  render() {
    const {
      onChange,
      brightness
    } = this.props;

    return (
      <InputNumber
        className="editor-field brightness-field"
        min={0}
        max={1}
        step={0.1}
        value={brightness}
        onChange={onChange}
      />
    );
  }
}

export default BrightnessField;
