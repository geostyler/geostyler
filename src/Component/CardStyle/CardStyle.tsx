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

import React, { useEffect, useState } from 'react';

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

// import {
//   Data
// } from 'geostyler-data';

import { localize } from '../LocaleWrapper/LocaleWrapper';
// import en_US from '../../locale/en_US';
// import SymbolizerUtil from '../../Util/SymbolizerUtil';
// import { SLDRendererAdditonalProps } from '../Symbolizer/SLDRenderer/SLDRenderer';
// import { IconLibrary } from '../Symbolizer/IconSelector/IconSelector';

import './CardStyle.less';
import Breadcrumb, { Crumb } from '../Breadcrumb/Breadcrumb';

// i18n
export interface CardStyleLocale {
  addRuleBtnText: string;
  cloneRulesBtnText: string;
  removeRulesBtnText: string;
  nameFieldLabel?: string;
  nameFieldPlaceholder?: string;
  colorLabel: string;
  radiusLabel: string;
  opacityLabel: string;
  symbolLabel: string;
  multiEditLabel: string;
  ruleGeneratorWindowBtnText: string;
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
  // data?: Data;
  // /** The callback function that is triggered when the state changes */
  // onStyleChange?: (style: GsStyle) => void;
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

// state
// interface StyleState {
//   style: GsStyle;
//   selectedRowKeys: number[];
//   colorModalVisible: boolean;
//   sizeModalVisible: boolean;
//   opacityModalVisible: boolean;
//   symbolModalVisible: boolean;
//   ruleGeneratorWindowVisible: boolean;
//   hasError: boolean;
// }

// const defaultStyle: GsStyle = {
//   name: 'My Style',
//   rules: []
// };

export const CardStyle: React.FC<CardStyleProps> = ({
  // locale = en_US.GsStyle,
  // enableClassification = true,
  // style = defaultStyle,
  // data,
  // onStyleChange,
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

  const defaultCrumb: Crumb = {title: 'Style', view: 'style'};
  const [currentView, setCurrentView] = useState<string>(defaultCrumb.view);
  const [crumbs, setCrumbs] = useState<Crumb[]>([defaultCrumb]);

  useEffect(() => {
    const styleCrumb: Crumb = {title: 'Style', view: 'style'};
    const ruleCrumb: Crumb = {title: 'Rule', view: 'rule'};

    switch (currentView) {
      case 'style':
        setCrumbs([styleCrumb]);
        break;
      case 'rule':
        setCrumbs([styleCrumb, ruleCrumb]);
        break;
      default:
        break;
    }
  }, [currentView]);

  const changeView = (view: string) => {
    setCurrentView(view);
  };

  return (
    <div>
      <Breadcrumb
        crumbs={crumbs}
        onClick={(crumbView: string) => {
          changeView(crumbView);
        }}
      />
      {
        currentView === 'style' && (
          <div>Style<button onClick={
            () => {
              changeView('rule');
            }
          }>click</button></div>
        )
      }
      {
        currentView === 'rule' && (
          <div>Rule<button onClick={
            () => {
              changeView('style');
            }
          }>click</button></div>
        )
      }
    </div>
  );
};

export default localize(CardStyle, 'CardStyle');
