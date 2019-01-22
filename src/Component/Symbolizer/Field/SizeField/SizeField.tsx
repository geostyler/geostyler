import * as React from 'react';

import {
  InputNumber
} from 'antd';

// non default props
export interface SizeFieldProps {
  size?: number;
  onChange?: (radius: number) => void;
}

/**
 * SizeField
 */
export class SizeField extends React.PureComponent<SizeFieldProps> {

  render() {
    const {
      onChange,
      size
    } = this.props;

    return (
      <InputNumber
        className="editor-field size-field"
        step={0.1}
        value={size}
        onChange={onChange}
      />
    );
  }
}

export default SizeField;
