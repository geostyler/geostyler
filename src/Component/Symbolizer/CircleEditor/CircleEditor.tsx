import * as React from 'react';

import {
  Symbolizer,
  CircleSymbolizer
} from 'geostyler-style';

import ColorField from '../Field/ColorField/ColorField';
import OpacityField from '../Field/OpacityField/OpacityField';
import RadiusField from '../Field/RadiusField/RadiusField';
import WidthField from '../Field/WidthField/WidthField';

const _cloneDeep = require('lodash/cloneDeep');

// default props
export interface DefaultCircleEditorProps {
  radiusLabel: string;
  fillOpacityLabel: string;
  fillColorLabel: string;
  strokeColorLabel: string;
  strokeWidthLabel: string;
  strokeOpacityLabel: string;
}

// non default props
interface CircleEditorProps extends Partial<DefaultCircleEditorProps> {
  symbolizer: CircleSymbolizer;
  onSymbolizerChange: ((changedSymb: Symbolizer) => void);
}

class CircleEditor extends React.Component<CircleEditorProps, {}> {

  public static defaultProps: DefaultCircleEditorProps = {
    radiusLabel: 'Radius',
    fillOpacityLabel: 'Fill-Opacity',
    fillColorLabel: 'Fill-Color',
    strokeColorLabel: 'Stroke-Color',
    strokeWidthLabel: 'Stroke-Width',
    strokeOpacityLabel: 'Stroke-Opacity'
  };

  onSymbolizerChange = (symbolizer: Symbolizer) => {
    this.props.onSymbolizerChange(symbolizer);
  }

  render() {
    const {
      radiusLabel,
      fillOpacityLabel,
      fillColorLabel,
      strokeColorLabel,
      strokeWidthLabel,
      strokeOpacityLabel
    } = this.props;

    const symbolizer = _cloneDeep(this.props.symbolizer);

    const {
      radius,
      opacity,
      color,
      strokeOpacity,
      strokeColor,
      strokeWidth
    } = symbolizer;

    return (
      <div className="gs-circle-symbolizer-editor" >
        <RadiusField
          label={radiusLabel}
          radius={radius}
          onChange={(value: number) => {
            symbolizer.radius = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
        <ColorField
          color={color}
          label={fillColorLabel}
          onChange={(value: string) => {
            symbolizer.color = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
        <OpacityField
          opacity={opacity}
          label={fillOpacityLabel}
          onChange={(value: number) => {
            symbolizer.opacity = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
        <ColorField
          color={strokeColor}
          label={strokeColorLabel}
          onChange={(value: string) => {
            symbolizer.strokeColor = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
        <WidthField
          width={strokeWidth}
          label={strokeWidthLabel}
          onChange={(value: number) => {
            symbolizer.strokeWidth = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
        <OpacityField
          opacity={strokeOpacity}
          label={strokeOpacityLabel}
          onChange={(value: number) => {
            symbolizer.strokeOpacity = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
      </div>
    );
  }
}

export default CircleEditor;
