import * as React from 'react';

import {
  Symbolizer,
  LineSymbolizer
} from 'geostyler-style';

import ColorField from '../Field/ColorField/ColorField';
import OpacityField from '../Field/OpacityField/OpacityField';
import WidthField from '../Field/WidthField/WidthField';

import {
  cloneDeep as _cloneDeep
} from 'lodash';

// default props
interface DefaultLineEditorProps {
  colorLabel: string;
  widthLabel: string;
  opacityLabel: string;
}

// non default props
interface LineEditorProps extends Partial<DefaultLineEditorProps> {
  symbolizer: LineSymbolizer;
  onSymbolizerChange: ((changedSymb: Symbolizer) => void);
}

class LineEditor extends React.Component<LineEditorProps, {}> {

  public static defaultProps: DefaultLineEditorProps = {
    colorLabel: 'Color',
    widthLabel: 'Width',
    opacityLabel: 'Opacity'
  };

  onSymbolizerChange = (symbolizer: Symbolizer) => {
    this.props.onSymbolizerChange(symbolizer);
  }

  render() {
    const {
      colorLabel,
      widthLabel,
      opacityLabel
    } = this.props;

    const symbolizer = _cloneDeep(this.props.symbolizer);

    const {
      color,
      width,
      opacity,
    } = symbolizer;

    return (
      <div className="gs-line-symbolizer-editor" >
        <ColorField
          color={color}
          label={colorLabel}
          onChange={(value: string) => {
            symbolizer.color = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
        <WidthField
          width={width}
          label={widthLabel}
          onChange={(value: number) => {
            symbolizer.width = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
        <OpacityField
          opacity={opacity}
          label={opacityLabel}
          onChange={(value: number) => {
            symbolizer.opacity = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
      </div>
    );
  }
}

export default LineEditor;
