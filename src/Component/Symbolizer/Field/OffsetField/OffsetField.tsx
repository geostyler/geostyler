import * as React from 'react';

import { InputNumber } from 'antd';
import { InputNumberProps } from 'antd/lib/input-number';

// default props
interface OffsetFieldDefaultProps {
  label: string;
}

// non default props
export interface OffsetFieldProps extends Partial<OffsetFieldDefaultProps>, Partial<InputNumberProps> {
  onChange?: (radius: number) => void;
  offset?: number;
}

/**
 * OffsetField for map labels
 */
export class OffsetField extends React.PureComponent<OffsetFieldProps> {

  public static defaultProps: OffsetFieldDefaultProps = {
    label: ''
  };

  render() {
    const {
      offset,
      label,
      onChange,
      ...inputProps
    } = this.props;

    return (
      <div className="editor-field offset-field">
        <span className="label">{`${label}:`}</span>
        <InputNumber
          value={offset}
          step={1}
          onChange={onChange}
          {...inputProps}
        />
      </div>
    );
  }
}

export default OffsetField;
