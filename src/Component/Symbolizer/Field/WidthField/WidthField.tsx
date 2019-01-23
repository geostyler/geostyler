import * as React from 'react';

import {
  InputNumber
} from 'antd';

// non default props
export interface WidthFieldProps {
  onChange?: (radius: number) => void;
  width?: number;
}

/**
 * WidthField
 */
export class WidthField extends React.PureComponent<WidthFieldProps> {

  render() {
    const {
      onChange,
      width
    } = this.props;

    return (
      <InputNumber
        className="editor-field width-field"
        min={0}
        value={width}
        onChange={onChange}
      />
    );
  }
}

export default WidthField;
