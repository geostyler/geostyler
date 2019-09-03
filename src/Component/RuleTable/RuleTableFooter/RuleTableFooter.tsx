import * as React from 'react';
import { Menu, Icon } from 'antd';

import {
  Style as GsStyle,
  Symbolizer as GsSymbolizer
} from 'geostyler-style';

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';

// i18n
export interface RuleTableFooterLocale {
  addRuleBtnText: string;
  cloneRulesBtnText: string;
  removeRulesBtnText: string;
  colorLabel: string;
  radiusLabel: string;
  symbolLabel: string;
  multiEditLabel: string;
  opacityLabel: string;
}

// default props
interface RuleTableFooterDefaultProps {
  locale: RuleTableFooterLocale;
}
// non default props
export interface RuleTableFooterProps extends Partial<RuleTableFooterDefaultProps> {
  style: GsStyle;
  selectedRowKeys: number[];
  onTableMenuClick: (param: any) => void;
}

/**
 * Button group to re-order positions of rules.
 */
export class RuleTableFooter extends React.Component<RuleTableFooterProps> {

  static componentName: string = 'RuleTableFooter';

  public static defaultProps: RuleTableFooterDefaultProps = {
    locale: en_US.GsRuleTableFooter
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
    } = this.props;
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

  render() {
    const {
      locale,
      onTableMenuClick,
      selectedRowKeys,
      style
    } = this.props;

    const allowRemove = selectedRowKeys.length > 0 && selectedRowKeys.length < style.rules.length;
    const allowClone = selectedRowKeys.length  > 0;

    return (
      <Menu
        mode="horizontal"
        onClick={onTableMenuClick}
        selectable={false}
        >
        <Menu.Item key="addRule">
          <Icon type="plus" />
            {locale.addRuleBtnText}
        </Menu.Item>
        <Menu.Item key="cloneRules"
          disabled={!allowClone}
        >
          <Icon type="copy" />
            {locale.cloneRulesBtnText}
        </Menu.Item>
        <Menu.Item key="removeRule"
          disabled={!allowRemove}
          >
          <Icon type="minus" />
            {locale.removeRulesBtnText}
        </Menu.Item>
        <Menu.SubMenu
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
}

export default localize(RuleTableFooter, RuleTableFooter.componentName);
