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

import { Input, Form, AutoComplete, InputRef } from 'antd';

import _get from 'lodash/get';
import { Feature } from 'geojson';

import './TextFilterField.css';
import {
  useGeoStylerData,
  useGeoStylerLocale
} from '../../../context/GeoStylerContext/GeoStylerContext';

export interface TextFilterFieldProps {
  /** Label for this field */
  label?: string;
  /** The default text to place into the empty field */
  placeholder?: string;
  /** Initial value set to the field */
  value?: string | undefined;
  /** Validation status */
  validateStatus?: 'success' | 'warning' | 'error' | 'validating';
  /** Callback function for onChange */
  onValueChange?: (newValue: string) => void;
  /** The selected attribute name */
  selectedAttribute?: string;
  size?: 'large' | 'middle' | 'small';
}

/**
 * Input field for a textual filter value.
 */
export const TextFilterField: React.FC<TextFilterFieldProps> = ({
  value,
  validateStatus = 'success',
  onValueChange,
  selectedAttribute,
  size
}) => {
  const data = useGeoStylerData();
  const locale = useGeoStylerLocale('TextFilterField');

  const inputRef = useRef<InputRef>(undefined);
  const [inputSelectionStart, setInputSelectionStart] = useState<number>(0);
  const [inputSelectionEnd, setInputSelectionEnd] = useState<number>(0);

  useLayoutEffect(() => {
    if (inputRef && inputRef.current && inputRef.current.input) {
      inputRef.current.input.selectionStart = inputSelectionStart;
      inputRef.current.input.selectionEnd = inputSelectionEnd;
    }
  }, [inputSelectionStart, inputSelectionEnd, value]);

  /**
   * Extracts the text value of the event object of 'onChange'
   * and passes it to the passed in 'onValueChange' handler.
   */
  const onInputChange = (e: any) => {
    if (onValueChange) {
      onValueChange(e.target.value);
    }
  };

  const onAutoCompleteChange = (text: string) => {
    if (onValueChange) {
      onValueChange(text);
    }
  };

  const helpTxt = validateStatus !== 'success' ? locale.help : null;

  const sampleValues: string[] = [];
  if (data && 'exampleFeatures' in data) {
    const features = data?.exampleFeatures?.features;
    features.forEach((feature: Feature) => {
      const sampleValue = _get(feature, `properties[${selectedAttribute}]`);
      if (sampleValue && sampleValues.indexOf(sampleValue) === -1) {
        sampleValues.push(sampleValue);
      }
    });
  }

  return (
    <div className="gs-text-filter-field">
      <Form.Item
        label={locale.label}
        colon={false}
        validateStatus={validateStatus}
        help={helpTxt}
        hasFeedback={true}
      >
        {
          sampleValues.length > 0 ?
            <AutoComplete
              size={size}
              value={value}
              onChange={onAutoCompleteChange}
              placeholder={locale.placeholder}
              dataSource={sampleValues}
              filterOption={(val: string|number, option: any) => {
                if (typeof val !== 'string') {
                  return false;
                }
                return option.key.toLowerCase().includes(val.toLowerCase());
              }}
            />
            :
            <Input
              size={size}
              ref={inputRef}
              draggable={true}
              onDragStart={(e) => e.preventDefault()}
              value={value}
              onChange={(event) => {
                onInputChange(event);
                // save the cursor position to restore it in
                // componentDidUpdate, otherwise it jumps to the end while typing
                const cursorStart = event.target.selectionStart;
                const cursorEnd = event.target.selectionEnd;
                setInputSelectionStart(cursorStart);
                setInputSelectionEnd(cursorEnd);
              }}
              placeholder={locale.placeholder}
            />
        }
      </Form.Item>
    </div>
  );
};
