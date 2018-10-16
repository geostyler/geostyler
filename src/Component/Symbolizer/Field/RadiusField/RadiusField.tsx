import * as React from 'react';

import {
  InputNumber
} from 'antd';

// default props
interface RadiusFieldDefaultProps {
  label: string;
}

// non default props
interface RadiusFieldProps extends Partial<RadiusFieldDefaultProps> {
  onChange: ((radius: number) => void);
  radius?: number;
}

/**
 * RadiusField
 */
class RadiusField extends React.Component<RadiusFieldProps, {}> {

  public static defaultProps: RadiusFieldDefaultProps = {
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
          value={radius}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

export default RadiusField;
