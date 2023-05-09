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

import { Form, Space } from 'antd';

import { localize } from '../LocaleWrapper/LocaleWrapper';
import en_US from '../../locale/en_US';

import './BulkEditor.less';
import ColorField from '../Symbolizer/Field/ColorField/ColorField';
import RadiusField from '../Symbolizer/Field/RadiusField/RadiusField';
import OpacityField from '../Symbolizer/Field/OpacityField/OpacityField';
import KindField from '../Symbolizer/Field/KindField/KindField';
import { SymbolizerKind, WellKnownName } from 'geostyler-style';
import WellKnownNameField from '../Symbolizer/Field/WellKnownNameField/WellKnownNameField';
import ImageField from '../Symbolizer/Field/ImageField/ImageField';
import type GeoStylerLocale from '../../locale/locale';


// default props
interface BulkEditorDefaultProps {
  /** Locale object containing translated text snippets */
  locale: GeoStylerLocale['BulkEditor'];
  /** The callback that is triggered, when a style property changed. */
  onStylePropChange: (prop: string, val: any) => void;
}

// non default props
export interface BulkEditorProps extends Partial<BulkEditorDefaultProps> {
}

export const BulkEditor: React.FC<BulkEditorProps> = ({
  locale = en_US.BulkEditor,
  onStylePropChange = () => {}
}) => {

  const [color, setColor] = useState<string>();
  const [radius, setRadius] = useState<number>();
  const [opacity, setOpacity] = useState<number>();
  const [kind, setKind] = useState<SymbolizerKind>('Mark');
  const [wellKnownName, setWellKnownName] = useState<WellKnownName>();
  const [image, setImage] = useState<string>();

  const symbolizerKinds: SymbolizerKind[] = ['Mark', 'Icon'];

  const onColorChange = (newColor: string) => {
    setColor(newColor);
    onStylePropChange('color', newColor);
  };

  const onRadiusChange = (newRadius: string|number) => {
    setRadius(newRadius as number);
    onStylePropChange('radius', newRadius as number);
  };

  const onOpacityChange = (newOpacity: string|number) => {
    setOpacity(newOpacity as number);
    onStylePropChange('opacity', newOpacity as number);
  };

  const onWellKnownNameChange = (newWellKnownName: WellKnownName) => {
    setWellKnownName(newWellKnownName);
    onStylePropChange('wellKnownName', newWellKnownName);
  };

  const onImageChange = (newImage: string) => {
    setImage(newImage);
    onStylePropChange('image', newImage);
  };

  return (
    <div className='gs-bulkeditor'>
      <Form.Item
        label={locale.colorLabel}
      >
        <ColorField
          color={color}
          onChange={onColorChange}
        />
      </Form.Item>
      <Form.Item
        label={locale.radiusLabel}
      >
        <RadiusField
          radius={radius}
          onChange={onRadiusChange}
        />
      </Form.Item>
      <Form.Item
        label={locale.opacityLabel}
      >
        <OpacityField
          opacity={opacity}
          onChange={onOpacityChange}
        />
      </Form.Item>
      <Form.Item
        label={locale.symbolLabel}
      >
        <Space.Compact
          size="small"
        >
          <Form.Item
            noStyle
          >
            <KindField
              kind={kind}
              onChange={setKind}
              symbolizerKinds={symbolizerKinds}
            />
          </Form.Item>
          <Form.Item
            noStyle
          >
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
        </Space.Compact>
      </Form.Item>
    </div>
  );
};

export default localize(BulkEditor, 'BulkEditor');
