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

import { MarkSymbolizer } from 'geostyler-style';

import { ColorField, ColorFieldProps } from '../Field/ColorField/ColorField';
import { OpacityField, OpacityFieldProps } from '../Field/OpacityField/OpacityField';
import { RadiusField, RadiusFieldProps } from '../Field/RadiusField/RadiusField';
import { WidthField, WidthFieldProps } from '../Field/WidthField/WidthField';
import { RotateField, RotateFieldProps } from '../Field/RotateField/RotateField';

import { Form } from 'antd';

import _cloneDeep from 'lodash/cloneDeep';

import { OffsetField, OffsetFieldProps } from '../Field/OffsetField/OffsetField';
import {
  InputConfig,
  useGeoStylerComposition,
  useGeoStylerLocale
} from '../../../context/GeoStylerContext/GeoStylerContext';
import { getFormItemConfig } from '../../../Util/FormItemUtil';

export interface WellKnownNameEditorComposableProps {
  radiusField?: InputConfig<RadiusFieldProps['value']>;
  offsetXField?: InputConfig<OffsetFieldProps['value']>;
  offsetYField?: InputConfig<OffsetFieldProps['value']>;
  fillColorField?: InputConfig<ColorFieldProps['value']>;
  opacityField?: InputConfig<OpacityFieldProps['value']>;
  fillOpacityField?: InputConfig<OpacityFieldProps['value']>;
  strokeColorField?: InputConfig<ColorFieldProps['value']>;
  strokeWidthField?: InputConfig<WidthFieldProps['value']>;
  strokeOpacityField?: InputConfig<OpacityFieldProps['value']>;
  rotateField?: InputConfig<RotateFieldProps['value']>;
}

export interface WellKnownNameEditorInternalProps {
  symbolizer: MarkSymbolizer;
  onSymbolizerChange?: (changedSymb: MarkSymbolizer) => void;
}

export type WellKnownNameEditorProps = WellKnownNameEditorInternalProps & WellKnownNameEditorComposableProps;

