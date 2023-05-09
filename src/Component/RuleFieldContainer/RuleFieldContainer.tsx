/* Released under the BSD 2-Clause License
 *
 * Copyright © 2021-present, terrestris GmbH & Co. KG and GeoStyler contributors
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

import './RuleFieldContainer.less';

import { Form, Divider } from 'antd';

import { localize } from '../LocaleWrapper/LocaleWrapper';

import FieldContainer from '../FieldContainer/FieldContainer';
import NameField from '../NameField/NameField';
import MinScaleDenominator from '../ScaleDenominator/MinScaleDenominator';
import MaxScaleDenominator from '../ScaleDenominator/MaxScaleDenominator';
import Renderer from '../Renderer/Renderer/Renderer';
import type GeoStylerLocale from '../../locale/locale';
import en_US from '../../locale/en_US';
import { Expression, Symbolizer } from 'geostyler-style';
import { Data } from 'geostyler-data';

// default props
interface RuleFieldContainerDefaultProps {
  /** Locale object containing translated text snippets */
  locale: GeoStylerLocale['RuleFieldContainer'] & GeoStylerLocale['ScaleDenominator'];
  /** The callback method when the name changes */
  onNameChange: (name: string) => void;
  /** The callback method when the minScale changes */
  onMinScaleChange: (scale: number) => void;
  /** The callback method when the maxScale changes */
  onMaxScaleChange: (scale: number) => void;
}

// non default props
export interface RuleFieldContainerProps extends Partial<RuleFieldContainerDefaultProps> {
  /** The name of the rule */
  name?: string;
  /** The minScale of the rule */
  minScale?: Expression<number>;
  /** The maxScale of the rule */
  maxScale?: Expression<number>;
  /** The symbolizers of the rule */
  symbolizers?: Symbolizer[];
  /** Reference to internal data object (holding schema and example features). */
  data?: Data;
}

export const RuleFieldContainer: React.FC<RuleFieldContainerProps> = ({
  name,
  minScale,
  maxScale,
  locale = en_US.Rule,
  onNameChange = () => {},
  onMinScaleChange = () => {},
  onMaxScaleChange = () => {},
  symbolizers = [],
  data
}) => {

  return (
    <FieldContainer className="gs-rule-field-container">
      <div className='gs-rule-field-container-header'>
        <Form
          layout='vertical'
        >
          <Form.Item
            label={locale.nameFieldLabel}
          >
            <NameField
              value={name}
              onChange={onNameChange}
              placeholder={locale.nameFieldPlaceholder}
            />
          </Form.Item>
          <MinScaleDenominator
            value={minScale}
            onChange={onMinScaleChange}
          />
          <MaxScaleDenominator
            value={maxScale}
            onChange={onMaxScaleChange}
          />
        </Form>
      </div>
      <Divider type="vertical" />
      <Renderer
        symbolizers={symbolizers}
        data={data}
      />
    </FieldContainer >
  );

};

export default localize(RuleFieldContainer, 'RuleFieldContainer');
