import * as React from 'react';

import { Input } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

/**
 * Input field for a textual filter value.
 */
class TextFilterField extends React.Component<any, any> {

  // PROPS

  /** label for this field */
  label: string = 'Value';

  /** placeholder shown when field has no value set */
  placeholder: string = 'Enter Text Value';

  /** Handler function bound to the 'onChange' of the underlying Input */
  onValueChange: Function;

  constructor(props: any) {
    super(props);

    this.state = {};
  }

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

        <FormItem label={this.label} colon={false} labelCol={{span: 2, offset: 0}}>

          <Input
            style={{ width: '100%' }}
            onChange={this.valToString}
            placeholder={this.placeholder}
          />

        </FormItem>

      </div>
    );
  }
}

export default TextFilterField;
