
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

import React from 'react';

import _cloneDeep from 'lodash-es/cloneDeep.js';

import { Divider } from 'antd';

import {
  Rule as GsRule,
  Style as GsStyle
} from 'geostyler-style';

import { StyleFieldContainer } from '../StyleFieldContainer/StyleFieldContainer';
import { Rules } from '../Rules/Rules';

import CardViewUtil from '../../Util/CardViewUtil';
import { useGeoStylerLocale } from '../../context/GeoStylerContext/GeoStylerContext';

import './StyleOverview.css';

export interface StyleOverviewProps {
  /** The callback when the style changed. */
  onStyleChange?: (style: GsStyle) => void;
  /** The callback when a view change (request) was triggered. */
  onChangeView?: (view: string, indices: number[]) => void;
  /** A GeoStyler-Style object. */
  style: GsStyle;
}

export const StyleOverview: React.FC<StyleOverviewProps> = ({
  style,
  onStyleChange = () => { },
  onChangeView = () => { }
}) => {

  const locale = useGeoStylerLocale('StyleOverview');

  const onNameChange = (name: string) => {
    const newStyle = _cloneDeep(style);
    newStyle.name = name;
    onStyleChange(newStyle);
  };

  const onRulesChange = (rules: GsRule[]) => {
    const newStyle = _cloneDeep(style);
    newStyle.rules = rules;
    onStyleChange(newStyle);
  };

  const onEditRule = (ruleId: number) => {
    onChangeView(CardViewUtil.RULEVIEW, [ruleId]);
  };

  const onClassificationClick = () => {
    onChangeView(CardViewUtil.CLASSIFICATIONVIEW, []);
  };

  const onEditSelectionClick = (ruleIds: number[]) => {
    onChangeView(CardViewUtil.MULTIEDITVIEW, ruleIds);
  };

  return (
    <div className='gs-style-overview'>
      <h2>{locale.styleTitle}</h2>
      <Divider />
      <StyleFieldContainer
        name={style.name}
        onNameChange={onNameChange}
      />
      <Rules
        rules={style.rules}
        onRulesChange={onRulesChange}
        onEditRuleClick={onEditRule}
        onClassificationClick={onClassificationClick}
        onEditSelectionClick={onEditSelectionClick}
      />
    </div>
  );
};
