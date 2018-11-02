import * as React from 'react';

import {
  Symbolizer,
  IconSymbolizer
} from 'geostyler-style';

import OpacityField from '../Field/OpacityField/OpacityField';
import ImageField from '../Field/ImageField/ImageField';

const _cloneDeep = require('lodash/cloneDeep');
const _isEmpty = require('lodash/isEmpty');
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

class IconEditor extends React.Component<IconEditorProps, {}> {

  public static defaultProps: DefaultIconEditorProps = {
    locale: en_US.GsIconEditor
  };

  static componentName: string = 'IconEditor';

  onSymbolizerChange = (symbolizer: Symbolizer) => {
    this.props.onSymbolizerChange(symbolizer);
  }

  render() {
    const {
      locale
    } = this.props;

    const symbolizer = _cloneDeep(this.props.symbolizer);

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
          onChange={(value: string) => {
            symbolizer.image = value;
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
