import * as React from 'react';

const _isEqual = require('lodash/isEqual');

import {
  Modal
} from 'antd';

import {
  Style as GsStyle,
  Rule as GsRule
} from 'geostyler-style';

import ColorField from '../../Symbolizer/Field/ColorField/ColorField';

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';
import RadiusField from '../../Symbolizer/Field/RadiusField/RadiusField';
import OpacityField from '../../Symbolizer/Field/OpacityField/OpacityField';

// i18n
export interface StyleLocale {
  colorLabel: string;
  radiusLabel: string;
  opacityLabel: string;
}

// default props
interface BulkEditModalsDefaultProps {
  colorModalVisible: boolean;
  sizeModalVisible: boolean;
  opacityModalVisible: boolean;
  style: GsStyle;
  locale: StyleLocale;
  compact: boolean;
  selectedRowKeys: number[];
  modalsClosed: Function;
}

// non default props
export interface BulkEditModalsProps extends Partial<BulkEditModalsDefaultProps> {
  colorModalVisible: boolean;
  sizeModalVisible: boolean;
  opacityModalVisible: boolean;
  updateMultiColors?: (x: string) => void;
  updateMultiSizes?: (x: number) => void;
  updateMultiOpacities?: (x: number) => void;
  selectedRowKeys: number[];
  modalsClosed: Function;
}

// state
interface BulkEditModalsState {
}

export class BulkEditModals extends React.Component<BulkEditModalsProps, BulkEditModalsState> {
  constructor(props: BulkEditModalsProps) {
    super(props);
  }

  static componentName: string = 'BulkEditModals';

  public static defaultProps: BulkEditModalsDefaultProps = {
    style: {
      name: 'My Style',
      rules: []
    },
    colorModalVisible: false,
    sizeModalVisible: false,
    opacityModalVisible: false,
      compact: false,
    locale: en_US.GsBulkEditModals,
    selectedRowKeys: [],
    modalsClosed: (): any => undefined
  };

  public static getDerivedStateFromProps(props: BulkEditModalsProps, currentState: BulkEditModalsState) {
    if (props.colorModalVisible) {
      return {
        colorModalVisible: true
      };
    }
    if (props.sizeModalVisible) {
      return {
        sizeModalVisible: true
      };
    }
    if (props.opacityModalVisible) {
      return {
        opacityModalVisible: true
      };
    }
    return null;
  }

  public shouldComponentUpdate(nextProps: BulkEditModalsProps, nextState: BulkEditModalsState): boolean {
    const diffProps = !_isEqual(this.props, nextProps);
    const diffState = !_isEqual(this.state, nextState);
    return diffProps || diffState;
  }

  render() {
    let rules: GsRule[] = [];
    let color = '#000000';
    let size = 5;
    let opacity = 1;

    const {
      locale,
      style,
      selectedRowKeys
    } = this.props;

    if (style) {
      rules = style.rules;
      const selectedRules = rules.filter((rule: GsRule, index: number) => {
        return selectedRowKeys.includes(index);
      });

      if (selectedRules[0] && selectedRules[0].symbolizers && selectedRules[0].symbolizers[0]) {
        const sym: any = selectedRules[0].symbolizers[0];
        if (sym.color) {
          color = sym.color;
        }
        if (sym.radius) {
          size = sym.radius;
        }
        if (sym.opacity) {
          opacity = sym.opacity;
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
          <ColorField
            color={color}
            label={locale.colorLabel}
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
          <RadiusField
            radius={size}
            label={locale.radiusLabel}
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
          <OpacityField
            opacity={opacity}
            label={locale.opacityLabel}
            onChange={this.props.updateMultiOpacities}
          />
        </Modal>
      </div>
    );
  }
}

export default localize(BulkEditModals, BulkEditModals.componentName);
