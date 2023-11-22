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

import {
  Collapse,
  Form
} from 'antd';

import {
  Symbolizer,
  LineSymbolizer,
  PointSymbolizer,
  GraphicType,
  CapType,
  JoinType
} from 'geostyler-style';

import { ColorField, ColorFieldProps } from '../Field/ColorField/ColorField';
import { OpacityField, OpacityFieldProps } from '../Field/OpacityField/OpacityField';
import { WidthField, WidthFieldProps } from '../Field/WidthField/WidthField';
import { LineDashField } from '../Field/LineDashField/LineDashField';
import { LineCapField } from '../Field/LineCapField/LineCapField';
import { LineJoinField, LineJoinFieldProps } from '../Field/LineJoinField/LineJoinField';
import { OffsetField, OffsetFieldProps } from '../Field/OffsetField/OffsetField';
import { GraphicEditor, GraphicEditorProps } from '../GraphicEditor/GraphicEditor';

import _cloneDeep from 'lodash/cloneDeep';
import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';

import {
  InputConfig,
  useGeoStylerComposition,
  useGeoStylerLocale,
  useGeoStylerUnsupportedProperties
} from '../../../context/GeoStylerContext/GeoStylerContext';
import VisibilityField, { VisibilityFieldProps } from '../Field/VisibilityField/VisibilityField';
import { getFormItemConfig } from '../../../Util/FormItemUtil';

const Panel = Collapse.Panel;

export interface LineEditorComposableProps {
  colorField?: InputConfig<ColorFieldProps['value']>;
  widthField?: InputConfig<WidthFieldProps['value']>;
  perpendicularOffsetField?: InputConfig<OffsetFieldProps['offset']>;
  opacityField?: InputConfig<OpacityFieldProps['value']>;
  // TODO add support for default values in LineDashField
  lineDashField?: {
    visibility?: boolean;
  };
  dashOffsetField?: InputConfig<OffsetFieldProps['offset']>;
  // TODO add support for default values in LineCapField
  capField?: {
    visibility?: boolean;
  };
  // TODO add support for default values in LineJoinField
  joinField?: InputConfig<LineJoinFieldProps['value']>;
  // TODO add support for default values in GraphicEditor
  graphicStrokeField?: InputConfig<GraphicEditorProps['graphic']>;
  // TODO add support for default values in GraphicEditor
  graphicFillField?: InputConfig<GraphicEditorProps['graphic']>;
  // TODO add support for default values in VisibilityField
  visibilityField?: InputConfig<VisibilityFieldProps['visibility']>;
}

export interface LineEditorInternalProps {
  /** Symbolizer */
  symbolizer: LineSymbolizer;
  /** Callback when symbolizer changes */
  onSymbolizerChange?: (changedSymb: Symbolizer) => void;
}

export type LineEditorProps = LineEditorInternalProps & LineEditorComposableProps;

