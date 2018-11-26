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

const _get = require('lodash/get');
const _cloneDeep = require('lodash/cloneDeep');
const _isEqual = require('lodash/isEqual');
const _isEmpty = require('lodash/isEmpty');
const _isFunction = require('lodash/isFunction');

// default props
export interface ComparisonFilterDefaultProps {
  /** Initial comparison filter object */
  filter: GsComparisonFilter;
  /** Set true to hide the attribute's type in the AttributeCombo select options */
  hideAttributeType: boolean;
  /**
   * A custom filter function which is passed each attribute.
   * Should return true to accept each attribute or false to reject it.
   */
  attributeNameFilter: (attributeName: string) => boolean;
  /** Label for the underlying AttributeCombo */
  attributeLabel: string;
  /** Placeholder text for the underlying AttributeCombo */
  attributePlaceholderString: string;
  /** Validation help text for the underlying AttributeCombo */
  attributeValidationHelpString: string;
  /** Mapping function for attribute names of underlying AttributeCombo */
  attributeNameMappingFunction: (originalAttributeName: string) => string;
  /** Label for the underlying OperatorCombo */
  operatorLabel: string;
  /** Show title of selected item in underlying OperatorCombo */
  showOperatorTitles: boolean;
  /** Placeholder for the underlying OperatorCombo */
  operatorPlaceholderString: string;
  /** Validation help text for the underlying OperatorCombo */
  operatorValidationHelpString: string;
  /** Mapping function for operator names of underlying OperatorCombo */
  operatorNameMappingFunction: (originalOperatorName: string) => string;
  /** Mapping function for operator title in underlying OperatorCombo */
  operatorTitleMappingFunction: (originalOperatorName: string) => string;
  /** Label for the underlying value field */
  valueLabel: string;
  /** Placeholder for the underlying value field */
  valuePlaceholder: string;
  /** Validation help text for the underlying value field */
  valueValidationHelpString: string;
  /** Callback for onValidationChanged */
  onValidationChanged?: (status: ValidationStatus) => void;
  /** Object aggregating validation functions for attribute, operator and value */
  validators: Validators;
  /** Show ui in micro mode. Which disables labels etc. */
  microUI: boolean;
}
// non default props
export interface ComparisonFilterProps extends Partial<ComparisonFilterDefaultProps> {
  /** Reference to internal data object (holding schema and example features) */
  internalDataDef: Data;
  /** Callback function for onFilterChange */
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
  value: (value: string | number | boolean | null, internalDataDef?: Data, selectedAttribute?: string)
    => ValidationResult;
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
  hasError: boolean; // JavaScript errors
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
export class ComparisonFilter extends React.Component<ComparisonFilterProps, ComparisonFilterState> {

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

