/* Released under the BSD 2-Clause License
 *
 * Copyright © 2021-present, terrestris GmbH & Co. KG and GeoStyler contributors
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

import React, { useState } from 'react';

import { Form } from 'antd';

import './BulkEditor.less';
import { ColorField } from '../Symbolizer/Field/ColorField/ColorField';
import { RadiusField } from '../Symbolizer/Field/RadiusField/RadiusField';
import { OpacityField } from '../Symbolizer/Field/OpacityField/OpacityField';
import { KindField } from '../Symbolizer/Field/KindField/KindField';
import { Expression, IconSymbolizer, SymbolizerKind, WellKnownName } from 'geostyler-style';
import { WellKnownNameField } from '../Symbolizer/Field/WellKnownNameField/WellKnownNameField';
import { ImageField } from '../Symbolizer/Field/ImageField/ImageField';
import { useGeoStylerLocale } from '../../context/GeoStylerContext/GeoStylerContext';
import { getFormItemConfig } from '../../Util/FormItemUtil';

export interface BulkEditorProps {
  /** The callback that is triggered, when a style property changed. */
  onStylePropChange?: (prop: string, val: any) => void;
}

export const BulkEditor: React.FC<BulkEditorProps> = ({
  onStylePropChange = () => { }
}) => {

  const locale = useGeoStylerLocale('BulkEditor');
  const [color, setColor] = useState<Expression<string>>();
  const [radius, setRadius] = useState<Expression<number>>();
  const [opacity, setOpacity] = useState<Expression<number>>();
  const [kind, setKind] = useState<SymbolizerKind>('Mark');
  const [wellKnownName, setWellKnownName] = useState<WellKnownName>();
  const [image, setImage] = useState<IconSymbolizer['image']>();

  const symbolizerKinds: SymbolizerKind[] = ['Mark', 'Icon'];

  const onColorChange = (newColor: Expression<string>) => {
    setColor(newColor);
    onStylePropChange('color', newColor);
  };

  const onRadiusChange = (newRadius: Expression<number>) => {
    setRadius(newRadius);
    onStylePropChange('radius', newRadius);
  };

  const onOpacityChange = (newOpacity: Expression<number>) => {
    setOpacity(newOpacity);
    onStylePropChange('opacity', newOpacity);
  };

  const onWellKnownNameChange = (newWellKnownName: WellKnownName) => {
    setWellKnownName(newWellKnownName);
    onStylePropChange('wellKnownName', newWellKnownName);
  };

  const onImageChange = (newImage: IconSymbolizer['image']) => {
    setImage(newImage);
    onStylePropChange('image', newImage);
  };

  const itemConfig = getFormItemConfig();

  return (
    <div className='gs-bulkeditor'>
      <Form.Item
        {...itemConfig}
        label={locale.colorLabel}
      >
        <ColorField
          value={color}
          onChange={onColorChange}
        />
      </Form.Item>
      <Form.Item
        {...itemConfig}
        label={locale.radiusLabel}
      >
        <RadiusField
          radius={radius}
          onChange={onRadiusChange}
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
        label={locale.symbolLabel}
        className='gs-symbol-selection'
      >
        <KindField
          kind={kind}
          onChange={setKind}
          symbolizerKinds={symbolizerKinds}
        />
        {
          kind === 'Mark' && (
            <WellKnownNameField
              wellKnownName={wellKnownName}
              onChange={onWellKnownNameChange}
            />
          )
        }
        {
          kind === 'Icon' && (
            // TODO add iconLibraries config and viewhandling
            <ImageField
              value={image}
              onChange={onImageChange}
              placeholder={locale.imageFieldLabel}
            />
          )
        }
      </Form.Item>
    </div>
  );
};
