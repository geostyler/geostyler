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

import { Col, Row, Select } from 'antd';
import React, { useMemo } from 'react';

import _cloneDeep from 'lodash/cloneDeep';

import {
  ScaleDenominator as GsScaleDenominator
} from 'geostyler-style';
import { Scales } from 'geostyler-data';
import { DefaultOptionType } from 'antd/lib/select';

import './SelectScaleDenominator.css';

export interface SelectScaleDenominatorProps {
  /** The scale denominators defined in context (scales in data) */
  scaleDenominators: Scales;
  /** The scaleDenominator */
  scaleDenominator?: GsScaleDenominator;
  /** The callback method that is triggered when the state changes */
  onChange?: (scaleDenominator: GsScaleDenominator) => void;
}

export const COMPONENTNAME = 'SelectScaleDenominator';

/**
 * Combined UI for input fields for the minimum and maximum scale of a rule.
 */
export const SelectScaleDenominator: React.FC<SelectScaleDenominatorProps> = ({
  scaleDenominators,
  scaleDenominator,
  onChange
}) => {

  const minValue = scaleDenominator?.min ? parseFloat(scaleDenominator.min as any) : undefined;
  const maxValue = scaleDenominator?.max ? parseFloat(scaleDenominator.max as any) : undefined;

  const options = useMemo(() => {
    const o: DefaultOptionType[] = [];
    Object.keys(scaleDenominators).forEach((key) => {
      const v = parseInt(key, 10);
      o.push({ label: key, value: scaleDenominators[v] });
    });
    return o;
  },[scaleDenominators]);

  const maxOptions = useMemo(() => {
    return options.filter((option) => {
      if (! minValue) {
        return true;
      }

      return (option.value as number) >= minValue;
    });
  }, [options, minValue]);

  /**
   * Reacts on changing min scale and pushes the updated scaleDenominator to the 'onChange' function
   */
  const onMinScaleDenominatorChange = (minScaleDenominator: number) => {
    let scaleDenominatorClone = _cloneDeep(scaleDenominator);
    if (!scaleDenominatorClone) {
      scaleDenominatorClone = {};
    }

    scaleDenominatorClone.min = minScaleDenominator;
    if (scaleDenominatorClone.max && scaleDenominatorClone.max as number < minScaleDenominator) {
      scaleDenominatorClone.max = minScaleDenominator;
    }
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

  return (
    <Row gutter={4} className={'gs-select-scale'}>
      <Col span={12}>
        <Select
          value={minValue}
          options={options}
          allowClear
          onChange={onMinScaleDenominatorChange}
        />
      </Col>
      <Col span={12}>
        <Select
          value={maxValue}
          options={maxOptions}
          allowClear
          onChange={onMaxScaleDenominatorChange}
        />
      </Col>
    </Row>
  );
};
