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
  Mentions,
  Form
} from 'antd';

const {
  Option: MentionOption
} = Mentions;

import {
  Symbolizer,
  TextSymbolizer
} from 'geostyler-style';

import ColorField from '../Field/ColorField/ColorField';
import OpacityField from '../Field/OpacityField/OpacityField';
import WidthField from '../Field/WidthField/WidthField';
import FontPicker from '../Field/FontPicker/FontPicker';
import OffsetField from '../Field/OffsetField/OffsetField';
import RotateField from '../Field/RotateField/RotateField';
import { CompositionContext, Compositions } from '../../CompositionContext/CompositionContext';
import CompositionUtil from '../../../Util/CompositionUtil';
import withDefaultsContext from '../../../hoc/withDefaultsContext';
import { DefaultValues } from '../../DefaultValueContext/DefaultValueContext';

import _cloneDeep from 'lodash/cloneDeep';
import _isEqual from 'lodash/isEqual';

import './TextEditor.less';

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';
import { VectorData } from 'geostyler-data';

// i18n
export interface TextEditorLocale {
  templateFieldLabel: string;
  opacityLabel?: string;
  colorLabel?: string;
  sizeLabel?: string;
  offsetXLabel?: string;
  offsetYLabel?: string;
  fontLabel?: string;
  rotateLabel?: string;
  haloColorLabel?: string;
  haloWidthLabel?: string;
  attributeComboPlaceholder?: string;
  attributeNotFound?: string;
}

interface TextEditorDefaultProps {
  locale: TextEditorLocale;
}

// non default props
export interface TextEditorProps extends Partial<TextEditorDefaultProps> {
  symbolizer: TextSymbolizer;
  onSymbolizerChange?: (changedSymb: Symbolizer) => void;
  internalDataDef?: VectorData;
  defaultValues: DefaultValues;
}

/**
 * The TextEditor class. Allows to edit text styles based on a template string
 * where words wrapped in double curly braces ({{}}) will be understood as
 * feature properties and text without curly braces as static text.
 */
export class TextEditor extends React.Component<TextEditorProps> {

  public static defaultProps: TextEditorDefaultProps = {
    locale: en_US.GsTextEditor
  };

  static componentName: string = 'TextEditor';

  public shouldComponentUpdate(nextProps: TextEditorProps): boolean {
    const diffProps = !_isEqual(this.props, nextProps);
    return diffProps;
  }

