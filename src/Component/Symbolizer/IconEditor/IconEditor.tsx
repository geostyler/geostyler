import * as React from 'react';

import {
  Symbolizer,
  IconSymbolizer
} from 'geostyler-style';

import OpacityField from '../Field/OpacityField/OpacityField';
import ImageField from '../Field/ImageField/ImageField';

const _cloneDeep = require('lodash/cloneDeep');
const _isEmpty = require('lodash/isEmpty');
const _isEqual = require('lodash/isEqual');
import RotateField from '../Field/RotateField/RotateField';
import SizeField from '../Field/SizeField/SizeField';

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';

// i18n
export interface IconEditorLocale {
  imageLabel?: string;
  sizeLabel?: string;
  rotateLabel?: string;
  opacityLabel?: string;
}

// default props
export interface DefaultIconEditorProps {
  locale: IconEditorLocale;
}

// non default props
export interface IconEditorProps extends Partial<DefaultIconEditorProps> {
  symbolizer: IconSymbolizer;
  onSymbolizerChange: ((changedSymb: Symbolizer) => void);
}

class IconEditor extends React.Component<IconEditorProps> {

  public static defaultProps: DefaultIconEditorProps = {
    locale: en_US.GsIconEditor
  };

  public shouldComponentUpdate(nextProps: IconEditorProps): boolean {
    const diffProps = !_isEqual(this.props, nextProps);
    return diffProps;
  }

  static componentName: string = 'IconEditor';

  onSymbolizerChange = (symbolizer: Symbolizer) => {
    this.props.onSymbolizerChange(symbolizer);
  }

  onImageSrcChange = (value: string) => {
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.image = value;
    this.props.onSymbolizerChange(symbolizer);
  }

  onSizeChange = (value: number) => {
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.size = value;
    this.props.onSymbolizerChange(symbolizer);
  }

  onRotateChange = (value: number) => {
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.rotate = value;
    this.props.onSymbolizerChange(symbolizer);
  }

  onOpacityChange = (value: number) => {
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.opacity = value;
    this.props.onSymbolizerChange(symbolizer);
  }

  render() {
    const {
      locale
    } = this.props;

    const {
      symbolizer
    } = this.props;

    const {
      opacity,
      image,
      size,
      rotate
    } = symbolizer;

    const imageSrc = !_isEmpty(image) ? image : 'URL to Icon';

    return (
      <div className="gs-icon-symbolizer-editor" >
        <ImageField
          value={imageSrc}
          label={locale.imageLabel}
          onChange={this.onImageSrcChange}
        />
        <SizeField
          size={size}
          label={locale.sizeLabel}
          onChange={this.onSizeChange}
        />
        <RotateField
          rotate={rotate}
          label={locale.rotateLabel}
          onChange={this.onRotateChange}
        />
        <OpacityField
          opacity={opacity}
          label={locale.opacityLabel}
          onChange={this.onOpacityChange}
        />
      </div>
    );
  }
}

export default localize(IconEditor, IconEditor.componentName);
