import * as React from 'react';

import {
  InputNumber
} from 'antd';

// default props
interface WidthFieldDefaultProps {
  label: string;
}

// non default props
export interface WidthFieldProps extends Partial<WidthFieldDefaultProps> {
  onChange?: (radius: number) => void;
  width?: number;
}

/**
 * WidthField
 */
class WidthField extends React.PureComponent<WidthFieldProps> {

  public static defaultProps: WidthFieldDefaultProps = {
    label: 'Width'
  };

  render() {
    const {
      onChange,
      width,
      label
    } = this.props;

    return (
      <div className="editor-field width-field">
        <span className="label">{`${label}:`}</span>
        <InputNumber
          min={0}
          value={width}
          onChange={onChange}
        />
      </div>
    );
  }
}

export default WidthField;
