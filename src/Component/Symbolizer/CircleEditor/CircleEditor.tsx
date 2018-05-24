import * as React from 'react';

import {
  Symbolizer,
  CircleSymbolizer
} from 'geostyler-style';

import ColorField from '../Field/ColorField/ColorField';
import OpacityField from '../Field/OpacityField/OpacityField';
import RadiusField from '../Field/RadiusField/RadiusField';
import WidthField from '../Field/WidthField/WidthField';

// default props
interface DefaultCircleEditorProps {}

// non default props
interface CircleEditorProps extends Partial<DefaultCircleEditorProps> {
  symbolizer: CircleSymbolizer;
  onSymbolizerChange: ((changedSymb: Symbolizer) => void);
}

// state
interface CircleEditorState {
  symbolizer: CircleSymbolizer;
}

class CircleEditor extends React.Component<CircleEditorProps, CircleEditorState> {

  public static defaultProps: DefaultCircleEditorProps = {
  };

  static getDerivedStateFromProps(nextProps: CircleEditorProps, prevState: CircleEditorState): CircleEditorState {
    return {
      symbolizer: nextProps.symbolizer,
      ...prevState
    };
  }

  onSymbolizerChange = (symbolizer: Symbolizer) => {
    this.props.onSymbolizerChange(symbolizer);
  }

  render() {
    const {
      symbolizer
    } = this.state;

    const {
    radius,
    opacity,
    color,
    strokeOpacity,
    strokeColor,
    strokeWidth
    } = this.props.symbolizer;

    return (
      <div className="gs-circle-symbolizer-editor" >
        <RadiusField
          radius={radius}
          onChange={(value: number) => {
            symbolizer.radius = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
        <ColorField
          color={color}
          label="Fill-Color"
          onChange={(value: string) => {
            symbolizer.color = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
        <OpacityField
          opacity={opacity}
          label="Fill-Opacity"
          onChange={(value: number) => {
            symbolizer.opacity = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
        <ColorField
          color={strokeColor}
          label="Stroke-Color"
          onChange={(value: string) => {
            symbolizer.strokeColor = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
        <WidthField
          width={strokeWidth}
          label="Stroke-Width"
          onChange={(value: number) => {
            symbolizer.strokeWidth = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
        <OpacityField
          opacity={strokeOpacity}
          label="Stroke-Opacity"
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
