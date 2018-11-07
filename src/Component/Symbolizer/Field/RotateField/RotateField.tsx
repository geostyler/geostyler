import * as React from 'react';

import {
  InputNumber
} from 'antd';

// default props
interface RotateFieldDefaultProps {
  label: string;
}

// non default props
export interface RotateFieldProps extends Partial<RotateFieldDefaultProps> {
  onChange?: (radius: number) => void;
  rotate?: number;
}

/**
 * RotateField
 */
class RotateField extends React.PureComponent<RotateFieldProps> {

  public static defaultProps: RotateFieldDefaultProps = {
    label: 'Rotate'
  };

  render() {
    const {
      onChange,
      rotate,
      label
    } = this.props;

    return (
      <div className="editor-field rotate-field">
        <span className="label">{`${label}:`}</span>
        <InputNumber
          min={-360}
          max={360}
          value={rotate}
          onChange={onChange}
        />
      </div>
    );
  }
}

export default RotateField;
