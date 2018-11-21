import * as React from 'react';

const _get = require('lodash/get');
const _isEqual = require('lodash/isEqual');
const _cloneDeep = require('lodash/cloneDeep');

import {
  Button,
  Menu,
  Icon
} from 'antd';

import {
  Style as GsStyle,
  Rule as GsRule,
  SymbolizerKind,
  Symbolizer as GsSymbolizer
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
import { SLDRendererProps } from '../Symbolizer/SLDRenderer/SLDRenderer';

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
  sldRendererProps?: SLDRendererProps;
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
      ruleGeneratorWindowVisible: false
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

  onMultiEdit = (param: any) => {
    switch (param.key) {
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

  updateAllSelected = (value: any, property: string) => {
    const style = _cloneDeep(this.state.style);
    const selectedRules = style.rules.filter((rule: GsRule, index: number) => {
      return this.state.selectedRowKeys.includes(index);
    });
    selectedRules.forEach((rule: GsRule) => {
      rule.symbolizers.forEach((sym: GsSymbolizer) => {
        sym[property] = value;
      });
    });
    if (this.props.onStyleChange) {
      this.props.onStyleChange(style);
    }
    this.setState({style});
  }

  updateMultiColors = (color: string) => {
    this.updateAllSelected(color, 'color');
  }

  updateMultiSizes = (size: any) => {
    this.updateAllSelected(size, 'radius');
  }

  updateMultiOpacities = (opacity: any) => {
    this.updateAllSelected(opacity, 'opacity');
  }

  updateMultiSymbols = (symbol: any) => {
    this.updateAllSelected(symbol, 'wellKnownName');
  }

  showRuleGeneratorWindow = () => {
    this.setState({ruleGeneratorWindowVisible: true});
  }

  onRuleGeneratorWindowClose = () => {
    this.setState({ruleGeneratorWindowVisible: false});
  }

  render() {
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
      data
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

    const allowRemove = selectedRowKeys.length > 0 && selectedRowKeys.length < style.rules.length;

    return (
      <div className="gs-style" >
        <div className="gs-style-name-classification-row">
          <NameField
            value={this.state.style.name}
            onChange={this.onNameChange}
            label={locale.nameFieldLabel}
            placeholder={locale.nameFieldPlaceholder}
          />
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
          />)
        }
        <Button.Group>
          <Button
            style={{'marginBottom': '20px', 'marginTop': '20px'}}
            icon="plus"
            size="large"
            onClick={this.addRule}
          >
            {locale.addRuleBtnText}
          </Button>
          {
            !compact ? null :
            <Button
              style={{'marginBottom': '20px', 'marginTop': '20px'}}
              icon="minus"
              disabled={!allowRemove}
              size="large"
              onClick={this.removeRules}
            >
              {locale.removeRulesBtnText}
            </Button>
          }
          {
            !compact ? null :
            <Menu
              style={{
                display: 'inline-block',
                top: '15px',
                position: 'absolute',
                width: '60%'
              }}
              mode="vertical"
              onClick={this.onMultiEdit}
              selectable={false}
            >
              <Menu.SubMenu
                popupClassName="styler-multiedit-popup"
                title={<span><Icon type="menu-unfold" /><span>{locale.multiEditLabel}</span></span>}
              >
                <Menu.Item key="color">{locale.colorLabel}</Menu.Item>
                <Menu.Item key="size">{locale.radiusLabel}</Menu.Item>
                <Menu.Item key="opacity">{locale.opacityLabel}</Menu.Item>
                <Menu.Item key="symbol">{locale.symbolLabel}</Menu.Item>
              </Menu.SubMenu>
            </Menu>
          }
        </Button.Group>
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
