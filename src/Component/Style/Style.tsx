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

import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';
import _cloneDeep from 'lodash/cloneDeep';

import { InterpolationMode } from 'chroma-js';

import {
  Button,
  Menu,
  Form
} from 'antd';

import {
  Style as GsStyle,
  Rule as GsRule,
  SymbolizerKind,
  Symbolizer as GsSymbolizer,
  WellKnownName as GsWellKnownName
} from 'geostyler-style';

import {
  Data
} from 'geostyler-data';

import Rule, { RuleProps } from '../Rule/Rule';
import NameField, { NameFieldProps } from '../NameField/NameField';
import BulkEditModals from '../Symbolizer/BulkEditModals/BulkEditModals';
import { ComparisonFilterProps } from '../Filter/ComparisonFilter/ComparisonFilter';

import { localize } from '../LocaleWrapper/LocaleWrapper';
import en_US from '../../locale/en_US';
import SymbolizerUtil from '../../Util/SymbolizerUtil';
import RuleTable, { RuleTableProps } from '../RuleTable/RuleTable';
import RuleGeneratorWindow from '../RuleGenerator/RuleGeneratorWindow';
import { SLDRendererAdditonalProps } from '../Symbolizer/SLDRenderer/SLDRenderer';
import { IconLibrary } from '../Symbolizer/IconSelector/IconSelector';

