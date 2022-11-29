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

import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';
import _cloneDeep from 'lodash/cloneDeep';
import _merge from 'lodash/merge';

import {
  Style as GsStyle,
  Rule as GsRule,
  Symbolizer as GsSymbolizer,
  Filter as GsFilter,
  isIconSymbolizer
} from 'geostyler-style';

import {
  Data, VectorData
} from 'geostyler-data';

import { localize } from '../LocaleWrapper/LocaleWrapper';
import en_US from '../../locale/en_US';

import './CardStyle.less';
import Breadcrumb, { Crumb } from '../Breadcrumb/Breadcrumb';
import StyleOverview, { StyleOverviewProps } from '../StyleOverview/StyleOverview';
import RuleOverview, { RuleOverviewProps } from '../RuleOverview/RuleOverview';
import CardViewUtil from '../../Util/CardViewUtil';
import Editor, { EditorProps } from '../Symbolizer/Editor/Editor';
import FilterTree from '../Filter/FilterTree/FilterTree';
import RuleGenerator from '../RuleGenerator/RuleGenerator';
import BulkEditor from '../BulkEditor/BulkEditor';
import IconSelector, { IconLibrary } from '../Symbolizer/IconSelector/IconSelector';
import { ComparisonFilterProps } from '../Filter/ComparisonFilter/ComparisonFilter';
import { GeoStylerLocale } from '../../locale/locale';
import Renderer from '../Renderer/Renderer/Renderer';
import { brewer, InterpolationMode } from 'chroma-js';

// default props
interface CardStyleDefaultProps {
  /** The geoStylerStyle object */
  style: GsStyle;
  /** Locale object containing translated text snippets */
  locale: GeoStylerLocale['CardStyle'];
}

// non default props
export interface CardStyleProps extends Partial<CardStyleDefaultProps> {
  /** Reference to internal data object (holding schema and example features) */
  data?: Data;
  /** The callback function that is triggered when the state changes */
  onStyleChange?: (style: GsStyle) => void;
  /** Properties of the filter components */
  filterUiProps?: Partial<ComparisonFilterProps>;
  /** The renderer to use for previews. */
  rendererType?: 'SLD' | 'OpenLayers';
  /** The passthrough props for the StyleOverview component. */
  styleOverviewProps?: Partial<StyleOverviewProps>;
  /** The passthrough props for the RuleOverview component. */
  ruleOverviewProps?: Partial<RuleOverviewProps>;
  /** The passthrough props for the Editor component. */
  editorProps?: Partial<EditorProps>;
  // /** List of supported icons ordered as library */
  iconLibraries?: IconLibrary[];
  /** Enable classification */
  enableClassification?: boolean;
  /** Object containing the predefined color ramps */
  colorRamps?: {
    [name: string]: string[];
  };
  /** Use Brewer color ramps */
  useBrewerColorRamps?: boolean;
  /** List of supported color spaces */
  colorSpaces?: (InterpolationMode)[];
}

export interface CardView {
  view: string;
  props: any[];
  path: Crumb[];
}

const STYLEVIEW = CardViewUtil.STYLEVIEW;
const RULEVIEW = CardViewUtil.RULEVIEW;
const CLASSIFICATIONVIEW = CardViewUtil.CLASSIFICATIONVIEW;
const MULTIEDITVIEW = CardViewUtil.MULTIEDITVIEW;
const SYMBOLIZERVIEW = CardViewUtil.SYMBOLIZERVIEW;
const FILTEREDITVIEW = CardViewUtil.FILTEREDITVIEW;
const ICONLIBRARIESVIEW = CardViewUtil.ICONLIBRARIESVIEW;

