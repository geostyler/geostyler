import * as React from 'react';

import {
  InputNumber
} from 'antd';

// default props
interface OpacityFieldDefaultProps {
  opacity: number;
  label: string;
}

// non default props
interface OpacityFieldProps extends Partial<OpacityFieldDefaultProps> {
  onChange: ((opacity: number) => void);
}

/**
 * OpacityField
 */
class OpacityField extends React.Component<OpacityFieldProps, {}> {

  public static defaultProps: OpacityFieldDefaultProps = {
    opacity: 1,
    label: 'Opacity'
  };

  render() {
    const {
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
          defaultValue={opacity}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

export default OpacityField;
