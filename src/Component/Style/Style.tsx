import * as React from 'react';

const _get = require('lodash/get');
const _isEqual = require('lodash/isEqual');
const _cloneDeep = require('lodash/cloneDeep');

import { InterpolationMode } from 'chroma-js';

import {
  Button,
  Menu,
  Icon,
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
  Data as GsData
} from 'geostyler-data';

import Rule, { RuleProps } from '../Rule/Rule';
import NameField, { NameFieldProps } from '../NameField/NameField';
import BulkEditModals from '../Symbolizer/BulkEditModals/BulkEditModals';
import { ComparisonFilterProps } from '../Filter/ComparisonFilter/ComparisonFilter';

import { localize } from '../LocaleWrapper/LocaleWrapper';
import en_US from '../../locale/en_US';
import SymbolizerUtil from '../../Util/SymbolizerUtil';
import RuleTable from '../RuleTable/RuleTable';
import RuleGeneratorWindow from '../RuleGenerator/RuleGeneratorWindow';
import { SLDRendererAdditonalProps } from '../Symbolizer/SLDRenderer/SLDRenderer';
import { IconLibrary } from '../Symbolizer/IconSelector/IconSelector';

import './Style.css';

// i18n
export interface StyleLocale {
  addRuleBtnText: string;
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
  style: GsStyle;
  locale: StyleLocale;
  compact: boolean;
  enableClassification: boolean;
}

// non default props
export interface StyleProps extends Partial<StyleDefaultProps> {
  data?: GsData;
  onStyleChange?: (rule: GsStyle) => void;
  /** The data projection of example features */
  dataProjection?: string;
  filterUiProps?: Partial<ComparisonFilterProps>;
  ruleNameProps?: Partial<NameFieldProps>;
  ruleProps?: Partial<RuleProps>;
  ruleRendererType?: 'SLD' | 'OpenLayers';
  sldRendererProps?: SLDRendererAdditonalProps;
  iconLibraries?: IconLibrary[];
  showAmountColumn?: boolean;
  showDuplicatesColumn?: boolean;
  colorRamps?: {
    [name: string]: string[]
  };
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

  public shouldComponentUpdate(nextProps: StyleProps, nextState: StyleState): boolean {
    const diffProps = !_isEqual(this.props, nextProps);
    const diffState = !_isEqual(this.state, nextState);
    return diffProps || diffState;
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (this.props.style && !_isEqual(this.props.style, prevProps.style)) {
      this.setState({
        style: this.props.style
      });
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
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
  }

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
  }

  onRulesChange = (rules: GsRule[]) => {
    const style = _cloneDeep(this.state.style);
    style.rules = rules;
    if (this.props.onStyleChange) {
      this.props.onStyleChange(style);
    }
    this.setState({style});
  }

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
  }

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
  }

  removeRule = (rule: GsRule) => {
    const style = _cloneDeep(this.state.style);
    const newRules = style.rules.filter((r: GsRule) => r.name !== rule.name);
    style.rules = newRules;
    if (this.props.onStyleChange) {
      this.props.onStyleChange(style);
    }
    this.setState({style});
  }

  onRulesSelectionChange = (selectedRowKeys: number[]) => {
    this.setState({
      selectedRowKeys
    });
  }

  onTableMenuClick = (param: any) => {
    switch (param.key) {
      case 'addRule':
        this.addRule();
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
  }

  updateAllSelected = (updates: {value: any; property: string; }[]) => {
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
  }

  updateMultiColors = (color: string) => {
    this.updateAllSelected([{value: color, property: 'color'}]);
  }

  updateMultiSizes = (size: any) => {
    this.updateAllSelected([{value: size, property: 'radius'}]);
  }

  updateMultiOpacities = (opacity: any) => {
    this.updateAllSelected([{value: opacity, property: 'opacity'}]);
  }

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
  }

  showRuleGeneratorWindow = () => {
    this.setState({ruleGeneratorWindowVisible: true});
  }

  onRuleGeneratorWindowClose = () => {
    this.setState({ruleGeneratorWindowVisible: false});
  }

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
  }
  createFooter = () => {
    const {
      locale
    } = this.props;

    const {
      style,
      selectedRowKeys
    } = this.state;

    const allowRemove = selectedRowKeys.length > 0 && selectedRowKeys.length < style.rules.length;

    return (
      <Menu
        mode="horizontal"
        onClick={this.onTableMenuClick}
        selectable={false}
        >
        <Menu.Item key="addRule">
          <Icon type="plus" />
            {locale.addRuleBtnText}
        </Menu.Item>
        <Menu.Item key="removeRule"
          disabled={!allowRemove}
          >
          <Icon type="minus" />
            {locale.removeRulesBtnText}
        </Menu.Item>
        <Menu.SubMenu
          popupClassName="styler-multiedit-popup"
          title={<span><Icon type="menu-unfold" /><span>{locale.multiEditLabel}</span></span>}
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
  }

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
      sldRendererProps,
      enableClassification,
      locale,
      data,
      iconLibraries,
      showAmountColumn,
      showDuplicatesColumn,
      colorRamps,
      colorSpaces
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
            internalDataDef={data}
            onClose={this.onRuleGeneratorWindowClose}
            onRulesChange={this.onRulesChange}
            colorRamps={colorRamps}
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
          />)
        }
        {
          compact ? null :
          <Button
            style={{'marginBottom': '20px', 'marginTop': '20px'}}
            icon="plus"
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
