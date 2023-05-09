/* eslint-disable camelcase */
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
  Symbolizer
} from 'geostyler-style';

import './MultiEditor.less';

import 'ol/ol.css';
import { Data } from 'geostyler-data';

import { Tabs, Button } from 'antd';
import Editor from '../Editor/Editor';

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';
import SymbolizerUtil from '../../../Util/SymbolizerUtil';
import { IconLibrary } from '../IconSelector/IconSelector';

import _isEqual from 'lodash/isEqual';
import { GeoStylerLocale } from '../../../locale/locale';
import { Tab } from 'rc-tabs/lib/interface';


// default props
interface MultiEditorDefaultProps {
  locale: GeoStylerLocale['MultiEditor'];
}

// non default props
export interface MultiEditorProps extends Partial<MultiEditorDefaultProps> {
  internalDataDef?: Data;
  editorProps?: any;
  symbolizers: Symbolizer[];
  onSymbolizersChange?: (symbolizers: Symbolizer[]) => void;
  iconLibraries?: IconLibrary[];
}

const COMPONENTNAME = 'MultiEditor';

export const MultiEditor: React.FC<MultiEditorProps> = ({
  locale = en_US.MultiEditor,
  internalDataDef,
  editorProps,
  symbolizers,
  onSymbolizersChange,
  iconLibraries,
  ...passThroughProps
}) => {

  const addSymbolizer = () => {
    const symbolizerKind = symbolizers.length > 0 ? symbolizers[0].kind : undefined;
    const newSymbolizer = SymbolizerUtil.generateSymbolizer(symbolizerKind);
    if (onSymbolizersChange) {
      onSymbolizersChange([...symbolizers, newSymbolizer]);
    }
  };

  const removeSymbolizer = (key: number) => {
    const symbolizersClone = [...symbolizers];
    symbolizersClone.splice(key, 1);
    if (onSymbolizersChange) {
      onSymbolizersChange(symbolizersClone);
    }
  };

  const onSymbolizerChange = (symbolizer: Symbolizer, key: number) => {
    const symbolizersClone = [...symbolizers];
    symbolizersClone[key] = symbolizer;
    if (onSymbolizersChange) {
      onSymbolizersChange(symbolizersClone);
    }
  };

  const tabs: Tab[] = symbolizers.map((symbolizer: Symbolizer, idx: number) => {
    return {
      className: 'gs-symbolizer-multi-editor-tab',
      key: idx.toString(),
      closable: true,
      label: idx,
      children: (
        <>
          <Editor
            symbolizer={symbolizer}
            onSymbolizerChange={(sym: Symbolizer) => {
              onSymbolizerChange(sym, idx);
            }}
            internalDataDef={internalDataDef}
            iconLibraries={iconLibraries}
            {...editorProps}
          />
          {symbolizers.length === 1 ? null :
            <Button
              onClick={() => {
                removeSymbolizer(idx);
              }}
            >
              {locale.remove}
            </Button>
          }
        </>
      )
    };
  });

  return (
    <Tabs
      className="gs-symbolizer-multi-editor"
      defaultActiveKey="0"
      animated={false}
      tabBarExtraContent={(
        <Button onClick={addSymbolizer}>
          {locale.add}
        </Button>
      )}
      items={tabs}
      {...passThroughProps}
    />
  );
};

export default localize(MultiEditor, COMPONENTNAME);
