
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
  Symbolizer
} from 'geostyler-style';

import './MultiEditor.css';

import 'ol/ol.css';

import { Tabs } from 'antd';
import { Editor } from '../Editor/Editor';

import SymbolizerUtil from '../../../Util/SymbolizerUtil';
import { IconLibrary } from '../IconSelector/IconSelector';

import { Tab } from 'rc-tabs/lib/interface';

export interface MultiEditorProps {
  editorProps?: any;
  symbolizers: Symbolizer[];
  onSymbolizersChange?: (symbolizers: Symbolizer[]) => void;
  iconLibraries?: IconLibrary[];
}

export const MultiEditor: React.FC<MultiEditorProps> = ({
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

  const onTabEdit = (targetKey: React.MouseEvent | React.KeyboardEvent | string, action: 'add' | 'remove') => {
    if (action === 'add') {
      addSymbolizer();
    } else {
      try {
        if (symbolizers.length === 1) {
          return;
        }
        const key = parseInt(targetKey.toString(), 10);
        removeSymbolizer(key);
      } catch {
        // eslint-disable-next-line no-console
        console.log('Could not remove symbolizer. Invalid key.');
      }
    }
  };

  const tabs: Tab[] = symbolizers.map((symbolizer: Symbolizer, idx: number) => {
    return {
      className: 'gs-symbolizer-multi-editor-tab',
      key: idx.toString(),
      closable: true,
      label: `${symbolizer.kind} (${idx})`,
      children: (
        <Editor
          symbolizer={symbolizer}
          onSymbolizerChange={(sym: Symbolizer) => {
            onSymbolizerChange(sym, idx);
          }}
          iconLibraries={iconLibraries}
          {...editorProps}
        />
      )
    };
  });

  return (
    <Tabs
      className='gs-symbolizer-multi-editor'
      type='editable-card'
      defaultActiveKey='0'
      items={tabs}
      animated={false}
      onEdit={onTabEdit}
      {...passThroughProps}
    />
  );
};
