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

import React from 'react';
import {
  Mentions,
  Form
} from 'antd';

import {
  Symbolizer,
  TextSymbolizer
} from 'geostyler-style';

import ColorField, { ColorFieldProps } from '../Field/ColorField/ColorField';
import OpacityField, { OpacityFieldProps } from '../Field/OpacityField/OpacityField';
import WidthField, { WidthFieldProps } from '../Field/WidthField/WidthField';
import FontPicker from '../Field/FontPicker/FontPicker';
import OffsetField, { OffsetFieldProps } from '../Field/OffsetField/OffsetField';
import RotateField, { RotateFieldProps } from '../Field/RotateField/RotateField';

import _cloneDeep from 'lodash/cloneDeep';
import _isEqual from 'lodash/isEqual';

import './TextEditor.less';

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';
import { VectorData } from 'geostyler-data';
import type GeoStylerLocale from '../../../locale/locale';
import {
  InputConfig,
  useGeoStylerComposition,
  useGeoStylerUnsupportedProperties
} from '../../../context/GeoStylerContext/GeoStylerContext';
import { SizeFieldProps } from '../Field/SizeField/SizeField';

export interface TextEditorComposableProps {
  templateField?: InputConfig<string>;
  colorField?: InputConfig<ColorFieldProps['value']>;
  // TODO add support for default values in FontPicker
  fontField?: {
    visibility?: boolean;
  };
  opacityField?: InputConfig<OpacityFieldProps['value']>;
  sizeField?: InputConfig<SizeFieldProps['value']>;
  offsetXField?: InputConfig<OffsetFieldProps['offset']>;
  offsetYField?: InputConfig<OffsetFieldProps['offset']>;
  rotateField?: InputConfig<RotateFieldProps['rotate']>;
  haloColorField?: InputConfig<ColorFieldProps['value']>;
  haloWidthField?: InputConfig<WidthFieldProps['value']>;
}

export interface TextEditorInternalProps {
  locale?: GeoStylerLocale['TextEditor'];
  symbolizer: TextSymbolizer;
  onSymbolizerChange?: (changedSymb: Symbolizer) => void;
  internalDataDef?: VectorData;
}

const COMPONENTNAME = 'TextEditor';

export type TextEditorProps = TextEditorInternalProps & TextEditorComposableProps;

/**
 * The TextEditor class. Allows to edit text styles based on a template string
 * where words wrapped in double curly braces ({{}}) will be understood as
 * feature properties and text without curly braces as static text.
 */
