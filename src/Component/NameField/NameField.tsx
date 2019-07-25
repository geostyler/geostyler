import * as React from 'react';
import {
  Input,
  // Form
} from 'antd';

import './NameField.less';

// default props
export interface NameFieldDefaultProps {
  placeholder: string;
}
// non default props
export interface NameFieldProps extends Partial<NameFieldDefaultProps> {
  value: string | undefined;
  onChange?: (newValue: string) => void;
}

/**
 * Input field for a name.
 */
export class NameField extends React.PureComponent<NameFieldProps> {
  public static defaultProps: NameFieldDefaultProps = {
    placeholder: 'Enter Name'
  };

  /**
   * Extracts the text value of the ChangeEvent
   * and passes it to the passed in 'onChange' handler.
   */
  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      onChange
    } = this.props;
    if (onChange) {
      onChange(e.target.value);
    }
  }

  render() {

    return (
      <Input
        className="gs-namefield"
        value={this.props.value}
        onChange={this.onChange}
        placeholder={this.props.placeholder}
      />
    );
  }
}

export default NameField;
