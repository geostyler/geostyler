import * as React from 'react';
import { Input } from 'antd';

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
}

interface TextEditorDefaultProps {
  locale: TextEditorLocale;
}

// non default props
export interface TextEditorProps extends Partial<TextEditorDefaultProps> {
  symbolizer: TextSymbolizer;
  onSymbolizerChange?: (changedSymb: Symbolizer) => void;
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

  onLabelChange = (e: any) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.label = e.target.value;
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
          <span className="label">{locale.templateFieldLabel}:</span>
          <Input
            placeholder={locale.templateFieldLabel}
            value={symbolizer.label}
            onChange={this.onLabelChange}
          />
        </div>
        <ColorField
          color={color}
          label={locale.colorLabel}
          onChange={this.onColorChange}
        />
        <FontPicker
          font={font}
          label={locale.fontLabel}
          onChange={this.onFontChange}
        />
        <OpacityField
          opacity={opacity}
          label={locale.opacityLabel}
          onChange={this.onOpacityChange}
        />
        <WidthField
          width={size}
          label={locale.sizeLabel}
          onChange={this.onSizeChange}
        />
        <OffsetField
          offset={offsetX}
          label={locale.offsetXLabel}
          onChange={this.onOffsetXChange}
        />
        <OffsetField
          offset={offsetY}
          label={locale.offsetYLabel}
          onChange={this.onOffsetYChange}
        />
        <RotateField
          rotate={rotate}
          label={locale.rotateLabel}
          onChange={this.onRotateChange}
        />
        <ColorField
          color={haloColor}
          label={locale.haloColorLabel}
          onChange={this.onHaloColorChange}
        />
        <WidthField
          width={haloWidth}
          label={locale.haloWidthLabel}
          onChange={this.onHaloWidthChange}
        />
      </div>
    );
  }
}

export default localize(TextEditor, TextEditor.componentName);
