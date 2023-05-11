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
import { Form } from 'antd';
import type GeoStylerLocale from '../../../locale/locale';
import { useGeoStylerComposition } from '../../../context/GeoStylerContext/GeoStylerContext';

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
}

const COMPONENTNAME = 'SymbolizerEditor';

export const Editor: React.FC<EditorProps> = ({
  locale = en_US.SymbolizerEditor,
  symbolizer,
  internalDataDef,
  iconEditorProps,
  iconLibraries,
  onSymbolizerChange
}) => {

  const markComposition = useGeoStylerComposition('MarkEditor', {});
  const fillComposition = useGeoStylerComposition('FillEditor', {});
  const iconComposition = useGeoStylerComposition('IconEditor', {});
  const lineComposition = useGeoStylerComposition('LineEditor', {});
  const textComposition = useGeoStylerComposition('TextEditor', {});
  const rasterComposition = useGeoStylerComposition('RasterEditor', {});

  /**
   * Get the appropriate Editor UI for a certain style.
   *
   * Also handles the customisation of sub-components via CompositionContext.
   */
  const getUiForSymbolizer = (): React.ReactNode => {
    switch (symbolizer.kind) {
      case 'Mark':
        return markComposition.visibility === false ? null : (
          <MarkEditor
            symbolizer={symbolizer}
            onSymbolizerChange={onSymbolizerChange}
          />
        );
      case 'Icon':
        return iconComposition.visibility === false ? null : (
          <IconEditor
            symbolizer={symbolizer}
            onSymbolizerChange={onSymbolizerChange}
            {...iconEditorProps}
            iconLibraries={iconLibraries}
          />
        );
      case 'Line':
        return lineComposition.visibility === false ? null : (
          <LineEditor
            symbolizer={symbolizer}
            onSymbolizerChange={onSymbolizerChange}
          />
        );
      case 'Fill':
        return fillComposition.visibility === false ? null : (
          <FillEditor
            symbolizer={symbolizer}
            onSymbolizerChange={onSymbolizerChange}
          />
        );
      case 'Text':
        return textComposition.visibility === false ? null : (
          <TextEditor
            symbolizer={symbolizer}
            internalDataDef={
              internalDataDef && DataUtil.isVector(internalDataDef) ? internalDataDef : undefined
            }
            onSymbolizerChange={onSymbolizerChange}
          />
        );
      case 'Raster':
        return rasterComposition.visibility === false ? null : (
          <RasterEditor
            symbolizer={symbolizer}
            internalDataDef={
              internalDataDef && DataUtil.isRaster(internalDataDef) ? internalDataDef : undefined
            }
            onSymbolizerChange={onSymbolizerChange}
          />
        );
      default:
        return locale.unknownSymbolizerText;
    }
  };

  const onKindFieldChange = (kind: SymbolizerKind) => {
    const newSymbolizer = SymbolizerUtil.generateSymbolizer(kind);
    onSymbolizerChange(newSymbolizer);
  };

  const symbolizerKinds: SymbolizerKind[] = ['Mark', 'Fill', 'Icon', 'Line', 'Text', 'Raster'];
  const filteredSymbolizerKinds = symbolizerKinds
    .filter(kind => {
      if (kind === 'Mark' && markComposition.visibility === false) {
        return false;
      }
      if (kind === 'Fill' && fillComposition.visibility === false) {
        return false;
      }
      if (kind === 'Icon' && iconComposition.visibility === false) {
        return false;
      }
      if (kind === 'Line' && lineComposition.visibility === false) {
        return false;
      }
      if (kind === 'Text' && textComposition.visibility === false) {
        return false;
      }
      if (kind === 'Raster' && rasterComposition.visibility === false) {
        return false;
      }
      return true;
    });

  return (
    <div className="gs-symbolizer-editor" >
      <Form
        layout='vertical'
      >
        <Form.Item
          label={locale.kindFieldLabel}
        >
          <KindField
            kind={symbolizer.kind}
            onChange={onKindFieldChange}
            symbolizerKinds={filteredSymbolizerKinds}
          />
        </Form.Item>
        {getUiForSymbolizer()}
      </Form>
    </div>
  );
};

export default localize(Editor, COMPONENTNAME);
