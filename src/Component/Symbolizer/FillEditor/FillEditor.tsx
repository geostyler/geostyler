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
  Collapse,
  Form
} from 'antd';

import {
  Symbolizer,
  FillSymbolizer,
  PointSymbolizer,
  GraphicType,
  Expression
} from 'geostyler-style';

import ColorField, { ColorFieldProps } from '../Field/ColorField/ColorField';
import OpacityField, { OpacityFieldProps } from '../Field/OpacityField/OpacityField';
import GraphicEditor from '../GraphicEditor/GraphicEditor';
import WidthField, { WidthFieldProps } from '../Field/WidthField/WidthField';

import _cloneDeep from 'lodash/cloneDeep';
import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';
import LineDashField, { LineDashFieldProps } from '../Field/LineDashField/LineDashField';
import type GeoStylerLocale from '../../../locale/locale';
import {
  UnsupportedPropertiesContext
} from '../../../context/UnsupportedPropertiesContext/UnsupportedPropertiesContext';
import UnsupportedPropertiesUtil from '../../../Util/UnsupportedPropertiesUtil';
import { InputConfig, useGeoStylerComposition } from '../../../context/GeoStylerContext/GeoStylerContext';

const Panel = Collapse.Panel;

export interface FillEditorComposableProps {
  visibility?: boolean;
  fillColorField?: InputConfig<ColorFieldProps['value']>;
  fillOpacityField?: InputConfig<OpacityFieldProps['value']>;
  opacityField?: InputConfig<OpacityFieldProps['value']>;
  outlineOpacityField?: InputConfig<OpacityFieldProps['value']>;
  outlineColorField?: InputConfig<ColorFieldProps['value']>;
  // TODO add support for default values in LineDashField
  outlineDasharrayField?: Omit<InputConfig<LineDashFieldProps['dashArray']>, 'default'>;
  outlineWidthField?: InputConfig<WidthFieldProps['value']>;
  // TODO add support for graphicFill
}

// non default props
export interface FillEditorProps {
  locale?: GeoStylerLocale['FillEditor'];
  symbolizer: FillSymbolizer;
  onSymbolizerChange?: (changedSymb: Symbolizer) => void;
}

const COMPONENTNAME = 'FillEditor';

export const FillEditor: React.FC<FillEditorProps & FillEditorComposableProps> = ({
  locale = en_US.FillEditor,
  symbolizer,
  onSymbolizerChange,
  ...composableProps
}) => {

  const composition = useGeoStylerComposition('FillEditor');
  const composed = {...composableProps, ...composition};

  const {
    unsupportedProperties,
    options
  } = useContext(UnsupportedPropertiesContext);

  const onFillColorChange = (value: FillSymbolizer['color']) => {
    const symbolizerClone: FillSymbolizer = _cloneDeep(symbolizer);
    symbolizerClone.color = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onFillOpacityChange = (value: FillSymbolizer['fillOpacity']) => {
    const symbolizerClone: FillSymbolizer = _cloneDeep(symbolizer);
    symbolizerClone.fillOpacity = value;

    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onOpacityChange = (value: FillSymbolizer['opacity']) => {
    const symbolizerClone: FillSymbolizer = _cloneDeep(symbolizer);
    symbolizerClone.opacity = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onOutlineOpacityChange = (value: FillSymbolizer['outlineOpacity']) => {
    const symbolizerClone: FillSymbolizer = _cloneDeep(symbolizer);
    symbolizerClone.outlineOpacity = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onOutlineColorChange = (value: FillSymbolizer['outlineColor']) => {
    const symbolizerClone: FillSymbolizer = _cloneDeep(symbolizer);
    symbolizerClone.outlineColor = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onOutlineWidthChange = (value: Expression<FillSymbolizer['outlineWidth']>) => {
    const symbolizerClone: FillSymbolizer = _cloneDeep(symbolizer);
    symbolizerClone.outlineWidth = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onOutlineDasharrayChange = (value: FillSymbolizer['outlineDasharray']) => {
    const symbolizerClone: FillSymbolizer = _cloneDeep(symbolizer);
    symbolizerClone.outlineDasharray = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onGraphicChange = (newGraphicFill: PointSymbolizer) => {
    const symbolizerClone: FillSymbolizer = _cloneDeep(symbolizer);
    symbolizerClone.graphicFill = newGraphicFill;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const {
    color,
    fillOpacity,
    outlineColor,
    graphicFill,
    outlineWidth,
    outlineDasharray,
    opacity,
    outlineOpacity
  } = symbolizer;

  const getSupportProps = (propName: keyof FillSymbolizer) => {
    return UnsupportedPropertiesUtil.getSupportProps<FillSymbolizer>({
      propName,
      symbolizerName: 'FillSymbolizer',
      unsupportedProperties,
      ...options
    });
  };

  return (
    <div className="gs-fill-symbolizer-editor" >
      <Collapse bordered={false} defaultActiveKey={['1']}>
        <Panel header="General" key="1">
          {
            composed.fillColorField?.visibility === false ? null : (
              <Form.Item
                label={locale.fillColorLabel}
                {...getSupportProps('color')}
              >
                <ColorField
                  value={color as string}
                  defaultValue={composed.fillColorField?.default}
                  onChange={onFillColorChange}
                />
              </Form.Item>
            )
          }
          {
            composed.fillOpacityField?.visibility === false ? null : (
              <Form.Item
                label={locale.fillOpacityLabel}
                {...getSupportProps('fillOpacity')}
              >
                <OpacityField
                  value={fillOpacity}
                  defaultValue={composed.fillOpacityField?.default as number}
                  onChange={onFillOpacityChange}
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
          {
            composed.outlineOpacityField?.visibility === false ? null : (
              <Form.Item
                label={locale.outlineOpacityLabel}
                {...getSupportProps('outlineOpacity')}
              >
                <OpacityField
                  value={outlineOpacity}
                  defaultValue={composed.outlineOpacityField?.default as number}
                  onChange={onOutlineOpacityChange}
                />
              </Form.Item>
            )
          }
          {
            composed.outlineColorField?.visibility === false ? null : (
              <Form.Item
                label={locale.outlineColorLabel}
                {...getSupportProps('outlineColor')}
              >
                <ColorField
                  value={outlineColor as string}
                  defaultValue={composed.outlineColorField?.default}
                  onChange={onOutlineColorChange}
                />
              </Form.Item>
            )
          }
          {
            composed.outlineWidthField?.visibility === false ? null : (
              <Form.Item
                label={locale.outlineWidthLabel}
                {...getSupportProps('outlineWidth')}
              >
                <WidthField
                  value={outlineWidth}
                  defaultValue={composed.outlineWidthField?.default as number}
                  onChange={onOutlineWidthChange}
                />
              </Form.Item>
            )
          }
          {
            composed.outlineDasharrayField?.visibility === false ? null : (
              <Form.Item
                label={locale.outlineDasharrayLabel}
                {...getSupportProps('outlineDasharray')}
              >
                <LineDashField
                  dashArray={outlineDasharray as number[]}
                  onChange={onOutlineDasharrayChange}
                />
              </Form.Item>
            )
          }
        </Panel>
        <Panel header="Graphic Fill" key="2">
          {/* TODO: allow changing graphicFill via composition context */}
          <GraphicEditor
            graphicTypeFieldLabel={locale.graphicFillTypeLabel}
            graphic={graphicFill}
            graphicType={_get(graphicFill, 'kind') as GraphicType}
            onGraphicChange={onGraphicChange}
          />
        </Panel>
      </Collapse>
    </div>
  );
};

export default localize(FillEditor, COMPONENTNAME);
