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
  Symbolizer,
  SymbolizerKind
} from 'geostyler-style';

import MarkEditor from '../MarkEditor/MarkEditor';
import LineEditor from '../LineEditor/LineEditor';
import FillEditor from '../FillEditor/FillEditor';
import TextEditor from '../TextEditor/TextEditor';

import './Editor.less';

import 'ol/ol.css';
import { Data } from 'geostyler-data';

import _cloneDeep from 'lodash/cloneDeep';

import KindField from '../Field/KindField/KindField';
import IconEditor, { IconEditorProps } from '../IconEditor/IconEditor';
import SymbolizerUtil from '../../../Util/SymbolizerUtil';
import { IconLibrary } from '../IconSelector/IconSelector';
import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';
import RasterEditor from '../RasterEditor/RasterEditor';
import DataUtil from '../../../Util/DataUtil';
import { CompositionContext, Compositions } from '../../CompositionContext/CompositionContext';
import CompositionUtil from '../../../Util/CompositionUtil';
import { Form } from 'antd';

// i18n
export interface EditorLocale {
  kindFieldLabel: string;
}

// default props
interface EditorDefaultProps {
  locale: EditorLocale;
  unknownSymbolizerText?: string;
}

// non default props
export interface EditorProps extends Partial<EditorDefaultProps> {
  symbolizer: Symbolizer;
  internalDataDef?: Data;
  iconEditorProps?: Partial<IconEditorProps>;
  onSymbolizerChange?: (symbolizer: Symbolizer) => void;
  iconLibraries?: IconLibrary[];
  colorRamps?: {
    [name: string]: string[];
  };
}

// state
interface EditorState {
  symbolizer: Symbolizer;
  hasError: boolean;
}

export class Editor extends React.Component<EditorProps, EditorState> {

  static componentName: string = 'SymbolizerEditor';

  public static defaultProps: EditorDefaultProps = {
    locale: en_US.GsSymbolizerEditor,
    unknownSymbolizerText: 'Unknown Symbolizer!'
  };

  constructor(props: any) {
    super(props);
    this.state = {
      symbolizer: SymbolizerUtil.generateSymbolizer(),
      hasError: false
    };
  }

  static getDerivedStateFromProps(
    nextProps: EditorProps,
    prevState: EditorState): Partial<EditorState> {
    return {
      symbolizer: nextProps.symbolizer
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      hasError: true
    });
  }

  onSymbolizerChange = (symbolizer: Symbolizer) => {
    const {
      onSymbolizerChange
    } = this.props;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  };

  /**
   * Get the appropriate Editor UI for a certain style.
   *
   * Also handles the customisation of sub-components via CompositionContext.
   */
  getUiFromSymbolizer = (symbolizer: Symbolizer, composition: Compositions): React.ReactNode => {
    const {
      iconEditorProps,
      iconLibraries,
      colorRamps,
      internalDataDef
    } = this.props;

    switch (symbolizer.kind) {
      case 'Mark':
        return (
          CompositionUtil.handleComposition({
            composition,
            path: 'Editor.markEditor',
            onChange: this.onSymbolizerChange,
            onChangeName: 'onSymbolizerChange',
            propName: 'symbolizer',
            propValue: symbolizer,
            defaultElement: (
              <MarkEditor
                symbolizer={symbolizer}
              />
            )
          })
        );
      case 'Icon':
        return (
          CompositionUtil.handleComposition({
            composition,
            path: 'Editor.iconEditor',
            onChange: this.onSymbolizerChange,
            onChangeName: 'onSymbolizerChange',
            propName: 'symbolizer',
            propValue: symbolizer,
            defaultElement: (
              <IconEditor
                symbolizer={symbolizer}
                iconLibraries={iconLibraries}
                {...iconEditorProps}
              />
            )
          })
        );
      case 'Line':
        return (
          CompositionUtil.handleComposition({
            composition,
            path: 'Editor.lineEditor',
            onChange: this.onSymbolizerChange,
            onChangeName: 'onSymbolizerChange',
            propName: 'symbolizer',
            propValue: symbolizer,
            defaultElement: (
              <LineEditor
                symbolizer={symbolizer}
              />
            )
          })
        );
      case 'Fill':
        return (
          CompositionUtil.handleComposition({
            composition,
            path: 'Editor.fillEditor',
            onChange: this.onSymbolizerChange,
            onChangeName: 'onSymbolizerChange',
            propName: 'symbolizer',
            propValue: symbolizer,
            defaultElement: (
              <FillEditor
                symbolizer={symbolizer}
              />
            )
          })
        );
      case 'Text':
        return (
          CompositionUtil.handleComposition({
            composition,
            path: 'Editor.textEditor',
            onChange: this.onSymbolizerChange,
            onChangeName: 'onSymbolizerChange',
            propName: 'symbolizer',
            propValue: symbolizer,
            defaultElement: (
              <TextEditor
                symbolizer={symbolizer}
                internalDataDef={
                  internalDataDef && DataUtil.isVector(internalDataDef) ? internalDataDef : undefined
                }
              />
            )
          })
        );
      case 'Raster':
        return (
          CompositionUtil.handleComposition({
            composition,
            path: 'Editor.rasterEditor',
            onChange: this.onSymbolizerChange,
            onChangeName: 'onSymbolizerChange',
            propName: 'symbolizer',
            propValue: symbolizer,
            defaultElement: (
              <RasterEditor
                symbolizer={symbolizer}
                colorRamps={colorRamps}
                internalDataDef={
                  internalDataDef && DataUtil.isRaster(internalDataDef) ? internalDataDef : undefined
                }
              />
            )
          })
        );
      default:
        return this.props.unknownSymbolizerText;
    }
  };

  onKindFieldChange = (kind: SymbolizerKind) => {
    const newSymbolizer = SymbolizerUtil.generateSymbolizer(kind);
    this.onSymbolizerChange(newSymbolizer);
  };

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
    if (this.state.hasError) {
      return <h1>An error occured in the Symbolizer Editor UI.</h1>;
    }
    const {
      locale
    } = this.props;

    const symbolizer = _cloneDeep(this.state.symbolizer);
    return (
      <CompositionContext.Consumer>
        {(composition: Compositions) => (
          <div className="gs-symbolizer-editor" >
            {
              this.wrapFormItem(
                locale.kindFieldLabel,
                CompositionUtil.handleComposition({
                  composition,
                  path: 'Editor.kindField',
                  onChange: this.onKindFieldChange,
                  propName: 'kind',
                  propValue: symbolizer.kind,
                  defaultElement: <KindField />
                })
              )
            }
            {this.getUiFromSymbolizer(this.props.symbolizer, composition)}
          </div>
        )}
      </CompositionContext.Consumer>
    );
  }
}

export default localize(Editor, Editor.componentName);
