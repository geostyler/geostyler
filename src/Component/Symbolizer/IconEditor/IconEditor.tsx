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

import { CompositionContext, Compositions } from '../../../context/CompositionContext/CompositionContext';
import CompositionUtil from '../../../Util/CompositionUtil';
import withDefaultsContext from '../../../hoc/withDefaultsContext';
import { DefaultValues } from '../../../context/DefaultValueContext/DefaultValueContext';
import { GeoStylerLocale } from '../../../locale/locale';

// default props
export interface IconEditorDefaultProps {
  locale: GeoStylerLocale['IconEditor'];
}

// non default props
export interface IconEditorProps extends Partial<IconEditorDefaultProps> {
  symbolizer: IconSymbolizer;
  onSymbolizerChange?: (changedSymb: Symbolizer) => void;
  iconLibraries?: IconLibrary[];
  defaultValues?: DefaultValues;
  /**
   * The props for the image field. Properties 'iconLibraries' and
   * 'tooltipLabel' should not be used here currently, as they will
   * be overwritten by the same named props that were directly
   * set on IconEditor. This is done to keep backwards compability.
   */
  imageFieldProps?: Partial<ImageFieldProps>;
}

const COMPONENTNAME = 'IconEditor';

export const IconEditor: React.FC<IconEditorProps> = ({
  locale = en_US.IconEditor,
  symbolizer,
  onSymbolizerChange,
  iconLibraries,
  defaultValues,
  imageFieldProps
}) => {

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

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  };

  const {
    opacity,
    image,
    size,
    rotate
  } = symbolizer;

  const imageSrc = !_isEmpty(image) ? image : locale.imagePlaceholder;

  return (
    <CompositionContext.Consumer>
      {(composition: Compositions) => (
        <div className="gs-icon-symbolizer-editor" >
          <Form.Item
            label={locale.imageLabel}
            {...formItemLayout}
          >
            {
              CompositionUtil.handleComposition({
                composition,
                path: 'IconEditor.imageField',
                onChange: onImageSrcChange,
                propName: 'value',
                propValue: imageSrc,
                defaultValue: defaultValues?.IconEditor?.defaultImage,
                defaultElement: (
                  <ImageField
                    // To keep backwards compatibility,
                    // we overwrite imageFieldProps with the props
                    // that were explicitly set as props on IconEditor.
                    {...imageFieldProps}
                    iconLibraries={iconLibraries}
                    tooltipLabel={locale.iconTooltipLabel}
                  />
                )
              })
            }
          </Form.Item>
          <Form.Item
            label={locale.sizeLabel}
            {...formItemLayout}
          >
            {
              CompositionUtil.handleComposition({
                composition,
                path: 'IconEditor.sizeField',
                onChange: onSizeChange,
                propName: 'size',
                propValue: size,
                defaultValue: defaultValues?.IconEditor?.defaultSize,
                defaultElement: <SizeField />
              })
            }
          </Form.Item>
          <Form.Item
            label={locale.rotateLabel}
            {...formItemLayout}
          >
            {
              CompositionUtil.handleComposition({
                composition,
                path: 'IconEditor.rotateField',
                onChange: onRotateChange,
                propName: 'rotate',
                propValue: rotate,
                defaultValue: defaultValues?.IconEditor?.defaultRotate,
                defaultElement: <RotateField />
              })
            }
          </Form.Item>
          <Form.Item
            label={locale.opacityLabel}
            {...formItemLayout}
          >
            {
              CompositionUtil.handleComposition({
                composition,
                path: 'IconEditor.opacityField',
                onChange: onOpacityChange,
                propName: 'opacity',
                propValue: opacity,
                defaultValue: defaultValues?.IconEditor?.defaultOpacity,
                defaultElement: <OpacityField />
              })
            }
          </Form.Item>
        </div>
      )}
    </CompositionContext.Consumer>
  );
};

export default withDefaultsContext(localize(IconEditor, COMPONENTNAME));
