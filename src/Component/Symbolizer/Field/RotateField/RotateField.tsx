import * as React from 'react';

import {
  InputNumber
} from 'antd';

// non default props
export interface RotateFieldProps {
  onChange?: (radius: number) => void;
  rotate?: number;
}

/**
 * RotateField
 */
export class RotateField extends React.PureComponent<RotateFieldProps> {

  render() {
    const {
      onChange,
      rotate
    } = this.props;

    return (
      <InputNumber
        className="editor-field rotate-field"
        min={-360}
        max={360}
        value={rotate}
        onChange={onChange}
      />
    );
  }
}

export default RotateField;
