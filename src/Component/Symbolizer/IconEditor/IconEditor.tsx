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

import React, { useContext } from 'react';

import { IconSymbolizer } from 'geostyler-style';

import OpacityField, { OpacityFieldProps } from '../Field/OpacityField/OpacityField';
import ImageField, { ImageFieldProps } from '../Field/ImageField/ImageField';
import { IconLibrary } from '../IconSelector/IconSelector';

import _cloneDeep from 'lodash/cloneDeep';
import _isEmpty from 'lodash/isEmpty';
import _isEqual from 'lodash/isEqual';
import RotateField, { RotateFieldProps } from '../Field/RotateField/RotateField';
import SizeField from '../Field/SizeField/SizeField';

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';
import { Form } from 'antd';

import type GeoStylerLocale from '../../../locale/locale';
import {
  UnsupportedPropertiesContext
} from '../../../context/UnsupportedPropertiesContext/UnsupportedPropertiesContext';
import UnsupportedPropertiesUtil from '../../../Util/UnsupportedPropertiesUtil';
import OffsetField, { OffsetFieldProps } from '../Field/OffsetField/OffsetField';
import { InputConfig, useGeoStylerComposition } from '../../../context/GeoStylerContext/GeoStylerContext';

// default props
export interface IconEditorComposableProps {
  visibility?: boolean;
  // TODO add support for default values in ImageField
  imageField?: {
    visibility?: boolean;
  };
  // TODO add support for default values in SizeField
  sizeField?: {
    visibility?: boolean;
  };
  offsetXField?: InputConfig<OffsetFieldProps['offset']>;
  offsetYField?: InputConfig<OffsetFieldProps['offset']>;
  rotateField?: InputConfig<RotateFieldProps['rotate']>;
  opacityField?: InputConfig<OpacityFieldProps['value']>;
  iconLibraries?: IconLibrary[];
}

// non default props
export interface IconEditorProps {
  locale?: GeoStylerLocale['IconEditor'];
  symbolizer: IconSymbolizer;
  onSymbolizerChange?: (changedSymb: IconSymbolizer) => void;
  iconLibraries?: IconLibrary[];
  /**
   * The props for the image field. Properties 'iconLibraries' and
   * 'tooltipLabel' should not be used here currently, as they will
   * be overwritten by the same named props that were directly
   * set on IconEditor. This is done to keep backwards compability.
   */
  imageFieldProps?: Partial<ImageFieldProps>;
}

const COMPONENTNAME = 'IconEditor';

export const IconEditor: React.FC<IconEditorProps & IconEditorComposableProps> = ({
  locale = en_US.IconEditor,
  symbolizer,
  onSymbolizerChange,
  iconLibraries,
  imageFieldProps,
  ...composableProps
}) => {

  const composition = useGeoStylerComposition('IconEditor');

  const composed = {...composableProps, ...composition};

  const {
    unsupportedProperties,
    options
  } = useContext(UnsupportedPropertiesContext);


  const onImageSrcChange = (value: IconSymbolizer['image']) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.image = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onSizeChange = (value: IconSymbolizer['size']) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.size = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onOffsetXChange = (value: IconSymbolizer['offset']['0']) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    let newOffset: IconSymbolizer['offset'] = [
      value,
      (symbolizerClone.offset ? symbolizerClone.offset[1] : 0)
    ];
    symbolizerClone.offset = newOffset;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onOffsetYChange = (value: IconSymbolizer['offset']['1']) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    let newOffset: IconSymbolizer['offset'] = [
      (symbolizerClone.offset ? symbolizerClone.offset[0] : 0),
      value
    ];
    symbolizerClone.offset = newOffset;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onRotateChange = (value: IconSymbolizer['rotate']) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.rotate = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onOpacityChange = (value: IconSymbolizer['opacity']) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.opacity = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const {
    opacity,
    image,
    size,
    rotate,
    offset
  } = symbolizer;

  const imageSrc = !_isEmpty(image) ? image : locale.imagePlaceholder;

  const getSupportProps = (propName: keyof IconSymbolizer) => {
    return UnsupportedPropertiesUtil.getSupportProps<IconSymbolizer>({
      propName,
      symbolizerName: 'IconSymbolizer',
      unsupportedProperties,
      ...options
    });
  };

  return (
    <div className="gs-icon-symbolizer-editor" >
      {
        composed.imageField?.visibility === false ? null : (
          <Form.Item
            label={locale.imageLabel}
            {...getSupportProps('image')}
          >
            <ImageField
              value={imageSrc as string}
              onChange={onImageSrcChange}
              // To keep backwards compatibility,
              // we overwrite imageFieldProps with the props
              // that were explicitly set as props on IconEditor.
              {...imageFieldProps}
              iconLibraries={composed.iconLibraries || iconLibraries}
              tooltipLabel={locale.iconTooltipLabel}
            />
          </Form.Item>
        )
      }
      {
        composed.sizeField?.visibility === false ? null : (
          <Form.Item
            label={locale.sizeLabel}
            {...getSupportProps('size')}
          >
            <SizeField
              value={size}
              onChange={onSizeChange}
            />
          </Form.Item>
        )
      }
      {
        composed.offsetXField?.visibility === false ? null : (
          <Form.Item
            label={locale.offsetXLabel}
            {...getSupportProps('offset')}
          >
            <OffsetField
              offset={offset?.[0]}
              defaultValue={composed.offsetXField?.default as number}
              onChange={onOffsetXChange}
            />
          </Form.Item>
        )
      }
      {
        composed.offsetYField?.visibility === false ? null : (
          <Form.Item
            label={locale.offsetYLabel}
            {...getSupportProps('offset')}
          >
            <OffsetField
              offset={offset?.[1]}
              defaultValue={composed.offsetYField?.default as number}
              onChange={onOffsetYChange}
            />
          </Form.Item>
        )
      }
      {
        composed.rotateField?.visibility === false ? null : (
          <Form.Item
            label={locale.rotateLabel}
            {...getSupportProps('rotate')}
          >
            <RotateField
              rotate={rotate}
              defaultValue={composed.rotateField?.default as number}
              onChange={onRotateChange}
            />
          </Form.Item>
        )
      }
      {
        composed.opacityField?.visibility === false ? null : (
          <Form.Item
            label={locale.opacityLabel}
            {...getSupportProps('opacity')}
          >
            <OpacityField
              value={opacity}
              defaultValue={composed.opacityField?.default as number}
              onChange={onOpacityChange}
            />
          </Form.Item>
        )
      }
    </div>
  );
};

export default localize(IconEditor, COMPONENTNAME);
