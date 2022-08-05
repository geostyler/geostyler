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
  Symbolizer,
  TextSymbolizer
} from 'geostyler-style';

import ColorField from '../Field/ColorField/ColorField';
import OpacityField from '../Field/OpacityField/OpacityField';
import WidthField from '../Field/WidthField/WidthField';

import _cloneDeep from 'lodash/cloneDeep';
import _isEqual from 'lodash/isEqual';
import FontPicker from '../Field/FontPicker/FontPicker';
import OffsetField from '../Field/OffsetField/OffsetField';
import AttributeCombo from '../../Filter/AttributeCombo/AttributeCombo';
import { Data } from 'geostyler-data';

import './PropTextEditor.less';

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import RotateField from '../Field/RotateField/RotateField';
import en_US from '../../../locale/en_US';
import { GeoStylerLocale } from '../../../locale/locale';
import { Form } from 'antd';

interface PropTextEditorDefaultProps {
  locale: GeoStylerLocale['PropTextEditor'];
}

// non default props
export interface PropTextEditorProps extends Partial<PropTextEditorDefaultProps> {
  symbolizer: TextSymbolizer;
  internalDataDef?: Data;
  onSymbolizerChange?: (changedSymb: Symbolizer) => void;
}

const COMPONENTNAME = 'PropTextEditor';

/**
 * The PropTextEditor class. Allows to edit text styles solely based on a
 * feature property. The entered word will be understood as the property name
 * of a feature. No static text is allowed.
 */
export const PropTextEditor: React.FC<PropTextEditorProps> = ({
  locale = en_US.PropTextEditor,
  symbolizer,
  internalDataDef,
  onSymbolizerChange
}) => {

  const formatLabel = (label: string): string => {
    const regExp: RegExp = /\{\{(.*)\}\}/g;
    return label.replace(regExp, '$1');
  };

  const onLabelChange = (newAttrName: string) => {
    // add the removed curly braces to newAttrName
    // so it will be recognized as a placeholder for a featureProp
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.label = `{{${newAttrName}}}`;
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
    let newOffset: [number, number] = [
      value,
      (typeof(symbolizerClone.offset) === 'number' ? symbolizerClone.offset[1] : 0)
    ];
    symbolizerClone.offset = newOffset;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onOffsetYChange = (value: number) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    let newOffset: [number, number] = [
      (typeof(symbolizerClone.offset) === 'number' ? symbolizerClone.offset[0] : 0),
      value
    ];
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
  const clondeSymbolizer = _cloneDeep(symbolizer);

  const {
    opacity,
    color,
    font,
    offset,
    size,
    rotate,
    haloColor,
    haloWidth
  } = clondeSymbolizer;

  // split the current offset
  let offsetX;
  let offsetY;
  if (offset) {
    offsetX = offset[0];
    offsetY = offset[1];
  }

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  };

  return (
    <div className="gs-text-symbolizer-prop-editor" >
      <Form.Item
        label={locale.propFieldLabel}
        {...formItemLayout}
      >
        <AttributeCombo
          value={symbolizer.label ? formatLabel(symbolizer.label) : undefined}
          placeholder={locale.attributeComboPlaceholder}
          internalDataDef={internalDataDef}
          onAttributeChange={onLabelChange}
        />
      </Form.Item>
      <Form.Item
        label={locale.colorLabel}
        {...formItemLayout}
      >
        <ColorField
          color={typeof(color) === 'string' ? color : ''}
          onChange={onColorChange}
        />
      </Form.Item>
      <Form.Item
        label={locale.fontLabel}
        {...formItemLayout}
      >
        <FontPicker
          font={font}
          onChange={onFontChange}
        />
      </Form.Item>
      <Form.Item
        label={locale.opacityLabel}
        {...formItemLayout}
      >
        <OpacityField
          opacity={typeof(opacity) === 'number' ? opacity : 1}
          onChange={onOpacityChange}
        />
      </Form.Item>
      <Form.Item
        label={locale.sizeLabel}
        {...formItemLayout}
      >
        <WidthField
          width={typeof(size) === 'number' ? size : 0}
          onChange={onSizeChange}
        />
      </Form.Item>
      <Form.Item
        label={locale.offsetXLabel}
        {...formItemLayout}
      >
        <OffsetField
          offset={typeof(offsetX) === 'number' ? offsetX : 0}
          onChange={onOffsetXChange}
        />
      </Form.Item>
      <Form.Item
        label={locale.offsetYLabel}
        {...formItemLayout}
      >
        <OffsetField
          offset={typeof(offsetY) === 'number' ? offsetY : 0}
          onChange={onOffsetYChange}
        />
      </Form.Item>
      <Form.Item
        label={locale.rotateLabel}
        {...formItemLayout}
      >
        <RotateField
          rotate={typeof(rotate) === 'number' ? rotate : 0}
          onChange={onRotateChange}
        />
      </Form.Item>
      <Form.Item
        label={locale.haloColorLabel}
        {...formItemLayout}
      >
        <ColorField
          color={typeof(haloColor) === 'string' ? haloColor : ''}
          onChange={onHaloColorChange}
        />
      </Form.Item>
      <Form.Item
        label={locale.haloWidthLabel}
        {...formItemLayout}
      >
        <WidthField
          width={typeof(haloWidth) === 'number' ? haloWidth : 0}
          onChange={onHaloWidthChange}
        />
      </Form.Item>
    </div>
  );
};

export default localize(PropTextEditor, COMPONENTNAME);