  onLabelChange = (value: any) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.label = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  };

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

  onFontChange = (value: string[]) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    if (value.length) {
      symbolizer.font = value;
    } else {
      delete symbolizer.font;
    }
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

  onSizeChange = (value: number) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.size = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  };

  onOffsetXChange = (value: number) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    let newOffset: [number, number] = [value, (symbolizer.offset ? symbolizer.offset[1] : 0)];
    symbolizer.offset = newOffset;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  };

  onOffsetYChange = (value: number) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    let newOffset: [number, number] = [(symbolizer.offset ? symbolizer.offset[0] : 0), value];
    symbolizer.offset = newOffset;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  };

  onRotateChange = (value: number) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.rotate = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  };

  onHaloColorChange = (value: string) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.haloColor = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  };

  onHaloWidthChange = (value: number) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.haloWidth = value;
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
      locale,
      internalDataDef,
      defaultValues
    } = this.props;

    const symbolizer = _cloneDeep(this.props.symbolizer);

    const {
      opacity,
      color,
      font,
      offset,
      size,
      rotate,
      haloColor,
      haloWidth
    } = symbolizer;

    // split the current offset
    let offsetX: number;
    let offsetY: number;
    if (offset) {
      offsetX = offset[0];
      offsetY = offset[1];
    }
    const properties = internalDataDef && internalDataDef.schema ? Object.keys(internalDataDef.schema.properties) : [];

    return (
      <CompositionContext.Consumer>
        {(composition: Compositions) => (
          <div className="gs-text-symbolizer-editor" >
            {
              this.wrapFormItem(
                locale.templateFieldLabel,
                CompositionUtil.handleComposition({
                  composition,
                  path: 'TextEditor.templateField',
                  onChange: this.onLabelChange,
                  propName: 'value',
                  propValue: symbolizer.label || '',
                  defaultValue: defaultValues?.TextEditor?.defaultLabel,
                  defaultElement: (
                    <Mentions
                      placeholder={locale.templateFieldLabel}
                      prefix="{{"
                      notFoundContent={locale.attributeNotFound}
                    >
                      {properties.map(p => <MentionOption key={p} value={p}>{p}</MentionOption>)}
                    </Mentions>
                  )
                })
              )
            }
            {
              this.wrapFormItem(
                locale.colorLabel,
                CompositionUtil.handleComposition({
                  composition,
                  path: 'TextEditor.colorField',
                  onChange: this.onColorChange,
                  propName: 'color',
                  propValue: color,
                  defaultValue: defaultValues?.TextEditor?.defaultColor,
                  defaultElement: <ColorField />
                })
              )
            }
            {
              this.wrapFormItem(
                locale.fontLabel,
                CompositionUtil.handleComposition({
                  composition,
                  path: 'TextEditor.fontField',
                  onChange: this.onFontChange,
                  propName: 'font',
                  propValue: font,
                  defaultValue: defaultValues?.TextEditor?.defaultFont,
                  defaultElement: <FontPicker />
                })
              )
            }
            {
              this.wrapFormItem(
                locale.opacityLabel,
                CompositionUtil.handleComposition({
                  composition,
                  path: 'TextEditor.opacityField',
                  onChange: this.onOpacityChange,
                  propName: 'opacity',
                  propValue: opacity,
                  defaultValue: defaultValues?.TextEditor?.defaultOpacity,
                  defaultElement: <OpacityField />
                })
              )
            }
            {
              this.wrapFormItem(
                locale.sizeLabel,
                CompositionUtil.handleComposition({
                  composition,
                  path: 'TextEditor.sizeField',
                  onChange: this.onSizeChange,
                  propName: 'width',
                  propValue: size,
                  defaultValue: defaultValues?.TextEditor?.defaultSize,
                  defaultElement: <WidthField />
                })
              )
            }
            {
              this.wrapFormItem(
                locale.offsetXLabel,
                CompositionUtil.handleComposition({
                  composition,
                  path: 'TextEditor.offsetXField',
                  onChange: this.onOffsetXChange,
                  propName: 'offset',
                  propValue: offsetX,
                  defaultValue: defaultValues?.TextEditor?.defaultOffsetX,
                  defaultElement: <OffsetField />
                })
              )
            }
            {
              this.wrapFormItem(
                locale.offsetYLabel,
                CompositionUtil.handleComposition({
                  composition,
                  path: 'TextEditor.offsetYField',
                  onChange: this.onOffsetYChange,
                  propName: 'offset',
                  propValue: offsetY,
                  defaultValue: defaultValues?.TextEditor?.defaultOffsetY,
                  defaultElement: <OffsetField />
                })
              )
            }
            {
              this.wrapFormItem(
                locale.rotateLabel,
                CompositionUtil.handleComposition({
                  composition,
                  path: 'TextEditor.rotateField',
                  onChange: this.onRotateChange,
                  propName: 'rotate',
                  propValue: rotate,
                  defaultValue: defaultValues?.TextEditor?.defaultRotate,
                  defaultElement: <RotateField />
                })
              )
            }
            {
              this.wrapFormItem(
                locale.haloColorLabel,
                CompositionUtil.handleComposition({
                  composition,
                  path: 'TextEditor.haloColorField',
                  onChange: this.onHaloColorChange,
                  propName: 'color',
                  propValue: haloColor,
                  defaultValue: defaultValues?.TextEditor?.defaultHaloColor,
                  defaultElement: <ColorField />
                })
              )
            }
            {
              this.wrapFormItem(
                locale.haloWidthLabel,
                CompositionUtil.handleComposition({
                  composition,
                  path: 'TextEditor.haloWidthField',
                  onChange: this.onHaloWidthChange,
                  propName: 'width',
                  propValue: haloWidth,
                  defaultValue: defaultValues?.TextEditor?.defaultHaloWidth,
                  defaultElement: <WidthField />
                })
              )
            }
          </div>
        )}
      </CompositionContext.Consumer>
    );
  }
}

export default withDefaultsContext(localize(TextEditor, TextEditor.componentName));
