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

const _isEqual = require('lodash/isEqual');

import {
  Modal
} from 'antd';

import {
  Style as GsStyle,
  Rule as GsRule,
  WellKnownName
} from 'geostyler-style';

import ColorField from '../../Symbolizer/Field/ColorField/ColorField';

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';
import RadiusField from '../../Symbolizer/Field/RadiusField/RadiusField';
import OpacityField from '../../Symbolizer/Field/OpacityField/OpacityField';
import { WellKnownNameField } from '../Field/WellKnownNameField/WellKnownNameField';
import KindField from '../Field/KindField/KindField';
import ImageField from '../Field/ImageField/ImageField';
import IconSelector, { IconLibrary } from '../IconSelector/IconSelector';

import './BulkEditModals.less';

// i18n
export interface StyleLocale {
  colorLabel: string;
  radiusLabel: string;
  opacityLabel: string;
  symbolLabel: string;
  imageFieldLabel: string;
  imageFieldTooltipLabel: string;
}

// default props
interface BulkEditModalsDefaultProps {
  colorModalVisible: boolean;
  sizeModalVisible: boolean;
  opacityModalVisible: boolean;
  symbolModalVisible: boolean;
  style: GsStyle;
  locale: StyleLocale;
  selectedRowKeys: number[];
  modalsClosed: Function;
}

// non default props
export interface BulkEditModalsProps extends Partial<BulkEditModalsDefaultProps> {
  colorModalVisible: boolean;
  sizeModalVisible: boolean;
  opacityModalVisible: boolean;
  symbolModalVisible: boolean;
  updateMultiColors?: (x: string) => void;
  updateMultiSizes?: (x: number) => void;
  updateMultiOpacities?: (x: number) => void;
  updateMultiSymbols?: (x: string, y: string) => void;
  selectedRowKeys: number[];
  modalsClosed: Function;
  iconLibraries?: IconLibrary[];
}

// state
interface BulkEditModalsState {
  kind: 'Icon' | 'Mark';
}

export class BulkEditModals extends React.Component<BulkEditModalsProps, BulkEditModalsState> {

  static componentName: string = 'BulkEditModals';

  public static defaultProps: BulkEditModalsDefaultProps = {
    style: {
      name: 'My Style',
      rules: []
    },
    colorModalVisible: false,
    sizeModalVisible: false,
    opacityModalVisible: false,
    symbolModalVisible: false,
    locale: en_US.GsBulkEditModals,
    selectedRowKeys: [],
    modalsClosed: (): any => undefined
  };

  constructor(props: BulkEditModalsProps) {
    super(props);

    this.state = {
      kind: 'Mark'
    };
  }

  public shouldComponentUpdate(nextProps: BulkEditModalsProps, nextState: BulkEditModalsState): boolean {
    const diffProps = !_isEqual(this.props, nextProps);
    const diffState = !_isEqual(this.state, nextState);
    return diffProps || diffState;
  }

  onKindFieldChange = (kind: ('Icon'|'Mark')) => {
    this.setState({
      kind
    });
  };

  render() {
    let rules: GsRule[] = [];
    let color = '#000000';
    let size = 5;
    let opacity = 1;
    let symbol: WellKnownName = 'Circle';

    const {
      locale,
      style,
      selectedRowKeys,
      iconLibraries
    } = this.props;

    const {
      kind
    } = this.state;

    if (style) {
      rules = style.rules;
      const selectedRules = rules.filter((rule: GsRule, index: number) => {
        return selectedRowKeys.includes(index);
      });
      const firstRule = selectedRules.find(rule => rule.symbolizers && rule.symbolizers.length > 0);

      if (firstRule && firstRule.symbolizers && firstRule.symbolizers[0]) {
        const sym: any = firstRule.symbolizers[0];
        if (sym.color) {
          color = sym.color;
        }
        if (sym.radius) {
          size = sym.radius;
        }
        if (sym.opacity) {
          opacity = sym.opacity;
        }
        if (sym.kind && sym.kind === 'Mark' && sym.wellKnownName) {
          symbol = sym.wellKnownName;
        }

        if (sym.kind && sym.kind === 'Icon' && sym.image) {
          symbol = sym.image;
        }
      }
    }

    return (
      <div className="gs-style" >
        <Modal
          title={locale.colorLabel}
          visible={this.props.colorModalVisible}
          wrapClassName="gs-modal-color"
          footer={null}
          onCancel={() => this.props.modalsClosed()}
        >
          {locale.colorLabel}
          <ColorField
            color={color}
            onChange={this.props.updateMultiColors}
          />
        </Modal>
        <Modal
          title={locale.radiusLabel}
          visible={this.props.sizeModalVisible}
          wrapClassName="gs-modal-size"
          footer={null}
          onCancel={() => this.props.modalsClosed()}
        >
          {locale.radiusLabel}
          <RadiusField
            radius={size}
            onChange={this.props.updateMultiSizes}
          />
        </Modal>
        <Modal
          title={locale.opacityLabel}
          visible={this.props.opacityModalVisible}
          wrapClassName="gs-modal-opacity"
          footer={null}
          onCancel={() => this.props.modalsClosed()}
        >
          {locale.opacityLabel}
          <OpacityField
            opacity={opacity}
            onChange={this.props.updateMultiOpacities}
          />
        </Modal>
        <Modal
          title={locale.symbolLabel}
          visible={this.props.symbolModalVisible}
          wrapClassName="gs-modal-opacity"
          footer={null}
          onCancel={() => this.props.modalsClosed()}
        >
          <KindField
            symbolizerKinds={['Mark', 'Icon']}
            kind={kind}
            onChange={this.onKindFieldChange}
          />
          {
            kind === 'Mark' ? (
              <WellKnownNameField
                wellKnownName={symbol}
                onChange={(val: string) => {
                  this.props.updateMultiSymbols(val, kind);
                }}
              />
            ) : (
              <div>
                {locale.imageFieldLabel}
                <ImageField
                  value={symbol}
                  onChange={(val: string) => {
                    this.props.updateMultiSymbols(val, kind);
                  }}
                />
                {
                  !iconLibraries ? null : (
                    <div className="gs-bulk-edit-modals-icon-selector">
                      <IconSelector
                        iconLibraries={iconLibraries}
                        onIconSelect={(val: string) => {
                          this.props.updateMultiSymbols(val, kind);
                        }}
                        selectedIconSrc={symbol}
                      />
                    </div>)
                }
              </div>
            )
          }
        </Modal>
      </div>
    );
  }
}

export default localize(BulkEditModals, BulkEditModals.componentName);
