
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

import React from 'react';

import { JSONSchema4TypeName } from 'json-schema';

import _get from 'lodash-es/get.js';
import _cloneDeep from 'lodash-es/cloneDeep.js';
import _isEmpty from 'lodash-es/isEmpty.js';
import _isString from 'lodash-es/isString.js';

import { Data as GeoStylerData } from 'geostyler-data';

import {
  ComparisonFilter as GsComparisonFilter,
  ComparisonOperator,
  PropertyType
} from 'geostyler-style';

import { AttributeCombo } from '../AttributeCombo/AttributeCombo';
import { OperatorCombo } from '../OperatorCombo/OperatorCombo';
import { TextFilterField } from '../TextFilterField/TextFilterField';
import { NumberFilterField } from '../NumberFilterField/NumberFilterField';
import { BoolFilterField } from '../BoolFilterField/BoolFilterField';

import { useGeoStylerComposition, useGeoStylerData } from '../../../context/GeoStylerContext/GeoStylerContext';

import './ComparisonFilter.css';

type ValidationResult = {
  isValid: boolean;
  errorMsg: string;
};

interface Validators {
  attribute: (attrName: string) => boolean;
  operator: (operator: string) => boolean;
  value: (value: PropertyType, data?: GeoStylerData, selectedAttribute?: string) => ValidationResult;
}

export interface ComparisonFilterComposableProps {
  /**
   * A custom filter function which is passed each attribute.
   * Should return true to accept each attribute or false to reject it.
   */
  attributeNameFilter?: (attributeName: string) => boolean;
  /** Mapping function for attribute names of underlying AttributeCombo */
  attributeNameMappingFunction?: (originalAttributeName: string) => string;
  /** Set true to hide the attribute's type in the AttributeCombo select options */
  hideAttributeType?: boolean;
  /** Show title of selected item in underlying OperatorCombo */
  showOperatorTitles?: boolean;
  /** Mapping function for operator names of underlying OperatorCombo */
  operatorNameMappingFunction?: (originalOperatorName: string) => string;
  /** Mapping function for operator title in underlying OperatorCombo */
  operatorTitleMappingFunction?: (originalOperatorName: string) => string;
  /** Object aggregating validation functions for attribute, operator and value */
  validators?: Validators;
  /** Show ui in micro mode. Which disables labels etc. */
  microUI?: boolean;
};

export interface ComparisonFilterInternalProps {
  /** Initial comparison filter object */
  filter?: GsComparisonFilter;
  /** Label for the underlying OperatorCombo */
  operatorLabel?: string;
  /** Placeholder for the underlying OperatorCombo */
  operatorPlaceholderString?: string;
  /** Validation help text for the underlying OperatorCombo */
  operatorValidationHelpString?: string;
  /** Callback function for onFilterChange */
  onFilterChange?: ((compFilter: GsComparisonFilter) => void);
}

interface ValidationStatus {
  attribute: 'success' | 'warning' | 'error' | 'validating';
  operator: 'success' | 'warning' | 'error' | 'validating';
  value: 'success' | 'warning' | 'error' | 'validating';
}

export const ComparisonFilterDefaultValidator = (
  newValue: PropertyType,
  data: GeoStylerData,
  selectedAttribute: string
): ValidationResult => {

  let isValid = true;
  let errorMsg = '';
  // read out attribute type
  const attrType = _get(data, `schema.properties[${selectedAttribute}].type`);

  if (attrType === 'number') {
    // detect min / max from schema
    const minVal = _get(data, `schema.properties[${selectedAttribute}].minimum`);
    const maxVal = _get(data, `schema.properties[${selectedAttribute}].maximum`);

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
  }

  return {
    isValid: isValid,
    errorMsg: errorMsg
  };
};

const operatorsMap: Record<JSONSchema4TypeName, ComparisonOperator[]> = {
  // eslint-disable-next-line id-blacklist
  string: ['==', '*=', '!='],
  // eslint-disable-next-line id-blacklist
  number: ['==', '!=', '<', '<=', '>', '>=', '<=x<='],
  integer: ['==', '!=', '<', '<=', '>', '>=', '<=x<='],
  // eslint-disable-next-line id-blacklist
  boolean: ['==', '!='],
  // eslint-disable-next-line id-blacklist
  any: undefined,
  object: undefined,
  array: undefined,
  null: undefined
};

export type ComparisonFilterProps = ComparisonFilterInternalProps & ComparisonFilterComposableProps;

/**
 * UI for a ComparisonFilter consisting of
 *
 *   - A combo to select the attribute
 *   - A combo to select the operator
 *   - An input field for the value
 */
