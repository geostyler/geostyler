/* Released under the BSD 2-Clause License
 *
 * Copyright © 2018-present, terrestris GmbH & Co. KG and GeoStyler contributors
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

import * as React from 'react';
import {
  Mentions,
  Form
} from 'antd';

const {
  Option: MentionOption
} = Mentions;

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
import { CompositionContext, Compositions } from '../../../context/CompositionContext/CompositionContext';
import CompositionUtil from '../../../Util/CompositionUtil';
import withDefaultsContext from '../../../hoc/withDefaultsContext';
import { DefaultValues } from '../../../context/DefaultValueContext/DefaultValueContext';

import _cloneDeep from 'lodash/cloneDeep';
import _isEqual from 'lodash/isEqual';

import './TextEditor.less';

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';
import { VectorData } from 'geostyler-data';

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
}

// non default props
export interface TextEditorProps extends Partial<TextEditorDefaultProps> {
  symbolizer: TextSymbolizer;
  onSymbolizerChange?: (changedSymb: Symbolizer) => void;
  internalDataDef?: VectorData;
  defaultValues: DefaultValues;
}

const COMPONENTNAME = 'TextEditor';

/**
 * The TextEditor class. Allows to edit text styles based on a template string
 * where words wrapped in double curly braces ({{}}) will be understood as
 * feature properties and text without curly braces as static text.
 */
export const TextEditor: React.FC<TextEditorProps> = ({
  locale = en_US.GsTextEditor,
  symbolizer,
  onSymbolizerChange,
  internalDataDef,
  defaultValues
}) => {

  const onLabelChange = (value: any) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.label = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onColorChange = (value: string) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.color = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onFontChange = (value: string[]) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.font = value.length > 0 ? value : undefined;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onOpacityChange = (value: number) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.opacity = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onSizeChange = (value: number) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.size = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onOffsetXChange = (value: number) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    let newOffset: [number, number] = [value, (symbolizerClone.offset ? symbolizerClone.offset[1] : 0)];
    symbolizerClone.offset = newOffset;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onOffsetYChange = (value: number) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    let newOffset: [number, number] = [(symbolizerClone.offset ? symbolizerClone.offset[0] : 0), value];
    symbolizerClone.offset = newOffset;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onRotateChange = (value: number) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.rotate = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onHaloColorChange = (value: string) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.haloColor = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onHaloWidthChange = (value: number) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.haloWidth = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  /**
   * Wraps a Form Item around a given element and adds its locale
   * to the From Item label.
   */
  const wrapFormItem = (label: string, element: React.ReactElement): React.ReactElement => {
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    return element == null ? null : (
      <Form.Item
        label={label}
        {...formItemLayout}
      >
        {element}
      </Form.Item>
    );
  };

  const clonedSymbolizer = _cloneDeep(symbolizer);

  const {
    opacity,
    color,
    font,
    offset,
    size,
    rotate,
    haloColor,
    haloWidth
  } = clonedSymbolizer;

  // split the current offset
  let offsetX: number;
  let offsetY: number;
  if (offset) {
    offsetX = offset[0];
    offsetY = offset[1];
  }
  const properties = internalDataDef && internalDataDef.schema ? Object.keys(internalDataDef.schema.properties) : [];

  return (
    <CompositionContext.Consumer>
      {(composition: Compositions) => (
        <div className="gs-text-symbolizer-editor" >
          {
            wrapFormItem(
              locale.templateFieldLabel,
              CompositionUtil.handleComposition({
                composition,
                path: 'TextEditor.templateField',
                onChange: onLabelChange,
                propName: 'value',
                propValue: symbolizer.label || '',
                defaultValue: defaultValues?.TextEditor?.defaultLabel,
                defaultElement: (
                  <Mentions
                    placeholder={locale.templateFieldLabel}
                    prefix="{{"
                    notFoundContent={locale.attributeNotFound}
                  >
                    {properties.map(p => <MentionOption key={p} value={p}>{p}</MentionOption>)}
                  </Mentions>
                )
              })
            )
          }
          {
            wrapFormItem(
              locale.colorLabel,
              CompositionUtil.handleComposition({
                composition,
                path: 'TextEditor.colorField',
                onChange: onColorChange,
                propName: 'color',
                propValue: color,
                defaultValue: defaultValues?.TextEditor?.defaultColor,
                defaultElement: <ColorField />
              })
            )
          }
          {
            wrapFormItem(
              locale.fontLabel,
              CompositionUtil.handleComposition({
                composition,
                path: 'TextEditor.fontField',
                onChange: onFontChange,
                propName: 'font',
                propValue: font,
                defaultValue: defaultValues?.TextEditor?.defaultFont,
                defaultElement: <FontPicker />
              })
            )
          }
          {
            wrapFormItem(
              locale.opacityLabel,
              CompositionUtil.handleComposition({
                composition,
                path: 'TextEditor.opacityField',
                onChange: onOpacityChange,
                propName: 'opacity',
                propValue: opacity,
                defaultValue: defaultValues?.TextEditor?.defaultOpacity,
                defaultElement: <OpacityField />
              })
            )
          }
          {
            wrapFormItem(
              locale.sizeLabel,
              CompositionUtil.handleComposition({
                composition,
                path: 'TextEditor.sizeField',
                onChange: onSizeChange,
                propName: 'width',
                propValue: size,
                defaultValue: defaultValues?.TextEditor?.defaultSize,
                defaultElement: <WidthField />
              })
            )
          }
          {
            wrapFormItem(
              locale.offsetXLabel,
              CompositionUtil.handleComposition({
                composition,
                path: 'TextEditor.offsetXField',
                onChange: onOffsetXChange,
                propName: 'offset',
                propValue: offsetX,
                defaultValue: defaultValues?.TextEditor?.defaultOffsetX,
                defaultElement: <OffsetField />
              })
            )
          }
          {
            wrapFormItem(
              locale.offsetYLabel,
              CompositionUtil.handleComposition({
                composition,
                path: 'TextEditor.offsetYField',
                onChange: onOffsetYChange,
                propName: 'offset',
                propValue: offsetY,
                defaultValue: defaultValues?.TextEditor?.defaultOffsetY,
                defaultElement: <OffsetField />
              })
            )
          }
          {
            wrapFormItem(
              locale.rotateLabel,
              CompositionUtil.handleComposition({
                composition,
                path: 'TextEditor.rotateField',
                onChange: onRotateChange,
                propName: 'rotate',
                propValue: rotate,
                defaultValue: defaultValues?.TextEditor?.defaultRotate,
                defaultElement: <RotateField />
              })
            )
          }
          {
            wrapFormItem(
              locale.haloColorLabel,
              CompositionUtil.handleComposition({
                composition,
                path: 'TextEditor.haloColorField',
                onChange: onHaloColorChange,
                propName: 'color',
                propValue: haloColor,
                defaultValue: defaultValues?.TextEditor?.defaultHaloColor,
                defaultElement: <ColorField />
              })
            )
          }
          {
            wrapFormItem(
              locale.haloWidthLabel,
              CompositionUtil.handleComposition({
                composition,
                path: 'TextEditor.haloWidthField',
                onChange: onHaloWidthChange,
                propName: 'width',
                propValue: haloWidth,
                defaultValue: defaultValues?.TextEditor?.defaultHaloWidth,
                defaultElement: <WidthField />
              })
            )
          }
        </div>
      )}
    </CompositionContext.Consumer>
  );
};

export default withDefaultsContext(localize(TextEditor, COMPONENTNAME));
