import * as React from 'react';

import {
  InputNumber
} from 'antd';

// default props
interface SizeFieldDefaultProps {
  size: number;
  label: string;
}

// non default props
interface SizeFieldProps extends Partial<SizeFieldDefaultProps> {
  onChange: ((radius: number) => void);
}

/**
 * SizeField
 */
class SizeField extends React.Component<SizeFieldProps, {}> {

  public static defaultProps: SizeFieldDefaultProps = {
    size: 2,
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
          defaultValue={size}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

export default SizeField;
