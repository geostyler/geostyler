import * as React from 'react';

import { Input } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

/**
 * Input field for a textual filter value.
 */
class TextFilterField extends React.Component<any, any> {

  /** label for this field */
  label: string = 'Value';

  /** placeholder shown when field has no value set */
  placeholder: string = 'Enter Text Value';

  constructor(props: any) {
    super(props);

    this.state = {};
  }

  render() {

    return (
      <div className="gs-text-filter-fld">

        <FormItem label={this.label} colon={false} labelCol={{span: 2, offset: 0}}>
          
          <Input style={{ width: '100%' }} placeholder={this.placeholder} />

        </FormItem>

      </div>
    );
  }
}

export default TextFilterField;
