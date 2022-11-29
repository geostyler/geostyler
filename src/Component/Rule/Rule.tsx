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

import * as React from 'react';

import {
  Button
} from 'antd';

import { CloseCircleOutlined } from '@ant-design/icons';

import {
  ComparisonFilter as GsComparisonFilter,
  Rule as GsRule,
  Symbolizer as GsSymbolizer,
  Filter as GsFilter,
  ScaleDenominator as GsScaleDenominator
} from 'geostyler-style';
import { Data as GsData } from 'geostyler-data';

import { localize } from '../LocaleWrapper/LocaleWrapper';

import RuleNameField, { NameFieldProps } from '../NameField/NameField';
import { ComparisonFilterProps } from '../Filter/ComparisonFilter/ComparisonFilter';
import ScaleDenominator from '../ScaleDenominator/ScaleDenominator';
import Fieldset from '../FieldSet/FieldSet';
import FilterTree from '../Filter/FilterTree/FilterTree';
import OlRenderer, { OlRendererProps } from '../Renderer/OlRenderer/OlRenderer';
import SymbolizerEditorWindow from '../Symbolizer/SymbolizerEditorWindow/SymbolizerEditorWindow';
import { IconLibrary } from '../Symbolizer/IconSelector/IconSelector';

import _cloneDeep from 'lodash/cloneDeep';
import _isEqual from 'lodash/isEqual';

import './Rule.less';
import SLDRenderer, { SLDRendererAdditonalProps } from '../Renderer/SLDRenderer/SLDRenderer';
import { GeoStylerLocale } from '../../locale/locale';
import en_US from '../../locale/en_US';


// default props
interface RuleDefaultProps {
  /** Optional Rule object holding initial values for the component */
  rule: GsRule;
  /** The data projection of example features */
  dataProjection: string;
  /** The renderer to use */
  rendererType: 'SLD' | 'OpenLayers';
  /** Properties of the SLD renderer */
  sldRendererProps?: SLDRendererAdditonalProps;
  /** Properties of the OpenLayers renderer */
  oLRendererProps?: Partial<OlRendererProps>;
  /** Locale object containing translated text snippets */
  locale: GeoStylerLocale['Rule'];
}

// non default props
export interface RuleProps extends Partial<RuleDefaultProps> {
  /** Reference to internal data object (holding schema and example features) */
  internalDataDef?: GsData | null;
  /** Callback for a changed Rule */
  onRuleChange?: (rule: GsRule, ruleBefore?: GsRule) => void;
  /** Callback for onClick of the RemoveButton */
  onRemove?: (rule: GsRule) => void;
  /** Callback for onClick of the AddSymbolizerButton */
  onAddSymbolizer?: (rule: GsRule) => void;
  /** Callback for onClick of the RemoveSymbolizerButton */
  onRemoveSymbolizer?: (rule: GsRule, symbolizer: GsSymbolizer, key: number) => void;
  /** Callback for onClick of the Renderer */
  onRendererClick?: (symbolizers: GsSymbolizer[], rule: GsRule) => void;
  /** Properties that will be passed to the Comparison Filters */
  filterUiProps?: Partial<ComparisonFilterProps>;
  /** Properties that will be passed to the RuleNameField */
  ruleNameProps?: Partial<NameFieldProps>;
  /** Properties that will be passed to the IconSymbolizer */
  iconLibraries?: IconLibrary[];
  /** Properties that will be passed to the RasterSymbolizer */
  colorRamps?: {
    [name: string]: string[];
  };
}

// state
interface RuleState {
  editorVisible: boolean;
  rule: GsRule;
  symbolizerEditorVisible: boolean;
  storedFilter: GsFilter;
  storedScaleDenominator: GsScaleDenominator;
  scaleFieldChecked?: boolean;
  filterFieldChecked?: boolean;
}

/**
 * UI container representing a Rule
 * @deprecated This component is deprecated and will be removed with v10.
 */
export class Rule extends React.Component<RuleProps, RuleState> {

  static componentName: string = 'Rule';

  public static defaultProps: RuleDefaultProps = {
    locale: en_US.Rule,
    rule: {
      name: 'My Style',
      symbolizers: [{
        kind: 'Mark',
        wellKnownName: 'circle'
      }]
    },
    dataProjection: 'EPSG:4326',
    rendererType: 'OpenLayers'
  };

  constructor(props: RuleProps) {
    super(props);
    this.state = {
      editorVisible: false,
      rule: Rule.defaultProps.rule,
      symbolizerEditorVisible: false,
      storedFilter: ['==', '', ''],
      storedScaleDenominator: {}
    };
  }

  static getDerivedStateFromProps(
    nextProps: RuleProps): Partial<RuleState> {
    const rule = nextProps.rule || Rule.defaultProps.rule;

    return {
      rule,
      filterFieldChecked: rule.filter ?
        true : false,
      scaleFieldChecked: rule.scaleDenominator ?
        true : false,
      symbolizerEditorVisible: false
    };
  }

  public shouldComponentUpdate(nextProps: RuleProps, nextState: RuleState): boolean {
    const diffProps = !_isEqual(this.props, nextProps);
    const diffState = !_isEqual(this.state, nextState);
    return diffProps || diffState;
  }

