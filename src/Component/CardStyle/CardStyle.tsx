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

// import { InterpolationMode } from 'chroma-js';

// import {
//   Button,
//   Menu,
//   Form,
// } from 'antd';

import {
  Style as GsStyle,
  // Rule as GsRule,
  // SymbolizerKind,
  // Symbolizer as GsSymbolizer,
  // WellKnownName as GsWellKnownName
} from 'geostyler-style';

import {
  Data
} from 'geostyler-data';

import { localize } from '../LocaleWrapper/LocaleWrapper';
import en_US from '../../locale/en_US';
// import SymbolizerUtil from '../../Util/SymbolizerUtil';
// import { SLDRendererAdditonalProps } from '../Symbolizer/SLDRenderer/SLDRenderer';
// import { IconLibrary } from '../Symbolizer/IconSelector/IconSelector';

import './CardStyle.less';
import Breadcrumb, { Crumb } from '../Breadcrumb/Breadcrumb';
import StyleOverview from '../StyleOverview/StyleOverview';

// i18n
export interface CardStyleLocale {
  styleTitle: string;
  classificationTitle: string;
  multiEditTitle: string;
  symbolizerTitle: string;
}

// default props
interface CardStyleDefaultProps {
  /** The geoStylerStyle object */
  style: GsStyle;
  /** Locale object containing translated text snippets */
  locale: CardStyleLocale;
  /** Enable classification */
  enableClassification: boolean;
}

// non default props
export interface CardStyleProps extends Partial<CardStyleDefaultProps> {
  /** Reference to internal data object (holding schema and example features) */
  data?: Data;
  /** The callback function that is triggered when the state changes */
  onStyleChange?: (style: GsStyle) => void;
  // /** The data projection of example features */
  // dataProjection?: string;
  // /** Properties of the filter components */
  // filterUiProps?: Partial<ComparisonFilterProps>;
  // /** Properties of the rule name field */
  // ruleNameProps?: Partial<NameFieldProps>;
  // /** Properties of the Rule component */
  // ruleProps?: Partial<RuleProps>;
  // /** Properties of the RuleTable component */
  // ruleTableProps?: Partial<RuleTableProps>;
  // /** The renderer to use */
  // ruleRendererType?: 'SLD' | 'OpenLayers';
  // /** Properties of the SLD renderer */
  // sldRendererProps?: SLDRendererAdditonalProps;
  // /** List of supported icons ordered as library */
  // iconLibraries?: IconLibrary[];
  // /** Display the number of features that match a rule */
  // showAmount?: boolean;
  // /** Display the number of features that match more than one rule */
  // showDuplicates?: boolean;
  // /** Object containing the predefined color ramps */
  // colorRamps?: {
  //   [name: string]: string[];
  // };
  // /** Use Brewer color ramps */
  // useBrewerColorRamps?: boolean;
  // /** List of supported color spaces */
  // colorSpaces?: (InterpolationMode)[];
}

export interface CardView {
  view: string;
  props: any[];
  path: Crumb[];
}

const STYLEVIEW = 'style';
const RULEVIEW = 'rule';
const CLASSIFICATIONVIEW = 'classification';
const MULTIEDITVIEW = 'multiedit';
const SYMBOLIZERVIEW = 'symbolizer';

export const CardStyle: React.FC<CardStyleProps> = ({
  locale = en_US.GsCardStyle,
  // enableClassification = true,
  style,
  data,
  onStyleChange,
  // dataProjection,
  // filterUiProps,
  // ruleNameProps,
  // ruleProps,
  // ruleRendererType,
  // sldRendererProps,
  // iconLibraries,
  // showAmount,
  // showDuplicates,
  // colorRamps,
  // useBrewerColorRamps,
  // colorSpaces
}) => {

  // TODO add type that contains crumb and view args. minor REFACTORING.
  // const defaultCrumb: Crumb = {title: 'Style', view: 'style'};
  const defaultCrumb: Crumb = {view: STYLEVIEW, title: locale.styleTitle, indices: []};
  const defaultView: CardView = {
    view: STYLEVIEW,
    props: [],
    path: [defaultCrumb]
  };
  const [currentView, setCurrentView] = useState<CardView>(defaultView);
  // const [crumbs, setCrumbs] = useState<Crumb[]>([defaultCrumb]);

  // useEffect(() => {
  //   // TODO add i18n
  //   // TODO add variables where needed (e.g. ruleName)
  //   const styleView: CardView = {view: STYLEVIEW, props: [], path: [locale.styleTitle]};
  //   const ruleCrumb: Crumb = {title: 'Rule', view: RULEVIEW};
  //   const ruleView: CardView = {view: RULEVIEW, props: };
  //   const classificationCrumb: Crumb = {title: 'Classification', view: CLASSIFICATIONVIEW};
  //   const multiEditCrumb: Crumb = {title: 'MultiEdit', view: MULTIEDITVIEW};

  //   switch (currentView) {
  //     case STYLEVIEW:
  //       setCrumbs([styleView]);
  //       break;
  //     case RULEVIEW:
  //       setCrumbs([styleView, ruleCrumb]);
  //       break;
  //     case CLASSIFICATIONVIEW:
  //       setCrumbs([styleView, classificationCrumb]);
  //       break;
  //     case MULTIEDITVIEW:
  //       setCrumbs([styleView, multiEditCrumb]);
  //       break;
  //     default:
  //       break;
  //   }
  // }, [currentView]);

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
          {view: MULTIEDITVIEW, title: locale.multiEditTitle, indices: []}
        ];
      case SYMBOLIZERVIEW:
        return [
          {view: STYLEVIEW, title: locale.styleTitle, indices: []},
          {view: RULEVIEW, title: locale.symbolizerTitle, indices: [...indices]}
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

  return (
    <div>
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
          />
        )
      }
      {
        currentView.view === RULEVIEW && (
          <div>
            {
              JSON.stringify(style.rules[currentView.path[currentView.path.length - 1].indices[0]])
            }
            <button onClick={
            () => {
              // changeView(SYMBOLIZERVIEW, [0]);
            }
          }>click</button></div>
        )
      }
    </div>
  );
};

export default localize(CardStyle, 'CardStyle');
