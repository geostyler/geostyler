import * as React from 'react';

import { InputNumber } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

/**
 * Input field for a numeric filter value.
 */
class NumberFilterField extends React.Component<any, any> {

  /** label for this field */
  label: string = 'Value';

  /** placeholder shown when field has no value set */
  placeholder: string = 'Enter Numeric Value';

  constructor(props: any) {
    super(props);

    this.state = {};
  }

  render() {

    return (
      <div className="gs-text-filter-fld">

        <FormItem label={this.label} colon={false} labelCol={{span: 2, offset: 0}}>
          
          <InputNumber 
            style={{ width: '100%' }} 
            min={1} 
            max={10}
            placeholder={this.placeholder} 
          />

        </FormItem>

      </div>
    );
  }
}

export default NumberFilterField;
