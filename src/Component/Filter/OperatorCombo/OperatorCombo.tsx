import * as React from 'react';

import { ComparisonOperator } from 'geostyler-style';
import { Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
const Option = Select.Option;

// default props
interface DefaultOperatorComboProps {
  label: string;
  placeholder: string;
}
// non default props
interface OperatorComboProps extends Partial<DefaultOperatorComboProps> {
  internalDataDef: any;
  onOperatorChange: ((newOperator: ComparisonOperator) => void);
}

/**
 * Combobox offering different filter operators.
 */
class OperatorCombo extends React.Component<OperatorComboProps, any> {

  public static defaultProps: DefaultOperatorComboProps = {
    label: 'Operator',
    placeholder: 'Select Operator',
  };

  /** Available filter operators shown in the combobox  */
  operators: string[] = ['==', '*=', '!=', '<', '<=', '>', '>='];

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

        <FormItem label={this.props.label} colon={false} >

          <Select
            style={{ width: '100%' }}
            onChange={this.props.onOperatorChange}
            placeholder={this.props.placeholder}
          >
              {options}
          </Select>

        </FormItem>

      </div>
    );
  }
}

export default OperatorCombo;
