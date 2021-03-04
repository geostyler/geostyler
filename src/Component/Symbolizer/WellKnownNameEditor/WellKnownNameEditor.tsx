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
import { localize } from '../../LocaleWrapper/LocaleWrapper';
import {
  MarkSymbolizer,
  Symbolizer
} from 'geostyler-style';

import ColorField from '../Field/ColorField/ColorField';
import OpacityField from '../Field/OpacityField/OpacityField';
import RadiusField from '../Field/RadiusField/RadiusField';
import WidthField from '../Field/WidthField/WidthField';
import RotateField from '../Field/RotateField/RotateField';
import { CompositionContext, Compositions } from '../../CompositionContext/CompositionContext';
import CompositionUtil from '../../../Util/CompositionUtil';
import en_US from '../../../locale/en_US';
import { Form } from 'antd';

const _cloneDeep = require('lodash/cloneDeep');
const _isEqual = require('lodash/isEqual');

// i18n
interface WellKnownNameEditorLocale {
  radiusLabel?: string;
  fillOpacityLabel?: string;
  fillColorLabel?: string;
  strokeColorLabel?: string;
  strokeWidthLabel?: string;
  strokeOpacityLabel?: string;
  rotateLabel?: string;
}

interface WellKnownNameEditorDefaultProps {
  locale: WellKnownNameEditorLocale;
}

// non default props
export interface WellKnownNameEditorProps extends Partial<WellKnownNameEditorDefaultProps> {
  symbolizer: MarkSymbolizer;
  onSymbolizerChange?: (changedSymb: Symbolizer) => void;
}

export class WellKnownNameEditor extends React.Component<WellKnownNameEditorProps> {

  public shouldComponentUpdate(nextProps: WellKnownNameEditorProps): boolean {
    const diffProps = !_isEqual(this.props, nextProps);
    return diffProps;
  }

  public static defaultProps: WellKnownNameEditorDefaultProps = {
    locale: en_US.GsWellKnownNameEditor
  };

  static componentName: string = 'WellKnownNameEditor';

  onRadiusChange = (value: number) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.radius = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  };

  onColorChange = (value: string) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.color = value;
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

  onStrokeColorChange = (value: string) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.strokeColor = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  };

  onStrokeWidthChange = (value: number) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.strokeWidth = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  };

  onStrokeOpacityChange = (value: number) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.strokeOpacity = value;
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

  render () {
    const {
      symbolizer
    } = this.props;

    const {
      radius,
      color,
      opacity,
      rotate,
      strokeColor,
      strokeWidth,
      strokeOpacity
    } = symbolizer;

    const {
      locale
    } = this.props;

    return (
      <CompositionContext.Consumer>
        {(composition: Compositions) => (
          <div>
            {
              this.wrapFormItem(
                locale.radiusLabel,
                CompositionUtil.handleComposition({
                  composition,
                  path: 'WellKnownNameEditor.radiusField',
                  onChange: this.onRadiusChange,
                  propName: 'radius',
                  propValue: radius,
                  defaultElement: <RadiusField />
                })
              )
            }
            {
              this.wrapFormItem(
                locale.fillColorLabel,
                CompositionUtil.handleComposition({
                  composition,
                  path: 'WellKnownNameEditor.fillColorField',
                  onChange: this.onColorChange,
                  propName: 'color',
                  propValue: color,
                  defaultElement: <ColorField />
                })
              )
            }
            {
              this.wrapFormItem(
                locale.fillOpacityLabel,
                CompositionUtil.handleComposition({
                  composition,
                  path: 'WellKnownNameEditor.fillOpacityField',
                  onChange: this.onOpacityChange,
                  propName: 'opacity',
                  propValue: opacity,
                  defaultElement: <OpacityField />
                })
              )
            }
            {
              this.wrapFormItem(
                locale.strokeColorLabel,
                CompositionUtil.handleComposition({
                  composition,
                  path: 'WellKnownNameEditor.strokeColorField',
                  onChange: this.onStrokeColorChange,
                  propName: 'color',
                  propValue: strokeColor,
                  defaultElement: <ColorField />
                })
              )
            }
            {
              this.wrapFormItem(
                locale.strokeWidthLabel,
                CompositionUtil.handleComposition({
                  composition,
                  path: 'WellKnownNameEditor.strokeWidthField',
                  onChange: this.onStrokeWidthChange,
                  propName: 'width',
                  propValue: strokeWidth,
                  defaultElement: <WidthField />
                })
              )
            }
            {
              this.wrapFormItem(
                locale.strokeOpacityLabel,
                CompositionUtil.handleComposition({
                  composition,
                  path: 'WellKnownNameEditor.strokeOpacityField',
                  onChange: this.onStrokeOpacityChange,
                  propName: 'opacity',
                  propValue: strokeOpacity,
                  defaultElement: <OpacityField />
                })
              )
            }
            {
              this.wrapFormItem(
                locale.rotateLabel,
                CompositionUtil.handleComposition({
                  composition,
                  path: 'WellKnownNameEditor.rotateField',
                  onChange: this.onRotateChange,
                  propName: 'rotate',
                  propValue: rotate,
                  defaultElement: <RotateField />
                })
              )
            }
          </div>
        )}
      </CompositionContext.Consumer>
    );
  }
}

export default localize(WellKnownNameEditor, WellKnownNameEditor.componentName);
