import * as React from 'react';

import {
  InputNumber
} from 'antd';

// non default props
export interface RadiusFieldProps {
  onChange?: (radius: number) => void;
  radius?: number;
}

/**
 * RadiusField
 */
export class RadiusField extends React.PureComponent<RadiusFieldProps> {

  render() {
    const {
      onChange,
      radius
    } = this.props;

    return (
      <InputNumber
        className="editor-field radius-field"
        min={0}
        value={radius}
        onChange={onChange}
      />
    );
  }
}

export default RadiusField;
