import * as React from 'react';
import { localize } from '../../LocaleWrapper/LocaleWrapper';
import { 
  MarkSymbolizer,
  Symbolizer
 } from 'geostyler-style';

import ColorField from '../Field/ColorField/ColorField';
import OpacityField from '../Field/OpacityField/OpacityField';
import RadiusField from '../Field/RadiusField/RadiusField';
import WidthField from '../Field/WidthField/WidthField';

const  _cloneDeep = require('lodash/cloneDeep');

// i18n
interface WellKnownNameEditorLocale {
  radiusLabel?: string;
  radius2Label?: string;
  fillOpacityLabel?: string;
  fillColorLabel?: string;
  strokeColorLabel?: string;
  strokeWidthLabel?: string;
  strokeOpacityLabel?: string;
  rotationLabel?: string;
}

// non default props
interface WellKnownNameEditorProps {
  symbolizer: MarkSymbolizer;
  onSymbolizerChange: ((changedSymb: Symbolizer) => void);
  locale?: WellKnownNameEditorLocale;
}

class WellKnownNameEditor extends React.Component<WellKnownNameEditorProps, {}> {

  render () {
    const symbolizer = _cloneDeep(this.props.symbolizer);

    const {
      radius,
      color,
      opacity,
      strokeColor,
      strokeWidth,
      strokeOpacity
    } = symbolizer;

    const {
      locale
    } = this.props;

    return (
      <div>
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

export default localize(WellKnownNameEditor);
