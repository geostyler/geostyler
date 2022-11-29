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
  Data, VectorData
} from 'geostyler-data';

import Rule, { RuleProps } from '../Rule/Rule';
import NameField, { NameFieldProps } from '../NameField/NameField';
import BulkEditModals from '../Symbolizer/BulkEditModals/BulkEditModals';
import { ComparisonFilterProps } from '../Filter/ComparisonFilter/ComparisonFilter';

import { localize } from '../LocaleWrapper/LocaleWrapper';
import SymbolizerUtil from '../../Util/SymbolizerUtil';
import RuleTable, { RuleTableProps } from '../RuleTable/RuleTable';
import RuleGeneratorWindow from '../RuleGenerator/RuleGeneratorWindow';
import { SLDRendererAdditonalProps } from '../Renderer/SLDRenderer/SLDRenderer';
import { IconLibrary } from '../Symbolizer/IconSelector/IconSelector';

import './Style.less';
import { CopyOutlined, MenuUnfoldOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { GeoStylerLocale } from '../../locale/locale';
import en_US from '../../locale/en_US';

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
  locale: GeoStylerLocale['Style'];
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

const COMPONENTNAME = 'Style';

export const Style: React.FC<StyleProps> = ({
  compact =  false,
  locale = en_US.Style,
  style: styleProp =  {
    name: 'My Style',
    rules: []
  },
  data,
  onStyleChange,
  dataProjection,
  filterUiProps,
  ruleNameProps,
  ruleProps,
  ruleTableProps,
  ruleRendererType,
  sldRendererProps,
  iconLibraries,
  showAmountColumn,
  showDuplicatesColumn,
  colorRamps,
  useBrewerColorRamps,
  colorSpaces,
  enableClassification = true
}) => {

  const [style, setStyle] = useState(styleProp);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [colorModalVisible, setColorModalVisible] = useState(false);
  const [sizeModalVisible, setSizeModalVisible] = useState(false);
  const [opacityModalVisible, setOpacityModalVisible] = useState(false);
  const [symbolModalVisible, setSymbolModalVisible] = useState(false);
  const [ruleGeneratorWindowVisible, setRuleGeneratorWindowVisible] = useState(false);

  useEffect(() => {
    setStyle(styleProp);
  }, [styleProp]);

  const onNameChange = (name: string) => {
    const clonedStyle = _cloneDeep(style);
    clonedStyle.name = name;
    if (onStyleChange) {
      onStyleChange(clonedStyle);
    }
    setStyle(clonedStyle);
  };

  const onRuleChange = (rule: GsRule, ruleBefore: GsRule) => {
    const clonedStyle = _cloneDeep(style);
    const ruleIdxToReplace = clonedStyle.rules.findIndex((r: any) => {
      return _isEqual(r, ruleBefore);
    });
    if (ruleIdxToReplace > -1) {
      clonedStyle.rules[ruleIdxToReplace] = rule;
      if (onStyleChange) {
        onStyleChange(clonedStyle);
      }
      setStyle(clonedStyle);
    }
  };

  const onRulesChange = (newRules: GsRule[]) => {
    const clonedStyle = _cloneDeep(style);
    clonedStyle.rules = newRules;
    if (onStyleChange) {
      onStyleChange(clonedStyle);
    }
    setStyle(clonedStyle);
  };

  const addRule = () => {
    const clonedStyle = _cloneDeep(style);
    // TODO We need to ensure that rule names are unique
    const randomId = Math.floor(Math.random() * 10000);
    const symbolizerKind: SymbolizerKind = _get(clonedStyle, 'rules[0].symbolizers[0].kind');
    const newRule: GsRule = {
      name: 'rule_' + randomId,
      symbolizers: [SymbolizerUtil.generateSymbolizer(symbolizerKind)]
    };
    clonedStyle.rules = [...clonedStyle.rules, newRule];
    if (onStyleChange) {
      onStyleChange(clonedStyle);
    }
    setSelectedRowKeys([]);
    setStyle(clonedStyle);
  };

  const cloneRules = () => {
    const clonedStyle = _cloneDeep(style);

    // create rules to clone
    let newRules: GsRule[] = [];
    clonedStyle.rules.forEach((rule: GsRule, index: number) => {
      if (selectedRowKeys.includes(index)) {
        let ruleClone = _cloneDeep(rule);
        // TODO We need to ensure that rule names are unique
        const randomId = Math.floor(Math.random() * 10000);
        ruleClone.name = 'rule_' + randomId;
        newRules.push(ruleClone);
      }
    });

    // apply cloned rules to existing ones
    clonedStyle.rules = [...clonedStyle.rules, ...newRules];
    if (onStyleChange) {
      onStyleChange(clonedStyle);
    }
    setStyle(clonedStyle);
  };

  const removeRules = () => {
    const clonedStyle = _cloneDeep(style);
    const newRules = clonedStyle.rules.filter((rule: GsRule, index: number) => {
      return !selectedRowKeys.includes(index);
    });
    clonedStyle.rules = newRules;
    if (onStyleChange) {
      onStyleChange(clonedStyle);
    }
    setSelectedRowKeys([]);
    setStyle(clonedStyle);
  };

  const removeRule = (rule: GsRule) => {
    const clonedStyle = _cloneDeep(style);
    const newRules = clonedStyle.rules.filter((r: GsRule) => r.name !== rule.name);
    clonedStyle.rules = newRules;
    if (onStyleChange) {
      onStyleChange(clonedStyle);
    }
    setStyle(clonedStyle);
  };

  const onRulesSelectionChange = (newSelectedRowKeys: (string|number)[]) => {
    setSelectedRowKeys(newSelectedRowKeys as string[]);
  };

  const onTableMenuClick = (param: any) => {
    switch (param.key) {
      case 'addRule':
        addRule();
        break;
      case 'cloneRules':
        cloneRules();
        break;
      case 'removeRule':
        removeRules();
        break;
      case 'color':
        setColorModalVisible(true);
        break;
      case 'size':
        setSizeModalVisible(true);
        break;
      case 'opacity':
        setOpacityModalVisible(true);
        break;
      case 'symbol':
        setSymbolModalVisible(true);
        break;
      default:
    }
  };

  const updateAllSelected = (updates: {value: any; property: string }[]) => {
    const clonedStyle = _cloneDeep(style);
    const selectedRules = clonedStyle.rules.filter((rule: GsRule, index: number) => {
      return selectedRowKeys.includes(index);
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
    if (onStyleChange) {
      onStyleChange(clonedStyle);
    }
    setStyle(clonedStyle);
  };

  const updateMultiColors = (color: string) => {
    updateAllSelected([{value: color, property: 'color'}]);
  };

  const updateMultiSizes = (size: any) => {
    updateAllSelected([{value: size, property: 'radius'}]);
  };

  const updateMultiOpacities = (opacity: any) => {
    updateAllSelected([{value: opacity, property: 'opacity'}]);
  };

  const updateMultiSymbols = (symbol: GsWellKnownName | string, kind: SymbolizerKind) => {
    if (kind === 'Mark') {
      updateAllSelected([
        {value: symbol, property: 'wellKnownName'},
        {value: kind, property: 'kind'}
      ]);
    } else {
      updateAllSelected([
        {value: symbol, property: 'image'},
        {value: kind, property: 'kind'}
      ]);
    }
  };

  const showRuleGeneratorWindow = () => {
    setRuleGeneratorWindowVisible(true);
  };

  const onRuleGeneratorWindowClose = () => {
    setRuleGeneratorWindowVisible(false);
  };

  const onModalsClosed = () => {
    setColorModalVisible(false);
    setSizeModalVisible(false);
    setOpacityModalVisible(false);
    setSymbolModalVisible(false);
  };

  /**
   * Checks if a specific menu item of multi-edit menu should be disabled.
   *
   * @param name Name of menu item
   * @param rowKeys array of selected rowkeys
   * @return boolean true if menu item should be disabled, otherwise false
   */
  const disableMenu = (name: string, rowKeys: number[]): boolean => {
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

  // TODO: move to separated component
  const createFooter = () => {
    const allowRemove = selectedRowKeys.length > 0 && selectedRowKeys.length < style.rules.length;
    const allowClone = selectedRowKeys.length > 0;

    const items: ItemType[] = [{
      key: 'addRule',
      label: locale.addRuleBtnText,
      icon: <PlusOutlined />
    }, {
      key: 'cloneRules',
      label: locale.cloneRulesBtnText,
      disabled: !allowClone,
      icon: <CopyOutlined />
    }, {
      key: 'removeRule',
      label: locale.removeRulesBtnText,
      disabled: !allowRemove,
      icon: <MinusOutlined />
    }, {
      key: 'multi-edit',
      label: <span><MenuUnfoldOutlined /><span>{locale.multiEditLabel}</span></span>,
      disabled: selectedRowKeys.length <= 1,
      children:[{
        key: 'color',
        label: locale.colorLabel,
        disabled: disableMenu('color', selectedRowKeys)
      }, {
        key: 'size',
        label: locale.radiusLabel,
        disabled: disableMenu('size', selectedRowKeys)
      }, {
        key: 'symbol',
        label: locale.symbolLabel,
        disabled: disableMenu('symbol', selectedRowKeys)
      }]
    }];

    return (
      <Menu
        mode="horizontal"
        onClick={onTableMenuClick}
        selectable={false}
        items={items}
      />
    );
  };

  let rules: GsRule[] =  style?.rules || [];

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
            value={style.name}
            onChange={onNameChange}
            placeholder={locale.nameFieldPlaceholder}
          />
        </Form.Item>
        {
          // TODO: Rule GeneratorWindow should only be available if data is VectorData
          enableClassification ?
            <Button
              className="gs-style-rulegenerator"
              onClick={showRuleGeneratorWindow}
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
            internalDataDef={data as VectorData}
            onClose={onRuleGeneratorWindowClose}
            onRulesChange={onRulesChange}
            colorRamps={colorRamps}
            useBrewerColorRamps={useBrewerColorRamps}
            colorSpaces={colorSpaces}
          />
      }
      { compact
        ? <RuleTable
          rules={rules}
          onRulesChange={onRulesChange}
          rowSelection={{
            selectedRowKeys,
            onChange: onRulesSelectionChange
          }}
          rendererType={ruleRendererType}
          sldRendererProps={sldRendererProps}
          filterUiProps={filterUiProps}
          data={data}
          footer={createFooter}
          iconLibraries={iconLibraries}
          showAmountColumn={showAmountColumn}
          showDuplicatesColumn={showDuplicatesColumn}
          colorRamps={colorRamps}
          {...ruleTableProps}
        />
        : rules.map((rule, idx) => <Rule
          key={'rule_' + idx}
          rule={rule}
          onRemove={removeRule}
          internalDataDef={data}
          onRuleChange={onRuleChange}
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
            onClick={addRule}
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
        updateMultiColors={updateMultiColors}
        updateMultiSizes={updateMultiSizes}
        updateMultiOpacities={updateMultiOpacities}
        updateMultiSymbols={updateMultiSymbols}
        style={style}
        iconLibraries={iconLibraries}
        modalsClosed={onModalsClosed}
      />
    </div>
  );
};

export default localize(Style, COMPONENTNAME);
