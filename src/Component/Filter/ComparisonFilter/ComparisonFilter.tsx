import * as React from 'react';

import {
  Row,
  Col,
  Form
} from 'antd';

import AttributeCombo from '../AttributeCombo/AttributeCombo';
import OperatorCombo from '../OperatorCombo/OperatorCombo';
import TextFilterField from '../TextFilterField/TextFilterField';
import NumberFilterField from '../NumberFilterField/NumberFilterField';

import {
  ComparisonFilter as GsComparisonFilter,
  ComparisonOperator
} from 'geostyler-style';

import './ComparisonFilter.css';
import BoolFilterField from '../BoolFilterField/BoolFilterField';

import {
  Data as Data
} from 'geostyler-data';

import {
  get as _get,
  cloneDeep as _cloneDeep,
  isEqual as _isEqual,
  isEmpty as _isEmpty,
  isFunction as _isFunction
} from 'lodash';

// default props
interface DefaultComparisonFilterProps {
  filter: GsComparisonFilter;
  hideAttributeType: boolean;
  attributeNameFilter: (attributeName: string) => boolean;
  attributeLabel?: string;
  attributePlaceholderString?: string;
  attributeValidationHelpString?: string;
  operatorLabel?: string;
  operatorPlaceholderString?: string;
  operatorValidationHelpString?: string;
  valueLabel?: string;
  valuePlaceholder?: string;
  valueValidationHelpString?: string;
  onValidationChanged?: (status: ValidationStatus) => void;
  validators: Validators;
}
// non default props
interface ComparisonFilterProps extends Partial<DefaultComparisonFilterProps> {
  internalDataDef: Data;
  onFilterChange: ((compFilter: GsComparisonFilter) => void);
}

interface ValidationStatus {
  attribute: 'success' | 'warning' | 'error' | 'validating';
  operator: 'success' | 'warning' | 'error' | 'validating';
  value: 'success' | 'warning' | 'error' | 'validating';
}

interface Validators {
  attribute: (attrName: string) => boolean;
  operator: (operator: string) => boolean;
  value: (value: string | number | boolean | null, internalDataDef?: Data, attrType?: string) => ValidationResult;
}

// state
interface ComparisonFilterState {
  textFieldVisible: boolean;
  numberFieldVisible: boolean;
  boolFieldVisible: boolean;
  attribute: string;
  attributeType?: string;
  operator: ComparisonOperator | undefined;
  value: string | number | boolean | null;
  filter: GsComparisonFilter;
  allowedOperators: string[];
  validateStatus: ValidationStatus;
  valueValidationHelpString: string | undefined;
}

type ValidationResult = {
  isValid: boolean;
  errorMsg: string;
};

/**
 * UI for a ComparisonFilter consisting of
 *
 *   - A combo to select the attribute
 *   - A combo to select the operator
 *   - An input field for the value
 */
class ComparisonFilterUi extends React.Component<ComparisonFilterProps, ComparisonFilterState> {

  static getDerivedStateFromProps(
      nextProps: ComparisonFilterProps,
      prevState: ComparisonFilterState): Partial<ComparisonFilterState> {
    return {
      filter: nextProps.filter
    };
  }

  /**
   * Default validation function for filter values.
   * 
   * @param {string | number | boolean | null} newValue The new filter value
   * @param {Data} internalDataDef The internal data object
   * @param {string} selectedAttribute The currently seledted attribute field
   */
  static validateValue = (
      newValue: string | number | boolean | null, 
      internalDataDef: Data, 
      selectedAttribute: string): ValidationResult => {

    let isValid = true;
    let errorMsg = '';
    // read out attribute type
    const attrType = _get(internalDataDef, `schema.properties[${selectedAttribute}].type`);

    switch (attrType) {
      case 'number':
        // detect min / max from schema
        const minVal = _get(internalDataDef, `schema.properties[${selectedAttribute}].minimum`);
        const maxVal = _get(internalDataDef, `schema.properties[${selectedAttribute}].maximum`);

        if (!isNaN(minVal) && !isNaN(maxVal)) {

          if (typeof newValue !== 'number') {
            isValid = false;
            errorMsg = 'Please enter a number';
          } else if (newValue < minVal) {
            isValid = false;
            errorMsg = 'Minimum Value is ' + minVal;
          } else if (newValue > maxVal) {
            isValid = false;
            errorMsg = 'Maximum Value is ' + maxVal;
          }
        }
        break;
      default:
        break;
    }

    return {
      isValid: isValid,
      errorMsg: errorMsg
    };
  }

  public static defaultProps: DefaultComparisonFilterProps = {
    filter: ['==', '', null],
    hideAttributeType: false,
    attributeNameFilter: () => true,
    attributeLabel: undefined,
    attributePlaceholderString: undefined,
    attributeValidationHelpString: undefined,
    operatorLabel: undefined,
    operatorPlaceholderString: undefined,
    operatorValidationHelpString: undefined,
    valueLabel: undefined,
    valuePlaceholder: undefined,
    valueValidationHelpString: undefined,
    onValidationChanged: () => false,
    validators: {
      attribute: attributeName => !_isEmpty(attributeName),
      operator: operatorName => !_isEmpty(operatorName),
      value: ComparisonFilterUi.validateValue
    }
  };

