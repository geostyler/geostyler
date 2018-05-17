import * as React from 'react';

import { Input } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

// default props
interface DefaultTextFilterFieldProps {
  label: string;
  placeholder: string;
}
// non default props
interface TextFilterFieldProps extends Partial<DefaultTextFilterFieldProps> {
  internalDataDef: any;
  onValueChange: ((newValue: string) => void);
}

/**
 * Input field for a textual filter value.
 */
class TextFilterField extends React.Component<TextFilterFieldProps, any> {

  public static defaultProps: DefaultTextFilterFieldProps = {
    label: 'Value',
    placeholder: 'Enter Text Value',
  };

  /**
   * Extracts the text value of the event object of 'onChange'
   * and passes it to the passed in 'onValueChange' handler.
   */
  valToString = (e: any) => {
    this.props.onValueChange(e.target.value);
  }

  render() {

    return (
      <div className="gs-text-filter-fld">

        <FormItem label={this.props.label} colon={false} labelCol={{span: 2, offset: 0}}>

          <Input
            style={{ width: '100%' }}
            onChange={this.valToString}
            placeholder={this.props.placeholder}
          />

        </FormItem>

      </div>
    );
  }
}

export default TextFilterField;
