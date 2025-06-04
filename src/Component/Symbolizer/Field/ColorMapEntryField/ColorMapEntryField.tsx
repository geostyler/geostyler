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

import { ColorMapEntry } from 'geostyler-style';
import {ColorField} from '../ColorField/ColorField';
import {OffsetField} from '../OffsetField/OffsetField';
import { Input, Form } from 'antd';
import {OpacityField} from '../OpacityField/OpacityField';

import _get from 'lodash/get';
import { useGeoStylerLocale } from '../../../../context/GeoStylerContext/GeoStylerContext';

export interface ColorMapEntryFieldProps {
  labelPlaceholder?: string;
  onChange?: (colorMapEntry: ColorMapEntry) => void;
  value?: ColorMapEntry;
}

/**
 * ColorMapEntry Field
 */
export const ColorMapEntryField: React.FC<ColorMapEntryFieldProps> = ({
  labelPlaceholder = 'Color Map Label',
  onChange,
  value
}) => {

  const locale = useGeoStylerLocale('ColorMapEntryField');

  const updateColorMapEntry = (prop: string, newValue: any) => {
    const updated: ColorMapEntry = {...value};
    updated[prop as keyof ColorMapEntry] = newValue;
    if (onChange) {
      onChange(updated);
    }
  };

  const onColorChange = (color: ColorMapEntry['color']) => {
    updateColorMapEntry('color', color);
  };

  const onQuantityChange = (quantity: ColorMapEntry['quantity']) => {
    updateColorMapEntry('quantity', quantity);
  };

  const onLabelChange = (label: ColorMapEntry['label']) => {
    updateColorMapEntry('label', label);
  };

  const onOpacityChange = (opacity: ColorMapEntry['opacity']) => {
    updateColorMapEntry('opacity', opacity);
  };

  return (
    <div>
      <Form.Item
        label={locale.colorLabel}
      >
        <ColorField
          value={_get(value, 'color') as string}
          onChange={onColorChange}
        />
      </Form.Item>
      <Form.Item
        label={locale.quantityLabel}
      >
        <OffsetField
          value={_get(value, 'quantity') as number}
          onChange={onQuantityChange}
        />
      </Form.Item>
      <Form.Item
        label={locale.labelLabel}
      >
        <Input
          className="editor-field colormapentry-label-field"
          defaultValue={_get(value, 'label') as string}
          value={_get(value, 'label') as string}
          placeholder={labelPlaceholder}
          onChange={(evt: any) => {
            onLabelChange(evt.target.value);
          }}
        />
      </Form.Item>
      <Form.Item
        label={locale.opacityLabel}
      >
        <OpacityField
          value={value?.opacity}
          onChange={onOpacityChange}
        />
      </Form.Item>
    </div>
  );
};
