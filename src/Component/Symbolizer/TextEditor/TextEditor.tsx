import * as React from 'react';
import { Mention } from 'antd';
const { toString, toContentState } = Mention;

import {
  Symbolizer,
  TextSymbolizer
} from 'geostyler-style';

import ColorField from '../Field/ColorField/ColorField';
import OpacityField from '../Field/OpacityField/OpacityField';
import WidthField from '../Field/WidthField/WidthField';
import FontPicker from '../Field/FontPicker/FontPicker';
import OffsetField from '../Field/OffsetField/OffsetField';
import RotateField from '../Field/RotateField/RotateField';

const _cloneDeep = require('lodash/cloneDeep');
const _isEqual = require('lodash/isEqual');

import './TextEditor.css';

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';
import { Data } from 'geostyler-data';

// i18n
export interface TextEditorLocale {
  templateFieldLabel: string;
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
  attributeNotFound?: string;
}

interface TextEditorDefaultProps {
  locale: TextEditorLocale;
  internalDataDef?: Data;
}

// non default props
export interface TextEditorProps extends Partial<TextEditorDefaultProps> {
  symbolizer: TextSymbolizer;
  onSymbolizerChange?: (changedSymb: Symbolizer) => void;
  internalDataDef?: Data;
}

/**
 * The TextEditor class. Allows to edit text styles based on a template string
 * where words wrapped in double curly braces ({{}}) will be understood as
 * feature properties and text without curly braces as static text.
 */
export class TextEditor extends React.Component<TextEditorProps> {

  public shouldComponentUpdate(nextProps: TextEditorProps): boolean {
    const diffProps = !_isEqual(this.props, nextProps);
    return diffProps;
  }

  public static defaultProps: TextEditorDefaultProps = {
    locale: en_US.GsTextEditor
  };

  static componentName: string = 'TextEditor';

  onLabelChange = (state: any) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.label = toString(state);
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  }

  onColorChange = (value: string) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.color = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  }

  onFontChange = (value: string[]) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.font = value.length > 0 ? value : undefined;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  }

  onOpacityChange = (value: number) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.opacity = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  }

  onSizeChange = (value: number) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.size = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  }

  onOffsetXChange = (value: number) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    let newOffset: [number, number] = [value, (symbolizer.offset ? symbolizer.offset[1] : 0)];
    symbolizer.offset = newOffset;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  }

  onOffsetYChange = (value: number) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    let newOffset: [number, number] = [(symbolizer.offset ? symbolizer.offset[0] : 0), value];
    symbolizer.offset = newOffset;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  }

  onRotateChange = (value: number) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.rotate = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  }

  onHaloColorChange = (value: string) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.haloColor = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  }

  onHaloWidthChange = (value: number) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.haloWidth = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  }

  render() {
    const {
      locale,
      internalDataDef
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
    const properties = internalDataDef && internalDataDef.schema ? Object.keys(internalDataDef.schema.properties) : [];

    return (
      <div className="gs-text-symbolizer-editor" >
         <div className="editor-field attribute-field">
          <span className="label">{locale.templateFieldLabel}:</span>
          <Mention
            placeholder={locale.templateFieldLabel}
            defaultValue={toContentState(symbolizer.label)}
            onChange={this.onLabelChange}
            suggestions={properties}
            prefix="{{"
            notFoundContent={locale.attributeNotFound}
          />
        </div>
        {locale.colorLabel}
        <ColorField
          color={color}
          onChange={this.onColorChange}
          />
        {locale.fontLabel}
        <FontPicker
          font={font}
          onChange={this.onFontChange}
        />
        {locale.opacityLabel}
        <OpacityField
          opacity={opacity}
          onChange={this.onOpacityChange}
          />
        {locale.sizeLabel}
        <WidthField
          width={size}
          onChange={this.onSizeChange}
        />
        {locale.offsetXLabel}
        <OffsetField
          offset={offsetX}
          onChange={this.onOffsetXChange}
        />
        {locale.offsetYLabel}
        <OffsetField
          offset={offsetY}
          onChange={this.onOffsetYChange}
        />
        {locale.rotateLabel}
        <RotateField
          rotate={rotate}
          onChange={this.onRotateChange}
        />
        {locale.haloColorLabel}
        <ColorField
          color={haloColor}
          onChange={this.onHaloColorChange}
          />
        {locale.haloWidthLabel}
        <WidthField
          width={haloWidth}
          onChange={this.onHaloWidthChange}
        />
      </div>
    );
  }
}

export default localize(TextEditor, TextEditor.componentName);
