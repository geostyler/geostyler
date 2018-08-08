import * as React from 'react';

import {
  Symbolizer,
  LineSymbolizer
} from 'geostyler-style';

import ColorField from '../Field/ColorField/ColorField';
import OpacityField from '../Field/OpacityField/OpacityField';
import WidthField from '../Field/WidthField/WidthField';
import LineDashField from '../Field/LineDashField/LineDashField';
import LineCapField from '../Field/LineCapField/LineCapField';
import LineJoinField from '../Field/LineJoinField/LineJoinField';
import OffsetField from '../Field/OffsetField/OffsetField';

const _cloneDeep = require('lodash/cloneDeep');

import { localize } from '../../LocaleWrapper/LocaleWrapper';

// i18n
export interface LineEditorLocale {
  colorLabel?: string;
  widthLabel?: string;
  opacityLabel?: string;
  dashLabel?: string;
  dashOffsetLabel?: string;
  capLabel?: string;
  joinLabel?: string;
}

// non default props
interface LineEditorProps {
  symbolizer: LineSymbolizer;
  onSymbolizerChange: ((changedSymb: Symbolizer) => void);
  locale?: LineEditorLocale;
}

export class LineEditor extends React.Component<LineEditorProps, {}> {

  static componentName: string = 'LineEditor';

  onSymbolizerChange = (symbolizer: Symbolizer) => {
    this.props.onSymbolizerChange(symbolizer);
  }

  render() {
    const symbolizer = _cloneDeep(this.props.symbolizer);

    const {
      color,
      width,
      opacity,
      dasharray,
      cap,
      join,
      dashOffset
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
        <OffsetField
          offset={dashOffset}
          label={locale.dashOffsetLabel}
          onChange={(value: LineSymbolizer['dashOffset']) => {
            symbolizer.dashOffset = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
          disabled={symbolizer.dasharray === undefined || symbolizer.dasharray.length === 0}
        />
        <LineCapField
          cap={cap}
          label={locale.capLabel}
          onChange={(value: LineSymbolizer['cap']) => {
            symbolizer.cap = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
        <LineJoinField
          join={join}
          label={locale.joinLabel}
          onChange={(value: LineSymbolizer['join']) => {
            symbolizer.join = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
      </div>
    );
  }
}

export default localize(LineEditor, LineEditor.componentName);
