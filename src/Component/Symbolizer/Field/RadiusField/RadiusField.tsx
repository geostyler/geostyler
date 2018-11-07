import * as React from 'react';

import {
  InputNumber
} from 'antd';

// default props
interface RadiusFieldDefaultProps {
  label: string;
}

// non default props
export interface RadiusFieldProps extends Partial<RadiusFieldDefaultProps> {
  onChange?: (radius: number) => void;
  radius?: number;
}

/**
 * RadiusField
 */
class RadiusField extends React.PureComponent<RadiusFieldProps> {

  public static defaultProps: RadiusFieldDefaultProps = {
    label: 'Radius'
  };

  render() {
    const {
      onChange,
      radius,
      label
    } = this.props;

    return (
      <div className="editor-field radius-field">
        <span className="label">{`${label}:`}</span>
        <InputNumber
          min={0}
          value={radius}
          onChange={onChange}
        />
      </div>
    );
  }
}

export default RadiusField;
