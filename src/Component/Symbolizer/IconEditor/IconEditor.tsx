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
import ImageField from '../Field/ImageField/ImageField';
import { IconLibrary } from '../IconSelector/IconSelector';

import _cloneDeep from 'lodash/cloneDeep';
import _isEmpty from 'lodash/isEmpty';
import _isEqual from 'lodash/isEqual';
import RotateField from '../Field/RotateField/RotateField';
import SizeField from '../Field/SizeField/SizeField';

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';
import { Form } from 'antd';

import { CompositionContext, Compositions } from '../../CompositionContext/CompositionContext';
import CompositionUtil from '../../../Util/CompositionUtil';

// i18n
export interface IconEditorLocale {
  imageLabel?: string;
  sizeLabel?: string;
  rotateLabel?: string;
  opacityLabel?: string;
  iconTooltipLabel?: string;
}

// default props
export interface IconEditorDefaultProps {
  locale: IconEditorLocale;
}

// non default props
export interface IconEditorProps extends Partial<IconEditorDefaultProps> {
  symbolizer: IconSymbolizer;
  onSymbolizerChange?: (changedSymb: Symbolizer) => void;
  iconLibraries?: IconLibrary[];
}

export class IconEditor extends React.Component<IconEditorProps> {

  static componentName: string = 'IconEditor';

  public static defaultProps: IconEditorDefaultProps = {
    locale: en_US.GsIconEditor
  };

  public shouldComponentUpdate(nextProps: IconEditorProps): boolean {
    const diffProps = !_isEqual(this.props, nextProps);
    return diffProps;
  }

  onImageSrcChange = (value: string) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.image = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  };

  onSizeChange = (value: number) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.size = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  };

  onRotateChange = (value: number) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.rotate = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  };

  onOpacityChange = (value: number) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.opacity = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  };

  /**
   * Wraps a Form Item around a given element and adds its locale
   * to the From Item label.
   */
  wrapFormItem = (locale: string, element: React.ReactElement): React.ReactElement => {
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    return element == null ? null : (
      <Form.Item
        label={locale}
        {...formItemLayout}
      >
        {element}
      </Form.Item>
    );
  };

  render() {
    const {
      locale
    } = this.props;

    const {
      symbolizer,
      iconLibraries
    } = this.props;

    const {
      opacity,
      image,
      size,
      rotate
    } = symbolizer;

    const imageSrc = !_isEmpty(image) ? image : 'URL to Icon';

    return (
      <CompositionContext.Consumer>
        {(composition: Compositions) => (
          <div className="gs-icon-symbolizer-editor" >
            {
              this.wrapFormItem(
                locale.imageLabel,
                CompositionUtil.handleComposition({
                  composition,
                  path: 'IconEditor.imageField',
                  onChange: this.onImageSrcChange,
                  propName: 'value',
                  propValue: imageSrc,
                  defaultElement: (
                    <ImageField
                      iconLibraries={iconLibraries}
                      tooltipLabel={locale.iconTooltipLabel}
                    />
                  )
                })
              )
            }
            {
              this.wrapFormItem(
                locale.sizeLabel,
                CompositionUtil.handleComposition({
                  composition,
                  path: 'IconEditor.sizeField',
                  onChange: this.onSizeChange,
                  propName: 'size',
                  propValue: size,
                  defaultElement: <SizeField />
                })
              )
            }
            {
              this.wrapFormItem(
                locale.rotateLabel,
                CompositionUtil.handleComposition({
                  composition,
                  path: 'IconEditor.rotateField',
                  onChange: this.onRotateChange,
                  propName: 'rotate',
                  propValue: rotate,
                  defaultElement: <RotateField />
                })
              )
            }
            {
              this.wrapFormItem(
                locale.opacityLabel,
                CompositionUtil.handleComposition({
                  composition,
                  path: 'IconEditor.opacityField',
                  onChange: this.onOpacityChange,
                  propName: 'opacity',
                  propValue: opacity,
                  defaultElement: <OpacityField />
                })
              )
            }
          </div>
        )}
      </CompositionContext.Consumer>
    );
  }
}

export default localize(IconEditor, IconEditor.componentName);
