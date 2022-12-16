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
  GraphicType
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
import { CompositionContext, Compositions } from '../../../context/CompositionContext/CompositionContext';
import CompositionUtil from '../../../Util/CompositionUtil';
import withDefaultsContext from '../../../hoc/withDefaultsContext';
import { DefaultValues } from '../../../context/DefaultValueContext/DefaultValueContext';
import { GeoStylerLocale } from '../../../locale/locale';
import {
  UnsupportedPropertiesContext
} from '../../../context/UnsupportedPropertiesContext/UnsupportedPropertiesContext';
import UnsupportedPropertiesUtil from '../../../Util/UnsupportedPropertiesUtil';

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

export const LineEditor: React.FC<LineEditorProps> = ({
  locale = en_US.LineEditor,
  symbolizer,
  onSymbolizerChange,
  defaultValues
}) => {

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

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
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
    <CompositionContext.Consumer>
      {(composition: Compositions) => (
        <div className="gs-line-symbolizer-editor" >
          <Collapse bordered={false} defaultActiveKey={['1']}>
            <Panel header="General" key="1">
              <Form.Item
                label={locale.colorLabel}
                {...getSupportProps('color')}
                {...formItemLayout}
              >
                {
                  CompositionUtil.handleComposition({
                    composition,
                    path: 'LineEditor.colorField',
                    onChange: onColorChange,
                    propName: 'color',
                    propValue: color,
                    defaultValue: defaultValues?.LineEditor?.defaultColor,
                    defaultElement: <ColorField />
                  })
                }
              </Form.Item>
              <Form.Item
                label={locale.widthLabel}
                {...getSupportProps('width')}
                {...formItemLayout}
              >
                {
                  CompositionUtil.handleComposition({
                    composition,
                    path: 'LineEditor.widthField',
                    onChange: onWidthChange,
                    propName: 'width',
                    propValue: width,
                    defaultValue: defaultValues?.LineEditor?.defaultWidth,
                    defaultElement: <WidthField />
                  })
                }
              </Form.Item>
              <Form.Item
                label={locale.perpendicularOffsetLabel}
                {...getSupportProps('perpendicularOffset')}
                {...formItemLayout}
              >
                {
                  CompositionUtil.handleComposition({
                    composition,
                    path: 'LineEditor.perpendicularOffsetField',
                    onChange: onPerpendicularOffsetChange,
                    propName: 'offset',
                    propValue: perpendicularOffset,
                    defaultValue: defaultValues?.LineEditor?.defaultPerpendicularOffset,
                    defaultElement: <OffsetField />
                  })
                }
              </Form.Item>
              <Form.Item
                label={locale.opacityLabel}
                {...getSupportProps('opacity')}
                {...formItemLayout}
              >
                {
                  CompositionUtil.handleComposition({
                    composition,
                    path: 'LineEditor.opacityField',
                    onChange: onOpacityChange,
                    propName: 'opacity',
                    propValue: opacity,
                    defaultValue: defaultValues?.LineEditor?.defaultOpacity,
                    defaultElement: <OpacityField />
                  })
                }
              </Form.Item>
              <Form.Item
                label={locale.dashLabel}
                {...getSupportProps('dasharray')}
                {...formItemLayout}
              >
                {
                  CompositionUtil.handleComposition({
                    composition,
                    path: 'LineEditor.lineDashField',
                    onChange: onDasharrayChange,
                    propName: 'dashArray',
                    propValue: dasharray,
                    defaultElement: <LineDashField />
                  })
                }
              </Form.Item>
              <Form.Item
                label={locale.dashOffsetLabel}
                {...getSupportProps('dashOffset')}
                {...formItemLayout}
              >
                {
                  CompositionUtil.handleComposition({
                    composition,
                    path: 'LineEditor.dashOffsetField',
                    onChange: onDashOffsetChange,
                    propName: 'offset',
                    propValue: dashOffset,
                    defaultValue: defaultValues?.LineEditor?.defaultDashOffset,
                    defaultElement: (
                      <OffsetField
                        disabled={
                          symbolizer.dasharray === undefined || _get(symbolizer, 'dasharray.length') === 0
                        }
                      />)
                  })
                }
              </Form.Item>
              <Form.Item
                label={locale.capLabel}
                {...getSupportProps('cap')}
                {...formItemLayout}
              >
                {
                  CompositionUtil.handleComposition({
                    composition,
                    path: 'LineEditor.capField',
                    onChange: onCapChange,
                    propName: 'cap',
                    propValue: cap,
                    defaultValue: defaultValues?.LineEditor?.defaultCap,
                    defaultElement: <LineCapField />
                  })
                }
              </Form.Item>
              <Form.Item
                label={locale.joinLabel}
                {...getSupportProps('join')}
                {...formItemLayout}
              >
                {
                  CompositionUtil.handleComposition({
                    composition,
                    path: 'LineEditor.joinField',
                    onChange: onJoinChange,
                    propName: 'join',
                    propValue: join,
                    defaultValue: defaultValues?.LineEditor?.defaultJoin,
                    defaultElement: <LineJoinField />
                  })
                }
              </Form.Item>
            </Panel>
            <Panel header="Graphic Stroke" key="2">
              {
                CompositionUtil.handleComposition({
                  composition,
                  path: 'LineEditor.graphicStrokeField',
                  onChange: onGraphicStrokeChange,
                  propName: 'graphic',
                  propValue: graphicStroke,
                  onChangeName: 'onGraphicChange',
                  defaultElement: (
                    <GraphicEditor
                      graphicTypeFieldLabel={locale.graphicStrokeTypeLabel}
                      graphic={graphicStroke}
                      graphicType={_get(graphicStroke, 'kind') as GraphicType}
                    />)
                })
              }
            </Panel>
            <Panel header="Graphic Fill" key="3">
              {
                CompositionUtil.handleComposition({
                  composition,
                  path: 'LineEditor.graphicFillField',
                  onChange: onGraphicFillChange,
                  propName: 'graphic',
                  propValue: graphicFill,
                  onChangeName: 'onGraphicChange',
                  defaultElement: (
                    <GraphicEditor
                      graphicTypeFieldLabel={locale.graphicFillTypeLabel}
                      graphic={graphicFill}
                      graphicType={_get(graphicFill, 'kind') as GraphicType}
                    />)
                })
              }
            </Panel>
          </Collapse>
        </div>)
      }
    </CompositionContext.Consumer>
  );

};

export default withDefaultsContext(localize(LineEditor, COMPONENTNAME));
