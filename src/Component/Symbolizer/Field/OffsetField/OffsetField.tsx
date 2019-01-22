import * as React from 'react';

import { InputNumber } from 'antd';
import { InputNumberProps } from 'antd/lib/input-number';

// non default props
export interface OffsetFieldProps extends Partial<InputNumberProps> {
  offset?: number;
}

/**
 * OffsetField for map labels
 */
export class OffsetField extends React.PureComponent<OffsetFieldProps> {

  render() {
    const {
      offset,
      onChange,
      ...inputProps
    } = this.props;

    return (
      <InputNumber
        className="editor-field offset-field"
        value={offset}
        step={1}
        onChange={onChange}
        {...inputProps}
      />
    );
  }
}

export default OffsetField;