import './Style.less';
import { CopyOutlined, MenuUnfoldOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';

// i18n
export interface StyleLocale {
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
interface StyleDefaultProps {
  /** The geoStylerStyle object */
  style: GsStyle;
  /** Locale object containing translated text snippets */
  locale: StyleLocale;
  /** Use compact layout */
  compact: boolean;
  /** Enable classification */
  enableClassification: boolean;
}

// non default props
export interface StyleProps extends Partial<StyleDefaultProps> {
  /** Reference to internal data object (holding schema and example features) */
  data?: Data;
  /** The callback function that is triggered when the state changes */
  onStyleChange?: (style: GsStyle) => void;
  /** The data projection of example features */
  dataProjection?: string;
  /** Properties of the filter components */
  filterUiProps?: Partial<ComparisonFilterProps>;
  /** Properties of the rule name field */
  ruleNameProps?: Partial<NameFieldProps>;
  /** Properties of the Rule component */
  ruleProps?: Partial<RuleProps>;
  /** Properties of the RuleTable component */
  ruleTableProps?: Partial<RuleTableProps>;
  /** The renderer to use */
  ruleRendererType?: 'SLD' | 'OpenLayers';
  /** Properties of the SLD renderer */
  sldRendererProps?: SLDRendererAdditonalProps;
  /** List of supported icons ordered as library */
  iconLibraries?: IconLibrary[];
  /** Display the number of features that match a rule */
  showAmountColumn?: boolean;
  /** Display the number of features that match more than one rule */
  showDuplicatesColumn?: boolean;
  /** Object containing the predefined color ramps */
  colorRamps?: {
    [name: string]: string[];
  };
  /** Use Brewer color ramps */
  useBrewerColorRamps?: boolean;
  /** List of supported color spaces */
  colorSpaces?: (InterpolationMode)[];
}

// state
interface StyleState {
  style: GsStyle;
  selectedRowKeys: number[];
  colorModalVisible: boolean;
  sizeModalVisible: boolean;
  opacityModalVisible: boolean;
  symbolModalVisible: boolean;
  ruleGeneratorWindowVisible: boolean;
  hasError: boolean;
}

export class Style extends React.Component<StyleProps, StyleState> {

  static componentName: string = 'Style';

  public static defaultProps: StyleDefaultProps = {
    compact: false,
    locale: en_US.GsStyle,
    style: {
      name: 'My Style',
      rules: []
    },
    enableClassification: true
  };

  constructor(props: StyleProps) {
    super(props);
    this.state = {
      style: props.style || Style.defaultProps.style,
      selectedRowKeys: [],
      colorModalVisible: false,
      sizeModalVisible: false,
      opacityModalVisible: false,
      symbolModalVisible: false,
      ruleGeneratorWindowVisible: false,
      hasError: false
    };
  }

  public shouldComponentUpdate(nextProps: StyleProps, nextState: StyleState): boolean {
    const diffProps = !_isEqual(this.props, nextProps);
    const diffState = !_isEqual(this.state, nextState);
    return diffProps || diffState;
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.style && !_isEqual(this.props.style, prevProps.style)) {
      this.setState({
        style: this.props.style
      });
    }
  }

  componentDidCatch() {
    this.setState({
      hasError: true
    });
  }

  onNameChange = (name: string) => {
    const style = _cloneDeep(this.state.style);
    style.name = name;
    if (this.props.onStyleChange) {
      this.props.onStyleChange(style);
    }
    this.setState({style});
  };

  onRuleChange = (rule: GsRule, ruleBefore: GsRule) => {
    const style = _cloneDeep(this.state.style);
    const ruleIdxToReplace = style.rules.findIndex((r: any) => {
      return _isEqual(r, ruleBefore);
    });
    if (ruleIdxToReplace > -1) {
      style.rules[ruleIdxToReplace] = rule;
      if (this.props.onStyleChange) {
        this.props.onStyleChange(style);
      }
      this.setState({style});
    }
  };

  onRulesChange = (rules: GsRule[]) => {
    const style = _cloneDeep(this.state.style);
    style.rules = rules;
    if (this.props.onStyleChange) {
      this.props.onStyleChange(style);
    }
    this.setState({style});
  };

  addRule = () => {
    const style = _cloneDeep(this.state.style);
    // TODO We need to ensure that rule names are unique
    const randomId = Math.floor(Math.random() * 10000);
    const symbolizerKind: SymbolizerKind = _get(style, 'rules[0].symbolizers[0].kind');
    const newRule: GsRule = {
      name: 'rule_' + randomId,
      symbolizers: [SymbolizerUtil.generateSymbolizer(symbolizerKind)]
    };
    style.rules = [...style.rules, newRule];
    if (this.props.onStyleChange) {
      this.props.onStyleChange(style);
    }
    this.setState({style});
  };

  cloneRules = () => {
    const {
      selectedRowKeys,
      style
    } = this.state;
    const styleClone = _cloneDeep(style);

    // create rules to clone
    let newRules: GsRule[] = [];
    styleClone.rules.forEach((rule: GsRule, index: number) => {
      if (selectedRowKeys.includes(index)) {
        let ruleClone = _cloneDeep(rule);
        // TODO We need to ensure that rule names are unique
        const randomId = Math.floor(Math.random() * 10000);
        ruleClone.name = 'rule_' + randomId;
        newRules.push(ruleClone);
      }
    });

    // apply cloned rules to existing ones
    styleClone.rules = [...styleClone.rules, ...newRules];
    if (this.props.onStyleChange) {
      this.props.onStyleChange(styleClone);
    }
    this.setState({
      style: styleClone
    });
  };

  removeRules = () => {
    const {
      selectedRowKeys,
      style
    } = this.state;
    const styleClone = _cloneDeep(style);
    const newRules = styleClone.rules.filter((rule: GsRule, index: number) => {
      return !selectedRowKeys.includes(index);
    });
    styleClone.rules = newRules;
    if (this.props.onStyleChange) {
      this.props.onStyleChange(styleClone);
    }
    this.setState({
      selectedRowKeys: [],
      style: styleClone
    });
  };

  removeRule = (rule: GsRule) => {
    const style = _cloneDeep(this.state.style);
    const newRules = style.rules.filter((r: GsRule) => r.name !== rule.name);
    style.rules = newRules;
    if (this.props.onStyleChange) {
      this.props.onStyleChange(style);
    }
    this.setState({style});
  };

  onRulesSelectionChange = (selectedRowKeys: number[]) => {
    this.setState({
      selectedRowKeys
    });
  };

  onTableMenuClick = (param: any) => {
    switch (param.key) {
      case 'addRule':
        this.addRule();
        break;
      case 'cloneRules':
        this.cloneRules();
        break;
      case 'removeRule':
        this.removeRules();
        break;
      case 'color':
        this.setState({colorModalVisible: true});
        break;
      case 'size':
        this.setState({sizeModalVisible: true});
        break;
      case 'opacity':
        this.setState({opacityModalVisible: true});
        break;
      case 'symbol':
        this.setState({symbolModalVisible: true});
        break;
      default:
    }
  };

  updateAllSelected = (updates: {value: any; property: string }[]) => {
    const style = _cloneDeep(this.state.style);
    const selectedRules = style.rules.filter((rule: GsRule, index: number) => {
      return this.state.selectedRowKeys.includes(index);
    });
    selectedRules.forEach((rule: GsRule) => {
      rule.symbolizers.forEach((sym: any) => {
        updates.forEach((upd: any) => {
          const property = upd.property;
          const value = upd.value;
          sym[property] = value;
          if (property === 'kind' && value === 'Icon' && sym.wellKnownName) {
            delete sym.wellKnownName;
          }
          if (property === 'kind' && value === 'Mark' && sym.image) {
            delete sym.image;
          }
        });
      });
    });
    if (this.props.onStyleChange) {
      this.props.onStyleChange(style);
    }
    this.setState({style});
  };

  updateMultiColors = (color: string) => {
    this.updateAllSelected([{value: color, property: 'color'}]);
  };

  updateMultiSizes = (size: any) => {
    this.updateAllSelected([{value: size, property: 'radius'}]);
  };

  updateMultiOpacities = (opacity: any) => {
    this.updateAllSelected([{value: opacity, property: 'opacity'}]);
  };

  updateMultiSymbols = (symbol: (GsWellKnownName|string), kind: SymbolizerKind) => {
    if (kind === 'Mark') {
      this.updateAllSelected([
        {value: symbol, property: 'wellKnownName'},
        {value: kind, property: 'kind'}
      ]);
    } else {
      this.updateAllSelected([
        {value: symbol, property: 'image'},
        {value: kind, property: 'kind'}
      ]);
    }
  };

  showRuleGeneratorWindow = () => {
    this.setState({ruleGeneratorWindowVisible: true});
  };

  onRuleGeneratorWindowClose = () => {
    this.setState({ruleGeneratorWindowVisible: false});
  };

  /**
   * Checks if a specific menu item of multi-edit menu should be disabled.
   *
   * @param name Name of menu item
   * @param rowKeys array of selected rowkeys
   * @return boolean true if menu item should be disabled, otherwise false
   */
  disableMenu = (name: string, rowKeys: number[]): boolean => {
    const {
      style
    } = this.state;
    let isValid = true;
    switch (name) {
      case 'size':
        rowKeys.forEach((key: number) => {
          let symbolizers = style.rules[key].symbolizers;
          symbolizers.forEach((symbolizer: GsSymbolizer) => {
            let kind = symbolizer.kind;
            if (kind === 'Fill' || kind === 'Text' || kind === 'Line') {
              isValid = false;
            }
          });
        });
        return !isValid;
      case 'symbol':
        rowKeys.forEach((key: number) => {
          let symbolizers = style.rules[key].symbolizers;
          symbolizers.forEach((symbolizer: GsSymbolizer) => {
            let kind = symbolizer.kind;
            if (kind !== 'Mark' && kind !== 'Icon') {
              isValid = false;
            }
          });
        });
        return !isValid;
      case 'color':
        rowKeys.forEach((key: number) => {
          let symbolizers = style.rules[key].symbolizers;
          symbolizers.forEach((symbolizer: GsSymbolizer) => {
            let kind = symbolizer.kind;
            if (kind === 'Icon') {
              isValid = false;
            }
          });
        });
        return !isValid;
      default:
        return !isValid;
    }
  };
  createFooter = () => {
    const {
      locale
    } = this.props;

    const {
      style,
      selectedRowKeys
    } = this.state;

    const allowRemove = selectedRowKeys.length > 0 && selectedRowKeys.length < style.rules.length;
    const allowClone = selectedRowKeys.length > 0;

    return (
      <Menu
        mode="horizontal"
        onClick={this.onTableMenuClick}
        selectable={false}
      >
        <Menu.Item key="addRule">
          <PlusOutlined />
          {locale.addRuleBtnText}
        </Menu.Item>
        <Menu.Item key="cloneRules"
          disabled={!allowClone}
        >
          <CopyOutlined />
          {locale.cloneRulesBtnText}
        </Menu.Item>
        <Menu.Item key="removeRule"
          disabled={!allowRemove}
        >
          <MinusOutlined />
          {locale.removeRulesBtnText}
        </Menu.Item>
        <Menu.SubMenu
          title={<span><MenuUnfoldOutlined /><span>{locale.multiEditLabel}</span></span>}
          disabled={selectedRowKeys.length <= 1}
        >
          <Menu.Item
            key="color"
            disabled={this.disableMenu('color', selectedRowKeys)}
          >{locale.colorLabel}</Menu.Item>
          <Menu.Item
            key="size"
            disabled={this.disableMenu('size', selectedRowKeys)}
          >{locale.radiusLabel}</Menu.Item>
          <Menu.Item key="opacity">{locale.opacityLabel}</Menu.Item>
          <Menu.Item
            key="symbol"
            disabled={this.disableMenu('symbol', selectedRowKeys)}
          >{locale.symbolLabel}</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );
  };

  render() {
    if (this.state.hasError) {
      return <h1>An error occured in the Style UI.</h1>;
    }

    let rules: GsRule[] = [];

    const {
      compact,
      dataProjection,
      filterUiProps,
      ruleNameProps,
      ruleRendererType,
      ruleTableProps,
      sldRendererProps,
      enableClassification,
      locale,
      data,
      iconLibraries,
      showAmountColumn,
      showDuplicatesColumn,
      colorRamps,
      colorSpaces,
      useBrewerColorRamps
    } = this.props;

    const {
      style,
      selectedRowKeys,
      colorModalVisible,
      sizeModalVisible,
      opacityModalVisible,
      symbolModalVisible,
      ruleGeneratorWindowVisible
    } = this.state;

    if (style) {
      rules = style.rules;
    }

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };

    return (
      <div className="gs-style" >
        <div className="gs-style-name-classification-row">
          <Form.Item
            label={locale.nameFieldLabel}
            {...formItemLayout}
          >
            <NameField
              value={this.state.style.name}
              onChange={this.onNameChange}
              placeholder={locale.nameFieldPlaceholder}
            />
          </Form.Item>
          {
            enableClassification ?
              <Button
                className="gs-style-rulegenerator"
                onClick={this.showRuleGeneratorWindow}
                disabled={!data}
              >
                {locale.ruleGeneratorWindowBtnText}
              </Button> : null
          }
        </div>
        {
          (!ruleGeneratorWindowVisible) ? null :
            <RuleGeneratorWindow
              y={0}
              internalDataDef={data}
              onClose={this.onRuleGeneratorWindowClose}
              onRulesChange={this.onRulesChange}
              colorRamps={colorRamps}
              useBrewerColorRamps={useBrewerColorRamps}
              colorSpaces={colorSpaces}
            />
        }
        { compact
          ? <RuleTable
            rules={rules}
            onRulesChange={this.onRulesChange}
            rowSelection={{
              selectedRowKeys,
              onChange: this.onRulesSelectionChange
            }}
            rendererType={ruleRendererType}
            sldRendererProps={sldRendererProps}
            filterUiProps={filterUiProps}
            data={data}
            footer={this.createFooter}
            iconLibraries={iconLibraries}
            showAmountColumn={showAmountColumn}
            showDuplicatesColumn={showDuplicatesColumn}
            colorRamps={colorRamps}
            {...ruleTableProps}
          />
          : rules.map((rule, idx) => <Rule
            key={'rule_' + idx}
            rule={rule}
            onRemove={this.removeRule}
            internalDataDef={data}
            onRuleChange={this.onRuleChange}
            dataProjection={dataProjection}
            filterUiProps={filterUiProps}
            ruleNameProps={ruleNameProps}
            rendererType={ruleRendererType}
            sldRendererProps={sldRendererProps}
            iconLibraries={iconLibraries}
            colorRamps={colorRamps}
          />)
        }
        {
          compact ? null :
            <Button
              style={{'marginBottom': '20px', 'marginTop': '20px'}}
              icon={<PlusOutlined />}
              size="large"
              onClick={this.addRule}
            >
              {locale.addRuleBtnText}
            </Button>
        }
        <BulkEditModals
          colorModalVisible={colorModalVisible}
          sizeModalVisible={sizeModalVisible}
          opacityModalVisible={opacityModalVisible}
          symbolModalVisible={symbolModalVisible}
          selectedRowKeys={selectedRowKeys}
          updateMultiColors={this.updateMultiColors}
          updateMultiSizes={this.updateMultiSizes}
          updateMultiOpacities={this.updateMultiOpacities}
          updateMultiSymbols={this.updateMultiSymbols}
          style={this.state.style}
          iconLibraries={iconLibraries}
          modalsClosed={() => this.setState({
            colorModalVisible: false,
            sizeModalVisible: false,
            opacityModalVisible: false,
            symbolModalVisible: false
          })}
        />
      </div>
    );
  }
}

export default localize(Style, Style.componentName);
