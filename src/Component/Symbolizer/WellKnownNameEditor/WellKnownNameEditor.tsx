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
import RotateField from '../Field/RotateField/RotateField';
import en_US from '../../../locale/en_US';

const  _cloneDeep = require('lodash/cloneDeep');
const _get = require('lodash/get');

// i18n
interface WellKnownNameEditorLocale {
  radiusLabel?: string;
  fillOpacityLabel?: string;
  fillColorLabel?: string;
  strokeColorLabel?: string;
  strokeWidthLabel?: string;
  strokeOpacityLabel?: string;
  rotateLabel?: string;
}

interface WellKnownNameEditorDefaultProps {
  locale: WellKnownNameEditorLocale;
}

// non default props
interface WellKnownNameEditorProps extends Partial<WellKnownNameEditorDefaultProps> {
  symbolizer: MarkSymbolizer;
  onSymbolizerChange: ((changedSymb: Symbolizer) => void);
}

export class WellKnownNameEditor extends React.Component<WellKnownNameEditorProps, {}> {

  public static defaultProps: WellKnownNameEditorDefaultProps = {
    locale: en_US.GsWellKnownNameEditor
  };

  static componentName: string = 'WellKnownNameEditor';

  render () {
    const symbolizer = _cloneDeep(this.props.symbolizer);

    const {
      radius,
      color,
      opacity,
      rotate,
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
          label={_get(locale, 'radiusLabel')}
          radius={radius}
          onChange={(value: number) => {
            symbolizer.radius = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
        <ColorField
          color={color}
          label={_get(locale, 'fillColorLabel')}
          onChange={(value: string) => {
            symbolizer.color = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
        <OpacityField
          opacity={opacity}
          label={_get(locale, 'fillOpacityLabel')}
          onChange={(value: number) => {
            symbolizer.opacity = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
        <ColorField
          color={strokeColor}
          label={_get(locale, 'strokeColorLabel')}
          onChange={(value: string) => {
            symbolizer.strokeColor = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
        <WidthField
          width={strokeWidth}
          label={_get(locale, 'strokeWidthLabel')}
          onChange={(value: number) => {
            symbolizer.strokeWidth = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
        <OpacityField
          opacity={strokeOpacity}
          label={_get(locale, 'strokeOpacityLabel')}
          onChange={(value: number) => {
            symbolizer.strokeOpacity = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
        <RotateField
          rotate={rotate}
          label={_get(locale, 'rotateLabel')}
          onChange={(value: number) => {
            symbolizer.rotate = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
      </div>
    );
  }
}

export default localize(WellKnownNameEditor, WellKnownNameEditor.componentName);
