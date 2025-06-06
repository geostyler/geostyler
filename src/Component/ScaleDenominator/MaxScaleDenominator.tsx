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
import { InputNumber, Form, FormItemProps } from 'antd';

import './MaxScaleDenominator.css';
import { Expression, isGeoStylerFunction } from 'geostyler-style';
import { useGeoStylerLocale } from '../../context/GeoStylerContext/GeoStylerContext';

export interface MaxScaleDenominatorProps extends Partial<FormItemProps> {
  /** The maxScaleDenominator value */
  value?: Expression<number>;
  /** The callback function that is triggered when the state changes */
  onChange?: (newMinScale: number) => void;
}

/**
 * Input field for the maximum scale of a rule.
 */
export const MaxScaleDenominator: React.FC<MaxScaleDenominatorProps> = ({
  value,
  onChange,
  ...formItemLayout
}) => {

  const locale = useGeoStylerLocale('ScaleDenominator');

  if (isGeoStylerFunction(value)) {
    return <span>GeostylerFunction currently not supported'</span>;
  }

  return (
    <Form.Item className="gs-max-scaledenominator"
      label={locale.maxScaleDenominatorLabelText}
      colon={false}
      {...formItemLayout}
    >
      <InputNumber
        className="gs-max-scaledenominator-input"
        value={value}
        min={0}
        placeholder={locale.maxScaleDenominatorPlaceholderText}
        onChange={onChange}
      />
    </Form.Item>
  );
};
