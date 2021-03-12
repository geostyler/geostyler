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
import { CompositionContext, Compositions } from '../../CompositionContext/CompositionContext';
import CompositionUtil from '../../../Util/CompositionUtil';
import withDefaultsContext from '../../../hoc/withDefaultsContext';
import { DefaultValues } from '../../DefaultValueContext/DefaultValueContext';

const Panel = Collapse.Panel;

// i18n
export interface LineEditorLocale {
  colorLabel?: string;
  widthLabel?: string;
  opacityLabel?: string;
  dashLabel?: string;
  dashOffsetLabel?: string;
  capLabel?: string;
  joinLabel?: string;
  graphicStrokeTypeLabel?: string;
  graphicFillTypeLabel?: string;
}

export interface LineEditorDefaultProps {
  /** Language package */
  locale: LineEditorLocale;
}

// non default props
export interface LineEditorProps extends Partial<LineEditorDefaultProps> {
  /** Symbolizer */
  symbolizer: LineSymbolizer;
  /** Callback when symbolizer changes */
  onSymbolizerChange?: (changedSymb: Symbolizer) => void;
  defaultValues: DefaultValues;
}

export class LineEditor extends React.Component<LineEditorProps> {

  public static defaultProps: LineEditorDefaultProps = {
    locale: en_US.GsLineEditor
  };

  static componentName: string = 'LineEditor';

  public shouldComponentUpdate(nextProps: LineEditorProps): boolean {
    const diffProps = !_isEqual(this.props, nextProps);
    return diffProps;
  }

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

  onWidthChange = (value: number) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.width = value;
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

  onDasharrayChange = (value: number[]) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.dasharray = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  };

  onDashOffsetChange = (value: LineSymbolizer['dashOffset']) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.dashOffset = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  };

  onCapChange = (value: LineSymbolizer['cap']) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.cap = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  };

  onJoinChange = (value: LineSymbolizer['join']) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.join = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  };

  onGraphicStrokeChange = (gStroke: PointSymbolizer) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.graphicStroke = gStroke;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  };

  onGraphicFillChange = (gFill: PointSymbolizer) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.graphicFill = gFill;
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

  render() {
    const {
      symbolizer,
      defaultValues
    } = this.props;

    const {
      color,
      width,
      opacity,
      dasharray,
      dashOffset,
      cap,
      join,
      graphicStroke,
      graphicFill
    } = symbolizer;

    const {
      locale
    } = this.props;

    return (
      <CompositionContext.Consumer>
        {(composition: Compositions) => (
          <div className="gs-line-symbolizer-editor" >
            <Collapse bordered={false} defaultActiveKey={['1']}>
              <Panel header="General" key="1">
                {
                  this.wrapFormItem(
                    locale.colorLabel,
                    CompositionUtil.handleComposition({
                      composition,
                      path: 'LineEditor.colorField',
                      onChange: this.onColorChange,
                      propName: 'color',
                      propValue: color,
                      defaultValue: defaultValues?.LineEditor?.defaultColor,
                      defaultElement: <ColorField />
                    })
                  )
                }
                {
                  this.wrapFormItem(
                    locale.widthLabel,
                    CompositionUtil.handleComposition({
                      composition,
                      path: 'LineEditor.widthField',
                      onChange: this.onWidthChange,
                      propName: 'width',
                      propValue: width,
                      defaultValue: defaultValues?.LineEditor?.defaultWidth,
                      defaultElement: <WidthField />
                    })
                  )
                }
                {
                  this.wrapFormItem(
                    locale.opacityLabel,
                    CompositionUtil.handleComposition({
                      composition,
                      path: 'LineEditor.opacityField',
                      onChange: this.onOpacityChange,
                      propName: 'opacity',
                      propValue: opacity,
                      defaultValue: defaultValues?.LineEditor?.defaultOpacity,
                      defaultElement: <OpacityField />
                    })
                  )
                }
                {
                  this.wrapFormItem(
                    locale.dashLabel,
                    CompositionUtil.handleComposition({
                      composition,
                      path: 'LineEditor.lineDashField',
                      onChange: this.onDasharrayChange,
                      propName: 'dashArray',
                      propValue: dasharray,
                      defaultElement: <LineDashField />
                    })
                  )
                }
                {
                  this.wrapFormItem(
                    locale.dashOffsetLabel,
                    CompositionUtil.handleComposition({
                      composition,
                      path: 'LineEditor.dashOffsetField',
                      onChange: this.onDashOffsetChange,
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
                  )
                }
                {
                  this.wrapFormItem(
                    locale.capLabel,
                    CompositionUtil.handleComposition({
                      composition,
                      path: 'LineEditor.capField',
                      onChange: this.onCapChange,
                      propName: 'cap',
                      propValue: cap,
                      defaultValue: defaultValues?.LineEditor?.defaultCap,
                      defaultElement: <LineCapField />
                    })
                  )
                }
                {
                  this.wrapFormItem(
                    locale.joinLabel,
                    CompositionUtil.handleComposition({
                      composition,
                      path: 'LineEditor.joinField',
                      onChange: this.onJoinChange,
                      propName: 'join',
                      propValue: join,
                      defaultValue: defaultValues?.LineEditor?.defaultJoin,
                      defaultElement: <LineJoinField />
                    })
                  )
                }
              </Panel>
              <Panel header="Graphic Stroke" key="2">
                {
                  CompositionUtil.handleComposition({
                    composition,
                    path: 'LineEditor.graphicStrokeField',
                    onChange: this.onGraphicStrokeChange,
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
                    onChange: this.onGraphicFillChange,
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
  }

}

export default withDefaultsContext(localize(LineEditor, LineEditor.componentName));
