import * as React from 'react';

import {
  InputNumber
} from 'antd';

// default props
interface SizeFieldDefaultProps {
  label: string;
}

// non default props
export interface SizeFieldProps extends Partial<SizeFieldDefaultProps> {
  size?: number;
  onChange?: (radius: number) => void;
}

/**
 * SizeField
 */
export class SizeField extends React.PureComponent<SizeFieldProps> {

  public static defaultProps: SizeFieldDefaultProps = {
    label: 'Size'
  };

  render() {
    const {
      onChange,
      size,
      label
    } = this.props;

    return (
      <div className="editor-field size-field">
        <span className="label">{`${label}:`}</span>
        <InputNumber
          step={0.1}
          value={size}
          onChange={onChange}
        />
      </div>
    );
  }
}

export default SizeField;