export const CardStyle: React.FC<CardStyleProps> = ({
  locale = en_US.CardStyle,
  // enableClassification = true,
  style = { name: 'My Style', rules: [] },
  data,
  onStyleChange,
  filterUiProps,
  rendererType,
  iconLibraries,
  enableClassification,
  styleOverviewProps,
  ruleOverviewProps,
  editorProps,
  colorRamps,
  useBrewerColorRamps,
  colorSpaces
}) => {

  const defaultCrumb: Crumb = {view: STYLEVIEW, title: locale.styleTitle, indices: []};
  const defaultView: CardView = {
    view: STYLEVIEW,
    props: [],
    path: [defaultCrumb]
  };
  const [currentView, setCurrentView] = useState<CardView>(defaultView);

  const getPathForView = (viewName: string, indices: number[]): Crumb[] => {
    switch (viewName) {
      case STYLEVIEW:
        return [{view: STYLEVIEW, title: locale.styleTitle, indices: []}];
      case RULEVIEW:
        return [
          {view: STYLEVIEW, title: locale.styleTitle, indices: []},
          {view: RULEVIEW, title: style.rules[indices[0]]?.name, indices: [...indices]}
        ];
      case CLASSIFICATIONVIEW:
        return [
          {view: STYLEVIEW, title: locale.styleTitle, indices: []},
          {view: CLASSIFICATIONVIEW, title: locale.classificationTitle, indices: []}
        ];
      case MULTIEDITVIEW:
        return [
          {view: STYLEVIEW, title: locale.styleTitle, indices: []},
          {view: MULTIEDITVIEW, title: locale.multiEditTitle, indices: [...indices]}
        ];
      case SYMBOLIZERVIEW:
        return [
          {view: STYLEVIEW, title: locale.styleTitle, indices: []},
          {view: RULEVIEW, title: style.rules[indices[0]]?.name, indices: [indices[0]]},
          {view: SYMBOLIZERVIEW, title: locale.symbolizerTitle, indices: [...indices]}
        ];
      case FILTEREDITVIEW:
        return [
          {view: STYLEVIEW, title: locale.styleTitle, indices: []},
          {view: RULEVIEW, title: style.rules[indices[0]]?.name, indices: [indices[0]]},
          {view: FILTEREDITVIEW, title: locale.filterTitle, indices: [...indices]},
        ];
      case ICONLIBRARIESVIEW:
        return [
          {view: STYLEVIEW, title: locale.styleTitle, indices: []},
          {view: RULEVIEW, title: style.rules[indices[0]]?.name, indices: [indices[0]]},
          {view: SYMBOLIZERVIEW, title: locale.symbolizerTitle, indices: [...indices]},
          {view: SYMBOLIZERVIEW, title: locale.iconLibrariesTitle, indices: [...indices]}
        ];
      default:
        return [];
    }

  };

  const changeView = (viewName: string, indices: number[]) => {
    let view: CardView = {view: viewName, props: indices, path: []};
    view.path = getPathForView(viewName, indices);
    setCurrentView(view);
  };

  /**
   * Update the title for all path elements with view RULEVIEW.
   *
   * @param ruleName The new name of the rule that should be used as title.
   * @param path The path list to search for RULEVIEWs.
   * @returns The path list with updated titles.
   */
  const updateRuleNameForPath = (ruleName: string, path: Crumb[]): Crumb[] => {
    return path.map(pathItem => {
      if (pathItem.view === RULEVIEW) {
        pathItem.title = ruleName;
      }
      return pathItem;
    });
  };

  const onRuleChange = (newRule: GsRule) => {
    let styleClone = _cloneDeep(style);
    const ruleIdx = currentView.path[currentView.path.length - 1].indices[0];
    styleClone.rules[ruleIdx] = newRule;
    const pathClone = _cloneDeep(currentView.path);
    const newCurrentViewPath = updateRuleNameForPath(newRule.name, pathClone);
    setCurrentView({...currentView, path: newCurrentViewPath});
    if (onStyleChange) {
      onStyleChange(styleClone);
    }
  };

  const onRulesChange = (rules: GsRule[]) => {
    let styleClone = _cloneDeep(style);
    styleClone.rules = rules;
    if (onStyleChange) {
      onStyleChange(styleClone);
      changeView(STYLEVIEW, currentView.path[0].indices);
    }
  };

  const onSymbolizerChange = (symbolizer: GsSymbolizer) => {
    let styleClone = _cloneDeep(style);
    const ruleIdx = currentView.path[currentView.path.length - 1].indices[0];
    const symbolizerIdx = currentView.path[currentView.path.length - 1].indices[1];
    styleClone.rules[ruleIdx].symbolizers[symbolizerIdx] = symbolizer;
    if (onStyleChange) {
      onStyleChange(styleClone);
    }
  };

  const onFilterChange = (filter: GsFilter) => {
    let styleClone = _cloneDeep(style);
    const ruleIdx = currentView.path[currentView.path.length - 1].indices[0];
    styleClone.rules[ruleIdx].filter = filter;
    if (onStyleChange) {
      onStyleChange(styleClone);
    }
  };

  const onBulkEditorChange = (prop: string, val: any) => {
    const styleClone = _cloneDeep(style);
    const selectedRuleIds = currentView.path[currentView.path.length - 1].indices;
    styleClone.rules
      .filter((rule: GsRule, idx: number) => {
        return selectedRuleIds.includes(idx);
      })
      .forEach((rule: GsRule) => {
        rule.symbolizers.forEach((sym: any) => {
          sym[prop] = val;
          if (prop === 'image' && sym.wellKnownName) {
            delete sym.wellKnownName;
            sym.kind = 'Icon';
          }
          if (prop === 'wellKnownName' && sym.image) {
            delete sym.image;
          }
        });
      });

    if (onStyleChange) {
      onStyleChange(styleClone);
    }
  };

  const onIconSelect = (iconSrc: string) => {
    const styleClone = _cloneDeep(style);
    const ruleIdx = currentView.path[currentView.path.length - 1].indices[0];
    const symbolizerIdx = currentView.path[currentView.path.length - 1].indices[1];
    const symbolizer = styleClone.rules[ruleIdx].symbolizers[symbolizerIdx];
    if (isIconSymbolizer(symbolizer)) {
      symbolizer.image = iconSrc;
    }

    if (onStyleChange) {
      onStyleChange(styleClone);
    }
  };

  /**
   * Get the image url for the currently selected symbolizer.
   */
  const getSelectedIconSrc = (): string => {
    const symbolizer = style
      .rules[currentView.path[currentView.path.length - 1].indices[0]]
      .symbolizers[currentView.path[currentView.path.length - 1].indices[1]];

    if (isIconSymbolizer(symbolizer)) {
      if (typeof symbolizer.image === 'string') {
        return symbolizer.image;
      }
    }
    return '';
  };

  const onRuleChangeView = (viewName: string, indices: number[]) => {
    const newIndices = [currentView.path[currentView.path.length - 1].indices[0], ...indices];
    changeView(viewName, newIndices);
  };

  const onIconEditorChangeView = () => {
    const newIndices = [...currentView.path[currentView.path.length - 1].indices];
    changeView(ICONLIBRARIESVIEW, newIndices);
  };

  const styleOverviewPropsOverwrites = {
    rulesProps: {
      ruleCardProps: {
        rendererProps: {
          rendererType: rendererType
        }
      }
    }
  };
  const mergedStyleOverviewProps = {...styleOverviewProps, ...styleOverviewPropsOverwrites};

  let ramps = colorRamps;
  if (colorRamps && useBrewerColorRamps) {
    ramps = Object.assign(colorRamps, brewer);
  }

  return (
    <div
      className='gs-card-style'
    >
      <Breadcrumb
        crumbs={currentView.path}
        onClick={changeView}
      />
      {
        currentView.view === STYLEVIEW && (
          <StyleOverview
            style={style}
            data={data}
            onStyleChange={onStyleChange}
            onChangeView={changeView}
            enableClassification={enableClassification}
            {...mergedStyleOverviewProps}
          />
        )
      }
      {
        currentView.view === RULEVIEW && (
          <RuleOverview
            rule={style.rules[currentView.path[currentView.path.length - 1].indices[0]]}
            data={data}
            onRuleChange={onRuleChange}
            onChangeView={onRuleChangeView}
            {...ruleOverviewProps}
          />
        )
      }
      {
        currentView.view === SYMBOLIZERVIEW && (
          <>
            <Renderer
              symbolizers={[
                style
                  .rules[currentView.path[currentView.path.length - 1].indices[0]]
                  .symbolizers[currentView.path[currentView.path.length - 1].indices[1]]
              ]}
              data={data}
              rendererType={rendererType}
              // TODO add sldRendererProps
            />
            <Editor
              symbolizer={
                style
                  .rules[currentView.path[currentView.path.length - 1].indices[0]]
                  .symbolizers[currentView.path[currentView.path.length - 1].indices[1]]
              }
              onSymbolizerChange={onSymbolizerChange}
              iconEditorProps={{
                imageFieldProps: {
                  windowless: true,
                  onIconLibrariesClick: onIconEditorChangeView
                }
              }}
              internalDataDef={data}
              iconLibraries={iconLibraries}
              {...editorProps}
            />
          </>
        )
      }
      {
        currentView.view === FILTEREDITVIEW && (
          <FilterTree
            filter={
              style
                .rules[currentView.path[currentView.path.length - 1].indices[0]]
                .filter
            }
            onFilterChange={onFilterChange}
            internalDataDef={data}
            filterUiProps={filterUiProps}
          />
        )
      }
      {
        currentView.view === CLASSIFICATIONVIEW && (
          <RuleGenerator
            internalDataDef={data as VectorData}
            onRulesChange={onRulesChange}
            colorRamps={ramps}
            colorSpaces={colorSpaces}
          />
        )
      }
      {
        currentView.view === MULTIEDITVIEW && (
          <BulkEditor
            onStylePropChange={onBulkEditorChange}
          />
        )
      }
      {
        currentView.view === ICONLIBRARIESVIEW && (
          <IconSelector
            iconLibraries={iconLibraries}
            onIconSelect={onIconSelect}
            selectedIconSrc={getSelectedIconSrc()}
          />
        )
      }
    </div>
  );
};

export default localize(CardStyle, 'CardStyle');
