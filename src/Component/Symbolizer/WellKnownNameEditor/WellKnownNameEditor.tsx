import * as React from 'react';
import { localize } from '../../LocaleWrapper/LocaleWrapper';
import {
  MarkSymbolizer,
  Symbolizer
 } from 'geostyler-style';

import ColorField from '../Field/ColorField/ColorField';
import OpacityField from '../Field/OpacityField/OpacityField';
import RadiusField from '../Field/RadiusField/RadiusField';
import WidthField from '../Field/WidthField/WidthField';
import RotateField from '../Field/RotateField/RotateField';
import en_US from '../../../locale/en_US';
import { Form } from 'antd';

const _cloneDeep = require('lodash/cloneDeep');
const _isEqual = require('lodash/isEqual');

// i18n
interface WellKnownNameEditorLocale {
  radiusLabel?: string;
  fillOpacityLabel?: string;
  fillColorLabel?: string;
  strokeColorLabel?: string;
  strokeWidthLabel?: string;
  strokeOpacityLabel?: string;
  rotateLabel?: string;
}

interface WellKnownNameEditorDefaultProps {
  locale: WellKnownNameEditorLocale;
}

// non default props
export interface WellKnownNameEditorProps extends Partial<WellKnownNameEditorDefaultProps> {
  symbolizer: MarkSymbolizer;
  onSymbolizerChange?: (changedSymb: Symbolizer) => void;
}

export class WellKnownNameEditor extends React.Component<WellKnownNameEditorProps> {

  public shouldComponentUpdate(nextProps: WellKnownNameEditorProps): boolean {
    const diffProps = !_isEqual(this.props, nextProps);
    return diffProps;
  }

  public static defaultProps: WellKnownNameEditorDefaultProps = {
    locale: en_US.GsWellKnownNameEditor
  };

  static componentName: string = 'WellKnownNameEditor';

  onRadiusChange = (value: number) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.radius = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  }

  onColorChange = (value: string) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.color = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  }

  onOpacityChange = (value: number) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.opacity = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  }

  onStrokeColorChange = (value: string) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.strokeColor = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  }

  onStrokeWidthChange = (value: number) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.strokeWidth = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  }

  onStrokeOpacityChange = (value: number) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.strokeOpacity = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  }

  onRotateChange = (value: number) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.rotate = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  }

  render () {
    const {
      symbolizer
    } = this.props;

    const {
      radius,
      color,
      opacity,
      rotate,
      strokeColor,
      strokeWidth,
      strokeOpacity
    } = symbolizer;

    const {
      locale
    } = this.props;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };

    return (
      <div>
        <Form.Item
          label={locale.radiusLabel}
          {...formItemLayout}
        >
          <RadiusField
            radius={radius}
            onChange={this.onRadiusChange}
          />
        </Form.Item>
        <Form.Item
          label={locale.fillColorLabel}
          {...formItemLayout}
        >
          <ColorField
            color={color}
            onChange={this.onColorChange}
          />
        </Form.Item>
        <Form.Item
          label={locale.fillOpacityLabel}
          {...formItemLayout}
        >
          <OpacityField
            opacity={opacity}
            onChange={this.onOpacityChange}
          />
        </Form.Item>
        <Form.Item
          label={locale.strokeColorLabel}
          {...formItemLayout}
        >
          <ColorField
            color={strokeColor}
            onChange={this.onStrokeColorChange}
          />
        </Form.Item>
        <Form.Item
          label={locale.strokeWidthLabel}
          {...formItemLayout}
        >
          <WidthField
            width={strokeWidth}
            onChange={this.onStrokeWidthChange}
          />
        </Form.Item>
        <Form.Item
          label={locale.strokeOpacityLabel}
          {...formItemLayout}
        >
          <OpacityField
            opacity={strokeOpacity}
            onChange={this.onStrokeOpacityChange}
          />
        </Form.Item>
        <Form.Item
          label={locale.rotateLabel}
          {...formItemLayout}
        >
          <RotateField
            rotate={rotate}
            onChange={this.onRotateChange}
          />
        </Form.Item>
      </div>
    );
  }
}

export default localize(WellKnownNameEditor, WellKnownNameEditor.componentName);
