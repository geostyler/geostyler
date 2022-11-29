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

import React, { ReactNode, useState } from 'react';

import {
  Rule as GsRule,
} from 'geostyler-style';

import { closestCenter, DndContext } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';

import { localize } from '../LocaleWrapper/LocaleWrapper';

import './Rules.less';
import { OlRendererProps } from '../Renderer/OlRenderer/OlRenderer';
import FilterUtil, { CountResult } from '../../Util/FilterUtil';
import {
  SLDRendererAdditonalProps } from '../Renderer/SLDRenderer/SLDRenderer';
import DataUtil from '../../Util/DataUtil';
import { Data } from 'geostyler-data';
import { ComparisonFilterProps } from '../Filter/ComparisonFilter/ComparisonFilter';
import { IconLibrary } from '../Symbolizer/IconSelector/IconSelector';
import { Button, Switch, Divider } from 'antd';

import _cloneDeep from 'lodash/cloneDeep';
import _uniqueId from 'lodash/uniqueId';
import Selectable from '../Selectable/Selectable';
import { RuleCard, RuleCardProps } from '../RuleCard/RuleCard';
import Removable from '../Removable/Removable';
import { GeoStylerLocale } from '../../locale/locale';
import en_US from '../../locale/en_US';
import { useDragDropSensors } from '../../hook/UseDragDropSensors';
import { SortableItem } from '../SortableItem/SortableItem';
import { RemovableItem } from '../RemovableItem/RemovableItem';

// default props
interface RulesDefaultProps {
  /** Locale object containing translated text snippets */
  locale: GeoStylerLocale['Rules'];
  /** Properties of the SLD renderer */
  sldRendererProps: SLDRendererAdditonalProps;
  /** Properties of the OpenLayers renderer */
  oLRendererProps: Partial<OlRendererProps>;
  /** Display the number of features that match a rule */
  showAmount: boolean;
  /** Display the number of features that match more than one rule */
  showDuplicates: boolean;
  /** Enable classification */
  enableClassification: boolean;
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
  /** The passthrough props for the RuleCard component. */
  ruleCardProps?: Partial<RuleCardProps>;
}

export const Rules: React.FC<RulesProps> = ({
  locale = en_US.Rules,
  ruleCardProps,
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
  enableClassification = true
}) => {
  const [multiEditActive, setMultiEditActive] = useState<boolean>(false);
  const [selectedRules, setSelectedRules] = useState<number[]>([]);
  const toggleMultiEdit = () => {
    setMultiEditActive(!multiEditActive);
    setSelectedRules([]);
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
  };

  const editSelectedRules = () => {
    if (onEditSelectionClick) {
      onEditSelectionClick(selectedRules);
    }
    setSelectedRules([]);
    setMultiEditActive(false);
  };

  const classificationClick = () => {
    if (onClassificationClick) {
      onClassificationClick();
    }
  };

  const onSelectionChange = (selectedIdxs: number[]) => {
    setSelectedRules([...selectedIdxs]);
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
        key={_uniqueId('rule')}
        rule={rule}
        data={data}
        duplicates={ruleDuplicates}
        onClick={() => {
          if (!multiEditActive) {
            editRule(idx);
          }
        }}
        {...ruleCardProps}
      />
    );
  });

  const removableRulesCards = rulesCards.map((ruleCard, idx) => {
    return (
      <RemovableItem
        key={_uniqueId('removableRule')}
        onRemoveClick={() => {
          removeRule(idx);
        }}
      >
        { ruleCard }
      </RemovableItem>
    );
  });

  const sortableAndRemovableRulesCards = removableRulesCards.map((ruleCard, idx) => {
    const key = _uniqueId('rule');
    // id must be truthy, so we have to increment the index by 1
    const id = idx + 1;

    return (
      <SortableItem
        key={key}
        id={id}
      >
        { ruleCard }
      </SortableItem>
    );
  });

  let defaultActions = [
    <Button
      className="gs-add-rule-button"
      onClick={addRule}
      key={0}
    >
      {locale.addRule}
    </Button>
  ];

  // TODO: Classification button should only be available if data is VectorData
  if (enableClassification) {
    defaultActions = [
      ...defaultActions,
      <Button
        className="gs-classification-button"
        onClick={classificationClick}
        key={1}
      >
        {locale.classification}
      </Button>
    ];
  }

  const multiEditActions: ReactNode[] = [
    <Button
      className="gs-remove-rules-button"
      onClick={removeSelectedRules}
      key={0}
    >
      {locale.remove}
    </Button>,
    <Button
      className="gs-clone-rules-button"
      onClick={cloneSelectedRules}
      key={1}
    >
      {locale.clone}
    </Button>,
    <Button
      className="gs-edit-rules-button"
      onClick={editSelectedRules}
      key={2}
    >
      {locale.edit}
    </Button>
  ];

  const onDragEnd = (evt: any) => {
    const { active, over } = evt;
    if (active.id !== over.id) {
      const newOrder = arrayMove([...rules], active.id - 1, over.id - 1);
      onRulesChange(newOrder);
    }
  };

  const sensors = useDragDropSensors();

  return (
    <div className='gs-rules'>
      <div className='gs-rules-header'>
        <h2>{locale.rulesTitle}</h2>
        <Switch
          className="gs-multi-select-toggle"
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
              selection={selectedRules}
              onSelectionChange={onSelectionChange}
            >
              { rulesCards }
            </Selectable>
          ) : (
            <DndContext
              onDragEnd={onDragEnd}
              sensors={sensors}
              collisionDetection={closestCenter}
            >
              <SortableContext
                items={rules.map((r, idx) => idx + 1)}
              >
                { sortableAndRemovableRulesCards }
              </SortableContext>
            </DndContext>
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
