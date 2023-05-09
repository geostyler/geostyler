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

import {
  Symbolizer,
  IconSymbolizer
} from 'geostyler-style';

import OpacityField from '../Field/OpacityField/OpacityField';
import ImageField, { ImageFieldProps } from '../Field/ImageField/ImageField';
import { IconLibrary } from '../IconSelector/IconSelector';

import _cloneDeep from 'lodash/cloneDeep';
import _isEmpty from 'lodash/isEmpty';
import _isEqual from 'lodash/isEqual';
import RotateField from '../Field/RotateField/RotateField';
import SizeField from '../Field/SizeField/SizeField';

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';
import { Form } from 'antd';

import withDefaultsContext from '../../../hoc/withDefaultsContext';
import type GeoStylerLocale from '../../../locale/locale';
import {
  UnsupportedPropertiesContext
} from '../../../context/UnsupportedPropertiesContext/UnsupportedPropertiesContext';
import UnsupportedPropertiesUtil from '../../../Util/UnsupportedPropertiesUtil';
import OffsetField from '../Field/OffsetField/OffsetField';
import { useGeoStylerComposition } from '../../../context/GeoStylerContext/GeoStylerContext';

// default props
export interface IconEditorDefaultProps {
  locale: GeoStylerLocale['IconEditor'];
}

// non default props
export interface IconEditorProps extends Partial<IconEditorDefaultProps> {
  symbolizer: IconSymbolizer;
  onSymbolizerChange?: (changedSymb: Symbolizer) => void;
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

export const IconEditor: React.FC<IconEditorProps> = (props) => {

  const composition = useGeoStylerComposition('IconEditor', {});

  const composed = {...props, ...composition};

  const {
    locale = en_US.IconEditor,
    symbolizer,
    onSymbolizerChange,
    iconLibraries,
    imageFieldProps
  } = composed;

  const {
    unsupportedProperties,
    options
  } = useContext(UnsupportedPropertiesContext);


  const onImageSrcChange = (value: string) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.image = value;
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
    let newOffset: [number, number] = [value, (symbolizerClone.offset ? symbolizerClone.offset[1] : 0) as number];
    symbolizerClone.offset = newOffset;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onOffsetYChange = (value: number) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    let newOffset: [number, number] = [(symbolizerClone.offset ? symbolizerClone.offset[0] : 0) as number, value];
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

  const onOpacityChange = (value: number) => {
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
        composition.imageField?.visibility === false ? null : (
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
              iconLibraries={composition.iconLibraries || iconLibraries}
              tooltipLabel={locale.iconTooltipLabel}
            />
          </Form.Item>
        )
      }
      {
        composition.sizeField?.visibility === false ? null : (
          <Form.Item
            label={locale.sizeLabel}
            {...getSupportProps('size')}
          >
            <SizeField
              size={size as number}
              onChange={onSizeChange}
            />
          </Form.Item>
        )
      }
      {
        composition.offsetXField?.visibility === false ? null : (
          <Form.Item
            label={locale.offsetXLabel}
            {...getSupportProps('offset')}
          >
            <OffsetField
              offset={offset?.[0] as number}
              defaultValue={composition.offsetXField?.default}
              onChange={onOffsetXChange}
            />
          </Form.Item>
        )
      }
      {
        composition.offsetYField?.visibility === false ? null : (
          <Form.Item
            label={locale.offsetYLabel}
            {...getSupportProps('offset')}
          >
            <OffsetField
              offset={offset?.[1] as number}
              defaultValue={composition.offsetYField?.default}
              onChange={onOffsetYChange}
            />
          </Form.Item>
        )
      }
      {
        composition.rotateField?.visibility === false ? null : (
          <Form.Item
            label={locale.rotateLabel}
            {...getSupportProps('rotate')}
          >
            <RotateField
              rotate={rotate as number}
              defaultValue={composition.rotateField?.default}
              onChange={onRotateChange}
            />
          </Form.Item>
        )
      }
      {
        composition.opacityField?.visibility === false ? null : (
          <Form.Item
            label={locale.opacityLabel}
            {...getSupportProps('opacity')}
          >
            <OpacityField
              opacity={opacity as number}
              defaultValue={composition.opacityField?.default}
              onChange={onOpacityChange}
            />
          </Form.Item>
        )
      }
    </div>
  );
};

export default withDefaultsContext(localize(IconEditor, COMPONENTNAME));
