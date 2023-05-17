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
  LineSymbolizer,
  PointSymbolizer,
  GraphicType,
  CapType,
  JoinType
} from 'geostyler-style';

import ColorField from '../Field/ColorField/ColorField';
import OpacityField from '../Field/OpacityField/OpacityField';
import WidthField from '../Field/WidthField/WidthField';
import LineDashField from '../Field/LineDashField/LineDashField';
import LineCapField from '../Field/LineCapField/LineCapField';
import LineJoinField from '../Field/LineJoinField/LineJoinField';
import OffsetField from '../Field/OffsetField/OffsetField';
import GraphicEditor from '../GraphicEditor/GraphicEditor';

import _cloneDeep from 'lodash/cloneDeep';
import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';
import withDefaultsContext from '../../../hoc/withDefaultsContext';
import { DefaultValues } from '../../../context/DefaultValueContext/DefaultValueContext';
import type GeoStylerLocale from '../../../locale/locale';
import {
  UnsupportedPropertiesContext
} from '../../../context/UnsupportedPropertiesContext/UnsupportedPropertiesContext';
import UnsupportedPropertiesUtil from '../../../Util/UnsupportedPropertiesUtil';
import { useGeoStylerComposition } from '../../../context/GeoStylerContext/GeoStylerContext';

const Panel = Collapse.Panel;

export interface LineEditorDefaultProps {
  /** Language package */
  locale: GeoStylerLocale['LineEditor'];
}

// non default props
export interface LineEditorProps extends Partial<LineEditorDefaultProps> {
  /** Symbolizer */
  symbolizer: LineSymbolizer;
  /** Callback when symbolizer changes */
  onSymbolizerChange?: (changedSymb: Symbolizer) => void;
  defaultValues?: DefaultValues;
}
const COMPONENTNAME = 'LineEditor';

export const LineEditor: React.FC<LineEditorProps> = (props) => {

  const composition = useGeoStylerComposition('LineEditor', {});

  const composed = {...props, ...composition};

  const {
    locale = en_US.LineEditor,
    symbolizer,
    onSymbolizerChange
  } = composed;

  const {
    unsupportedProperties,
    options
  } = useContext(UnsupportedPropertiesContext);

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
    graphicFill
  } = _cloneDeep(symbolizer);

  const getSupportProps = (propName: keyof LineSymbolizer) => {
    return UnsupportedPropertiesUtil.getSupportProps<LineSymbolizer>({
      propName,
      symbolizerName: 'LineSymbolizer',
      unsupportedProperties,
      ...options
    });
  };

  return (
    <div className="gs-line-symbolizer-editor" >
      <Collapse bordered={false} defaultActiveKey={['1']}>
        <Panel header="General" key="1">
          {
            composition.colorField?.visibility === false ? null : (
              <Form.Item
                label={locale.colorLabel}
                {...getSupportProps('color')}
              >
                <ColorField
                  color={color as string}
                  defaultValue={composition.colorField?.default}
                  onChange={onColorChange}
                />
              </Form.Item>
            )
          }
          {
            composition.widthField?.visibility === false ? null : (
              <Form.Item
                label={locale.widthLabel}
                {...getSupportProps('width')}
              >
                <WidthField
                  value={width}
                  defaultValue={composition.widthField?.default as number}
                  onChange={onWidthChange}
                />
              </Form.Item>
            )
          }
          {
            composition.perpendicularOffsetField?.visibility === false ? null : (
              <Form.Item
                label={locale.perpendicularOffsetLabel}
                {...getSupportProps('perpendicularOffset')}
              >
                <OffsetField
                  offset={perpendicularOffset}
                  defaultValue={composition.perpendicularOffsetField?.default as number}
                  onChange={onPerpendicularOffsetChange}
                />
              </Form.Item>
            )
          }
          {
            composition.opacityField?.visibility === false ? null : (
              <Form.Item
                label={locale.opacityLabel}
                {...getSupportProps('opacity')}
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
            composition.lineDashField?.visibility === false ? null : (
              <Form.Item
                label={locale.dashLabel}
                {...getSupportProps('dasharray')}
              >
                <LineDashField
                  dashArray={dasharray as number[]}
                  onChange={onDasharrayChange}
                />
              </Form.Item>
            )
          }
          {
            composition.dashOffsetField?.visibility === false ? null : (
              <Form.Item
                label={locale.dashOffsetLabel}
                {...getSupportProps('dashOffset')}
              >
                <OffsetField
                  offset={dashOffset}
                  defaultValue={composition.dashOffsetField?.default as number}
                  onChange={onDashOffsetChange}
                  disabled={
                    symbolizer.dasharray === undefined || _get(symbolizer, 'dasharray.length') === 0
                  }
                />
              </Form.Item>
            )
          }
          {
            composition.capField?.visibility === false ? null : (
              <Form.Item
                label={locale.capLabel}
                {...getSupportProps('cap')}
              >
                <LineCapField
                  value={cap}
                  onChange={(val) => onCapChange(val as CapType)}
                />
              </Form.Item>
            )
          }
          {
            composition.joinField?.visibility === false ? null : (
              <Form.Item
                label={locale.joinLabel}
                {...getSupportProps('join')}
              >
                <LineJoinField
                  value={join}
                  onChange={(val) => onJoinChange(val as JoinType)}
                />
              </Form.Item>
            )
          }
        </Panel>
        <Panel header="Graphic Stroke" key="2">
          {/* TODO allow changing graphicStroke via composition context */}
          <GraphicEditor
            graphic={graphicStroke}
            onGraphicChange={onGraphicStrokeChange}
            graphicTypeFieldLabel={locale.graphicStrokeTypeLabel}
            graphicType={_get(graphicStroke, 'kind') as GraphicType}
          />
        </Panel>
        <Panel header="Graphic Fill" key="3">
          {/* TODO allow changing graphicFill via composition context */}
          <GraphicEditor
            graphic={graphicFill}
            onGraphicChange={onGraphicFillChange}
            graphicTypeFieldLabel={locale.graphicFillTypeLabel}
            graphicType={_get(graphicFill, 'kind') as GraphicType}
          />
        </Panel>
      </Collapse>
    </div>
  );
};

export default withDefaultsContext(localize(LineEditor, COMPONENTNAME));
