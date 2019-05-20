import * as React from 'react';

import {
  StrMatchesFunctionFilter as GsStrMatchesFunctionFilter
} from 'geostyler-style';

import './StrMatchesFunctionFilter.css';

import {
  Data as Data
} from 'geostyler-data';
import AttributeCombo from '../../AttributeCombo/AttributeCombo';
import RegeExFilterField from '../../RegExFilterField/RegExFilterField';

const _get = require('lodash/get');
const _cloneDeep = require('lodash/cloneDeep');
const _isEqual = require('lodash/isEqual');
const _isEmpty = require('lodash/isEmpty');
const _isFunction = require('lodash/isFunction');

// default props
export interface StrMatchesFunctionFilterDefaultProps {
  /** Initial StrMatchesFunction filter object */
  filter: GsStrMatchesFunctionFilter;
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
  /** Label for the underlying value field */
  regexLabel: string;
  /** Placeholder for the underlying value field */
  regexPlaceholder: string;
  /** Validation help text for the underlying value field */
  regexValidationHelpString: string;
  /** Callback for onValidationChanged */
  onValidationChanged?: (status: ValidationStatus) => void;
  /** Object aggregating validation functions for attribute, operator and value */
  validators: Validators;
}
// non default props
export interface StrMatchesFunctionFilterProps extends Partial<StrMatchesFunctionFilterDefaultProps> {
  /** Reference to internal data object (holding schema and example features) */
  internalDataDef?: Data;
  /** Callback function for onFilterChange */
  onFilterChange: ((strMatchesFunctionFilter: GsStrMatchesFunctionFilter) => void);
}

interface ValidationStatus {
  attribute: 'success' | 'warning' | 'error' | 'validating';
  regex: 'success' | 'warning' | 'error' | 'validating';
}

interface Validators {
  attribute: (attrName: string) => boolean;
  regex: (regex: string) => boolean;
}

// state
interface StrMatchesFunctionFilterState {
  attribute: string;
  value: string | number | boolean | null;
  filter: GsStrMatchesFunctionFilter;
  validateStatus: ValidationStatus;
  regexValidationHelpString: string | undefined;
  regExString?: string;
  hasError: boolean; // JavaScript errors
}

/**
 * UI for a StrMatchesFunctionFilter consisting of
 *
 *   - A combo to select the attribute
 *   - A combo to select the operator
 *   - An input field for the value
 */
export class StrMatchesFunctionFilter extends
  React.Component<StrMatchesFunctionFilterProps, StrMatchesFunctionFilterState> {

  static getDerivedStateFromProps(
    nextProps: StrMatchesFunctionFilterProps,
    prevState: StrMatchesFunctionFilterState): Partial<StrMatchesFunctionFilterState> {
    return {
      filter: nextProps.filter
    };
  }

  static validateRegEx = (newValue: string): boolean => {
    if (!newValue || newValue.length === 0) {
      return false;
    }
    try {
      // tslint:disable-next-line:no-unused-expression
      new RegExp(newValue);
      return true;
    } catch (e) {
      return false;
    }
  }

  public static defaultProps: StrMatchesFunctionFilterDefaultProps = {
    filter: ['FN_strMatches', '', /.*/],
    attributeNameFilter: () => true,
    attributeLabel: 'Attribute',
    attributePlaceholderString: undefined,
    attributeValidationHelpString: undefined,
    attributeNameMappingFunction: n => n,
    regexLabel: 'RegEx',
    regexPlaceholder: undefined,
    regexValidationHelpString: 'Invalid regular expression',
    onValidationChanged: () => false,
    validators: {
      attribute: attributeName => !_isEmpty(attributeName),
      regex: StrMatchesFunctionFilter.validateRegEx
    }
  };

  private operatorsMap: Object = {
    string: ['==', '*=', '!='],
    number: ['==', '!=', '<', '<=', '>', '>='],
    boolean: ['==', '!=']
  };

  constructor(props: StrMatchesFunctionFilterProps) {
    super(props);
    const {
      filter,
      internalDataDef,
      regexValidationHelpString
    } = this.props;

    if (filter) {
      // build UI by passed in filter object
      const attrName = filter[1];
      if (!Array.isArray(attrName)) {
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
          regexValidationHelpString
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
      }

    } else {
      this.state = {
        attribute: '',
        value: null,
        filter: StrMatchesFunctionFilter.defaultProps.filter,
        validateStatus: {
          attribute: 'error',
          regex: 'error'
        },
        regexValidationHelpString: regexValidationHelpString,
        hasError: false
      };
    }
  }

  /**
   *
   * @param previousProps
   */
  componentDidUpdate(previousProps: StrMatchesFunctionFilterProps) {
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

    let filter: GsStrMatchesFunctionFilter = _cloneDeep(this.state.filter);
    filter[1] = newAttrName;

    if (internalDataDef) {
      // read out attribute type
      this.setState({ attribute: newAttrName });
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
   * Handler function, which is executed, when to underlying filter value changes.
   *
   * Stores the appropriate filter value as member.
   */
  onRegExChange = (newValue: string) => {
    const {
      onFilterChange,
      validators
    } = this.props;
    let filter: GsStrMatchesFunctionFilter = _cloneDeep(this.state.filter);

    // validate value fields
    let valid = validators.regex(newValue);

    const validationStateNew: ValidationStatus = {
      ...this.state.validateStatus,
      regex: valid ? 'success' : 'error'
    };

    let regExString = null;

    if (valid) {
      filter[2] = new RegExp(newValue);
    } else {
      regExString = newValue;
    }

    this.setState(
      {
        validateStatus: validationStateNew,
        filter,
        regExString
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
          regex: 'error'
        }
      });
      return;
    }

    const validRegEx = validators.regex(filter[2].toString());
    const validateStatus: ValidationStatus = {
      attribute: !Array.isArray(filter[1]) && validators.attribute(filter[1]) ? 'success' : 'error',
      regex: validRegEx ? 'success' : 'error'
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
      regexValidationHelpString,
      internalDataDef
    } = this.props;

    const {
      filter,
      validateStatus,
      regExString
    } = this.state;

    const regExIsValid = StrMatchesFunctionFilter.validateRegEx(filter[2].toString());

    return (
      <div className="gs-str-matches-function-filter-ui">
        <AttributeCombo
          value={filter ? filter[1] as string : undefined}
          internalDataDef={internalDataDef}
          onAttributeChange={this.onAttributeChange}
          attributeNameFilter={attributeNameFilter}
          attributeNameMappingFunction={attributeNameMappingFunction}
          label={attributeLabel}
          placeholder={attributePlaceholderString}
          validateStatus={validateStatus.attribute}
          help={attributeValidationHelpString}
        />
        <RegeExFilterField
          internalDataDef={internalDataDef}
          validateStatus={validateStatus.regex}
          value={regExIsValid ? filter[2].toString() : regExString}
          onChange={this.onRegExChange}
          help={regexValidationHelpString}
        />
      </div>
    );
  }
}

export default StrMatchesFunctionFilter;
