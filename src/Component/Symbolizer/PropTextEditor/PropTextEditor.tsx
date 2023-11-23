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

import { Form } from 'antd';

import _cloneDeep from 'lodash/cloneDeep';
import _isEqual from 'lodash/isEqual';

import {
  Symbolizer,
  TextSymbolizer
} from 'geostyler-style';

import {AttributeCombo} from '../../Filter/AttributeCombo/AttributeCombo';
import {ColorField} from '../Field/ColorField/ColorField';
import {FontPicker} from '../Field/FontPicker/FontPicker';
import {OffsetField} from '../Field/OffsetField/OffsetField';
import {OpacityField} from '../Field/OpacityField/OpacityField';
import {RotateField} from '../Field/RotateField/RotateField';
import {WidthField} from '../Field/WidthField/WidthField';
import { useGeoStylerLocale } from '../../../context/GeoStylerContext/GeoStylerContext';

import './PropTextEditor.less';
import { getFormItemConfig } from '../../../Util/FormItemUtil';

export interface PropTextEditorProps {
  symbolizer: TextSymbolizer;
  onSymbolizerChange?: (changedSymb: Symbolizer) => void;
}

/**
 * The PropTextEditor class. Allows to edit text styles solely based on a
 * feature property. The entered word will be understood as the property name
 * of a feature. No static text is allowed.
 */
export const PropTextEditor: React.FC<PropTextEditorProps> = ({
  symbolizer,
  onSymbolizerChange
}) => {

  const locale = useGeoStylerLocale('PropTextEditor');

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

  const itemConfig = getFormItemConfig();

  return (
    <div className="gs-text-symbolizer-prop-editor" >
      <Form.Item
        {...itemConfig}
        label={locale.propFieldLabel}
      >
        <AttributeCombo
          value={symbolizer.label ? formatLabel(symbolizer.label as string) : undefined}
          onAttributeChange={onLabelChange}
        />
      </Form.Item>
      <Form.Item
        {...itemConfig}
        label={locale.colorLabel}
      >
        <ColorField
          value={color as string}
          onChange={onColorChange}
        />
      </Form.Item>
      <Form.Item
        {...itemConfig}
        label={locale.fontLabel}
      >
        <FontPicker
          font={font as string[]}
          onChange={onFontChange}
        />
      </Form.Item>
      <Form.Item
        {...itemConfig}
        label={locale.opacityLabel}
      >
        <OpacityField
          value={opacity}
          onChange={onOpacityChange}
        />
      </Form.Item>
      <Form.Item
        {...itemConfig}
        label={locale.sizeLabel}
      >
        <WidthField
          width={size as number}
          onChange={onSizeChange}
        />
      </Form.Item>
      <Form.Item
        {...itemConfig}
        label={locale.offsetXLabel}
      >
        <OffsetField
          offset={offsetX}
          onChange={onOffsetXChange}
        />
      </Form.Item>
      <Form.Item
        {...itemConfig}
        label={locale.offsetYLabel}
      >
        <OffsetField
          offset={offsetY}
          onChange={onOffsetYChange}
        />
      </Form.Item>
      <Form.Item
        {...itemConfig}
        label={locale.rotateLabel}
      >
        <RotateField
          rotate={rotate}
          onChange={onRotateChange}
        />
      </Form.Item>
      <Form.Item
        {...itemConfig}
        label={locale.haloColorLabel}
      >
        <ColorField
          value={haloColor as string}
          onChange={onHaloColorChange}
        />
      </Form.Item>
      <Form.Item
        {...itemConfig}
        label={locale.haloWidthLabel}
      >
        <WidthField
          value={haloWidth}
          onChange={onHaloWidthChange}
        />
      </Form.Item>
    </div>
  );
};
