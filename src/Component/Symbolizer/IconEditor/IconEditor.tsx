import * as React from 'react';

import {
  Symbolizer,
  IconSymbolizer
} from 'geostyler-style';

import OpacityField from '../Field/OpacityField/OpacityField';
import ImageField from '../Field/ImageField/ImageField';
import { IconLibrary } from '../IconSelector/IconSelector';

const _cloneDeep = require('lodash/cloneDeep');
const _isEmpty = require('lodash/isEmpty');
const _isEqual = require('lodash/isEqual');
import RotateField from '../Field/RotateField/RotateField';
import SizeField from '../Field/SizeField/SizeField';

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';
import { Form } from 'antd';

// i18n
export interface IconEditorLocale {
  imageLabel?: string;
  sizeLabel?: string;
  rotateLabel?: string;
  opacityLabel?: string;
  iconTooltipLabel?: string;
}

// default props
export interface IconEditorDefaultProps {
  locale: IconEditorLocale;
}

// non default props
export interface IconEditorProps extends Partial<IconEditorDefaultProps> {
  symbolizer: IconSymbolizer;
  onSymbolizerChange?: (changedSymb: Symbolizer) => void;
  iconLibraries?: IconLibrary[];
}

export class IconEditor extends React.Component<IconEditorProps> {

  public static defaultProps: IconEditorDefaultProps = {
    locale: en_US.GsIconEditor
  };

  public shouldComponentUpdate(nextProps: IconEditorProps): boolean {
    const diffProps = !_isEqual(this.props, nextProps);
    return diffProps;
  }

  static componentName: string = 'IconEditor';

  onImageSrcChange = (value: string) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.image = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  }

  onSizeChange = (value: number) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.size = value;
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
      locale
    } = this.props;

    const {
      symbolizer,
      iconLibraries
    } = this.props;

    const {
      opacity,
      image,
      size,
      rotate
    } = symbolizer;

    const imageSrc = !_isEmpty(image) ? image : 'URL to Icon';

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };

    return (
      <div className="gs-icon-symbolizer-editor" >
        <Form.Item
          label={locale.imageLabel}
          {...formItemLayout}
        >
          <ImageField
            value={imageSrc}
            iconLibraries={iconLibraries}
            tooltipLabel={locale.iconTooltipLabel}
            onChange={this.onImageSrcChange}
          />
        </Form.Item>
        <Form.Item
          label={locale.sizeLabel}
          {...formItemLayout}
        >
          <SizeField
            size={size}
            onChange={this.onSizeChange}
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
        <Form.Item
          label=
          {locale.opacityLabel}
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

export default localize(IconEditor, IconEditor.componentName);
