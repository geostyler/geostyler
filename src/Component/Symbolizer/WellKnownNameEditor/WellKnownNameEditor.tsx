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
import { CompositionContext, Compositions } from '../../../context/CompositionContext/CompositionContext';
import CompositionUtil from '../../../Util/CompositionUtil';
import withDefaultsContext from '../../../hoc/withDefaultsContext';
import { DefaultValues } from '../../../context/DefaultValueContext/DefaultValueContext';

import en_US from '../../../locale/en_US';
import { Form } from 'antd';

import _cloneDeep from 'lodash/cloneDeep';
import _isEqual from 'lodash/isEqual';

// i18n
interface WellKnownNameEditorLocale {
  radiusLabel?: string;
  fillOpacityLabel?: string;
  fillColorLabel?: string;
  opacityLabel?: string;
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
  defaultValues: DefaultValues;
}

const COMPONENTNAME = 'WellKnownNameEditor';

export const WellKnownNameEditor: React.FC<WellKnownNameEditorProps> = ({
  locale =  en_US.GsWellKnownNameEditor,
  symbolizer,
  onSymbolizerChange,
  defaultValues
}) => {

  const onRadiusChange = (value: number) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.radius = value;
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

  const onOpacityChange = (value: number) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.opacity = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onFillOpacityChange = (newFillOpacity: number) => {
    if (onSymbolizerChange) {
      onSymbolizerChange({
        ...symbolizer,
        fillOpacity: newFillOpacity
      });
    }
  };

  const onStrokeColorChange = (value: string) => {
    const cloneSymbolizer = _cloneDeep(symbolizer);
    cloneSymbolizer.strokeColor = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(cloneSymbolizer);
    }
  };

  const onStrokeWidthChange = (value: number) => {
    const cloneSymbolizer = _cloneDeep(symbolizer);
    cloneSymbolizer.strokeWidth = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(cloneSymbolizer);
    }
  };

  const onStrokeOpacityChange = (value: number) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.strokeOpacity = value;
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

  /**
   * Wraps a Form Item around a given element and adds its locale
   * to the From Item label.
   */
  const wrapFormItem = (label: string, element: React.ReactElement): React.ReactElement => {
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    return element == null ? null : (
      <Form.Item
        label={label}
        {...formItemLayout}
      >
        {element}
      </Form.Item>
    );
  };

  const {
    color,
    fillOpacity,
    opacity,
    radius,
    rotate,
    strokeColor,
    strokeOpacity,
    strokeWidth
  } = symbolizer;

  return (
    <CompositionContext.Consumer>
      {(composition: Compositions) => (
        <div>
          {
            wrapFormItem(
              locale.radiusLabel,
              CompositionUtil.handleComposition({
                composition,
                path: 'WellKnownNameEditor.radiusField',
                onChange: onRadiusChange,
                propName: 'radius',
                propValue: radius,
                defaultValue: defaultValues?.WellKnownNameEditor?.defaultRadius,
                defaultElement: <RadiusField />
              })
            )
          }
          {
            wrapFormItem(
              locale.fillColorLabel,
              CompositionUtil.handleComposition({
                composition,
                path: 'WellKnownNameEditor.fillColorField',
                onChange: onColorChange,
                propName: 'color',
                propValue: color,
                defaultValue: defaultValues?.WellKnownNameEditor?.defaultColor,
                defaultElement: <ColorField />
              })
            )
          }
          {
            wrapFormItem(
              locale.opacityLabel,
              CompositionUtil.handleComposition({
                composition,
                path: 'WellKnownNameEditor.opacityField',
                onChange: onOpacityChange,
                propName: 'opacity',
                propValue: opacity,
                defaultValue: defaultValues?.WellKnownNameEditor?.defaultOpacity,
                defaultElement: <OpacityField />
              })
            )
          }
          {
            wrapFormItem(
              locale.fillOpacityLabel,
              CompositionUtil.handleComposition({
                composition,
                path: 'WellKnownNameEditor.fillOpacityField',
                onChange: onFillOpacityChange,
                propName: 'opacity',
                propValue: fillOpacity,
                defaultValue: defaultValues?.WellKnownNameEditor?.defaultFillOpacity,
                defaultElement: <OpacityField />
              })
            )
          }
          {
            wrapFormItem(
              locale.strokeColorLabel,
              CompositionUtil.handleComposition({
                composition,
                path: 'WellKnownNameEditor.strokeColorField',
                onChange: onStrokeColorChange,
                propName: 'color',
                propValue: strokeColor,
                defaultValue: defaultValues?.WellKnownNameEditor?.defaultStrokeColor,
                defaultElement: <ColorField />
              })
            )
          }
          {
            wrapFormItem(
              locale.strokeWidthLabel,
              CompositionUtil.handleComposition({
                composition,
                path: 'WellKnownNameEditor.strokeWidthField',
                onChange: onStrokeWidthChange,
                propName: 'width',
                propValue: strokeWidth,
                defaultValue: defaultValues?.WellKnownNameEditor?.defaultStrokeWidth,
                defaultElement: <WidthField />
              })
            )
          }
          {
            wrapFormItem(
              locale.strokeOpacityLabel,
              CompositionUtil.handleComposition({
                composition,
                path: 'WellKnownNameEditor.strokeOpacityField',
                onChange: onStrokeOpacityChange,
                propName: 'opacity',
                propValue: strokeOpacity,
                defaultValue: defaultValues?.WellKnownNameEditor?.defaultStrokeOpacity,
                defaultElement: <OpacityField />
              })
            )
          }
          {
            wrapFormItem(
              locale.rotateLabel,
              CompositionUtil.handleComposition({
                composition,
                path: 'WellKnownNameEditor.rotateField',
                onChange: onRotateChange,
                propName: 'rotate',
                propValue: rotate,
                defaultValue: defaultValues?.WellKnownNameEditor?.defaultRotate,
                defaultElement: <RotateField />
              })
            )
          }
        </div>
      )}
    </CompositionContext.Consumer>
  );
};

export default withDefaultsContext(localize(WellKnownNameEditor, COMPONENTNAME));
