import * as React from 'react';

import {
  Symbolizer,
  FillSymbolizer
} from 'geostyler-style';

import ColorField from '../Field/ColorField/ColorField';
import OpacityField from '../Field/OpacityField/OpacityField';

const _cloneDeep = require('lodash/cloneDeep');

// default props
export interface DefaultFillEditorProps {
  fillOpacityLabel: string;
  fillColorLabel: string;
  outlineColorLabel: string;
}

// non default props
interface FillEditorProps extends Partial<DefaultFillEditorProps> {
  symbolizer: FillSymbolizer;
  onSymbolizerChange: ((changedSymb: Symbolizer) => void);
}

class FillEditor extends React.Component<FillEditorProps, {}> {

  public static defaultProps: DefaultFillEditorProps = {
    fillOpacityLabel: 'Fill-Opacity',
    fillColorLabel: 'Fill-Color',
    outlineColorLabel: 'Stroke-Color'
  };

  onSymbolizerChange = (symbolizer: Symbolizer) => {
    this.props.onSymbolizerChange(symbolizer);
  }

  render() {
    const {
      fillColorLabel,
      fillOpacityLabel,
      outlineColorLabel
    } = this.props;

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
          color={outlineColor}
          label={outlineColorLabel}
          onChange={(value: string) => {
            symbolizer.outlineColor = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
      </div>
    );
  }
}

export default FillEditor;
