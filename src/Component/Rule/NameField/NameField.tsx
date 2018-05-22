import * as React from 'react';
import { Input } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

import './NameField.css';

// default props
interface DefaultNameFieldProps {
  label: string;
  placeholder: string;
}
// non default props
interface NameFieldProps extends Partial<DefaultNameFieldProps> {
  onChange: ((newValue: string) => void);
}

/**
 * Input field for the rule name.
 */
class NameField extends React.Component<NameFieldProps, any> {

  public static defaultProps: DefaultNameFieldProps = {
    label: 'Name',
    placeholder: 'Enter Rule Name'
  };

  /**
   * Extracts the text value of the ChangeEvent
   * and passes it to the passed in 'onChange' handler.
   */
  valToString = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    this.props.onChange(value);
  }

  render() {

    return (
      <div className="gs-rule-namefield" >

        <FormItem label={this.props.label} colon={false} >

          <Input
            className="gs-rule-namefield-input"
            onChange={this.valToString}
            placeholder={this.props.placeholder}
          />

        </FormItem>

      </div>
    );
  }
}

export default NameField;
