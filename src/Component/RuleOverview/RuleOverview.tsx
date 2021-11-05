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
  Rule as GsRule
} from 'geostyler-style';

import './RuleOverview.less';
import { Data } from 'geostyler-data';
import { localize } from '../LocaleWrapper/LocaleWrapper';
import en_US from '../../locale/en_US';
import { RuleFieldContainer } from '../RuleFieldContainer/RuleFieldContainer';
import { Divider } from 'antd';

// i18n
export interface RuleOverviewLocale {
  ruleTitle: string;
}

// default props
interface RuleOverviewDefaultProps {
  locale: RuleOverviewLocale;
}

// non default props
export interface RuleOverviewProps extends Partial<RuleOverviewDefaultProps> {
  /** Reference to internal data object (holding schema and example features). */
  data?: Data;
  /** A GeoStyler-Style object. */
  rule: GsRule;
  /** The callback when the style changed. */
  onRuleChange?: (rule: GsRule) => void;
  /** The callback when a view change (request) was triggered. */
  onChangeView?: (view: string, indices: number[]) => void;
}

export const RuleOverview: React.FC<RuleOverviewProps> = ({
  rule,
  data,
  onRuleChange,
  onChangeView,
  locale = en_US.GsRuleOverview,
}) => {

  const [stateRule, setStateRule] = useState<GsRule>(rule);

  // const onEditSelectionClick = (ruleIds: number[]) => {
  //   if (onChangeView) {
  //     onChangeView('multiedit', ruleIds);
  //   }
  // };

  const onNameChange = (name: string) => {
    const newRule: GsRule = {...stateRule, name};
    setStateRule(newRule);
    if (onRuleChange) {
      onRuleChange(newRule);
    }
  };

  const onMinScaleChange = (minScale: number) => {
    let newRule: GsRule = {...stateRule};
    if (!newRule.scaleDenominator) {
      newRule.scaleDenominator = {};
    }
    newRule.scaleDenominator.min = minScale;
    setStateRule(newRule);
    if (onRuleChange) {
      onRuleChange(newRule);
    }
  };

  const onMaxScaleChange = (maxScale: number) => {
    let newRule: GsRule = {...stateRule};
    if (!newRule.scaleDenominator) {
      newRule.scaleDenominator = {};
    }
    newRule.scaleDenominator.max = maxScale;
    setStateRule(newRule);
    if (onRuleChange) {
      onRuleChange(newRule);
    }
  };

  return (
    <div className='gs-rule-overview'>
      <h2>{locale.ruleTitle}</h2>
      <Divider />
      <RuleFieldContainer
        name={rule.name}
        minScale={rule.scaleDenominator?.min}
        maxScale={rule.scaleDenominator?.max}
        symbolizers={rule.symbolizers}
        onNameChange={onNameChange}
        onMinScaleChange={onMinScaleChange}
        onMaxScaleChange={onMaxScaleChange}
      />
      {/* <Symbolizers> */}
      {/* <Filters> */}
    </div>
  );
};

export default localize(RuleOverview, 'RuleOverview');
