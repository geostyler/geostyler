import * as React from 'react';

import {
  Symbolizer,
  TextSymbolizer
} from 'geostyler-style';

import ColorField from '../Field/ColorField/ColorField';
import OpacityField from '../Field/OpacityField/OpacityField';
import WidthField from '../Field/WidthField/WidthField';

const _cloneDeep = require('lodash/cloneDeep');
import FontPicker from '../Field/FontPicker/FontPicker';
import OffsetField from '../Field/OffsetField/OffsetField';
import AttributeCombo from '../../Filter/AttributeCombo/AttributeCombo';
import { Data } from 'geostyler-data';

import './TextEditor.css';

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import RotateField from '../Field/RotateField/RotateField';

// i18n
export interface TextEditorLocale {
  fieldLabel: string;
  opacityLabel?: string;
  colorLabel?: string;
  sizeLabel?: string;
  offsetXLabel?: string;
  offsetYLabel?: string;
  fontLabel?: string;
  rotateLabel?: string;
  haloColorLabel?: string;
  haloWidthLabel?: string;
  attributeComboPlaceholder?: string;
}

// non default props
interface TextEditorProps {
  symbolizer: TextSymbolizer;
  internalDataDef?: Data;
  onSymbolizerChange: ((changedSymb: Symbolizer) => void);
  locale?: TextEditorLocale;
}

export class TextEditor extends React.Component<TextEditorProps, {}> {

  static componentName: string = 'TextEditor';

  onSymbolizerChange = (symbolizer: Symbolizer) => {
    this.props.onSymbolizerChange(symbolizer);
  }

  render() {
    const {
      internalDataDef,
      locale
    } = this.props;

    const symbolizer = _cloneDeep(this.props.symbolizer);

    const {
      opacity,
      color,
      font,
      offset,
      size,
      rotate,
      haloColor,
      haloWidth
    } = symbolizer;

    // split the current offset
    let offsetX;
    let offsetY;
    if (offset) {
      offsetX = offset[0];
      offsetY = offset[1];
    }

    return (
      <div className="gs-text-symbolizer-editor" >
         <div className="editor-field attribute-field">
          <span className="label">{locale.fieldLabel}:</span>
          <AttributeCombo
            value={symbolizer.field}
            placeholder={locale.attributeComboPlaceholder}
            internalDataDef={internalDataDef}
            onAttributeChange={(newAttrName: string) => {
              symbolizer.field = newAttrName;
              this.props.onSymbolizerChange(symbolizer);
            }}
          />
        </div>
        <ColorField
          color={color}
          label={locale.colorLabel}
          onChange={(value: string) => {
            symbolizer.color = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
        <FontPicker
          font={font}
          label={locale.fontLabel}
          onChange={(value: string[]) => {
            symbolizer.font = value.length > 0 ? value : undefined;
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
        <WidthField
          width={size}
          label={locale.sizeLabel}
          onChange={(value: number) => {
            symbolizer.size = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
        <OffsetField
          offset={offsetX}
          label={locale.offsetXLabel}
          onChange={(value: number) => {
            let newOffset: [number, number] = [value, (symbolizer.offset ? symbolizer.offset[1] : 0)];
            symbolizer.offset = newOffset;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
        <OffsetField
          offset={offsetY}
          label={locale.offsetYLabel}
          onChange={(value: number) => {
            let newOffset: [number, number] = [(symbolizer.offset ? symbolizer.offset[0] : 0), value];
            symbolizer.offset = newOffset;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
        <RotateField
          rotate={rotate}
          label={locale.rotateLabel}
          onChange={(value: number) => {
            symbolizer.rotate = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
        <ColorField
          color={haloColor}
          label={locale.haloColorLabel}
          onChange={(value: string) => {
            symbolizer.haloColor = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
        <WidthField
          width={haloWidth}
          label={locale.haloWidthLabel}
          onChange={(value: number) => {
            symbolizer.haloWidth = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
      </div>
    );
  }
}

export default localize(TextEditor, TextEditor.componentName);
