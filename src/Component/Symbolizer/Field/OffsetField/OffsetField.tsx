import * as React from 'react';

import {
  InputNumber
} from 'antd';

// default props
interface OffsetFieldDefaultProps {
  label: string;
  disabled?: boolean;
}

// non default props
interface OffsetFieldProps extends Partial<OffsetFieldDefaultProps> {
  onChange: ((radius: number) => void);
  offset?: number;
}

/**
 * OffsetField for map labels
 */
class OffsetField extends React.Component<OffsetFieldProps, {}> {

  public static defaultProps: OffsetFieldDefaultProps = {
    label: ''
  };

  render() {
    const {
      offset,
      label,
      ...inputProps
    } = this.props;

    return (
      <div className="editor-field offset-field">
        <span className="label">{`${label}:`}</span>
        <InputNumber
          value={offset}
          step={1}
          onChange={this.props.onChange}
          {...inputProps}
        />
      </div>
    );
  }
}

export default OffsetField;
