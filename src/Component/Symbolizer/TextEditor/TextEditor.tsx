import * as React from 'react';

import {
  Symbolizer,
  TextSymbolizer
} from 'geostyler-style';

import ColorField from '../Field/ColorField/ColorField';
import OpacityField from '../Field/OpacityField/OpacityField';
import WidthField from '../Field/WidthField/WidthField';

import {
  cloneDeep as _cloneDeep
} from 'lodash';
import FontPicker from '../Field/FontPicker/FontPicker';
import OffsetField from '../Field/OffsetField/OffsetField';
import AttributeCombo from '../../Filter/AttributeCombo/AttributeCombo';
import { Data } from 'geostyler-data';

import './TextEditor.css';

// default props
interface DefaultTextEditorProps {
  opacityLabel: string;
  colorLabel: string;
  sizeLabel: string;
  offsetXLabel: string;
  offsetYLabel: string;
}

// non default props
interface TextEditorProps extends Partial<DefaultTextEditorProps> {
  symbolizer: TextSymbolizer;
  internalDataDef?: Data;
  onSymbolizerChange: ((changedSymb: Symbolizer) => void);
}

class TextEditor extends React.Component<TextEditorProps, {}> {

  public static defaultProps: DefaultTextEditorProps = {
    opacityLabel: 'Text-Opacity',
    colorLabel: 'Text-Color',
    sizeLabel: 'Text-Size',
    offsetXLabel: 'Offset X',
    offsetYLabel: 'Offset Y'
  };

  onSymbolizerChange = (symbolizer: Symbolizer) => {
    this.props.onSymbolizerChange(symbolizer);
  }

  render() {
    const {
      opacityLabel,
      colorLabel,
      sizeLabel,
      offsetXLabel,
      offsetYLabel,
      internalDataDef
    } = this.props;

    const symbolizer = _cloneDeep(this.props.symbolizer);

    const {
      opacity,
      color,
      font,
      offset,
      size,
    } = symbolizer;

    // split the current offset
    let offsetX = 0;
    let offsetY = 0;
    if (offset) {
      offsetX = offset[0];
      offsetY = offset[0];
    }

    return (

      <div className="gs-text-symbolizer-editor" >
         <div className="editor-field width-field">
          <span className="label">Foo</span>
          <AttributeCombo
            value={symbolizer.field}
            internalDataDef={internalDataDef}
            onAttributeChange={(newAttrName: string) => {
              symbolizer.field = newAttrName;
              this.props.onSymbolizerChange(symbolizer);
            }}
          />
        </div>
        <ColorField
          color={color}
          label={colorLabel}
          onChange={(value: string) => {
            symbolizer.color = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
        <FontPicker
          font={font}
          onChange={(value: string[]) => {
            symbolizer.font = value;
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
        <WidthField
          width={size}
          label={sizeLabel}
          onChange={(value: number) => {
            symbolizer.size = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
        <OffsetField
          offset={offsetX}
          label={offsetXLabel}
          onChange={(value: number) => {
            let newOffset: [number, number] = [value, (symbolizer.offset ? symbolizer.offset[1] : 0)];
            symbolizer.offset = newOffset;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
        <OffsetField
          offset={offsetY}
          label={offsetYLabel}
          onChange={(value: number) => {
            let newOffset: [number, number] = [(symbolizer.offset ? symbolizer.offset[0] : 0), value];
            symbolizer.offset = newOffset;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
      </div>
    );
  }
}

export default TextEditor;
