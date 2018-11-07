import * as React from 'react';

import { ComparisonOperator } from 'geostyler-style';
import { Select, Form } from 'antd';
import { Data } from 'geostyler-data';
const _indexOf = require('lodash/indexOf');
const _isEqual = require('lodash/isEqual');
const Option = Select.Option;

// default props
interface DefaultOperatorComboProps {
  /** Label for this field */
  label: string;
  /** Show title of selected item */
  showTitles: boolean;
  /** The default text to place into the empty field */
  placeholder: string;
  /** Initial value set to the field */
  value: ComparisonOperator | undefined;
  /** List of operators to show in this combo */
  operators: string[];
  /** Mapping function for operator names in this combo */
  operatorNameMappingFunction: (originalOperatorName: string) => string;
  /** Mapping function for operator title in this combo */
  operatorTitleMappingFunction: (originalOperatorName: string) => string;
  /** Validation status */
  validateStatus: 'success' | 'warning' | 'error' | 'validating';
  /** Element to show a help text */
  help: React.ReactNode;
}
// non default props
export interface OperatorComboProps extends Partial<DefaultOperatorComboProps> {
  /** Reference to internal data object (holding schema and example features) */
  internalDataDef: Data;
  /** Callback function for onChange */
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
    showTitles: true,
    placeholder: 'Select Operator',
    value: undefined,
    operators: ['==', '*=', '!=', '<', '<=', '>', '>='],
    operatorNameMappingFunction: n => n,
    operatorTitleMappingFunction: t => t,
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

  public shouldComponentUpdate(nextProps: OperatorComboProps, nextState: OperatorState): boolean {
    const diffProps = !_isEqual(this.props, nextProps);
    const diffState = !_isEqual(this.state, nextState);
    return diffProps || diffState;
  }

  render() {

    let options: Object[] = [];
    const operators = this.props.operators || ['==', '*=', '!=', '<', '<=', '>', '>='];

    // create an option per attribute
    options = operators.map(operator => {
      const title = this.props.showTitles
        ? this.props.operatorTitleMappingFunction(operator)
        : ' ';

      return (
        <Option
          key={operator}
          value={operator}
          title={title}
        >
        {this.props.operatorNameMappingFunction(operator)}
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
