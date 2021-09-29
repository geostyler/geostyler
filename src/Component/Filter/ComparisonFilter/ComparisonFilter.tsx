/* eslint-disable @typescript-eslint/member-ordering */
/* Released under the BSD 2-Clause License
 *
 * Copyright © 2018-present, terrestris GmbH & Co. KG and GeoStyler contributors
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

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

import './ComparisonFilter.less';
import BoolFilterField from '../BoolFilterField/BoolFilterField';

import {
  Data as Data
} from 'geostyler-data';

import _get from 'lodash/get';
import _cloneDeep from 'lodash/cloneDeep';
import _isEqual from 'lodash/isEqual';
import _isEmpty from 'lodash/isEmpty';
import _isFunction from 'lodash/isFunction';
import _isString from 'lodash/isString';

// default props
export interface ComparisonFilterProps {
  /** Initial comparison filter object */
  filter?: GsComparisonFilter;
  /** Set true to hide the attribute's type in the AttributeCombo select options */
  hideAttributeType?: boolean;
  /**
   * A custom filter function which is passed each attribute.
   * Should return true to accept each attribute or false to reject it.
   */
  attributeNameFilter?: (attributeName: string) => boolean;
  /** Label for the underlying AttributeCombo */
  attributeLabel?: string;
  /** Placeholder text for the underlying AttributeCombo */
  attributePlaceholderString?: string;
  /** Validation help text for the underlying AttributeCombo */
  attributeValidationHelpString?: string;
  /** Mapping function for attribute names of underlying AttributeCombo */
  attributeNameMappingFunction?: (originalAttributeName: string) => string;
  /** Label for the underlying OperatorCombo */
  operatorLabel?: string;
  /** Show title of selected item in underlying OperatorCombo */
  showOperatorTitles?: boolean;
  /** Placeholder for the underlying OperatorCombo */
  operatorPlaceholderString?: string;
  /** Validation help text for the underlying OperatorCombo */
  operatorValidationHelpString?: string;
  /** Mapping function for operator names of underlying OperatorCombo */
  operatorNameMappingFunction?: (originalOperatorName: string) => string;
  /** Mapping function for operator title in underlying OperatorCombo */
  operatorTitleMappingFunction?: (originalOperatorName: string) => string;
  /** Label for the underlying value field */
  valueLabel?: string;
  /** Placeholder for the underlying value field */
  valuePlaceholder?: string;
  /** Object aggregating validation functions for attribute, operator and value */
  validators?: Validators;
  /** Show ui in micro mode. Which disables labels etc. */
  microUI?: boolean;
  /** Reference to internal data object (holding schema and example features) */
  internalDataDef?: Data;
  /** Callback function for onFilterChange */
  onFilterChange?: ((compFilter: GsComparisonFilter) => void);
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

type ValidationResult = {
  isValid: boolean;
  errorMsg: string;
};

export const ComparisonFilterDefaultValidator = (
  newValue: string | number | boolean | null,
  internalDataDef: Data,
  selectedAttribute: string
): ValidationResult => {

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
};

const operatorsMap = {
  'string': ['==', '*=', '!='],
  'number': ['==', '!=', '<', '<=', '>', '>='],
  'boolean': ['==', '!=']
};

/**
 * UI for a ComparisonFilter consisting of
 *
 *   - A combo to select the attribute
 *   - A combo to select the operator
 *   - An input field for the value
 */