export const ComparisonFilter: React.FC<ComparisonFilterProps> = (props) => {

  const data = useGeoStylerData();
  const composition = useGeoStylerComposition('ComparisonFilter');
  const composed = { ...props, ...composition };
  const {
    attributeNameFilter = () => true,
    attributeNameMappingFunction = n => n,
    filter = ['==', '', null],
    hideAttributeType = false,
    microUI = false,
    onFilterChange,
    operatorLabel,
    operatorNameMappingFunction = n => n,
    operatorPlaceholderString,
    operatorTitleMappingFunction = t => t,
    operatorValidationHelpString,
    showOperatorTitles = true,
    validators = {
      attribute: attributeName => !_isEmpty(attributeName),
      operator: operatorName => !_isEmpty(operatorName),
      value: ComparisonFilterDefaultValidator
    }
  } = composed;

  /**
   * Handler function, which is executed, when to underlying filter attribute changes.
   *
   * Changes the input field for the filter value and stores the appropriate attribute name as member.
   */
  const onAttributeChange = (newAttrName: string) => {
    const newFilter = _cloneDeep(filter);
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
    const newFilter = _cloneDeep(filter);
    newFilter[0] = newOperator;
    if (newOperator !== '<=x<=' && newFilter.length > 3) {
      newFilter.splice(3, 1);
    }
    if (newOperator === '<=x<=' && !newFilter[3]) {
      newFilter[3] = 0;
    }
    if (onFilterChange) {
      onFilterChange(newFilter);
    }
  };

  /**
   * Handler function, which is executed, when to underlying filter value changes.
   *
   * Stores the appropriate filter value as member.
   */
  const onValueChange = (newValue: string | number | boolean, filterIndex = 2) => {
    const newFilter = _cloneDeep(filter);
    newFilter[filterIndex] = newValue;
    if (onFilterChange) {
      onFilterChange(newFilter);
    }
  };

  // TODO: implement strategy to handle FunctionFilter
  const attribute = _isString(filter[1]) ? filter[1] : undefined;
  const attributeType = attribute ? data?.schema?.properties[attribute]?.type : undefined;
  const operator = filter[0];
  const value = filter[2];
  const valueValidation = validators.value(value, data, attribute);
  const allowedOperators = attributeType ? operatorsMap[attributeType] : undefined;
  const isNumberBetweenComparison = operator === '<=x<=';
  const isNumberComparison = attributeType === 'number';
  const isBooleanComparison = attributeType === 'boolean';
  const isTextComparison = !isNumberBetweenComparison && !isNumberComparison && !isBooleanComparison;
  const hasFilter = filter && Array.isArray(filter);

  const validateStatus: ValidationStatus = {
    attribute: hasFilter && validators.attribute(attribute) ? 'success' : 'error',
    operator: hasFilter && validators.operator(operator) ? 'success' : 'error',
    value: hasFilter && valueValidation.isValid ? 'success' : 'error'
  };

  function getAttributeCombo(filterIndex = 1) {
    const size = microUI ? 'small' : undefined;
    let val: string;
    if (filter) {
      val = filter[filterIndex] as string;
    }
    return <AttributeCombo
      size={size}
      value={val}
      onAttributeChange={onAttributeChange}
      attributeNameFilter={attributeNameFilter}
      attributeNameMappingFunction={attributeNameMappingFunction}
      validateStatus={validateStatus.attribute}
      hideAttributeType={hideAttributeType}
    />;
  }

  function getNumberField(filterIndex = 2) {
    const size = microUI ? 'small' : undefined;
    let val: number;
    if (filter) {
      val = filter[filterIndex] as number;
    }
    return <NumberFilterField
      size={size}
      value={val}
      onValueChange={(newValue) => onValueChange(newValue, filterIndex)}
      validateStatus={validateStatus.value}
    />;
  }

  function getTextField(filterIndex = 2) {
    const size = microUI ? 'small' : undefined;
    let val: string;
    if (filter) {
      val = filter[filterIndex] as string;
    }
    return <TextFilterField
      size={size}
      value={val}
      selectedAttribute={attribute}
      onValueChange={onValueChange}
      validateStatus={validateStatus.value}
    />;
  }

  function getOperatorCombo(filterIndex = 0) {
    const size = microUI ? 'small' : undefined;
    let val: ComparisonOperator;
    if (filter) {
      val = filter[filterIndex] as ComparisonOperator;
    }
    return <OperatorCombo
      size={size}
      value={val}
      onOperatorChange={onOperatorChange}
      operators={allowedOperators}
      operatorNameMappingFunction={operatorNameMappingFunction}
      placeholder={operatorPlaceholderString}
      label={operatorLabel}
      validateStatus={validateStatus.operator}
      help={operatorValidationHelpString}
      operatorTitleMappingFunction={operatorTitleMappingFunction}
      showTitles={showOperatorTitles}
    />;
  }

  function getBooleanField(filterIndex = 2) {
    const size = microUI ? 'small' : undefined;
    let val: boolean;
    if (filter) {
      val = filter[filterIndex] as boolean;
    }
    return <BoolFilterField
      size={size}
      value={val}
      onValueChange={onValueChange}
    />;
  }

  let className = 'gs-comparison-filter-ui';
  if (microUI) {
    className += ' micro';
  }

  if (isNumberBetweenComparison) {
    return (
      <div className={className}>
        {getAttributeCombo()}
        {getNumberField(2)}
        {getOperatorCombo()}
        {getNumberField(3)}
      </div>
    );
  }

  if (isNumberComparison) {
    return (
      <div className={className}>
        {getAttributeCombo()}
        {getOperatorCombo()}
        {getNumberField()}
      </div>
    );
  }

  if (isBooleanComparison) {
    return (
      <div className={className}>
        {getAttributeCombo()}
        {getOperatorCombo()}
        {getBooleanField()}
      </div>
    );
  }

  if (isTextComparison) {
    return (
      <div className={className}>
        {getAttributeCombo()}
        {getOperatorCombo()}
        {getTextField()}
      </div>
    );
  }

  return (
    <div className={className}>
      Could not create ComparisonFilter.
    </div>
  );
};
