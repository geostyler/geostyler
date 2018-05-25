import * as React from 'react';

import {
  InputNumber
} from 'antd';

// default props
interface WidthFieldDefaultProps {
  width: number;
  label: string;
}

// non default props
interface WidthFieldProps extends Partial<WidthFieldDefaultProps> {
  onChange: ((radius: number) => void);
}

/**
 * WidthField
 */
class WidthField extends React.Component<WidthFieldProps, {}> {

  public static defaultProps: WidthFieldDefaultProps = {
    width: 2,
    label: 'Width'
  };

  render() {
    const {
      width,
      label
    } = this.props;

    return (
      <div className="editor-field width-field">
        <span className="label">{`${label}:`}</span>
        <InputNumber
          min={0}
          defaultValue={width}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

export default WidthField;
