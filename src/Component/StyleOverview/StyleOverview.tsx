/* eslint-disable camelcase */
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

import React, { useState } from 'react';

import {
  Rule as GsRule,
  Style as GsStyle
} from 'geostyler-style';

import './StyleOverview.less';
import { Data } from 'geostyler-data';
import { StyleFieldContainer } from '../StyleFieldContainer/StyleFieldContainer';
import { Rules } from '../Rules/Rules';
import { localize } from '../LocaleWrapper/LocaleWrapper';
import en_US from '../../locale/en_US';

import _cloneDeep from 'lodash/cloneDeep';

// i18n
export interface StyleOverviewLocale {
  styleTitle: string;
}

// default props
interface StyleOverviewDefaultProps {
  locale: StyleOverviewLocale;
}

// non default props
export interface StyleOverviewProps extends Partial<StyleOverviewDefaultProps> {
  /** Reference to internal data object (holding schema and example features). */
  data?: Data;
  /** A GeoStyler-Style object. */
  style: GsStyle;
  /** The callback when the style changed. */
  onStyleChange?: (style: GsStyle) => void;
  /** The callback when a view change (request) was triggered. */
  onChangeView?: (view: string, indices: number[]) => void;
}

export const StyleOverview: React.FC<StyleOverviewProps> = ({
  style,
  data,
  onStyleChange,
  onChangeView,
  locale = en_US.GsStyleOverview,
}) => {

  const [stateStyle, setStateStyle] = useState<GsStyle>(style);

  const onNameChange = (name: string) => {
    let newStyle = _cloneDeep(stateStyle);
    newStyle.name = name;
    setStateStyle(newStyle);
    if (onStyleChange) {
      onStyleChange(newStyle);
    }
  };

  const onRulesChange = (rules: GsRule[]) => {
    let newStyle = _cloneDeep(stateStyle);
    newStyle.rules = rules;
    setStateStyle(newStyle);
    if (onStyleChange) {
      onStyleChange(newStyle);
    }
  };

  const onEditRule = (ruleId: number) => {
    if (onChangeView) {
      onChangeView('rule', [ruleId]);
    }
  };

  const onClassificationClick = () => {
    if (onChangeView) {
      onChangeView('classification', []);
    }
  };

  const onEditSelectionClick = (ruleIds: number[]) => {
    if (onChangeView) {
      onChangeView('multiedit', ruleIds);
    }
  };


  return (
    <div className='gs-style-overview'>
      <h2>{locale.styleTitle}</h2>
      <StyleFieldContainer
        name={stateStyle.name}
        onNameChange={onNameChange}
      />
      <Rules
        rules={stateStyle.rules}
        data={data}
        onRulesChange={onRulesChange}
        onEditRuleClick={onEditRule}
        onClassificationClick={onClassificationClick}
        onEditSelectionClick={onEditSelectionClick}
      />
    </div>
  );
};

export default localize(StyleOverview, 'StyleOverview');
