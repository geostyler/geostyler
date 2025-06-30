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

import _get from 'lodash-es/get.js';

import {
  InputConfig,
  useGeoStylerComposition,
  useGeoStylerLocale,
  useGeoStylerUnsupportedProperties
} from '../../../context/GeoStylerContext/GeoStylerContext';
import VisibilityField, { VisibilityFieldProps } from '../Field/VisibilityField/VisibilityField';
import { getFormItemConfig } from '../../../Util/FormItemUtil';

export interface LineEditorComposableProps {
  colorField?: InputConfig<ColorFieldProps['value']>;
  widthField?: InputConfig<WidthFieldProps['value']>;
  perpendicularOffsetField?: InputConfig<OffsetFieldProps['value']>;
  opacityField?: InputConfig<OpacityFieldProps['value']>;
  // TODO add support for default values in LineDashField
  lineDashField?: {
    visibility?: boolean;
  };
  dashOffsetField?: InputConfig<OffsetFieldProps['value']>;
  // TODO add support for default values in LineCapField
  capField?: {
    visibility?: boolean;
  };
  // TODO add support for default values in LineJoinField
  joinField?: InputConfig<LineJoinFieldProps['value']>;
  // TODO add support for default values in GraphicEditor
  graphicStrokeField?: InputConfig<GraphicEditorProps['value']>;
  // TODO add support for default values in GraphicEditor
  graphicFillField?: InputConfig<GraphicEditorProps['value']>;
  // TODO add support for default values in VisibilityField
  visibilityField?: InputConfig<VisibilityFieldProps['value']>;
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
    const symbolizerClone = structuredClone(symbolizer);
    symbolizerClone.color = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onWidthChange = (value: LineSymbolizer['width']) => {
    const symbolizerClone = structuredClone(symbolizer);
    symbolizerClone.width = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onPerpendicularOffsetChange = (value: LineSymbolizer['perpendicularOffset']) => {
    const symbolizerClone = structuredClone(symbolizer);
    symbolizerClone.perpendicularOffset = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onOpacityChange = (value: LineSymbolizer['opacity']) => {
    const symbolizerClone = structuredClone(symbolizer);
    symbolizerClone.opacity = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onDasharrayChange = (value: LineSymbolizer['dasharray']) => {
    const symbolizerClone = structuredClone(symbolizer);
    symbolizerClone.dasharray = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onDashOffsetChange = (value: LineSymbolizer['dashOffset']) => {
    const symbolizerClone = structuredClone(symbolizer);
    symbolizerClone.dashOffset = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onCapChange = (value: LineSymbolizer['cap']) => {
    const symbolizerClone = structuredClone(symbolizer);
    symbolizerClone.cap = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onJoinChange = (value: LineSymbolizer['join']) => {
    const symbolizerClone = structuredClone(symbolizer);
    symbolizerClone.join = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onGraphicStrokeChange = (value: PointSymbolizer) => {
    const symbolizerClone = structuredClone(symbolizer);
    symbolizerClone.graphicStroke = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onGraphicFillChange = (value: PointSymbolizer) => {
    const symbolizerClone = structuredClone(symbolizer);
    symbolizerClone.graphicFill = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onVisibilityChange = (newVisibility: LineSymbolizer['visibility']) => {
    const symbolizerClone: LineSymbolizer = structuredClone(symbolizer);
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
  } = structuredClone(symbolizer);

  const itemConfig = getFormItemConfig();

  const collapseItems = [{
    key: '1',
    label: locale.generalSectionLabel,
    children: (
      <>
        {
          visibilityField?.visibility === false ? null : (
            <Form.Item
              {...itemConfig}
              label={locale.visibilityLabel}
            >
              <VisibilityField
                value={visibility}
                onChange={onVisibilityChange}
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
          opacityField?.visibility === false ? null : (
            <Form.Item
              {...itemConfig}
              label={locale.opacityLabel}
              extra={locale.opacityExtra}
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
          perpendicularOffsetField?.visibility === false ? null : (
            <Form.Item
              {...itemConfig}
              label={locale.perpendicularOffsetLabel}
              {...getFormItemSupportProps('perpendicularOffset')}
            >
              <OffsetField
                value={perpendicularOffset}
                defaultValue={perpendicularOffsetField?.default as number}
                onChange={onPerpendicularOffsetChange}
              />
            </Form.Item>
          )
        }
        {
          lineDashField?.visibility === false ? null : (
            <Form.Item
              {...itemConfig}
              label={locale.dashLabel}
              extra={locale.dashExtra}
              {...getFormItemSupportProps('dasharray')}
            >
              <LineDashField
                value={dasharray as number[]}
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
                value={dashOffset}
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

      </>
    )
  }];

  if (graphicStrokeField?.visibility !== false) {
    collapseItems.push({
      key: '2',
      label: locale.graphicStrokeSectionLabel,
      children: (
        <GraphicEditor
          value={graphicStroke}
          onGraphicChange={onGraphicStrokeChange}
          graphicTypeFieldLabel={locale.graphicStrokeTypeLabel}
          graphicType={_get(graphicStroke, 'kind') as GraphicType}
        />
      )
    });
  }
  if (graphicFillField?.visibility !== false) {
    collapseItems.push({
      key: '3',
      label: locale.graphicFillSectionLabel,
      children: (
        <GraphicEditor
          value={graphicFill}
          onGraphicChange={onGraphicFillChange}
          graphicTypeFieldLabel={locale.graphicFillTypeLabel}
          graphicType={_get(graphicFill, 'kind') as GraphicType}
        />
      )
    });
  }

  return (
    <div className="gs-line-symbolizer-editor" >
      <Collapse
        items={collapseItems}
        defaultActiveKey={['1']}
        bordered={false}
      />
    </div>
  );
};
