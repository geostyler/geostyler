import * as React from 'react';
import { Input, Form } from 'antd';

import './TitleField.css';

// default props
interface DefaultTitleFieldProps {
  /** Label for this field */
  label: string;
  /** The default text to place into the empty field */
  placeholder: string;
}
// non default props
interface TitleFieldProps extends Partial<DefaultTitleFieldProps> {
  /** Callback for onChange */
  onChange: ((newValue: string) => void);
}

/**
 * Input field for the rule title.
 */
class TitleField extends React.Component<TitleFieldProps, any> {

  public static defaultProps: DefaultTitleFieldProps = {
    label: 'Title',
    placeholder: 'Enter Rule Description (Title)'
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
      <div className="gs-rule-titlefield" >

        <Form.Item label={this.props.label} colon={false} >

          <Input
            className="gs-rule-titlefield-input"
            onChange={this.onChange}
            placeholder={this.props.placeholder}
          />

        </Form.Item>

      </div>
    );
  }
}

export default TitleField;