  /**
   * Handles changing rule name
   */
  onNameChange = (name: string) => {
    const rule: GsRule = _cloneDeep(this.state.rule);
    rule.name = name;
    if (this.props.onRuleChange) {
      this.props.onRuleChange(rule, this.state.rule);
    }
    this.setState({rule});
  };

  /**
   * Handles changing rule name
   */
  onScaleDenominatorChange = (scaleDenominator: any) => {
    const rule: GsRule = _cloneDeep(this.state.rule);
    rule.scaleDenominator = scaleDenominator;
    if (this.props.onRuleChange) {
      this.props.onRuleChange(rule, this.state.rule);
    }
    this.setState({rule});
  };

  /**
   * Handles changing rule filter
   */
  onFilterChange = (filter: GsFilter) => {
    const rule: GsRule = _cloneDeep(this.state.rule);
    rule.filter = filter;
    if (this.props.onRuleChange) {
      this.props.onRuleChange(rule, this.state.rule);
    }
    this.setState({rule});
  };

  /**
   * Handles changing rule symbolizer
   */
  onSymbolizersChange = (symbolizers: GsSymbolizer[]) => {
    let rule: GsRule = _cloneDeep(this.state.rule);
    rule.symbolizers = symbolizers;
    if (this.props.onRuleChange) {
      this.props.onRuleChange(rule, this.state.rule);
    }
    this.setState({rule});
  };

  onScaleCheckChange = (e: any) => {
    const checked = e.target.checked;
    const rule: GsRule = _cloneDeep(this.state.rule);

    if (checked) {
      rule.scaleDenominator = this.state.storedScaleDenominator;
    } else {
      this.setState({
        storedScaleDenominator: rule.scaleDenominator
      });
      rule.scaleDenominator = undefined;
    }

    if (this.props.onRuleChange) {
      this.props.onRuleChange(rule, this.state.rule);
    }

    this.setState({rule, scaleFieldChecked: checked});
  };

  onFilterCheckChange = (e: any) => {
    const checked = e.target.checked;
    const rule: GsRule = _cloneDeep(this.state.rule);

    if (checked) {
      rule.filter = this.state.storedFilter;
    } else {
      this.setState({
        storedFilter: rule.filter
      });
      rule.filter = undefined;
    }

    if (this.props.onRuleChange) {
      this.props.onRuleChange(rule, this.state.rule);
    }
    this.setState({rule, filterFieldChecked: checked});
  };

  onRendererClick = () => {
    const {
      editorVisible
    } = this.state;

    this.setState({
      editorVisible: !editorVisible
    });
  };

  onEditorWindowClose = () => {
    this.setState({
      editorVisible: false
    });
  };

  onRemoveButtonClick = () => {
    const { onRemove } = this.props;
    const { rule } = this.state;

    if (onRemove && rule) {
      onRemove(rule);
    }
  };

  render() {
    const {
      internalDataDef,
      rendererType,
      oLRendererProps,
      sldRendererProps,
      locale,
      iconLibraries,
      colorRamps
    } = this.props;

    const {
      editorVisible,
      rule,
      scaleFieldChecked,
      filterFieldChecked
    } = this.state;

    let featureRenderer;
    if (rendererType === 'SLD') {
      featureRenderer = <SLDRenderer
        symbolizers={rule.symbolizers}
        onClick={this.onRendererClick}
        {...sldRendererProps}
      />;
    } else {
      featureRenderer = <OlRenderer
        symbolizers={rule.symbolizers}
        onClick={this.onRendererClick}
        {...oLRendererProps}
      />;
    }

    // cast the current filter object to pass over to ComparisonFilterUi
    const cmpFilter = rule.filter as GsComparisonFilter;

    // cast to GeoStyler compliant data model
    const gsData = internalDataDef as GsData;

    return (
      <div className="gs-rule" >
        <div className="gs-rule-fields" >
          <div className="gs-rule-left-fields" >
            {locale.nameFieldLabel}
            <RuleNameField
              value={rule.name}
              onChange={this.onNameChange}
              placeholder={locale.nameFieldPlaceholder}
              {...this.props.ruleNameProps}
            />
            {featureRenderer}
            {
              !editorVisible ? null :
                <SymbolizerEditorWindow
                  onClose={this.onEditorWindowClose}
                  symbolizers={rule.symbolizers}
                  onSymbolizersChange={this.onSymbolizersChange}
                  iconLibraries={iconLibraries}
                  colorRamps={colorRamps}
                />
            }
          </div>
          <div className="gs-rule-right-fields" >
            <Fieldset
              title={locale.scaleFieldTitle}
              onCheckChange={this.onScaleCheckChange}
              checked={scaleFieldChecked}
            >
              <ScaleDenominator
                scaleDenominator={rule.scaleDenominator}
                onChange={this.onScaleDenominatorChange}
              />
            </Fieldset>
            <Fieldset
              title={locale.filterFieldTitle}
              onCheckChange={this.onFilterCheckChange}
              checked={filterFieldChecked}
            >
              <FilterTree
                internalDataDef={gsData}
                filter={cmpFilter}
                onFilterChange={this.onFilterChange}
              />
            </Fieldset>
          </div>
        </div>
        <Button
          className="gs-rule-remove-button"
          danger={true}
          icon={<CloseCircleOutlined />}
          size="large"
          onClick={this.onRemoveButtonClick}
        >
          {locale.removeRuleBtnText}
        </Button>
      </div>
    );
  }
}

export default localize(Rule, Rule.componentName);
