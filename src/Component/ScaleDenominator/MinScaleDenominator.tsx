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

import './MinScaleDenominator.css';
import { Expression, isGeoStylerFunction } from 'geostyler-style';
import { useGeoStylerLocale } from '../../context/GeoStylerContext/GeoStylerContext';

export interface MinScaleDenominatorProps extends Partial<FormItemProps> {
  /** The minScaleDenominator value */
  value?: Expression<number>;
  /** The callback function that is triggered when the state changes */
  onChange?: (newMinScale: number) => void;
}

/**
 * Input field for the minimum scale of a rule.
 */
export const MinScaleDenominator: React.FC<MinScaleDenominatorProps> = ({
  value,
  onChange,
  ...formItemLayout
}) => {

  const locale = useGeoStylerLocale('ScaleDenominator');

  if (isGeoStylerFunction(value)) {
    return <span>GeostylerFunction currently not supported'</span>;
  }

  return (
    <Form.Item
      className="gs-min-scaledenominator"
      label={locale.minScaleDenominatorLabelText}
      colon={false}
      {...formItemLayout}
    >
      <InputNumber
        className="gs-min-scaledenominator-input"
        value={value}
        min={0}
        placeholder={locale.minScaleDenominatorPlaceholderText}
        onChange={onChange}
      />
    </Form.Item>
  );
};