export const TextEditor: React.FC<TextEditorProps> = (props) => {

  const composition = useGeoStylerComposition('TextEditor');
  const composed = {...props, ...composition};
  const {
    colorField,
    fontField,
    haloColorField,
    haloWidthField,
    internalDataDef,
    locale = en_US.TextEditor,
    offsetXField,
    offsetYField,
    onSymbolizerChange,
    opacityField,
    rotateField,
    sizeField,
    symbolizer,
    templateField
  } = composed;

  const {
    getSupportProps
  } = useGeoStylerUnsupportedProperties(symbolizer);

  const onLabelChange = (value: TextSymbolizer['label']) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.label = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onColorChange = (value: TextSymbolizer['color']) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.color = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onFontChange = (value: TextSymbolizer['font']) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.font = value.length > 0 ? value : undefined;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onOpacityChange = (value: TextSymbolizer['opacity']) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.opacity = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onSizeChange = (value: TextSymbolizer['size']) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.size = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onOffsetXChange = (value: TextSymbolizer['offset']['0']) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    let newOffset: TextSymbolizer['offset'] = [
      value,
      (symbolizerClone.offset ? symbolizerClone.offset[1] : 0)
    ];
    symbolizerClone.offset = newOffset;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onOffsetYChange = (value: TextSymbolizer['offset']['1']) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    let newOffset: TextSymbolizer['offset'] = [
      (symbolizerClone.offset ? symbolizerClone.offset[0] : 0),
      value
    ];
    symbolizerClone.offset = newOffset;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onRotateChange = (value: TextSymbolizer['rotate']) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.rotate = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onHaloColorChange = (value: TextSymbolizer['haloColor']) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.haloColor = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onHaloWidthChange = (value: TextSymbolizer['haloWidth']) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.haloWidth = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
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
    offsetX = offset[0] as number;
    offsetY = offset[1] as number;
  }
  const properties = internalDataDef && internalDataDef.schema ? Object.keys(internalDataDef.schema.properties) : [];

  return (
    <div className="gs-text-symbolizer-editor" >
      {
        templateField?.visibility === false ? null : (
          <Form.Item
            label={locale.templateFieldLabel}
            {...getSupportProps('label')}
          >
            <Mentions
              className="editor-field"
              value={symbolizer.label as string || ''}
              defaultValue={templateField?.default}
              onChange={onLabelChange}
              placeholder={locale.templateFieldLabel}
              prefix="{{"
              notFoundContent={locale.attributeNotFound}
              options={properties.map(p => ({
                key: p,
                value: `${p}}}`,
                label: p
              }))}
            />
          </Form.Item>
        )
      }
      {
        colorField?.visibility === false ? null : (
          <Form.Item
            label={locale.colorLabel}
            {...getSupportProps('color')}
          >
            <ColorField
              value={color as string}
              defaultValue={colorField?.default}
              onChange={onColorChange}
            />
          </Form.Item>
        )
      }
      {
        fontField?.visibility === false ? null : (
          <Form.Item
            label={locale.fontLabel}
            {...getSupportProps('font')}
          >
            <FontPicker
              font={font as string[]}
              onChange={onFontChange}
            />
          </Form.Item>
        )
      }
      {
        opacityField?.visibility === false ? null : (
          <Form.Item
            label={locale.opacityLabel}
            {...getSupportProps('opacity')}
          >
            <OpacityField
              value={opacity}
              defaultValue={opacityField?.default as number}
              onChange={onOpacityChange}
            />
          </Form.Item>
        )
      }
      {
        sizeField?.visibility === false ? null : (
          <Form.Item
            label={locale.sizeLabel}
            {...getSupportProps('size')}
          >
            <WidthField
              value={size}
              defaultValue={sizeField?.default as number}
              onChange={onSizeChange}
            />
          </Form.Item>
        )
      }
      {
        offsetXField?.visibility === false ? null : (
          <Form.Item
            label={locale.offsetXLabel}
            {...getSupportProps('offset')}
          >
            <OffsetField
              offset={offsetX}
              defaultValue={offsetXField?.default as number}
              onChange={onOffsetXChange}
            />
          </Form.Item>
        )
      }
      {
        offsetYField?.visibility === false ? null : (
          <Form.Item
            label={locale.offsetYLabel}
            {...getSupportProps('offset')}
          >
            <OffsetField
              offset={offsetY}
              defaultValue={offsetYField?.default as number}
              onChange={onOffsetYChange}
            />
          </Form.Item>
        )
      }
      {
        rotateField?.visibility === false ? null : (
          <Form.Item
            label={locale.rotateLabel}
            {...getSupportProps('rotate')}
          >
            <RotateField
              rotate={rotate as number}
              defaultValue={rotateField?.default as number}
              onChange={onRotateChange}
            />
          </Form.Item>
        )
      }
      {
        haloColorField?.visibility === false ? null : (
          <Form.Item
            label={locale.haloColorLabel}
            {...getSupportProps('haloColor')}
          >
            <ColorField
              value={haloColor as string}
              defaultValue={haloColorField?.default}
              onChange={onHaloColorChange}
            />
          </Form.Item>
        )
      }
      {
        haloWidthField?.visibility === false ? null : (
          <Form.Item
            label={locale.haloWidthLabel}
            {...getSupportProps('haloWidth')}
          >
            <WidthField
              value={haloWidth}
              defaultValue={haloWidthField?.default as number}
              onChange={onHaloWidthChange}
            />
          </Form.Item>
        )
      }
    </div>
  );
};

export default localize(TextEditor, COMPONENTNAME);