  private operatorsMap: Object = {
    string: ['==', '*=', '!='],
    number: ['==', '!=', '<', '<=', '>', '>='],
    boolean: ['==', '!=']
  };

  constructor(props: ComparisonFilterProps) {
    super(props);

    const {
      filter,
      internalDataDef,
      valueValidationHelpString
    } = this.props;

    if (filter) {
      // build UI by passed in filter object
      const attrName = filter[1];

      const stateParts: any = {
        attribute: attrName,
        operator: filter[0],
        value: filter[2],
        filter: this.props.filter,
        validateStatus: {
          attribute: attrName ? 'success' : 'error',
          operator: filter[0] ? 'success' : 'error',
          value: filter[2] ? 'success' : 'error'
        },
        valueValidationHelpString: valueValidationHelpString
      };

      this.state = stateParts;

      // read out attribute type
      if (internalDataDef) {
        const attrDefs = internalDataDef.schema.properties;
        const attribute = attrDefs[attrName];
        if (attribute) {
          const attrType = attrDefs[attrName].type;
          stateParts.attributeType = attrType;

          stateParts.allowedOperators = this.operatorsMap[attrType];
        }
      }

      const valueFieldVis: {
        textFieldVisible: boolean;
        numberFieldVisible: boolean;
        boolFieldVisible: boolean
      } = this.getValueFieldVis(attrName);

      this.state = Object.assign(stateParts, valueFieldVis);

    } else {
      this.state = {
        textFieldVisible: true,
        numberFieldVisible: false,
        boolFieldVisible: false,
        attribute: '',
        operator: undefined,
        value: null,
        filter: ComparisonFilterUi.defaultProps.filter,
        allowedOperators: ['==', '*=', '!=', '<', '<=', '>', '>='],
        validateStatus: {
          attribute: 'error',
          operator: 'error',
          value: 'error'
        },
        valueValidationHelpString: valueValidationHelpString
      };
    }
  }

  /**
   *
   * @param previousProps
   */
  componentDidUpdate(previousProps: ComparisonFilterProps) {
    if (!_isEqual(previousProps.filter, this.props.filter)) {
      this.validateFilter();
    }
  }

  /**
   * Retuns the state part showing which balue UI should be rendered according to attribute type.
   *
   * @param {string} The attribute name to get the value visalization state for
   */
  getValueFieldVis = (attrName: string) => {
    // read out attribute type
    const attrType = _get(this.props, `internalDataDef.schema.properties[${attrName}].type`);

    // for string and any non-specified type we show a text field
    let valueFieldVis = {
      textFieldVisible: true,
      numberFieldVisible: false,
      boolFieldVisible: false
    };
    // visibility due to attribute's type
    if (attrType === 'number') {
      valueFieldVis = {
        textFieldVisible: false,
        numberFieldVisible: true,
        boolFieldVisible: false
      };
    } else if (attrType === 'boolean') {
      valueFieldVis = {
        textFieldVisible: false,
        numberFieldVisible: false,
        boolFieldVisible: true
      };
    }

    return valueFieldVis;
  }

  /**
   * Handler function, which is executed, when to underlying filter attribute changes.
   *
   * Changes the input field for the filter value and stores the appropriate attribute name as member.
   */
  onAttributeChange = (newAttrName: string) => {
    const {
      internalDataDef,
      onFilterChange,
      onValidationChanged,
      validators
    } = this.props;

    let filter: GsComparisonFilter = _cloneDeep(this.state.filter);
    filter[1] = newAttrName;

    const valueFieldVis = this.getValueFieldVis(newAttrName);
    this.setState(valueFieldVis);

    if (internalDataDef) {
      // read out attribute type
      const attrDefs = internalDataDef.schema.properties;
      const attrType = attrDefs[newAttrName].type;
      this.setState({attribute: newAttrName});

      // reset the filter value when the attribute type changed
      if (attrType !== this.state.attributeType) {

        this.setState({
          value: null,
          // preserve the attribute type to compare with new one
          attributeType: attrType,
          allowedOperators: this.operatorsMap[attrType]
        });
      }
    }

    const isValid = validators!.attribute(newAttrName);
    const validationStateNew: ValidationStatus = {
      ...this.state.validateStatus,
      attribute: isValid ? 'success' : 'error'
    };

    onFilterChange(filter);
    this.setState({
      filter,
      validateStatus: validationStateNew
    },            () => {
        if (_isFunction(onValidationChanged)) {
          onValidationChanged(validationStateNew);
        }
      });
  }