  public static defaultProps: ComparisonFilterDefaultProps = {
    filter: ['==', '', null],
    hideAttributeType: false,
    attributeNameFilter: () => true,
    attributeLabel: undefined,
    attributePlaceholderString: undefined,
    attributeValidationHelpString: undefined,
    attributeNameMappingFunction: n => n,
    operatorLabel: undefined,
    showOperatorTitles: true,
    operatorPlaceholderString: undefined,
    operatorValidationHelpString: undefined,
    operatorNameMappingFunction: n => n,
    operatorTitleMappingFunction: t => t,
    valueLabel: undefined,
    valuePlaceholder: undefined,
    valueValidationHelpString: undefined,
    onValidationChanged: () => false,
    validators: {
      attribute: attributeName => !_isEmpty(attributeName),
      operator: operatorName => !_isEmpty(operatorName),
      value: ComparisonFilter.validateValue
    },
    microUI: false
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
        filter: ComparisonFilter.defaultProps.filter,
        allowedOperators: ['==', '*=', '!=', '<', '<=', '>', '>='],
        validateStatus: {
          attribute: 'error',
          operator: 'error',
          value: 'error'
        },
        valueValidationHelpString: valueValidationHelpString,
        hasError: false
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

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      hasError: true
    });
  }

  /**
   * Retuns the state part showing which value UI should be rendered according to attribute type.
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

    const isValid = validators.attribute(newAttrName);
    const validationStateNew: ValidationStatus = {
      ...this.state.validateStatus,
      attribute: isValid ? 'success' : 'error'
    };

    this.setState({
      filter,
      validateStatus: validationStateNew
    }, () => {
      if (onFilterChange) {
        onFilterChange(filter);
      }
    });
  }

  /**
   * Handler function, which is executed, when to underlying filter operator changes.
   *
   * Stores the appropriate operator as member.
   */
  onOperatorChange = (newOperator: ComparisonOperator) => {
    const {
      onFilterChange
    } = this.props;
    let filter: GsComparisonFilter = _cloneDeep(this.state.filter);
    filter[0] = newOperator;
    this.setState({filter});

    const isValid = this.props.validators.operator(newOperator);
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
        if (onFilterChange) {
          onFilterChange(filter);
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
    const {
      onFilterChange
    } = this.props;
    let filter: GsComparisonFilter = _cloneDeep(this.state.filter);
    filter[2] = newValue;

    // validate value fields
    let validationRes = this.props.validators.value(newValue, this.props.internalDataDef, this.state.attribute);

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
        if (onFilterChange) {
          onFilterChange(filter);
        }
      }
    );
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
      return;
    }

    const validationRes = validators.value(filter[2], this.props.internalDataDef, this.state.attribute);
    const validateStatus: ValidationStatus = {
      attribute: validators.attribute(filter[1]) ? 'success' : 'error',
      operator: validators.operator(filter[0]) ? 'success' : 'error',
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
    if (this.state.hasError) {
      return <h1>An error occured in the ComparisonFilter UI.</h1>;
    }
    const {
      attributeNameFilter,
      attributeLabel,
      attributePlaceholderString,
      attributeNameMappingFunction,
      attributeValidationHelpString,
      internalDataDef,
      hideAttributeType,
      operatorNameMappingFunction,
      operatorPlaceholderString,
      operatorLabel,
      operatorValidationHelpString,
      operatorTitleMappingFunction,
      showOperatorTitles,
      valueLabel,
      valuePlaceholder,
      microUI
    } = this.props;

    const {
      attribute,
      allowedOperators,
      filter,
      validateStatus,
      valueValidationHelpString
    } = this.state;

    let className = 'gs-comparison-filter-ui';
    if (microUI) {
      className += ' micro';
    }

    return (
      <div className={className}>
        <Form>
          <Row gutter={16} justify="center">
            <Col span={10} className="gs-small-col">
              <AttributeCombo
                value={filter ? filter[1] : undefined}
                internalDataDef={internalDataDef}
                onAttributeChange={this.onAttributeChange}
                attributeNameFilter={attributeNameFilter}
                attributeNameMappingFunction={attributeNameMappingFunction}
                label={attributeLabel}
                placeholder={attributePlaceholderString}
                validateStatus={validateStatus.attribute}
                help={attributeValidationHelpString}
                hideAttributeType={hideAttributeType}
              />
            </Col>
            <Col span={4} className="gs-small-col">
              <OperatorCombo
                value={filter ? filter[0] : undefined}
                internalDataDef={internalDataDef}
                onOperatorChange={this.onOperatorChange}
                operators={allowedOperators}
                operatorNameMappingFunction={operatorNameMappingFunction}
                placeholder={operatorPlaceholderString}
                label={operatorLabel}
                validateStatus={validateStatus.operator}
                help={operatorValidationHelpString}
                operatorTitleMappingFunction={operatorTitleMappingFunction}
                showTitles={showOperatorTitles}
              />
            </Col>
            {
              this.state.textFieldVisible ?
                <Col span={10} className="gs-small-col">
                  <TextFilterField
                    value={filter ? filter[2] as string : undefined}
                    internalDataDef={internalDataDef}
                    selectedAttribute={attribute}
                    onValueChange={this.onValueChange}
                    label={valueLabel}
                    placeholder={valuePlaceholder}
                    validateStatus={validateStatus.value}
                    help={valueValidationHelpString}
                  />
                </Col> :
                null
            }
            {
              this.state.numberFieldVisible ?
                <Col span={10} className="gs-small-col">
                  <NumberFilterField
                    value={filter ? filter[2] as number : undefined}
                    internalDataDef={internalDataDef}
                    selectedAttribute={attribute}
                    onValueChange={this.onValueChange}
                    label={valueLabel}
                    placeholder={valuePlaceholder}
                    validateStatus={validateStatus.value}
                    help={valueValidationHelpString}
                  />
                </Col> :
                null
            }
            {
              this.state.boolFieldVisible ?
                <Col span={10} className="gs-small-col">
                  <BoolFilterField
                    value={filter ? filter[2] as boolean : undefined}
                    onValueChange={this.onValueChange}
                    label={valueLabel}
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

export default ComparisonFilter;