export const LineEditor: React.FC<LineEditorProps> = (props) => {

  const composition = useGeoStylerComposition('LineEditor');
  const composed = { ...props, ...composition };
  const {
    capField,
    colorField,
    dashOffsetField,
    graphicFillField,
    graphicStrokeField,
    joinField,
    lineDashField,
    onSymbolizerChange,
    opacityField,
    perpendicularOffsetField,
    symbolizer,
    widthField,
    visibilityField,
  } = composed;

  const locale = useGeoStylerLocale('LineEditor');

  const {
    getFormItemSupportProps
  } = useGeoStylerUnsupportedProperties(symbolizer);

  const onColorChange = (value: LineSymbolizer['color']) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.color = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onWidthChange = (value: LineSymbolizer['width']) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.width = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onPerpendicularOffsetChange = (value: LineSymbolizer['perpendicularOffset']) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.perpendicularOffset = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onOpacityChange = (value: LineSymbolizer['opacity']) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.opacity = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onDasharrayChange = (value: LineSymbolizer['dasharray']) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.dasharray = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onDashOffsetChange = (value: LineSymbolizer['dashOffset']) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.dashOffset = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onCapChange = (value: LineSymbolizer['cap']) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.cap = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onJoinChange = (value: LineSymbolizer['join']) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.join = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onGraphicStrokeChange = (value: PointSymbolizer) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.graphicStroke = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onGraphicFillChange = (value: PointSymbolizer) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.graphicFill = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onVisibilityChange = (newVisibility: LineSymbolizer['visibility']) => {
    const symbolizerClone: LineSymbolizer = _cloneDeep(symbolizer);
    symbolizerClone.visibility = newVisibility;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const {
    color,
    width,
    opacity,
    dasharray,
    dashOffset,
    cap,
    join,
    graphicStroke,
    perpendicularOffset,
    graphicFill,
    visibility
  } = _cloneDeep(symbolizer);

  const itemConfig = getFormItemConfig();

  return (
    <div className="gs-line-symbolizer-editor" >
      <Collapse bordered={false} defaultActiveKey={['1']}>
        <Panel header="General" key="1">
          {
            visibilityField?.visibility === false ? null : (
              <Form.Item
                {...itemConfig}
                label={locale.visibilityLabel}
              >
                <VisibilityField
                  visibility={visibility}
                  onChange={onVisibilityChange}
                />
              </Form.Item>
            )
          }
          {
            colorField?.visibility === false ? null : (
              <Form.Item
                {...itemConfig}
                label={locale.colorLabel}
                {...getFormItemSupportProps('color')}
              >
                <ColorField
                  value={color as string}
                  defaultValue={colorField?.default}
                  onChange={onColorChange}
                />
              </Form.Item>
            )
          }
          {
            widthField?.visibility === false ? null : (
              <Form.Item
                {...itemConfig}
                label={locale.widthLabel}
                {...getFormItemSupportProps('width')}
              >
                <WidthField
                  value={width}
                  defaultValue={widthField?.default as number}
                  onChange={onWidthChange}
                />
              </Form.Item>
            )
          }
          {
            perpendicularOffsetField?.visibility === false ? null : (
              <Form.Item
                {...itemConfig}
                label={locale.perpendicularOffsetLabel}
                {...getFormItemSupportProps('perpendicularOffset')}
              >
                <OffsetField
                  offset={perpendicularOffset}
                  defaultValue={perpendicularOffsetField?.default as number}
                  onChange={onPerpendicularOffsetChange}
                />
              </Form.Item>
            )
          }
          {
            opacityField?.visibility === false ? null : (
              <Form.Item
                {...itemConfig}
                label={locale.opacityLabel}
                {...getFormItemSupportProps('opacity')}
              >
                <OpacityField
                  value={opacity}
                  defaultValue={opacityField?.default as number}
                  onChange={onOpacityChange}
                />
              </Form.Item>
            )
          }
          {
            lineDashField?.visibility === false ? null : (
              <Form.Item
                {...itemConfig}
                label={locale.dashLabel}
                {...getFormItemSupportProps('dasharray')}
              >
                <LineDashField
                  dashArray={dasharray as number[]}
                  onChange={onDasharrayChange}
                />
              </Form.Item>
            )
          }
          {
            dashOffsetField?.visibility === false ? null : (
              <Form.Item
                {...itemConfig}
                label={locale.dashOffsetLabel}
                {...getFormItemSupportProps('dashOffset')}
              >
                <OffsetField
                  offset={dashOffset}
                  defaultValue={dashOffsetField?.default as number}
                  onChange={onDashOffsetChange}
                  disabled={
                    symbolizer.dasharray === undefined || _get(symbolizer, 'dasharray.length') === 0
                  }
                />
              </Form.Item>
            )
          }
          {
            capField?.visibility === false ? null : (
              <Form.Item
                {...itemConfig}
                label={locale.capLabel}
                {...getFormItemSupportProps('cap')}
              >
                <LineCapField
                  value={cap}
                  onChange={(val) => onCapChange(val as CapType)}
                />
              </Form.Item>
            )
          }
          {
            joinField?.visibility === false ? null : (
              <Form.Item
                {...itemConfig}
                label={locale.joinLabel}
                {...getFormItemSupportProps('join')}
              >
                <LineJoinField
                  value={join}
                  onChange={(val) => onJoinChange(val as JoinType)}
                />
              </Form.Item>
            )
          }
        </Panel>
        {
          graphicStrokeField?.visibility === false ? null : (
            <Panel header="Graphic Stroke" key="2">
              <GraphicEditor
                graphic={graphicStroke}
                onGraphicChange={onGraphicStrokeChange}
                graphicTypeFieldLabel={locale.graphicStrokeTypeLabel}
                graphicType={_get(graphicStroke, 'kind') as GraphicType}
              />
            </Panel>
          )
        }
        {
          graphicFillField?.visibility === false ? null : (
            <Panel header="Graphic Fill" key="3">
              <GraphicEditor
                graphic={graphicFill}
                onGraphicChange={onGraphicFillChange}
                graphicTypeFieldLabel={locale.graphicFillTypeLabel}
                graphicType={_get(graphicFill, 'kind') as GraphicType}
              />
            </Panel>
          )
        }
      </Collapse>
    </div>
  );
};
