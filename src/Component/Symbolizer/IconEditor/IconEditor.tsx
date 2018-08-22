import * as React from 'react';

import {
  Symbolizer,
  IconSymbolizer,
  IconMime
} from 'geostyler-style';

import OpacityField from '../Field/OpacityField/OpacityField';
import ImageField from '../Field/ImageField/ImageField';

const _cloneDeep = require('lodash/cloneDeep');
const _isEmpty = require('lodash/isEmpty');
import RotateField from '../Field/RotateField/RotateField';
import SizeField from '../Field/SizeField/SizeField';

import { localize } from '../../LocaleWrapper/LocaleWrapper';

// i18n
export interface IconEditorLocale {
  imageLabel?: string;
  sizeLabel?: string;
  rotateLabel?: string;
  opacityLabel?: string;
}

// default props
export interface DefaultIconEditorProps {
  defaultIconSource: string;
  locale?: IconEditorLocale;
}

// non default props
interface IconEditorProps extends Partial<DefaultIconEditorProps> {
  symbolizer: IconSymbolizer;
  onSymbolizerChange: ((changedSymb: Symbolizer) => void);
}

class IconEditor extends React.Component<IconEditorProps, {}> {

  public static defaultProps: DefaultIconEditorProps = {
    defaultIconSource: 'img/openLayers_logo.svg'
  };

  static componentName: string = 'IconEditor';

  onSymbolizerChange = (symbolizer: Symbolizer) => {
    this.props.onSymbolizerChange(symbolizer);
  }

  render() {
    const {
      defaultIconSource,
      locale
    } = this.props;

    const symbolizer = _cloneDeep(this.props.symbolizer);

    const {
      opacity,
      image,
      size,
      rotate
    } = symbolizer;

    const imageSrc = !_isEmpty(image) ? image : defaultIconSource;

    return (
      <div className="gs-icon-symbolizer-editor" >
        <ImageField
          image={imageSrc}
          label={locale.imageLabel}
          onChange={(value: string, mime: IconMime) => {
            symbolizer.image = value;
            symbolizer.format = mime;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
        <SizeField
          size={size}
          label={locale.sizeLabel}
          onChange={(value: number) => {
            symbolizer.size = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />

        <RotateField
          rotate={rotate}
          label={locale.rotateLabel}
          onChange={(value: number) => {
            symbolizer.rotate = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
        <OpacityField
          opacity={opacity}
          label={locale.opacityLabel}
          onChange={(value: number) => {
            symbolizer.opacity = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
      </div>
    );
  }
}

export default localize(IconEditor, IconEditor.componentName);
