import * as React from 'react';

import { Input, Form } from 'antd';

// default props
interface DefaultTextFilterFieldProps {
  label: string;
  placeholder: string;
  value: string | undefined;
}
// non default props
interface TextFilterFieldProps extends Partial<DefaultTextFilterFieldProps> {
  internalDataDef: any;
  onValueChange: ((newValue: string) => void);
}
// state
interface TextFilterFieldState {
  value: string | undefined;
}

/**
 * Input field for a textual filter value.
 */
class TextFilterField extends React.Component<TextFilterFieldProps, TextFilterFieldState> {

  public static defaultProps: DefaultTextFilterFieldProps = {
    label: 'Value',
    placeholder: 'Enter Text Value',
    value: undefined
  };

  constructor(props: TextFilterFieldProps) {
    super(props);

    this.state = {
      value: this.props.value
    };
  }

  /**
   * Extracts the text value of the event object of 'onChange'
   * and passes it to the passed in 'onValueChange' handler.
   */
  onChange = (e: any) => {
    this.props.onValueChange(e.target.value);

    this.setState({value: e.target.value});
  }

  render() {

    return (
      <div className="gs-text-filter-fld">

        <Form.Item label={this.props.label} colon={false} >

          <Input
            value={this.state.value}
            style={{ width: '100%' }}
            onChange={this.onChange}
            placeholder={this.props.placeholder}
          />

        </Form.Item>

      </div>
    );
  }
}

export default TextFilterField;
