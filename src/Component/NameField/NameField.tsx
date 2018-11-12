import * as React from 'react';
import {
  Input,
  // Form
} from 'antd';

import './NameField.css';

// default props
export interface NameFieldDefaultProps {
  label: string;
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
    label: 'Name',
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
