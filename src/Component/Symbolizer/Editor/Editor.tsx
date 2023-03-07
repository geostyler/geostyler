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
import { CompositionContext, Compositions } from '../../../context/CompositionContext/CompositionContext';
import CompositionUtil from '../../../Util/CompositionUtil';
import { Form } from 'antd';
import { GeoStylerLocale } from '../../../locale/locale';

// default props
interface EditorDefaultProps {
  locale: GeoStylerLocale['SymbolizerEditor'];
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

const COMPONENTNAME = 'SymbolizerEditor';

export const Editor: React.FC<EditorProps> = ({
  locale = en_US.SymbolizerEditor,
  symbolizer,
  internalDataDef,
  iconEditorProps,
  onSymbolizerChange,
  iconLibraries,
  colorRamps
}) => {

  /**
   * Get the appropriate Editor UI for a certain style.
   *
   * Also handles the customisation of sub-components via CompositionContext.
   */
  const getUiForSymbolizer = (composition: Compositions): React.ReactNode => {
    switch (symbolizer.kind) {
      case 'Mark':
        return (
          CompositionUtil.handleComposition({
            composition,
            path: 'Editor.markEditor',
            onChange: onSymbolizerChange,
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
            onChange: onSymbolizerChange,
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
            onChange: onSymbolizerChange,
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
            onChange: onSymbolizerChange,
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
            onChange: onSymbolizerChange,
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
            onChange: onSymbolizerChange,
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
        return locale.unknownSymbolizerText;
    }
  };

  const onKindFieldChange = (kind: SymbolizerKind) => {
    const newSymbolizer = SymbolizerUtil.generateSymbolizer(kind);
    onSymbolizerChange(newSymbolizer);
  };

  return (
    <CompositionContext.Consumer>
      {(composition: Compositions) => (
        <div className="gs-symbolizer-editor" >
          <Form
            layout='vertical'
          >
            <Form.Item
              label={locale.kindFieldLabel}
            >
              {
                CompositionUtil.handleComposition({
                  composition,
                  path: 'Editor.kindField',
                  onChange: onKindFieldChange,
                  propName: 'kind',
                  propValue: symbolizer.kind,
                  defaultElement: <KindField />
                })
              }
            </Form.Item>
            {getUiForSymbolizer(composition)}
          </Form>
        </div>
      )}
    </CompositionContext.Consumer>
  );
};

export default localize(Editor, COMPONENTNAME);
