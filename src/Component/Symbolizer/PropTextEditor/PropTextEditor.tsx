import * as React from 'react';

import {
  Symbolizer,
  TextSymbolizer
} from 'geostyler-style';

import ColorField from '../Field/ColorField/ColorField';
import OpacityField from '../Field/OpacityField/OpacityField';
import WidthField from '../Field/WidthField/WidthField';

const _cloneDeep = require('lodash/cloneDeep');
const _isEqual = require('lodash/isEqual');
import FontPicker from '../Field/FontPicker/FontPicker';
import OffsetField from '../Field/OffsetField/OffsetField';
import AttributeCombo from '../../Filter/AttributeCombo/AttributeCombo';
import { Data } from 'geostyler-data';

import './PropTextEditor.css';

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import RotateField from '../Field/RotateField/RotateField';
import en_US from '../../../locale/en_US';

// i18n
export interface PropTextEditorLocale {
  propFieldLabel: string;
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

interface PropTextEditorDefaultProps {
  locale: PropTextEditorLocale;
}

// non default props
interface PropTextEditorProps extends Partial<PropTextEditorDefaultProps> {
  symbolizer: TextSymbolizer;
  internalDataDef?: Data;
  onSymbolizerChange: ((changedSymb: Symbolizer) => void);
}

/**
 * The PropTextEditor class. Allows to edit text styles solely based on a
 * feature property. The entered word will be understood as the property name
 * of a feature. No static text is allowed.
 */
export class PropTextEditor extends React.Component<PropTextEditorProps> {

  public static defaultProps: PropTextEditorDefaultProps = {
    locale: en_US.GsPropTextEditor
  };

  static componentName: string = 'PropTextEditor';

  public shouldComponentUpdate(nextProps: PropTextEditorProps): boolean {
    const diffProps = !_isEqual(this.props, nextProps);
    return diffProps;
  }

  onSymbolizerChange = (symbolizer: Symbolizer) => {
    this.props.onSymbolizerChange(symbolizer);
  }

  formatLabel = (label: string): string => {
    const prefix = '\\{\\{';
    const suffix = '\\}\\}';
    const regExp = new RegExp(prefix + '.*' + suffix, 'g');
    return label.replace(regExp, (match: string) => match.slice(2, match.length - 2));
  }

  onLabelChange = (newAttrName: string) => {
    // add the removed curly braces to newAttrName
    // so it will be recognized as a placeholder for a featureProp
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.label = `{{${newAttrName}}}`;
    this.props.onSymbolizerChange(symbolizer);
  }

  onColorChange = (value: string) => {
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.color = value;
    this.props.onSymbolizerChange(symbolizer);
  }

  onFontChange = (value: string[]) => {
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.font = value.length > 0 ? value : undefined;
    this.props.onSymbolizerChange(symbolizer);
  }

  onOpacityChange = (value: number) => {
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.opacity = value;
    this.props.onSymbolizerChange(symbolizer);
  }

  onSizeChange = (value: number) => {
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.size = value;
    this.props.onSymbolizerChange(symbolizer);
  }

  onOffsetXChange = (value: number) => {
    const symbolizer = _cloneDeep(this.props.symbolizer);
    let newOffset: [number, number] = [value, (symbolizer.offset ? symbolizer.offset[1] : 0)];
    symbolizer.offset = newOffset;
    this.props.onSymbolizerChange(symbolizer);
  }

  onOffsetYChange = (value: number) => {
    const symbolizer = _cloneDeep(this.props.symbolizer);
    let newOffset: [number, number] = [(symbolizer.offset ? symbolizer.offset[0] : 0), value];
    symbolizer.offset = newOffset;
    this.props.onSymbolizerChange(symbolizer);
  }

  onRotateChange = (value: number) => {
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.rotate = value;
    this.props.onSymbolizerChange(symbolizer);
  }

  onHaloColorChange = (value: string) => {
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.haloColor = value;
    this.props.onSymbolizerChange(symbolizer);
  }

  onHaloWidthChange = (value: number) => {
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.haloWidth = value;
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
      <div className="gs-text-symbolizer-prop-editor" >
         <div className="editor-field attribute-field">
          <span className="label">{locale.propFieldLabel}:</span>
          <AttributeCombo
            value={symbolizer.label ? this.formatLabel(symbolizer.label) : undefined}
            placeholder={locale.attributeComboPlaceholder}
            internalDataDef={internalDataDef}
            onAttributeChange={this.onLabelChange}
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

export default localize(PropTextEditor, PropTextEditor.componentName);