export const WellKnownNameEditor: React.FC<WellKnownNameEditorProps> = (props) => {

  const composition = useGeoStylerComposition('WellKnownNameEditor');
  const composed = { ...props, ...composition };
  const {
    fillColorField,
    fillOpacityField,
    offsetXField,
    offsetYField,
    onSymbolizerChange,
    opacityField,
    radiusField,
    rotateField,
    strokeColorField,
    strokeOpacityField,
    strokeWidthField,
    symbolizer
  } = composed;

  const locale = useGeoStylerLocale('WellKnownNameEditor');

  const onRadiusChange = (value: MarkSymbolizer['radius']) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.radius = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onOffsetXChange = (value: MarkSymbolizer['offset']['0']) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    const newOffset: MarkSymbolizer['offset'] = [
      value,
      (symbolizerClone.offset ? symbolizerClone.offset[1] : 0)
    ];
    symbolizerClone.offset = newOffset;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onOffsetYChange = (value: MarkSymbolizer['offset']['1']) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    const newOffset: MarkSymbolizer['offset'] = [
      (symbolizerClone.offset ? symbolizerClone.offset[0] : 0),
      value
    ];
    symbolizerClone.offset = newOffset;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onColorChange = (value: MarkSymbolizer['color']) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.color = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onOpacityChange = (value: MarkSymbolizer['opacity']) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.opacity = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onFillOpacityChange = (newFillOpacity: MarkSymbolizer['fillOpacity']) => {
    if (onSymbolizerChange) {
      onSymbolizerChange({
        ...symbolizer,
        fillOpacity: newFillOpacity
      });
    }
  };

  const onStrokeColorChange = (value: MarkSymbolizer['strokeColor']) => {
    const cloneSymbolizer = _cloneDeep(symbolizer);
    cloneSymbolizer.strokeColor = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(cloneSymbolizer);
    }
  };

  const onStrokeWidthChange = (value: MarkSymbolizer['strokeWidth']) => {
    const cloneSymbolizer = _cloneDeep(symbolizer);
    cloneSymbolizer.strokeWidth = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(cloneSymbolizer);
    }
  };

  const onStrokeOpacityChange = (value: MarkSymbolizer['strokeOpacity']) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.strokeOpacity = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onRotateChange = (value: MarkSymbolizer['rotate']) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.rotate = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const {
    color,
    fillOpacity,
    opacity,
    radius,
    rotate,
    strokeColor,
    strokeOpacity,
    strokeWidth,
    offset
  } = symbolizer;

  const itemConfig = getFormItemConfig();

  return (
    <div>
      {
        radiusField?.visibility === false ? null : (
          <Form.Item
            {...itemConfig}
            label={locale.radiusLabel}
          >
            <RadiusField
              value={radius}
              defaultValue={radiusField?.default as number}
              onChange={onRadiusChange}
            />
          </Form.Item>
        )
      }
      {
        opacityField?.visibility === false ? null : (
          <Form.Item
            {...itemConfig}
            label={locale.opacityLabel}
            extra={locale.opacityExtra}
          >
            <OpacityField
              value={opacity}
              defaultValue={opacityField?.default as number}
              onChange={onOpacityChange}
            />
          </Form.Item>
        )
      }
      <fieldset>
        <legend>{locale.fill}</legend>
        {
          fillColorField?.visibility === false ? null : (
            <Form.Item
              {...itemConfig}
              label={locale.fillColorLabel}
            >
              <ColorField
                value={color as string}
                defaultValue={fillColorField?.default}
                onChange={onColorChange}
              />
            </Form.Item>
          )
        }
        {
        fillOpacityField?.visibility === false ? null : (
          <Form.Item
            {...itemConfig}
            label={locale.fillOpacityLabel}
            extra={locale.opacityExtra}
          >
            <OpacityField
              value={fillOpacity}
              defaultValue={fillOpacityField?.default as number}
              onChange={onFillOpacityChange}
            />
          </Form.Item>
        )
      }
      </fieldset>
      <fieldset>
        <legend>{locale.stroke}</legend>
        {
          strokeWidthField?.visibility === false ? null : (
            <Form.Item
              {...itemConfig}
              label={locale.strokeWidthLabel}
            >
              <WidthField
                value={strokeWidth}
                defaultValue={strokeWidthField?.default as number}
                onChange={onStrokeWidthChange}
              />
            </Form.Item>
          )
        }
        {
          strokeColorField?.visibility === false ? null : (
            <Form.Item
              {...itemConfig}
              label={locale.strokeColorLabel}
            >
              <ColorField
                value={strokeColor as string}
                defaultValue={strokeColorField?.default as string}
                onChange={onStrokeColorChange}
              />
            </Form.Item>
          )
        }
        {
          strokeOpacityField?.visibility === false ? null : (
            <Form.Item
              {...itemConfig}
              label={locale.strokeOpacityLabel}
              extra={locale.opacityExtra}
            >
              <OpacityField
                value={strokeOpacity}
                defaultValue={strokeOpacityField?.default as number}
                onChange={onStrokeOpacityChange}
              />
            </Form.Item>
          )
        }
      </fieldset>
      <fieldset>
        <legend>{locale.position}</legend>
        {
          offsetXField?.visibility === false ? null : (
            <Form.Item
              {...itemConfig}
              label={locale.offsetXLabel}
              extra={locale.offsetXExtra}
            >
              <OffsetField
                value={offset?.[0]}
                defaultValue={offsetXField?.default as number}
                onChange={onOffsetXChange}
              />
            </Form.Item>
          )
        }
        {
          offsetYField?.visibility === false ? null : (
            <Form.Item
              {...itemConfig}
              label={locale.offsetYLabel}
              extra={locale.offsetYExtra}
            >
              <OffsetField
                value={offset?.[1]}
                defaultValue={offsetYField?.default as number}
                onChange={onOffsetYChange}
              />
            </Form.Item>
          )
        }
        {
          rotateField?.visibility === false ? null : (
            <Form.Item
              {...itemConfig}
              label={locale.rotateLabel}
              extra={locale.rotateExtra}
            >
              <RotateField
                value={rotate}
                defaultValue={rotateField?.default as number}
                onChange={onRotateChange}
              />
            </Form.Item>
          )
        }
      </fieldset>
    </div>
  );
};
