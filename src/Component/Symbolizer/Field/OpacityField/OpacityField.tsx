import * as React from 'react';

import {
  InputNumber
} from 'antd';

// default props
interface OpacityFieldDefaultProps {
  label: string;
}

// non default props
export interface OpacityFieldProps extends Partial<OpacityFieldDefaultProps> {
  onChange?: (opacity: number) => void;
  opacity?: number;
}

/**
 * OpacityField
 */
class OpacityField extends React.PureComponent<OpacityFieldProps> {

  public static defaultProps: OpacityFieldDefaultProps = {
    label: 'Opacity'
  };

  render() {
    const {
      onChange,
      opacity,
      label
    } = this.props;

    return (
      <div className="editor-field opacity-field">
        <span className="label">{`${label}:`}</span>
        <InputNumber
          min={0}
          max={1}
          step={0.01}
          value={opacity}
          onChange={onChange}
        />
      </div>
    );
  }
}

export default OpacityField;
