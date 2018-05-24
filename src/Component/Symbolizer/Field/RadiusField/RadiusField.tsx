import * as React from 'react';

import {
  InputNumber
} from 'antd';

// default props
interface RadiusFieldDefaultProps {
  radius: number;
  label: string;
}

// non default props
interface RadiusFieldProps extends Partial<RadiusFieldDefaultProps> {
  onChange: ((radius: number) => void);
}

/**
 * RadiusField
 */
class RadiusField extends React.Component<RadiusFieldProps, {}> {

  public static defaultProps: RadiusFieldDefaultProps = {
    radius: 10,
    label: 'Radius'
  };

  render() {
    const {
      radius,
      label
    } = this.props;

    return (
      <div className="editor-field radius-field">
        <span className="label">{`${label}:`}</span>
        <InputNumber
          min={0}
          defaultValue={radius}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

export default RadiusField;
