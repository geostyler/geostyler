/* eslint-disable camelcase */
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

import React, { useState } from 'react';

import _merge from 'lodash/merge';

import {
  Rule as GsRule,
  Symbolizer as GsSymbolizer
} from 'geostyler-style';

import './RuleOverview.less';
import { Data } from 'geostyler-data';
import { localize } from '../LocaleWrapper/LocaleWrapper';
import en_US from '../../locale/en_US';
import { RuleFieldContainer, RuleFieldContainerProps } from '../RuleFieldContainer/RuleFieldContainer';
import { Divider } from 'antd';
import { Symbolizers, SymbolizersProps } from '../Symbolizers/Symbolizers';
import CardViewUtil from '../../Util/CardViewUtil';
import { FilterOverview } from '../FilterOverview/FilterOverview';

// i18n
export interface RuleOverviewLocale {
  ruleTitle: string;
}

// default props
interface RuleOverviewDefaultProps {
  /** Locale object containing translated text snippets */
  locale: RuleOverviewLocale;
  /** The callback when the style changed. */
  onRuleChange: (rule: GsRule) => void;
  /** The callback when a view change (request) was triggered. */
  onChangeView: (view: string, indices: number[]) => void;
}

// non default props
export interface RuleOverviewProps extends Partial<RuleOverviewDefaultProps> {
  /** Reference to internal data object (holding schema and example features). */
  data?: Data;
  /** A GeoStyler-Style object. */
  rule: GsRule;
  /** The passthrough props for the RuleFieldContainer component. */
  ruleFieldContainerProps?: Partial<RuleFieldContainerProps>;
  /** The passthrough props for the Symbolizers component. */
  symbolizersProps?: Partial<SymbolizersProps>;
}

export const RuleOverview: React.FC<RuleOverviewProps> = ({
  rule,
  data,
  onRuleChange = () => {},
  onChangeView = () => {},
  ruleFieldContainerProps,
  symbolizersProps,
  locale = en_US.GsRuleOverview,
}) => {

  const [stateRule, setStateRule] = useState<GsRule>(rule);

  const onNameChange = (name: string) => {
    const newRule: GsRule = {...stateRule, name};
    setStateRule(newRule);
    onRuleChange(newRule);
  };

  const onMinScaleChange = (minScale: number) => {
    let newRule: GsRule = {...stateRule};
    if (!newRule.scaleDenominator) {
      newRule.scaleDenominator = {};
    }
    newRule.scaleDenominator.min = minScale;
    setStateRule(newRule);
    onRuleChange(newRule);
  };

  const onMaxScaleChange = (maxScale: number) => {
    let newRule: GsRule = {...stateRule};
    if (!newRule.scaleDenominator) {
      newRule.scaleDenominator = {};
    }
    newRule.scaleDenominator.max = maxScale;
    setStateRule(newRule);
    onRuleChange(newRule);
  };

  const onSymbolizersChange = (symbolizers: GsSymbolizer[]) => {
    let newRule: GsRule = {...stateRule, symbolizers};
    setStateRule(newRule);
    onRuleChange(newRule);
  };

  const onEditSymbolizerClick = (symbolizerId: number) => {
    onChangeView(CardViewUtil.SYMBOLIZERVIEW, [symbolizerId]);
  };

  const onEditFilterClick = () => {
    onChangeView(CardViewUtil.FILTEREDITVIEW, []);
  };

  const ruleFieldContainerPropsOverwrites = {
    rendererProps: {
      symbolizers: rule.symbolizers,
      data: data
    }
  };
  const mergedRuleFieldContainerProps = _merge(ruleFieldContainerProps, ruleFieldContainerPropsOverwrites);

  const symbolizersPropsOverwrites = {
  };
  const mergedSymbolizersProps = _merge(symbolizersProps, symbolizersPropsOverwrites);

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
        {...mergedRuleFieldContainerProps}
      />
      <Symbolizers
        symbolizers={rule.symbolizers}
        onEditSymbolizerClick={onEditSymbolizerClick}
        onSymbolizersChange={onSymbolizersChange}
        {...mergedSymbolizersProps}
      />
      <FilterOverview
        filter={rule.filter}
        onEditFilterClick={onEditFilterClick}
      />
    </div>
  );
};

export default localize(RuleOverview, 'RuleOverview');
