
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

import {
  Rule as GsRule,
  Symbolizer as GsSymbolizer
} from 'geostyler-style';

import './RuleOverview.css';

import { RuleFieldContainer } from '../RuleFieldContainer/RuleFieldContainer';
import { Divider } from 'antd';
import { Symbolizers } from '../Symbolizers/Symbolizers';
import CardViewUtil from '../../Util/CardViewUtil';
import { FilterOverview } from '../FilterOverview/FilterOverview';
import { useGeoStylerComposition, useGeoStylerLocale } from '../../context/GeoStylerContext/GeoStylerContext';
import { RuleComposableProps } from '../RuleCard/RuleCard';

export type RuleOverviewComposableProps = Pick<RuleComposableProps, 'filterField'>;

export interface RuleOverviewInternalProps {
  /** The callback when the style changed. */
  onRuleChange?: (rule: GsRule) => void;
  /** The callback when a view change (request) was triggered. */
  onChangeView?: (view: string, indices: number[]) => void;
  /** A GeoStyler-Style object. */
  rule: GsRule;
}

export type RuleOverviewProps = RuleOverviewInternalProps & RuleOverviewComposableProps;

export const RuleOverview: React.FC<RuleOverviewProps> = (props) => {

  const composition = useGeoStylerComposition('Rule') as RuleOverviewComposableProps;

  const composed = { ...props, ...composition };
  const {
    onChangeView = () => { },
    onRuleChange = () => { },
    rule,
    filterField
  } = composed;

  const locale = useGeoStylerLocale('RuleOverview');

  const onNameChange = (name: string) => {
    const newRule: GsRule = { ...rule, name };
    onRuleChange(newRule);
  };

  const onMinScaleChange = (minScale: number) => {
    const newRule: GsRule = { ...rule };
    if (!newRule.scaleDenominator) {
      newRule.scaleDenominator = {};
    }
    newRule.scaleDenominator.min = minScale;
    onRuleChange(newRule);
  };

  const onMaxScaleChange = (maxScale: number) => {
    const newRule: GsRule = { ...rule };
    if (!newRule.scaleDenominator) {
      newRule.scaleDenominator = {};
    }
    newRule.scaleDenominator.max = maxScale;
    onRuleChange(newRule);
  };

  const onSymbolizersChange = (symbolizers: GsSymbolizer[]) => {
    const newRule: GsRule = { ...rule, symbolizers };
    onRuleChange(newRule);
  };

  const onEditSymbolizerClick = (symbolizerId: number) => {
    onChangeView(CardViewUtil.SYMBOLIZERVIEW, [symbolizerId]);
  };

  const onEditFilterClick = () => {
    onChangeView(CardViewUtil.FILTEREDITVIEW, []);
  };

  return (
    <div className='gs-rule-overview'>
      <h2>{locale.ruleTitle}</h2>
      <Divider />
      <RuleFieldContainer
        name={rule.name}
        minScale={rule.scaleDenominator?.min}
        maxScale={rule.scaleDenominator?.max}
        onNameChange={onNameChange}
        onMinScaleChange={onMinScaleChange}
        onMaxScaleChange={onMaxScaleChange}
        symbolizers={rule.symbolizers}
      />
      <Symbolizers
        symbolizers={rule.symbolizers}
        onEditSymbolizerClick={onEditSymbolizerClick}
        onSymbolizersChange={onSymbolizersChange}
      />
      {
        filterField?.visibility === false ? null : (
          <FilterOverview
            filter={rule.filter}
            onEditFilterClick={onEditFilterClick}
          />
        )
      }
    </div>
  );
};
