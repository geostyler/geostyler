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

import React, { ReactNode, useState } from 'react';

import {
  Rule as GsRule,
} from 'geostyler-style';

import { localize } from '../LocaleWrapper/LocaleWrapper';
import en_US from '../../locale/en_US';

import './Rules.less';
import
  // Renderer,
  { RendererProps }
  from '../Symbolizer/Renderer/Renderer';
import FilterUtil, { CountResult } from '../../Util/FilterUtil';
import {
  // SLDRenderer,
  SLDRendererAdditonalProps } from '../Symbolizer/SLDRenderer/SLDRenderer';
import DataUtil from '../../Util/DataUtil';
import { Data } from 'geostyler-data';
import { ComparisonFilterProps } from '../Filter/ComparisonFilter/ComparisonFilter';
import { IconLibrary } from '../Symbolizer/IconSelector/IconSelector';
import { Button, Switch, Divider } from 'antd';

import _cloneDeep from 'lodash/cloneDeep';
import Selectable from '../Selectable/Selectable';
import Removable from '../Removable/Removable';
import { RuleCard } from '../RuleCard/RuleCard';

// i18n
export interface RulesLocale {
  rulesTitle: string;
  multiEdit: string;
  addRule: string;
  classification: string;
  remove: string;
  clone: string;
  edit: string;
  defaultRuleTitle: string;
}

// default props
interface RulesDefaultProps {
  /** Locale object containing translated text snippets */
  locale: RulesLocale;
  /** The renderer to use */
  rendererType: 'SLD' | 'OpenLayers';
  /** Properties of the SLD renderer */
  sldRendererProps: SLDRendererAdditonalProps;
  /** Properties of the OpenLayers renderer */
  oLRendererProps: Partial<RendererProps>;
  /** Display the number of features that match a rule */
  showAmount: boolean;
  /** Display the number of features that match more than one rule */
  showDuplicates: boolean;
}

// non default props
export interface RulesProps extends Partial<RulesDefaultProps> {
  /** List of rules to display in rule table */
  rules: GsRule[];
  /** Reference to internal data object (holding schema and example features) */
  data?: Data;
  /** The callback function that is triggered when the rules change */
  onRulesChange?: (rules: GsRule[]) => void;
  /** The callback function that is triggered when the classification button was clicked */
  onClassificationClick?: () => void;
  /** The callback function that is triggered when the edit selection button was clicked */
  onEditSelectionClick?: (selectedIdxs: number[]) => void;
  /** The callback function that is triggered when the rule was clicked */
  onEditRuleClick?: (ruleId: number) => void;
  /** Properties that will be passed to the Comparison Filters */
  filterUiProps?: Partial<ComparisonFilterProps>;
  /** List of supported icons ordered as library */
  iconLibraries?: IconLibrary[];
  /** Object containing predefined color ramps */
  colorRamps?: {
    [name: string]: string[];
  };
}

export const Rules: React.FC<RulesProps> = ({
  locale = en_US.GsRules,
  rendererType = 'OpenLayers',
  sldRendererProps,
  oLRendererProps,
  showAmount = true,
  showDuplicates = true,
  data,
  rules,
  onRulesChange,
  onClassificationClick,
  onEditSelectionClick,
  onEditRuleClick,
  filterUiProps,
  iconLibraries = [],
  colorRamps,
}) => {
  const [multiEditActive, setMultiEditActive] = useState<boolean>(false);
  const [selectedRules, setSelectedRules] = useState<number[]>([]);
  const toggleMultiEdit = () => {
    setMultiEditActive(!multiEditActive);
  };

  const addRule = () => {
    const defaultRule: GsRule = {
      name: locale.defaultRuleTitle,
      symbolizers: []
    };
    const rulesClone = _cloneDeep(rules);
    rulesClone.push(defaultRule);
    if (onRulesChange) {
      onRulesChange(rulesClone);
    }
  };

  const removeSelectedRules = () => {
    if (onRulesChange) {
      const rulesClone = _cloneDeep(rules)
        .filter((rule: GsRule, idx: number) => {
          return !selectedRules.includes(idx);
        });
      onRulesChange(rulesClone);
    }
    setSelectedRules([]);
    setMultiEditActive(false);
  };

  const cloneSelectedRules = () => {
    if (onRulesChange) {
      let rulesClone = _cloneDeep(rules);
      selectedRules.forEach((selectedIdx: number) => {
        rulesClone.push(_cloneDeep(rulesClone[selectedIdx]));
      });

      onRulesChange(rulesClone);
    }
    setMultiEditActive(false);
  };

  const editSelectedRules = () => {
    if (onEditSelectionClick) {
      onEditSelectionClick(selectedRules);
    }
  };

  const classificationClick = () => {
    if (onClassificationClick) {
      onClassificationClick();
    }
  };

  const onSelectionChange = (selectedIdxs: number[]) => {
    setSelectedRules(selectedIdxs);
  };

  const editRule = (ruleId: number) => {
    if (onEditRuleClick) {
      onEditRuleClick(ruleId);
    }
  };

  const removeRule = (ruleIdx: number) => {
    if (onRulesChange) {
      const rulesClone = _cloneDeep(rules);
      rulesClone.splice(ruleIdx, 1);
      onRulesChange(rulesClone);
    }
  };

  let countAndDuplicates: CountResult;
  if (data && DataUtil.isVector(data)) {
    countAndDuplicates = FilterUtil.calculateCountAndDuplicates(rules, data);
  }

  const rulesCards = rules.map((rule: GsRule, idx: number) => {
    let ruleDuplicates;
    if (countAndDuplicates) {
      ruleDuplicates = countAndDuplicates.duplicates[idx];
    }
    return (
      <RuleCard
        key={idx}
        rule={rule}
        data={data}
        duplicates={ruleDuplicates}
        onClick={() => {
          if (!multiEditActive) {
            editRule(idx);
          }
        }}
      />
    );
  });

  const defaultActions: ReactNode[] = [
    <Button
      onClick={addRule}
      key={0}
    >
      {locale.addRule}
    </Button>,
    <Button
      onClick={classificationClick}
      key={1}
    >
      {locale.classification}
    </Button>
  ];

  const multiEditActions: ReactNode[] = [
    <Button
      onClick={removeSelectedRules}
      key={0}
    >
      {locale.remove}
    </Button>,
    <Button
      onClick={cloneSelectedRules}
      key={1}
    >
      {locale.clone}
    </Button>,
    <Button
      onClick={editSelectedRules}
      key={2}
    >
      {locale.edit}
    </Button>
  ];

  return (
    <div className='gs-rules'>
      <div className='gs-rules-header'>
        <h2>{locale.rulesTitle}</h2>
        <Switch
          onChange={toggleMultiEdit}
          checked={multiEditActive}
          checkedChildren={locale.multiEdit}
          unCheckedChildren={locale.multiEdit}
        />
      </div>
      <Divider />
      <div className='gs-rules-list'>
        {
          multiEditActive ? (
            <Selectable
              onSelectionChange={onSelectionChange}
            >
              { rulesCards }
            </Selectable>
          ) : (
            <Removable
              onRemoveClick={removeRule}
            >
              { rulesCards }
            </Removable>
          )
        }
      </div>
      <Divider />
      <div className='gs-rules-actions'>
        {
          multiEditActive ? multiEditActions : defaultActions
        }
      </div>
    </div>
  );
};

export default localize(Rules, 'Rules');
