import * as React from 'react';

import {
  InputNumber
} from 'antd';

// default props
interface SizeFieldDefaultProps {
  label: string;
}

// non default props
interface SizeFieldProps extends Partial<SizeFieldDefaultProps> {
  size?: number;
  onChange: ((radius: number) => void);
}

/**
 * SizeField
 */
class SizeField extends React.Component<SizeFieldProps, {}> {

  public static defaultProps: SizeFieldDefaultProps = {
    label: 'Size'
  };

  render() {
    const {
      size,
      label
    } = this.props;

    return (
      <div className="editor-field size-field">
        <span className="label">{`${label}:`}</span>
        <InputNumber
          step={0.1}
          value={size}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

export default SizeField;
