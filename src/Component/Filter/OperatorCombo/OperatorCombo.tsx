import * as React from 'react';

import { Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
const Option = Select.Option;

/**
 * Combobox offering different filter operators.
 */
class OperatorCombo extends React.Component<any, any> {

  operators: string[] = ['==', '*=', '!=', '<', '<=', '>', '>='];
  
  label: string = 'Operator';

  placeholder: string = 'Select Operator';

  constructor(props: any) {
    super(props);

    this.state = {};
  }

  render() {

    let options: Object[] = [];

    // create an option per attribute
    options = this.operators.map(operator => {
      return (
        <Option
          key={operator}
          value={operator}
        >
        {operator}
        </Option>
      );
    });

    return (
      <div className="gs-operator-combo">

        <FormItem label={this.label} colon={false} labelCol={{span: 7, offset: 0}}>
          
          <Select style={{ width: '100%' }} placeholder={this.placeholder}>
              {options}
          </Select>
          
        </FormItem>

      </div>
    );
  }
}

export default OperatorCombo;
