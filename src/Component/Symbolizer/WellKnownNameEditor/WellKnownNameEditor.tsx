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
import withDefaultsContext from '../../../hoc/withDefaultsContext';

import en_US from '../../../locale/en_US';
import { Form } from 'antd';

import _cloneDeep from 'lodash/cloneDeep';
import _isEqual from 'lodash/isEqual';
import type GeoStylerLocale from '../../../locale/locale';
import OffsetField from '../Field/OffsetField/OffsetField';
import { useGeoStylerComposition } from '../../../context/GeoStylerContext/GeoStylerContext';

interface WellKnownNameEditorDefaultProps {
  locale: GeoStylerLocale['WellKnownNameEditor'];
}

// non default props
export interface WellKnownNameEditorProps extends Partial<WellKnownNameEditorDefaultProps> {
  symbolizer: MarkSymbolizer;
  onSymbolizerChange?: (changedSymb: Symbolizer) => void;
}

const COMPONENTNAME = 'WellKnownNameEditor';

export const WellKnownNameEditor: React.FC<WellKnownNameEditorProps> = (props) => {

  const composition = useGeoStylerComposition('WellKnownNameEditor', {});

  const composed = {...props, ...composition};

  const {
    locale =  en_US.WellKnownNameEditor,
    symbolizer,
    onSymbolizerChange
  } = composed;

  const onRadiusChange = (value: MarkSymbolizer['radius']) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.radius = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onOffsetXChange = (value: MarkSymbolizer['offset']['0']) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    let newOffset: MarkSymbolizer['offset'] = [
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
    let newOffset: MarkSymbolizer['offset'] = [
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

  return (
    <div>
      {
        composition.radiusField?.visibility === false ? null : (
          <Form.Item
            label={locale.radiusLabel}
          >
            <RadiusField
              radius={radius}
              defaultValue={composition.radiusField?.default as number}
              onChange={onRadiusChange}
            />
          </Form.Item>
        )
      }
      {
        composition.offsetXField?.visibility === false ? null : (
          <Form.Item
            label={locale.offsetXLabel}
          >
            <OffsetField
              offset={offset?.[0]}
              defaultValue={composition.offsetXField?.default as number}
              onChange={onOffsetXChange}
            />
          </Form.Item>
        )
      }
      {
        composition.offsetYField?.visibility === false ? null : (
          <Form.Item
            label={locale.offsetYLabel}
          >
            <OffsetField
              offset={offset?.[1]}
              defaultValue={composition.offsetYField?.default as number}
              onChange={onOffsetYChange}
            />
          </Form.Item>
        )
      }
      {
        composition.fillColorField?.visibility === false ? null : (
          <Form.Item
            label={locale.fillColorLabel}
          >
            <ColorField
              color={color as string}
              defaultValue={composition.fillColorField?.default}
              onChange={onColorChange}
            />
          </Form.Item>
        )
      }
      {
        composition.opacityField?.visibility === false ? null : (
          <Form.Item
            label={locale.opacityLabel}
          >
            <OpacityField
              value={opacity}
              defaultValue={composition.opacityField?.default as number}
              onChange={onOpacityChange}
            />
          </Form.Item>
        )
      }
      {
        composition.fillOpacityField?.visibility === false ? null : (
          <Form.Item
            label={locale.fillOpacityLabel}
          >
            <OpacityField
              value={fillOpacity}
              defaultValue={composition.fillOpacityField?.default as number}
              onChange={onFillOpacityChange}
            />
          </Form.Item>
        )
      }
      {
        composition.strokeColorField?.visibility === false ? null : (
          <Form.Item
            label={locale.strokeColorLabel}
          >
            <ColorField
              color={strokeColor as string}
              defaultValue={composition.strokeColorField?.default}
              onChange={onStrokeColorChange}
            />
          </Form.Item>
        )
      }
      {
        composition.strokeWidthField?.visibility === false ? null : (
          <Form.Item
            label={locale.strokeWidthLabel}
          >
            <WidthField
              value={strokeWidth}
              defaultValue={composition.strokeWidthField?.default as number}
              onChange={onStrokeWidthChange}
            />
          </Form.Item>
        )
      }
      {
        composition.strokeOpacityField?.visibility === false ? null : (
          <Form.Item
            label={locale.strokeOpacityLabel}
          >
            <OpacityField
              value={strokeOpacity}
              defaultValue={composition.strokeOpacityField?.default as number}
              onChange={onStrokeOpacityChange}
            />
          </Form.Item>
        )
      }
      {
        composition.rotateField?.visibility === false ? null : (
          <Form.Item
            label={locale.rotateLabel}
          >
            <RotateField
              rotate={rotate}
              defaultValue={composition.rotateField?.default as number}
              onChange={onRotateChange}
            />
          </Form.Item>
        )
      }
    </div>
  );
};

export default withDefaultsContext(localize(WellKnownNameEditor, COMPONENTNAME));
