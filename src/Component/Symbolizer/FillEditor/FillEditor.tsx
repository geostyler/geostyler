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
  FillSymbolizer,
  PointSymbolizer,
  GraphicType
} from 'geostyler-style';

import ColorField from '../Field/ColorField/ColorField';
import OpacityField from '../Field/OpacityField/OpacityField';
import GraphicEditor from '../GraphicEditor/GraphicEditor';
import WidthField from '../Field/WidthField/WidthField';

import _cloneDeep from 'lodash/cloneDeep';
import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';
import LineDashField from '../Field/LineDashField/LineDashField';
import { CompositionContext, Compositions } from '../../CompositionContext/CompositionContext';
import CompositionUtil from '../../../Util/CompositionUtil';
import withDefaultsContext from '../../../hoc/withDefaultsContext';
import { DefaultValues } from '../../DefaultValueContext/DefaultValueContext';

const Panel = Collapse.Panel;

// i18n
export interface FillEditorLocale {
  fillOpacityLabel?: string;
  fillColorLabel?: string;
  outlineColorLabel?: string;
  outlineWidthLabel?: string;
  graphicFillTypeLabel?: string;
  outlineDasharrayLabel?: string;
  opacityLabel?: string;
  outlineOpacityLabel?: string;
}

interface FillEditorDefaultProps {
  locale: FillEditorLocale;
}

// non default props
export interface FillEditorProps extends Partial<FillEditorDefaultProps> {
  symbolizer: FillSymbolizer;
  onSymbolizerChange?: (changedSymb: Symbolizer) => void;
  defaultValues: DefaultValues;
}

export class FillEditor extends React.Component<FillEditorProps> {

  static componentName: string = 'FillEditor';

  public static defaultProps: FillEditorDefaultProps = {
    locale: en_US.GsFillEditor
  };

  public shouldComponentUpdate(nextProps: FillEditorProps): boolean {
    const diffProps = !_isEqual(this.props, nextProps);
    return diffProps;
  }

  onFillColorChange = (value: string) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer: FillSymbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.color = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  };

  onFillOpacityChange = (value: number) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer: FillSymbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.fillOpacity = value;

    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  };

  onOpacityChange = (value: number) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer: FillSymbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.opacity = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  };

  onOutlineOpacityChange = (value: number) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer: FillSymbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.outlineOpacity = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  };

  onOutlineColorChange = (value: string) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer: FillSymbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.outlineColor = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  };

  onOutlineWidthChange = (value: number) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer: FillSymbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.outlineWidth = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  };

  onOutlineDasharrayChange = (value: number[]) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer: FillSymbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.outlineDasharray = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  };

  onGraphicChange = (gFill: PointSymbolizer) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer: FillSymbolizer = _cloneDeep(this.props.symbolizer);
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
      locale,
      defaultValues
    } = this.props;

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

    return (
      <CompositionContext.Consumer>
        {(composition: Compositions) => (
          <div className="gs-fill-symbolizer-editor" >
            <Collapse bordered={false} defaultActiveKey={['1']}>
              <Panel header="General" key="1">
                {
                  this.wrapFormItem(
                    locale.fillColorLabel,
                    CompositionUtil.handleComposition({
                      composition,
                      path: 'FillEditor.fillColorField',
                      onChange: this.onFillColorChange,
                      propName: 'color',
                      propValue: color,
                      defaultValue: defaultValues?.FillEditor?.defaultFillColor,
                      defaultElement: <ColorField />
                    })
                  )
                }
                {
                  this.wrapFormItem(
                    locale.fillOpacityLabel,
                    CompositionUtil.handleComposition({
                      composition,
                      path: 'FillEditor.fillOpacityField',
                      onChange: this.onFillOpacityChange,
                      propName: 'opacity',
                      propValue: fillOpacity,
                      defaultValue: defaultValues?.FillEditor?.defaultFillOpacity,
                      defaultElement: <OpacityField />
                    })
                  )
                }
                {
                  this.wrapFormItem(
                    locale.opacityLabel,
                    CompositionUtil.handleComposition({
                      composition,
                      path: 'FillEditor.opacityField',
                      onChange: this.onOpacityChange,
                      propName: 'opacity',
                      propValue: opacity,
                      defaultValue: defaultValues?.FillEditor?.defaultOpacity,
                      defaultElement: <OpacityField />
                    })
                  )
                }
                {
                  this.wrapFormItem(
                    locale.outlineOpacityLabel,
                    CompositionUtil.handleComposition({
                      composition,
                      path: 'FillEditor.outlineOpacityField',
                      onChange: this.onOutlineOpacityChange,
                      propName: 'opacity',
                      propValue: outlineOpacity,
                      defaultValue: defaultValues?.FillEditor?.defaultOutlineOpacity,
                      defaultElement: <OpacityField />
                    })
                  )
                }
                {
                  this.wrapFormItem(
                    locale.outlineColorLabel,
                    CompositionUtil.handleComposition({
                      composition,
                      path: 'FillEditor.outlineColorField',
                      onChange: this.onOutlineColorChange,
                      propName: 'color',
                      propValue: outlineColor,
                      defaultValue: defaultValues?.FillEditor?.defaultOutlineColor,
                      defaultElement: <ColorField />
                    })
                  )
                }
                {
                  this.wrapFormItem(
                    locale.outlineWidthLabel,
                    CompositionUtil.handleComposition({
                      composition,
                      path: 'FillEditor.outlineWidthField',
                      onChange: this.onOutlineWidthChange,
                      propName: 'width',
                      propValue: outlineWidth,
                      defaultValue: defaultValues?.FillEditor?.defaultOutlineWidth,
                      defaultElement: <WidthField />
                    })
                  )
                }
                {
                  this.wrapFormItem(
                    locale.outlineDasharrayLabel,
                    CompositionUtil.handleComposition({
                      composition,
                      path: 'FillEditor.outlineDasharrayField',
                      onChange: this.onOutlineDasharrayChange,
                      propName: 'dashArray',
                      propValue: outlineDasharray,
                      defaultElement: <LineDashField />
                    })
                  )
                }
              </Panel>
              <Panel header="Graphic Fill" key="2">
                {
                  CompositionUtil.handleComposition({
                    composition,
                    path: 'FillEditor.graphicEditorField',
                    onChange: this.onGraphicChange,
                    onChangeName: 'onGraphicChange',
                    propName: 'graphic',
                    propValue: graphicFill,
                    defaultElement: (
                      <GraphicEditor
                        graphicTypeFieldLabel={locale.graphicFillTypeLabel}
                        graphic={graphicFill}
                        graphicType={_get(graphicFill, 'kind') as GraphicType}
                      />
                    )
                  })
                }
              </Panel>
            </Collapse>
          </div>
        )}
      </CompositionContext.Consumer>
    );
  }
}

export default withDefaultsContext(localize(FillEditor, FillEditor.componentName));
