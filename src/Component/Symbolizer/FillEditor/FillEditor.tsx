import * as React from 'react';

import {
  Symbolizer,
  FillSymbolizer
} from 'geostyler-style';

import ColorField from '../Field/ColorField/ColorField';
import OpacityField from '../Field/OpacityField/OpacityField';

import {
  cloneDeep as _cloneDeep
} from 'lodash';

import { localize } from '../../LocaleWrapper/LocaleWrapper';

// i18n
export interface FillEditorLocale {
  fillOpacityLabel?: string;
  fillColorLabel?: string;
  outlineColorLabel?: string;
}

// non default props
interface FillEditorProps {
  symbolizer: FillSymbolizer;
  onSymbolizerChange: ((changedSymb: Symbolizer) => void);
  locale?: FillEditorLocale;
}

export class FillEditor extends React.Component<FillEditorProps, {}> {
  
  onSymbolizerChange = (symbolizer: Symbolizer) => {
    this.props.onSymbolizerChange(symbolizer);
  }

  render() {
    const symbolizer = _cloneDeep(this.props.symbolizer);

    const {
      color,
      opacity,
      outlineColor
    } = symbolizer;

    const {
      locale
    } = this.props;

    return (
      <div className="gs-fill-symbolizer-editor" >
        <ColorField
          color={color}
          label={locale.fillColorLabel}
          onChange={(value: string) => {
            symbolizer.color = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
        <OpacityField
          opacity={opacity}
          label={locale.fillOpacityLabel}
          onChange={(value: number) => {
            symbolizer.opacity = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
        <ColorField
          color={outlineColor}
          label={locale.outlineColorLabel}
          onChange={(value: string) => {
            symbolizer.outlineColor = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
      </div>
    );
  }
}

export default localize(FillEditor);
