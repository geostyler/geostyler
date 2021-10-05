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

import './RuleFieldContainer.less';

import { Form, Divider } from 'antd';

import { localize } from '../LocaleWrapper/LocaleWrapper';
import en_US from '../../locale/en_US';

import FieldContainer from '../FieldContainer/FieldContainer';
import NameField from '../NameField/NameField';
import MinScaleDenominator from '../ScaleDenominator/MinScaleDenominator';
import MaxScaleDenominator from '../ScaleDenominator/MaxScaleDenominator';
import Renderer from '../Symbolizer/Renderer/Renderer';
import {
  Symbolizer as GsSymbolizer
} from 'geostyler-style';

// i18n
export interface RuleFieldContainerLocale {
  nameFieldLabel?: string;
  nameFieldPlaceholder?: string;
  minScaleDenominatorLabelText?: string;
  maxScaleDenominatorLabelText?: string;
  minScaleDenominatorPlaceholderText?: string;
  maxScaleDenominatorPlaceholderText?: string;
}

// default props
interface RuleFieldContainerDefaultProps {
  /** Locale object containing translated text snippets */
  locale: RuleFieldContainerLocale;
}

// non default props
export interface RuleFieldContainerProps extends Partial<RuleFieldContainerDefaultProps> {
  onNameChange?: (name: string) => void;
  onMinScaleChange?: (scale: number) => void;
  onMaxScaleChange?: (scale: number) => void;
  name?: string;
  minScale?: number;
  maxScale?: number;
  symbolizers?: GsSymbolizer[];
}

export const RuleFieldContainer: React.FC<RuleFieldContainerProps> = ({
  name,
  minScale,
  maxScale,
  symbolizers,
  locale = { ...en_US.GsRule, ...en_US.GsScaleDenominator },
  onNameChange,
  onMinScaleChange,
  onMaxScaleChange
}) => {

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
  };

  return (
    <FieldContainer className="gs-rule-field-container">
      <div>
        <Form.Item
          label={locale.nameFieldLabel}
          {...formItemLayout}
        >
          <NameField
            value={name}
            onChange={onNameChange}
            placeholder={locale.nameFieldPlaceholder}
          />
        </Form.Item>
        <MinScaleDenominator
          label={locale.minScaleDenominatorLabelText}
          value={minScale}
          onChange={onMinScaleChange}
          {...formItemLayout}
        />
        <MaxScaleDenominator
          label={locale.maxScaleDenominatorLabelText}
          value={maxScale}
          onChange={onMaxScaleChange}
          {...formItemLayout}
        />
      </div>
      <Divider type="vertical" />
      <Renderer
        symbolizers={symbolizers} />
    </FieldContainer >
  );

};

export default localize(RuleFieldContainer, 'RuleFieldContainer');
