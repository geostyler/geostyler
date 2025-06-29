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

import _get from 'lodash-es/get.js';
import _cloneDeep from 'lodash-es/cloneDeep.js';

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
  WellKnownName as GsWellKnownName,
  Expression,
  IconSymbolizer
} from 'geostyler-style';

import { NameField } from '../NameField/NameField';
import { BulkEditModals } from '../Symbolizer/BulkEditModals/BulkEditModals';
import SymbolizerUtil from '../../Util/SymbolizerUtil';
import { RuleTable } from '../RuleTable/RuleTable';
import { RuleGeneratorWindow } from '../RuleGenerator/RuleGeneratorWindow';
import { CopyOutlined, MenuUnfoldOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import {
  useGeoStylerComposition,
  useGeoStylerData,
  useGeoStylerLocale
} from '../../context/GeoStylerContext/GeoStylerContext';

import './Style.css';
import { ItemType } from 'antd/es/menu/interface';

export interface StyleComposableProps {
  // TODO add support for default values in nameField
  nameField?: {
    visibility?: boolean;
  };
  /** Should the classification be disabled */
  disableClassification?: boolean;
  disableMultiEdit?: boolean;
}

export interface StyleInternalProps {
  /** The geoStylerStyle object */
  style?: GsStyle;
  /** The callback function that is triggered when the state changes */
  onStyleChange?: (style: GsStyle) => void;
}

export type StyleProps = StyleInternalProps & StyleComposableProps;

export const Style: React.FC<StyleProps> = (props) => {

  const data = useGeoStylerData();

  const composition = useGeoStylerComposition('Style');
  const composed = { ...props, ...composition };
  const {
    nameField,
    disableClassification = false,
    disableMultiEdit = false,
    style: styleProp = {
      name: 'My Style',
      rules: []
    },
    onStyleChange
  } = composed;

  const locale = useGeoStylerLocale('Style');

  const [style, setStyle] = useState(styleProp);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
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

  const cloneRules = (...ruleIndices: number[]) => {
    const clonedStyle = _cloneDeep(style);

    // create rules to clone
    const newRules: GsRule[] = [];
    clonedStyle.rules.forEach((rule: GsRule, index: number) => {
      if (ruleIndices.includes(index)) {
        const ruleClone = _cloneDeep(rule);
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

  const removeRules = (...ruleIndices: number[]) => {
    const clonedStyle = _cloneDeep(style);
    const newRules = clonedStyle.rules.filter((rule: GsRule, index: number) => {
      return !ruleIndices.includes(index);
    });
    clonedStyle.rules = newRules;
    if (onStyleChange) {
      onStyleChange(clonedStyle);
    }
    setSelectedRowKeys([]);
    setStyle(clonedStyle);
  };

  const onRulesSelectionChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys as number[]);
  };

  const onTableMenuClick = (param: any) => {
    switch (param.key) {
      case 'addRule':
        addRule();
        break;
      case 'cloneRules':
        cloneRules(...selectedRowKeys);
        break;
      case 'removeRule':
        removeRules(...selectedRowKeys);
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

  const updateAllSelected = (updates: { value: any; property: string }[]) => {
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

  const updateMultiColors = (color: Expression<string>) => {
    updateAllSelected([{ value: color, property: 'color' }]);
  };

  const updateMultiSizes = (size: any) => {
    updateAllSelected([{ value: size, property: 'radius' }]);
  };

  const updateMultiOpacities = (opacity: any) => {
    updateAllSelected([{ value: opacity, property: 'opacity' }]);
  };

  const updateMultiSymbols = (symbol: GsWellKnownName | IconSymbolizer['image'], kind: SymbolizerKind) => {
    if (kind === 'Mark') {
      updateAllSelected([
        { value: symbol, property: 'wellKnownName' },
        { value: kind, property: 'kind' }
      ]);
    } else {
      updateAllSelected([
        { value: symbol, property: 'image' },
        { value: kind, property: 'kind' }
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
          const symbolizers = style.rules[key].symbolizers;
          symbolizers.forEach((symbolizer: GsSymbolizer) => {
            const kind = symbolizer.kind;
            if (kind === 'Fill' || kind === 'Text' || kind === 'Line') {
              isValid = false;
            }
          });
        });
        return !isValid;
      case 'symbol':
        rowKeys.forEach((key: number) => {
          const symbolizers = style.rules[key].symbolizers;
          symbolizers.forEach((symbolizer: GsSymbolizer) => {
            const kind = symbolizer.kind;
            if (kind !== 'Mark' && kind !== 'Icon') {
              isValid = false;
            }
          });
        });
        return !isValid;
      case 'color':
        rowKeys.forEach((key: number) => {
          const symbolizers = style.rules[key].symbolizers;
          symbolizers.forEach((symbolizer: GsSymbolizer) => {
            const kind = symbolizer.kind;
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
    }, !disableMultiEdit && {
      key: 'cloneRules',
      label: locale.cloneRulesBtnText,
      disabled: !allowClone,
      icon: <CopyOutlined />
    }, !disableMultiEdit && {
      key: 'removeRule',
      label: locale.removeRulesBtnText,
      disabled: !allowRemove,
      icon: <MinusOutlined />,
    }, !disableMultiEdit && {
      key: 'multi-edit',
      label: <span><MenuUnfoldOutlined /><span>{locale.multiEditLabel}</span></span>,
      disabled: selectedRowKeys.length <= 1,
      children: [{
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

  const rules: GsRule[] = style?.rules || [];

  return (
    <div className="gs-style" >
      <div className="gs-style-name-classification-row">
        {
          nameField?.visibility === false ? null : (
            <Form.Item
              label={locale.nameFieldLabel}
            >
              <NameField
                value={style.name}
                onChange={onNameChange}
                placeholder={locale.nameFieldPlaceholder}
              />
            </Form.Item>
          )
        }
        {
          // TODO: Rule GeneratorWindow should only be available if data is VectorData
          !disableClassification &&
          <Button
            className="gs-style-rulegenerator"
            onClick={showRuleGeneratorWindow}
            disabled={!data}
          >
            {locale.ruleGeneratorWindowBtnText}
          </Button>
        }
      </div>
      <RuleGeneratorWindow
        open={ruleGeneratorWindowVisible}
        onClose={onRuleGeneratorWindowClose}
        onRulesChange={onRulesChange}
      />
      <RuleTable
        rules={rules}
        onRulesChange={onRulesChange}
        rowSelection={!disableMultiEdit && {
          selectedRowKeys,
          onChange: onRulesSelectionChange
        }}
        onCloneRule={cloneRules}
        onRemoveRule={removeRules}
        footer={createFooter}
      />
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
        modalsClosed={onModalsClosed}
      />
    </div>
  );
};
