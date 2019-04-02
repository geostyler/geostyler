import * as React from 'react';

import {
  Symbolizer,
  RasterSymbolizer
} from 'geostyler-style';

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';
import { Form } from 'antd';
import OpacityField from '../Field/OpacityField/OpacityField';
import RotateField from '../Field/RotateField/RotateField';
import BrightnessField from '../Field/BrightnessField/BrightnessField';
import SaturationField from '../Field/SaturationField/SaturationField';
import ContrastField from '../Field/ContrastField/ContrastField';
import FadeDurationField from '../Field/FadeDurationField/FadeDurationField';
import ResamplingField from '../Field/ResamplingField/ResamplingField';
import { Data } from 'geostyler-data';

const _cloneDeep = require('lodash/cloneDeep');

// i18n
export interface RasterEditorLocale {
  opacityLabel?: string;
  hueRotateLabel?: string;
  brightnessMinLabel?: string;
  brightnessMaxLabel?: string;
  saturationLabel?: string;
  contrastLabel?: string;
  fadeDurationLabel?: string;
  resamplingLabel?: string;
  contrastEnhancementLabel?: string;
  gammaValueLabel?: string;
}

// default props
interface RasterEditorDefaultProps {
  locale: RasterEditorLocale;
}

// non default props
export interface RasterEditorProps extends Partial<RasterEditorDefaultProps> {
  symbolizer: RasterSymbolizer;
  onSymbolizerChange?: (changedSymb: Symbolizer) => void;
  internalDataDef?: Data;
}

export class RasterEditor extends React.Component<RasterEditorProps> {

  static componentName: string = 'RasterEditor';

  public static defaultProps: RasterEditorDefaultProps = {
    locale: en_US.GsRasterEditor
  };

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

  onHueRotateChange = (value: number) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.hueRotate = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  }

  onBrightnessMinChange = (value: number) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.brightnessMin = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  }

  onBrightnessMaxChange = (value: number) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.brightnessMax = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  }

  onSaturationChange = (value: number) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.saturation = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  }

  onContrastChange = (value: number) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.contrast = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  }

  onFadeDurationChange = (value: number) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.fadeDuration = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  }

  onResamplingChange = (value: RasterSymbolizer['resampling']) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.resampling = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  }

  render() {
    const {
      locale,
      symbolizer
    } = this.props;

    const {
      opacity,
      hueRotate,
      brightnessMin,
      brightnessMax,
      saturation,
      contrast,
      fadeDuration,
      resampling
    } = symbolizer;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };

    return (
      <div className="gs-raster-symbolizer-editor" >
        <Form.Item
          label={locale.opacityLabel}
          {...formItemLayout}
        >
          <OpacityField
            opacity={opacity}
            onChange={this.onOpacityChange}
          />
        </Form.Item>
        <Form.Item
          label={locale.hueRotateLabel}
          {...formItemLayout}
        >
          <RotateField
            rotate={hueRotate}
            onChange={this.onHueRotateChange}
          />
        </Form.Item>
        <Form.Item
          label={locale.brightnessMinLabel}
          {...formItemLayout}
        >
          <BrightnessField
            brightness={brightnessMin}
            onChange={this.onBrightnessMinChange}
          />
        </Form.Item>
        <Form.Item
          label={locale.brightnessMaxLabel}
          {...formItemLayout}
        >
          <BrightnessField
            brightness={brightnessMax}
            onChange={this.onBrightnessMaxChange}
          />
        </Form.Item>
        <Form.Item
          label={locale.saturationLabel}
          {...formItemLayout}
        >
          <SaturationField
            saturation={saturation}
            onChange={this.onSaturationChange}
          />
        </Form.Item>
        <Form.Item
          label={locale.contrastLabel}
          {...formItemLayout}
        >
          <ContrastField
            contrast={contrast}
            onChange={this.onContrastChange}
          />
        </Form.Item>
        <Form.Item
          label={locale.fadeDurationLabel}
          {...formItemLayout}
        >
          <FadeDurationField
            fadeDuration={fadeDuration}
            onChange={this.onFadeDurationChange}
          />
        </Form.Item>
        <Form.Item
          label={locale.resamplingLabel}
          {...formItemLayout}
        >
          <ResamplingField
            resampling={resampling}
            onChange={this.onResamplingChange}
          />
        </Form.Item>
      </div>
    );
  }
}

export default localize(RasterEditor, RasterEditor.componentName);
