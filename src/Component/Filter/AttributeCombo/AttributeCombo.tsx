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

import { Select, Form, Input } from 'antd';
import { Data } from 'geostyler-data';
const Option = Select.Option;

// default props
interface AttributeComboDefaultProps {
  /** Label for this field */
  label: string;
  /** The default text to place into the empty field */
  placeholder: string;
  /** Initial value set to the field */
  value: string | undefined;
  /** Set true to hide the attribute's type in the select options */
  hideAttributeType: boolean;
  /**
   * A custom filter function which is passed each attribute.
   * Should return true to accept each attribute or false to reject it.
   */
  attributeNameFilter: (attrName: string) => boolean;
  /** Mapping function for attribute names of this combo */
  attributeNameMappingFunction?: (originalAttributeName: string) => string;
  /** Validation status */
  validateStatus: 'success' | 'warning' | 'error' | 'validating';
  /** Element to show a help text */
  help: React.ReactNode;
}
// non default props
export interface AttributeComboProps extends Partial<AttributeComboDefaultProps> {
  /** Reference to internal data object (holding schema and example features) */
  internalDataDef?: Data;
  /** Callback function for onChange */
  onAttributeChange: ((newAttrName: string) => void);
}

interface AttributeComboState {
  value: string | undefined;
}

/**
 * Combobox offering the attributes to be filtered on.
 */
export class AttributeCombo extends React.Component<AttributeComboProps, AttributeComboState> {

  public static defaultProps: AttributeComboDefaultProps = {
    label: 'Attribute',
    placeholder: 'Select Attribute',
    value: undefined,
    hideAttributeType: false,
    attributeNameFilter: () => true,
    attributeNameMappingFunction: n => n,
    validateStatus: 'success',
    help: 'Please select an attribute.'
  };

  constructor(props: AttributeComboProps) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }

  static getDerivedStateFromProps(
    nextProps: AttributeComboProps,
    prevState: AttributeComboState): Partial<AttributeComboState> {
    return {
      value: nextProps.value
    };
  }

  render() {
    const {
      internalDataDef,
      onAttributeChange,
      label,
      placeholder,
      attributeNameFilter,
      hideAttributeType
    } = this.props;

    let options: Object[] = [];

    if (internalDataDef) {
      const attrDefs = internalDataDef.schema.properties;

      // create sth like ['foo', 'bar', 'kalle'];
      const attrNames = [];
      for (var key in attrDefs) {
        if (attrDefs.hasOwnProperty(key)) {
          attrNames.push(key);
        }
      }

      // create an option per attribute
      options = attrNames.filter(attributeNameFilter!).map(attrName => {
        const attrNameMapped = this.props.attributeNameMappingFunction(attrName);
        return (
          <Option
            key={attrName}
            value={attrName}
          >
            {hideAttributeType ? attrNameMapped : `${attrNameMapped} (${attrDefs[attrName].type})`}
          </Option>
        );
      });
    }

    const helpTxt = this.props.validateStatus !== 'success' ? this.props.help : null;

    return (
      <div className="gs-attr-combo">
        <Form.Item
          label={label}
          colon={false}
          validateStatus={this.props.validateStatus}
          help={helpTxt}
        >
          {
            internalDataDef ?
              <Select
                value={this.state.value}
                style={{ width: '100%' }}
                onChange={onAttributeChange}
                placeholder={placeholder}
              >
                {options}
              </Select>
              :
              <Input
                draggable={true}
                onDragStart={(e) => e.preventDefault()}
                value={this.state.value}
                placeholder={placeholder}
                style={{ width: '100%' }}
                onChange={(event) => {
                  onAttributeChange(event.target.value);
                }}
              />
          }
        </Form.Item>
      </div>
    );
  }
}

export default AttributeCombo;
