import * as React from 'react';

import { ComparisonOperator } from 'geostyler-style';
import { Select, Form } from 'antd';
import { Data } from 'geostyler-data';
import {
  indexOf as _indexOf,
} from 'lodash';
const Option = Select.Option;

// default props
interface DefaultOperatorComboProps {
  label: string;
  placeholder: string;
  value: ComparisonOperator | undefined;
  operators: string[];
  validateStatus?: 'success' | 'warning' | 'error' | 'validating';
  help?: React.ReactNode;
}
// non default props
interface OperatorComboProps extends Partial<DefaultOperatorComboProps> {
  internalDataDef: Data;
  onOperatorChange: ((newOperator: ComparisonOperator) => void);
}

interface OperatorState {
  value: ComparisonOperator | undefined;
}

/**
 * Combobox offering different filter operators.
 */
class OperatorCombo extends React.Component<OperatorComboProps, OperatorState> {

  public static defaultProps: DefaultOperatorComboProps = {
    label: 'Operator',
    placeholder: 'Select Operator',
    value: undefined,
    operators: ['==', '*=', '!=', '<', '<=', '>', '>='],
    validateStatus: 'error',
    help: 'Please select an operator.'
  };

  constructor(props: OperatorComboProps) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }

  static getDerivedStateFromProps(
      nextProps: OperatorComboProps,
      prevState: OperatorState): Partial<OperatorState> {

    let value: ComparisonOperator | undefined = nextProps.value;

    // check if we have to change value according to new allowed operators
    if (nextProps.operators) {
      if (_indexOf(nextProps.operators, nextProps.value) === -1) {
        // current operator is not in allowed list, so we use an allowed one
        value = nextProps.operators[0] as ComparisonOperator;
      }
    }

    return {
      value: value
    };
  }

  render() {

    let options: Object[] = [];
    const operators = this.props.operators || ['==', '*=', '!=', '<', '<=', '>', '>='];

    // create an option per attribute
    options = operators.map(operator => {
      return (
        <Option
          key={operator}
          value={operator}
        >
        {operator}
        </Option>
      );
    });

    const helpTxt = this.props.validateStatus !== 'success' ? this.props.help : null;

    return (
      <div className="gs-operator-combo">
        <Form.Item
          label={this.props.label}
          colon={false}
          validateStatus={this.props.validateStatus}
          help={helpTxt}
        >
          <Select
            value={this.state.value}
            style={{ width: '100%' }}
            onChange={this.props.onOperatorChange}
            placeholder={this.props.placeholder}
          >
            {options}
          </Select>

        </Form.Item>

      </div>
    );
  }
}

export default OperatorCombo;
