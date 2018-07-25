import * as React from 'react';

import {
  Symbolizer,
  CircleSymbolizer
} from 'geostyler-style';

import ColorField from '../Field/ColorField/ColorField';
import OpacityField from '../Field/OpacityField/OpacityField';
import RadiusField from '../Field/RadiusField/RadiusField';
import WidthField from '../Field/WidthField/WidthField';

import {
  cloneDeep as _cloneDeep
} from 'lodash';

import { localize } from '../../LocaleWrapper/LocaleWrapper';

// i18n
interface CircleEditorLocale {
  radiusLabel: string;
  fillOpacityLabel: string;
  fillColorLabel: string;
  strokeColorLabel: string;
  strokeWidthLabel: string;
  strokeOpacityLabel: string;
}

// non default props
interface CircleEditorProps {
  symbolizer: CircleSymbolizer;
  onSymbolizerChange: ((changedSymb: Symbolizer) => void);
  locale?: CircleEditorLocale;
}

class CircleEditor extends React.Component<CircleEditorProps, {}> {

  onSymbolizerChange = (symbolizer: Symbolizer) => {
    this.props.onSymbolizerChange(symbolizer);
  }

  render() {
    const symbolizer = _cloneDeep(this.props.symbolizer);

    const {
      radius,
      opacity,
      color,
      strokeOpacity,
      strokeColor,
      strokeWidth
    } = symbolizer;

    const {
      locale
    } = this.props;

    return (
      <div className="gs-circle-symbolizer-editor" >
        <RadiusField
          label={locale.radiusLabel}
          radius={radius}
          onChange={(value: number) => {
            symbolizer.radius = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
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
          color={strokeColor}
          label={locale.strokeColorLabel}
          onChange={(value: string) => {
            symbolizer.strokeColor = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
        <WidthField
          width={strokeWidth}
          label={locale.strokeWidthLabel}
          onChange={(value: number) => {
            symbolizer.strokeWidth = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
        <OpacityField
          opacity={strokeOpacity}
          label={locale.strokeOpacityLabel}
          onChange={(value: number) => {
            symbolizer.strokeOpacity = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
      </div>
    );
  }
}

export default localize(CircleEditor);
