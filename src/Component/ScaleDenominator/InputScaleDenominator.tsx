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

import { Col, Form, InputNumber, Row } from 'antd';
import React from 'react';

import _cloneDeep from 'lodash/cloneDeep';

import {
  ScaleDenominator as GsScaleDenominator
} from 'geostyler-style';

import './InputScaleDenominator.css';
import { useGeoStylerLocale } from '../../context/GeoStylerContext/GeoStylerContext';

export interface InputScaleDenominatorProps {
  /** The scaleDenominator */
  scaleDenominator?: GsScaleDenominator;
  /** The callback method that is triggered when the state changes */
  onChange?: (scaleDenominator: GsScaleDenominator) => void;
}

export const COMPONENTNAME = 'InputScaleDenominator';

/**
 * Combined UI for input fields for the minimum and maximum scale of a rule.
 */
export const InputScaleDenominator: React.FC<InputScaleDenominatorProps> = ({
  scaleDenominator,
  onChange
}) => {
  const locale = useGeoStylerLocale('RuleTable');

  const minValue = scaleDenominator?.min ? parseFloat(scaleDenominator.min as any) : undefined;
  const maxValue = scaleDenominator?.max ? parseFloat(scaleDenominator.max as any) : undefined;

  /**
   * Reacts on changing min scale and pushes the updated scaleDenominator to the 'onChange' function
   */
  const onMinScaleDenominatorChange = (minScaleDenominator: number) => {
    let scaleDenominatorClone = _cloneDeep(scaleDenominator);
    if (!scaleDenominatorClone) {
      scaleDenominatorClone = {};
    }

    scaleDenominatorClone.min = minScaleDenominator;
    if (onChange) {
      onChange(scaleDenominatorClone);
    }
  };

  /**
   * Reacts on changing max scale and pushes the updated scaleDenominator to the 'onChange' function
   */
  const onMaxScaleDenominatorChange = (maxScaleDenominator: number) => {
    let scaleDenominatorClone = _cloneDeep(scaleDenominator);
    if (!scaleDenominatorClone) {
      scaleDenominatorClone = {};
    }
    scaleDenominatorClone.max = maxScaleDenominator;
    if (onChange) {
      onChange(scaleDenominatorClone);
    }
  };

  const [form] = Form.useForm();

  return (
    <div className="gs-scaledenominator">
      <Form form={form}>
        <Row gutter={4}>
          <Col span={12} className="gs-small-col">
            <Form.Item
              name="min-scale-denominator"
            >
              <InputNumber
                prefix="1: "
                controls={false}
                value={minValue}
                min={0}
                onChange={(newValue: number) => {
                  onMinScaleDenominatorChange(newValue);
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12} className="gs-small-col">
            <Form.Item
              name="max-scale-denominator"
              dependencies={['min-scale-denominator']}
              hasFeedback
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const minScaleDenominator = getFieldValue('min-scale-denominator');
                    if (value && minValue && value < minScaleDenominator) {
                      return Promise.reject(locale.errorMaxScaleGreaterThanMinScale);
                    }
                    return Promise.resolve();
                  },
                })
              ]}
            >
              <InputNumber
                prefix="1: "
                controls={false}
                value={maxValue}
                min={0}
                onChange={(newValue: number) => {
                  onMaxScaleDenominatorChange(newValue);
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
