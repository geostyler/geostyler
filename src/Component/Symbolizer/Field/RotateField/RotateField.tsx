import * as React from 'react';

import {
  InputNumber
} from 'antd';

// default props
interface RotateFieldDefaultProps {
  rotate: number;
  label: string;
}

// non default props
interface RotateFieldProps extends Partial<RotateFieldDefaultProps> {
  onChange: ((radius: number) => void);
}

/**
 * RotateField
 */
class RotateField extends React.Component<RotateFieldProps, {}> {

  public static defaultProps: RotateFieldDefaultProps = {
    rotate: 2,
    label: 'Rotate'
  };

  render() {
    const {
      rotate,
      label
    } = this.props;

    return (
      <div className="editor-field rotate-field">
        <span className="label">{`${label}:`}</span>
        <InputNumber
          min={-360}
          max={360}
          defaultValue={rotate}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

export default RotateField;
