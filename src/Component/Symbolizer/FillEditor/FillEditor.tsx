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

import en_US from './locale/en_US';
import LocaleReceiver from 'antd/lib/locale-provider/LocaleReceiver';

// i18n
interface FillEditorLocale {
  fillOpacityLabel: string;
  fillColorLabel: string;
  outlineColorLabel: string;
}

// non default props
interface FillEditorProps {
  symbolizer: FillSymbolizer;
  onSymbolizerChange: ((changedSymb: Symbolizer) => void);
}

class FillEditor extends React.Component<FillEditorProps, {}> {

  onSymbolizerChange = (symbolizer: Symbolizer) => {
    this.props.onSymbolizerChange(symbolizer);
  }

  renderFillEditor = (locale: FillEditorLocale) => {
    const symbolizer = _cloneDeep(this.props.symbolizer);

    const {
      color,
      opacity,
      outlineColor
    } = symbolizer;

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

  render() {
    return(
      <LocaleReceiver
        componentName="GsFillEditor"
        defaultLocale={en_US}
      >
        {this.renderFillEditor}
      </LocaleReceiver>
    );
  }
}

export default FillEditor;
