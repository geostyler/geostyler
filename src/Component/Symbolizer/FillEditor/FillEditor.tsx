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
import { CompositionContext, Compositions } from '../../../context/CompositionContext/CompositionContext';
import CompositionUtil from '../../../Util/CompositionUtil';
import withDefaultsContext from '../../../hoc/withDefaultsContext';
import { DefaultValues } from '../../../context/DefaultValueContext/DefaultValueContext';
import { GeoStylerLocale } from '../../../locale/locale';

const Panel = Collapse.Panel;

interface FillEditorDefaultProps {
  locale: GeoStylerLocale['FillEditor'];
}

// non default props
export interface FillEditorProps extends Partial<FillEditorDefaultProps> {
  symbolizer: FillSymbolizer;
  onSymbolizerChange?: (changedSymb: Symbolizer) => void;
  defaultValues?: DefaultValues;
}

const COMPONENTNAME = 'FillEditor';

export const FillEditor: React.FC<FillEditorProps> = ({
  locale = en_US.FillEditor,
  symbolizer,
  onSymbolizerChange,
  defaultValues
}) => {

  const onFillColorChange = (value: string) => {
    const symbolizerClone: FillSymbolizer = _cloneDeep(symbolizer);
    symbolizerClone.color = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onFillOpacityChange = (value: number) => {
    const symbolizerClone: FillSymbolizer = _cloneDeep(symbolizer);
    symbolizerClone.fillOpacity = value;

    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onOpacityChange = (value: number) => {
    const symbolizerClone: FillSymbolizer = _cloneDeep(symbolizer);
    symbolizerClone.opacity = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onOutlineOpacityChange = (value: number) => {
    const symbolizerClone: FillSymbolizer = _cloneDeep(symbolizer);
    symbolizerClone.outlineOpacity = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onOutlineColorChange = (value: string) => {
    const symbolizerClone: FillSymbolizer = _cloneDeep(symbolizer);
    symbolizerClone.outlineColor = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onOutlineWidthChange = (value: number) => {
    const symbolizerClone: FillSymbolizer = _cloneDeep(symbolizer);
    symbolizerClone.outlineWidth = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onOutlineDasharrayChange = (value: number[]) => {
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

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
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

  return (
    <CompositionContext.Consumer>
      {(composition: Compositions) => (
        <div className="gs-fill-symbolizer-editor" >
          <Collapse bordered={false} defaultActiveKey={['1']}>
            <Panel header="General" key="1">
              <Form.Item
                label={locale.fillColorLabel}
                {...formItemLayout}
              >
                {
                  CompositionUtil.handleComposition({
                    composition,
                    path: 'FillEditor.fillColorField',
                    onChange: onFillColorChange,
                    propName: 'color',
                    propValue: color,
                    defaultValue: defaultValues?.FillEditor?.defaultFillColor,
                    defaultElement: <ColorField />
                  })
                }
              </Form.Item>
              <Form.Item
                label={locale.fillOpacityLabel}
                {...formItemLayout}
              >
                {
                  CompositionUtil.handleComposition({
                    composition,
                    path: 'FillEditor.fillOpacityField',
                    onChange: onFillOpacityChange,
                    propName: 'opacity',
                    propValue: fillOpacity,
                    defaultValue: defaultValues?.FillEditor?.defaultFillOpacity,
                    defaultElement: <OpacityField />
                  })
                }
              </Form.Item>
              <Form.Item
                label={locale.opacityLabel}
                {...formItemLayout}
              >
                {
                  CompositionUtil.handleComposition({
                    composition,
                    path: 'FillEditor.opacityField',
                    onChange: onOpacityChange,
                    propName: 'opacity',
                    propValue: opacity,
                    defaultValue: defaultValues?.FillEditor?.defaultOpacity,
                    defaultElement: <OpacityField />
                  })
                }
              </Form.Item>
              <Form.Item
                label={locale.outlineOpacityLabel}
                {...formItemLayout}
              >
                {
                  CompositionUtil.handleComposition({
                    composition,
                    path: 'FillEditor.outlineOpacityField',
                    onChange: onOutlineOpacityChange,
                    propName: 'opacity',
                    propValue: outlineOpacity,
                    defaultValue: defaultValues?.FillEditor?.defaultOutlineOpacity,
                    defaultElement: <OpacityField />
                  })
                }
              </Form.Item>
              <Form.Item
                label={locale.outlineColorLabel}
                {...formItemLayout}
              >
                {
                  CompositionUtil.handleComposition({
                    composition,
                    path: 'FillEditor.outlineColorField',
                    onChange: onOutlineColorChange,
                    propName: 'color',
                    propValue: outlineColor,
                    defaultValue: defaultValues?.FillEditor?.defaultOutlineColor,
                    defaultElement: <ColorField />
                  })
                }
              </Form.Item>
              <Form.Item
                label={locale.outlineWidthLabel}
                {...formItemLayout}
              >
                {
                  CompositionUtil.handleComposition({
                    composition,
                    path: 'FillEditor.outlineWidthField',
                    onChange: onOutlineWidthChange,
                    propName: 'width',
                    propValue: outlineWidth,
                    defaultValue: defaultValues?.FillEditor?.defaultOutlineWidth,
                    defaultElement: <WidthField />
                  })
                }
              </Form.Item>
              <Form.Item
                label={locale.outlineDasharrayLabel}
                {...formItemLayout}
              >
                {
                  CompositionUtil.handleComposition({
                    composition,
                    path: 'FillEditor.outlineDasharrayField',
                    onChange: onOutlineDasharrayChange,
                    propName: 'dashArray',
                    propValue: outlineDasharray,
                    defaultElement: <LineDashField />
                  })
                }
              </Form.Item>
            </Panel>
            <Panel header="Graphic Fill" key="2">
              {
                CompositionUtil.handleComposition({
                  composition,
                  path: 'FillEditor.graphicEditorField',
                  onChange: onGraphicChange,
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
};

export default withDefaultsContext(localize(FillEditor, COMPONENTNAME));