// export class ComparisonFilter extends React.Component<ComparisonFilterProps, ComparisonFilterState> {
export const ComparisonFilter: React.FC<ComparisonFilterProps> = ({
  attributeLabel,
  attributeNameFilter = () => true,
  attributeNameMappingFunction = n => n,
  attributePlaceholderString,
  attributeValidationHelpString,
  filter = ['==', '', null],
  hideAttributeType = false,
  internalDataDef,
  microUI = false,
  onFilterChange,
  operatorLabel,
  operatorNameMappingFunction = n => n,
  operatorPlaceholderString,
  operatorTitleMappingFunction = t => t,
  operatorValidationHelpString,
  showOperatorTitles = true,
  valueLabel,
  valuePlaceholder,
  validators = {
    attribute: attributeName => !_isEmpty(attributeName),
    operator: operatorName => !_isEmpty(operatorName),
    value: ComparisonFilterDefaultValidator
  }
}) => {

  /**
   * Handler function, which is executed, when to underlying filter attribute changes.
   *
   * Changes the input field for the filter value and stores the appropriate attribute name as member.
   */
  const onAttributeChange = (newAttrName: string) => {
    let newFilter = _cloneDeep(filter);
    newFilter[1] = newAttrName;
    if (onFilterChange) {
      onFilterChange(newFilter);
    }
  };

  /**
   * Handler function, which is executed, when to underlying filter operator changes.
   *
   * Stores the appropriate operator as member.
   */
  const onOperatorChange = (newOperator: ComparisonOperator) => {
    let newFilter = _cloneDeep(filter);
    newFilter[0] = newOperator;
    if (onFilterChange) {
      onFilterChange(newFilter);
    }
  };

  /**
   * Handler function, which is executed, when to underlying filter value changes.
   *
   * Stores the appropriate filter value as member.
   */
  const onValueChange = (newValue: string | number | boolean) => {
    let newFilter = _cloneDeep(filter);
    newFilter[2] = newValue;
    if (onFilterChange) {
      onFilterChange(newFilter);
    }
  };

  let className = 'gs-comparison-filter-ui';
  if (microUI) {
    className += ' micro';
  }

  // TODO: implement strategy to handel FunctionFilter
  const attribute = _isString(filter[1]) ? filter[1] : undefined;
  const attributeType = attribute ? internalDataDef?.schema?.properties[attribute]?.type : undefined;
  const operator = filter[0];
  const value = filter[2];
  const hasFilter = filter && Array.isArray(filter);
  const valueValidation = validators.value(value, internalDataDef, attribute);
  const validateStatus: ValidationStatus = {
    attribute: hasFilter && validators.attribute(attribute) ? 'success' : 'error',
    operator: hasFilter && validators.operator(operator) ? 'success' : 'error',
    value: hasFilter && valueValidation.isValid ? 'success' : 'error'
  };
  const valueValidationHelpString = valueValidation.errorMsg;
  const allowedOperators = attributeType ? operatorsMap[attributeType] : undefined;
  const textFieldVisible = attributeType !== 'number' && attributeType !== 'boolean';
  const numberFieldVisible = attributeType === 'number';
  const boolFieldVisible = attributeType === 'boolean';

  return (
    <div className={className}>
      <Form>
        <Row gutter={16} justify="center">
          <Col span={10} className="gs-small-col">
            <AttributeCombo
              value={filter ? filter[1] as string : undefined}
              internalDataDef={internalDataDef}
              onAttributeChange={onAttributeChange}
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
              onOperatorChange={onOperatorChange}
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
            textFieldVisible ?
              <Col span={10} className="gs-small-col">
                <TextFilterField
                  value={filter ? filter[2] as string : undefined}
                  internalDataDef={internalDataDef}
                  selectedAttribute={attribute}
                  onValueChange={onValueChange}
                  label={valueLabel}
                  placeholder={valuePlaceholder}
                  validateStatus={validateStatus.value}
                  help={valueValidationHelpString}
                />
              </Col> :
              null
          }
          {
            numberFieldVisible ?
              <Col span={10} className="gs-small-col">
                <NumberFilterField
                  value={filter ? filter[2] as number : undefined}
                  onValueChange={onValueChange}
                  label={valueLabel}
                  placeholder={valuePlaceholder}
                  validateStatus={validateStatus.value}
                  help={valueValidationHelpString}
                />
              </Col> :
              null
          }
          {
            boolFieldVisible ?
              <Col span={10} className="gs-small-col">
                <BoolFilterField
                  value={filter ? filter[2] as boolean : undefined}
                  onValueChange={onValueChange}
                  label={valueLabel}
                />
              </Col> :
              null
          }
        </Row>
      </Form>
    </div>
  );
};

export default ComparisonFilter;
