import * as React from 'react';
import {
  Input,
  // Form
} from 'antd';

import './NameField.css';

// default props
export interface DefaultNameFieldProps {
  label: string;
  placeholder: string;
}
// non default props
export interface NameFieldProps extends Partial<DefaultNameFieldProps> {
  value: string | undefined;
  onChange: ((newValue: string) => void);
}

/**
 * Input field for a name.
 */
class NameField extends React.Component<NameFieldProps, any> {

  public static defaultProps: DefaultNameFieldProps = {
    label: 'Name',
    placeholder: 'Enter Name'
  };

  /**
   * Extracts the text value of the ChangeEvent
   * and passes it to the passed in 'onChange' handler.
   */
  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    this.props.onChange(value);
  }

  render() {

    return (
      <div className="gs-namefield" >
        {this.props.label}:
        <Input
          className="gs-namefield-input"
          value={this.props.value}
          onChange={this.onChange}
          placeholder={this.props.placeholder}
        />
      </div>
    );
  }
}

export default NameField;
