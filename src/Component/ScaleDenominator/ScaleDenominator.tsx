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
import { Row, Col } from 'antd';
import MinScaleDenominator from './MinScaleDenominator';
import MaxScaleDenominator from './MaxScaleDenominator';

import _get from 'lodash/get';
import _cloneDeep from 'lodash/cloneDeep';

import {
  ScaleDenominator as GsScaleDenominator
} from 'geostyler-style';

import { localize } from '../LocaleWrapper/LocaleWrapper';
import en_US from '../../locale/en_US';
import type GeoStylerLocale from '../../locale/locale';

interface ScaleDenominatorDefaultProps {
  /** Locale object containing translated text snippets */
  locale?: GeoStylerLocale['ScaleDenominator'];
}

// non default props
export interface ScaleDenominatorProps extends Partial<ScaleDenominatorDefaultProps> {
  /** The scaleDenominator */
  scaleDenominator?: GsScaleDenominator;
  /** The callback method that is triggered when the state changes */
  onChange?: (scaleDenominator: GsScaleDenominator) => void;
}

export const COMPONENTNAME = 'ScaleDenominator';

/**
 * Combined UI for input fields for the minimum and maximum scale of a rule.
 */
export const ScaleDenominator: React.FC<ScaleDenominatorProps> = ({
  locale = en_US.ScaleDenominator,
  scaleDenominator,
  onChange
}) => {

  /**
   * Reacts on changing min scale and pushes the updated scaleDenominator to the 'onChange' function
   */
  const onMinScaleDenomChange = (minScaleDenominator: number) => {
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
  const onMaxScaleDenomChange = (maxScaleDenominator: number) => {
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
    <div className="gs-scaledenominator">
      <Row gutter={16} >
        <Col span={12} className="gs-small-col">
          <MinScaleDenominator
            value={scaleDenominator?.min}
            onChange={onMinScaleDenomChange}
            placeholder={locale.minScaleDenominatorPlaceholderText}
          />
        </Col>
        <Col span={12} className="gs-small-col">
          <MaxScaleDenominator
            value={scaleDenominator?.max}
            onChange={onMaxScaleDenomChange}
            placeholder={locale.maxScaleDenominatorPlaceholderText}
          />
        </Col>
      </Row>
    </div>
  );
};

export default localize(ScaleDenominator, COMPONENTNAME);
