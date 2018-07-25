import * as React from 'react';

import {
  Symbolizer,
  LineSymbolizer
} from 'geostyler-style';

import ColorField from '../Field/ColorField/ColorField';
import OpacityField from '../Field/OpacityField/OpacityField';
import WidthField from '../Field/WidthField/WidthField';
import LineDashField from '../Field/LineDashField/LineDashField';

import {
  cloneDeep as _cloneDeep
} from 'lodash';

import { localize } from '../../LocaleWrapper/LocaleWrapper';

// i18n
interface LineEditorLocale {
  colorLabel: string;
  widthLabel: string;
  opacityLabel: string;
  dashLabel: string;
}

// non default props
interface LineEditorProps {
  symbolizer: LineSymbolizer;
  onSymbolizerChange: ((changedSymb: Symbolizer) => void);
  locale?: LineEditorLocale;
}

class LineEditor extends React.Component<LineEditorProps, {}> {

  onSymbolizerChange = (symbolizer: Symbolizer) => {
    this.props.onSymbolizerChange(symbolizer);
  }

  render() {
    const symbolizer = _cloneDeep(this.props.symbolizer);

    const {
      color,
      width,
      opacity,
      dasharray
    } = symbolizer;

    const {
      locale
    } = this.props;

    return (
      <div className="gs-line-symbolizer-editor" >
        <ColorField
          color={color}
          label={locale.colorLabel}
          onChange={(value: string) => {
            symbolizer.color = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
        <WidthField
          width={width}
          label={locale.widthLabel}
          onChange={(value: number) => {
            symbolizer.width = value;
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
        <LineDashField
          dashArray={dasharray}
          label={locale.dashLabel}
          onChange={(value: number[]) => {
            symbolizer.dasharray = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
      </div>
    );
  }
}

export default localize(LineEditor);
