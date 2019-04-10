import * as React from 'react';

import {
  InputNumber
} from 'antd';

// non default props
export interface SaturationFieldProps {
  onChange?: (opacity: number) => void;
  saturation?: number;
}

/**
 * SaturationField
 */
export class SaturationField extends React.PureComponent<SaturationFieldProps> {

  render() {
    const {
      onChange,
      saturation
    } = this.props;

    return (
      <InputNumber
        className="editor-field saturation-field"
        min={-1}
        max={1}
        step={0.1}
        value={saturation}
        onChange={onChange}
      />
    );
  }
}

export default SaturationField;
