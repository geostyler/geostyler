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

import React, { useState } from 'react';

import {
  Divider,
  Form,
  Switch
} from 'antd';

import {
  CapType,
  GraphicType,
  JoinType,
  LineSymbolizer,
  PointSymbolizer,
  Symbolizer
} from 'geostyler-style';

import { ColorField, ColorFieldProps } from '../Field/ColorField/ColorField';
import { LineCapField } from '../Field/LineCapField/LineCapField';
import { LineDashField } from '../Field/LineDashField/LineDashField';
import { LineJoinField, LineJoinFieldProps } from '../Field/LineJoinField/LineJoinField';
import { OffsetField, OffsetFieldProps } from '../Field/OffsetField/OffsetField';
import { OpacityField, OpacityFieldProps } from '../Field/OpacityField/OpacityField';
import { WidthField, WidthFieldProps } from '../Field/WidthField/WidthField';
import { GraphicEditor, GraphicEditorProps } from '../GraphicEditor/GraphicEditor';

import _get from 'lodash-es/get.js';

import {
  InputConfig,
  useGeoStylerComposition,
  useGeoStylerLocale,
  useGeoStylerUnsupportedProperties
} from '../../../context/GeoStylerContext/GeoStylerContext';
import { getFormItemConfig } from '../../../Util/FormItemUtil';
import VisibilityField, { VisibilityFieldProps } from '../Field/VisibilityField/VisibilityField';

import './LineEditor.css';

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
  graphicStrokeSwitch?: InputConfig<boolean>;
  graphicFillSwitch?: InputConfig<boolean>;
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
    joinField,
    lineDashField,
    onSymbolizerChange,
    opacityField,
    perpendicularOffsetField,
    symbolizer,
    widthField,
    visibilityField,
    graphicStrokeSwitch,
    graphicFillSwitch
  } = composed;

  const locale = useGeoStylerLocale('LineEditor');

  const [displayGraphicStroke, setDisplayGraphicStroke] = useState<boolean>(
    graphicStrokeSwitch?.default === true ? true: false
  );

  const [displayGraphicFill, setDisplayGraphicFill] = useState<boolean>(
    graphicFillSwitch?.default === true ? true: false
  );

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

  return (
    <div className="gs-line-symbolizer-editor" >
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
              value={perpendicularOffset}
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
      {
        graphicStrokeSwitch?.visibility === false ? null : (
          <>
            <Divider />
            <Form.Item
              label={locale.graphicStrokeSectionLabel}
            >
              <Switch value={displayGraphicStroke} onChange={setDisplayGraphicStroke} />
            </Form.Item>
          </>
        )
      }
      {
        displayGraphicStroke && <GraphicEditor
          graphicTypeFieldLabel={locale.graphicStrokeTypeLabel}
          value={graphicStroke}
          graphicType={_get(graphicStroke, 'kind') as GraphicType}
          onGraphicChange={onGraphicStrokeChange}
        />
      }
      {
        graphicFillSwitch?.visibility === false ? null : (
          <>
            <Divider />
            <Form.Item
              label={locale.graphicFillSectionLabel}
            >
              <Switch value={displayGraphicFill} onChange={setDisplayGraphicFill} />
            </Form.Item>
          </>
        )
      }
      {
        displayGraphicFill && <GraphicEditor
          graphicTypeFieldLabel={locale.graphicFillTypeLabel}
          value={graphicFill}
          graphicType={_get(graphicFill, 'kind') as GraphicType}
          onGraphicChange={onGraphicFillChange}
        />
      }
    </div>
  );
};