  /**
   * Handler function, which is executed, when to underlying filter operator changes.
   *
   * Stores the appropriate operator as member.
   */
  onOperatorChange = (newOperator: ComparisonOperator) => {
    let filter: GsComparisonFilter = _cloneDeep(this.state.filter);
    filter[0] = newOperator;
    this.setState({filter});
    this.props.onFilterChange(filter);

    const isValid = this.props.validators!.operator(newOperator);
    const validationStateNew: ValidationStatus = {
      ...this.state.validateStatus,
      operator: isValid ? 'success' : 'error'
    };

    this.setState(
      {
        validateStatus: validationStateNew,
        operator: newOperator
      },
      () => {
        if (_isFunction(this.props.onValidationChanged)) {
          this.props.onValidationChanged(validationStateNew);
        }
      }
    );

  }

  /**
   * Handler function, which is executed, when to underlying filter value changes.
   *
   * Stores the appropriate filter value as member.
   */
  onValueChange = (newValue: string | number | boolean) => {
    let filter: GsComparisonFilter = _cloneDeep(this.state.filter);
    filter[2] = newValue;

    // validate value fields
    let validationRes = this.props.validators!.value(newValue, this.props.internalDataDef, this.state.attribute);

    const validationStateNew: ValidationStatus = {
      ...this.state.validateStatus,
      value: validationRes.isValid ? 'success' : 'error'
    };

    this.setState(
      {
        validateStatus: validationStateNew,
        filter,
        valueValidationHelpString: validationRes.errorMsg
      },
      () => {
        if (_isFunction(this.props.onValidationChanged)) {
          this.props.onValidationChanged(validationStateNew);
        }
      }
    );

    this.props.onFilterChange(filter);
  }

  /**
   * Function that validates given filter in props
   */
  validateFilter = () => {
    const {
      filter,
      validators,
      onValidationChanged
    } = this.props;

    if (!filter || !Array.isArray(filter)) {
      this.setState({
        validateStatus: {
          attribute: 'error',
          operator: 'error',
          value: 'error'
        }
      });
    }

    const validationRes = validators!.value(filter![2], this.props.internalDataDef, this.state.attribute);
    const validateStatus: ValidationStatus = {
      attribute: validators!.attribute(filter![1]) ? 'success' : 'error',
      operator: validators!.operator(filter![0]) ? 'success' : 'error',
      value: validationRes.isValid ? 'success' : 'error'
    };

    this.setState(
      {
        validateStatus
      },
      () => {
        if (_isFunction(onValidationChanged)) {
        onValidationChanged(validateStatus);
      }
    });
  }

  render() {

    return (
      <div className="gs-comparison-filter-ui">
        <Form>
          <Row gutter={16} justify="center">
            <Col span={10}>
              <AttributeCombo
                value={this.state && this.state.filter ? this.state.filter[1] : undefined}
                internalDataDef={this.props.internalDataDef}
                onAttributeChange={this.onAttributeChange}
                attributeNameFilter={this.props.attributeNameFilter}
                label={this.props.attributeLabel}
                placeholder={this.props.attributePlaceholderString}
                validateStatus={this.state.validateStatus.attribute}
                help={this.props.attributeValidationHelpString}
                hideAttributeType={this.props.hideAttributeType}
              />
            </Col>
            <Col span={4}>
              <OperatorCombo
                value={this.state && this.state.filter ? this.state.filter[0] : undefined}
                internalDataDef={this.props.internalDataDef}
                onOperatorChange={this.onOperatorChange}
                operators={this.state.allowedOperators}
                placeholder={this.props.operatorPlaceholderString}
                label={this.props.operatorLabel}
                validateStatus={this.state.validateStatus.operator}
                help={this.props.operatorValidationHelpString}
              />
            </Col>
            {
              this.state.textFieldVisible ?
                <Col span={10}>
                  <TextFilterField
                    value={this.state && this.state.filter ? this.state.filter[2] as string : undefined}
                    internalDataDef={this.props.internalDataDef}
                    selectedAttribute={this.state.attribute}
                    onValueChange={this.onValueChange}
                    label={this.props.valueLabel}
                    placeholder={this.props.valuePlaceholder}
                    validateStatus={this.state.validateStatus.value}
                    help={this.props.valueValidationHelpString}
                  />
                </Col> :
                null
            }
            {
              this.state.numberFieldVisible ?
                <Col span={10}>
                  <NumberFilterField
                    value={this.state && this.state.filter ? this.state.filter[2] as number : undefined}
                    internalDataDef={this.props.internalDataDef}
                    selectedAttribute={this.state.attribute}
                    onValueChange={this.onValueChange}
                    label={this.props.valueLabel}
                    placeholder={this.props.valuePlaceholder}
                    validateStatus={this.state.validateStatus.value}
                    help={this.state.valueValidationHelpString}
                  />
                </Col> :
                null
            }
            {
              this.state.boolFieldVisible ?
                <Col span={10}>
                  <BoolFilterField
                    value={this.state && this.state.filter ? this.state.filter[2] as boolean : undefined}
                    internalDataDef={this.props.internalDataDef}
                    onValueChange={this.onValueChange}
                    label={this.props.valueLabel}
                  />
                </Col> :
                null
            }
          </Row>
        </Form>
      </div>
    );
  }
}

export default ComparisonFilterUi;
