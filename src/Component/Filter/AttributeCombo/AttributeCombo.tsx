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

import React, { useLayoutEffect, useRef, useState } from 'react';

import { Select, Form, Input } from 'antd';
import {
  useGeoStylerData,
  useGeoStylerLocale
} from '../../../context/GeoStylerContext/GeoStylerContext';
import { getFormItemConfig } from '../../../Util/FormItemUtil';

const Option = Select.Option;

export interface AttributeComboProps {
  /** Set true to hide the attribute's type in the select options */
  hideAttributeType?: boolean;
  /**
   * A custom filter function which is passed each attribute.
   * Should return true to accept each attribute or false to reject it.
   */
  attributeNameFilter?: (attrName: string) => boolean;
  /** Mapping function for attribute names of this combo */
  attributeNameMappingFunction?: (originalAttributeName: string) => string;
  /** Validation status */
  validateStatus?: 'success' | 'warning' | 'error' | 'validating';
  /** Callback function for onChange */
  onAttributeChange?: ((newAttrName: string) => void);
  /** Value set to the field */
  value?: string | undefined;
  size?: 'large' | 'middle' | 'small';
}

/**
 * Combobox offering the attributes to be filtered on.
 */
export const AttributeCombo: React.FC<AttributeComboProps> = ({
  value,
  hideAttributeType = false,
  attributeNameFilter = () => true,
  attributeNameMappingFunction =n => n,
  validateStatus = 'success',
  onAttributeChange,
  size
}) => {

  const locale = useGeoStylerLocale('AttributeCombo');
  const data = useGeoStylerData();

  const [inputSelectionStart, setInputSelectionStart] = useState<number>();
  const [inputSelectionEnd, setInputSelectionEnd] = useState<number>();
  const inputRef = useRef(null);

  useLayoutEffect(() => {
    if (inputRef && inputRef.current && inputRef.current.input) {
      inputRef.current.input.selectionStart = inputSelectionStart;
      inputRef.current.input.selectionEnd = inputSelectionEnd;
    }
  }, [inputSelectionStart, inputSelectionEnd, value]);

  let options: Object[] = [];

  if (data) {
    const attrDefs = data.schema.properties;

    // create sth like ['foo', 'bar', 'kalle'];
    const attrNames = [];
    for (var key in attrDefs) {
      if (attrDefs.hasOwnProperty(key)) {
        attrNames.push(key);
      }
    }

    // create an option per attribute
    options = attrNames.filter(attributeNameFilter!).map(attrName => {
      const attrNameMapped = attributeNameMappingFunction(attrName);
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

  const helpTxt = validateStatus !== 'success' ? locale.help : null;
  const itemConfig = getFormItemConfig();

  return (
    <div className="gs-attribute-combo">
      <Form.Item
        {...itemConfig}
        label={locale.label}
        colon={false}
        validateStatus={validateStatus}
        help={helpTxt}
      >
        {
          data ?
            <Select
              value={value}
              onChange={onAttributeChange}
              placeholder={locale.placeholder}
              size={size}
            >
              <>
                {options}
              </>
            </Select>
            :
            <Input
              ref={inputRef}
              draggable={true}
              onDragStart={(e) => e.preventDefault()}
              value={value}
              placeholder={locale.placeholder}
              size={size}
              onChange={(event) => {
                if (onAttributeChange) {
                  onAttributeChange(event.target.value);
                }
                // save the cursor position to restore it in
                // componentDidUpdate, otherwise it jumps to the end while typing
                const cursorStart = event.target.selectionStart;
                const cursorEnd = event.target.selectionEnd;
                setInputSelectionStart(cursorStart);
                setInputSelectionEnd(cursorEnd);
              }}
            />
        }
      </Form.Item>
    </div>
  );
};
