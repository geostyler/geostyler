import * as React from 'react';

import {
  Symbolizer,
  RasterSymbolizer
} from 'geostyler-style';

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';
import { Form } from 'antd';
import OpacityField from '../Field/OpacityField/OpacityField';
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

  render() {
    const {
      locale,
      symbolizer
    } = this.props;

    const {
      opacity
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
      </div>
    );
  }
}

export default localize(RasterEditor, RasterEditor.componentName);
