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
import * as ReactDOM from 'react-dom';

import { Rnd } from 'react-rnd';

import { Symbolizer } from 'geostyler-style';

import MultiEditor from '../MultiEditor/MultiEditor';
import { IconLibrary } from '../IconSelector/IconSelector';

import { Data } from 'geostyler-data';

import './SymbolizerEditorWindow.less';
import { Button } from 'antd';

import { CloseOutlined } from '@ant-design/icons';

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';

const _isEqual = require('lodash/isEqual');
// i18n
export interface SymbolizerEditorWindowLocale {
  symbolizersEditor: string;
}

// default props
export interface SymbolizerEditorWindowDefaultProps {
  locale: SymbolizerEditorWindowLocale;
  constrainWindow: string;
}

// non default props
export interface SymbolizerEditorWindowProps extends Partial<SymbolizerEditorWindowDefaultProps> {
  symbolizers: Symbolizer[];
  internalDataDef?: Data;
  x?: number;
  y?: number;
  onClose?: () => void;
  onSymbolizersChange?: (symbolizers: Symbolizer[]) => void;
  iconLibraries?: IconLibrary[];
  colorRamps?: {
    [name: string]: string[];
  };
}

/**
 * Symbolizer editorwindow UI.
 */
export class SymbolizerEditorWindow extends React.Component<SymbolizerEditorWindowProps> {

  static componentName: string = 'SymbolizerEditorWindow';

  public static defaultProps: SymbolizerEditorWindowDefaultProps = {
    locale: en_US.GsSymbolizerEditorWindow,
    constrainWindow: 'body'
  };

  public shouldComponentUpdate(nextProps: SymbolizerEditorWindowProps): boolean {
    return !_isEqual(this.props, nextProps);
  }

  render() {
    const {
      x,
      y,
      onClose,
      symbolizers,
      onSymbolizersChange,
      locale,
      internalDataDef,
      iconLibraries,
      constrainWindow,
      colorRamps
    } = this.props;

    return (
      ReactDOM.createPortal(
        <Rnd
          bounds={constrainWindow}
          className="symbolizer-editor-window"
          default={{
            x: x || window.innerWidth / 2,
            y: y || window.innerHeight / 2,
            width: undefined,
            height: undefined
          }}
          enableResizing={{
            bottom: false,
            bottomLeft: false,
            bottomRight: false,
            left: false,
            right: false,
            top: false,
            topLeft: false,
            topRight: false
          }}
          dragHandleClassName="symbolizer-editor-window-header"
        >
          <div className="header symbolizer-editor-window-header">
            <span className="title">
              {locale.symbolizersEditor}
            </span>
            <Button
              icon={<CloseOutlined />}
              size="small"
              onClick={onClose}
            />
          </div>
          <MultiEditor
            internalDataDef={internalDataDef}
            symbolizers={symbolizers}
            onSymbolizersChange={onSymbolizersChange}
            iconLibraries={iconLibraries}
            editorProps={{colorRamps}}
          />
        </Rnd>,
        document.body
      )
    );
  }
}

export default localize(SymbolizerEditorWindow, SymbolizerEditorWindow.componentName);
