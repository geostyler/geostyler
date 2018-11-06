import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Rnd } from 'react-rnd';

import { Symbolizer } from 'geostyler-style';

import MultiEditor from '../MultiEditor/MultiEditor';

import { Data } from 'geostyler-data';

import './EditorWindow.css';
import { Button } from 'antd';

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';

const _isEqual = require('lodash/isEqual');
// i18n
export interface EditorWindowLocale {
  symbolizersEditor: string;
}

// default props
export interface DefaultEditorWindowProps {
  locale: EditorWindowLocale;
}

// non default props
export interface EditorWindowProps extends Partial<DefaultEditorWindowProps> {
  symbolizers: Symbolizer[];
  internalDataDef?: Data;
  x?: number;
  y?: number;
  onClose: () => void;
  onSymbolizersChange: (symbolizers: Symbolizer[]) => void;
}

/**
 * Symbolizer editorwindow UI.
 */
export class EditorWindow extends React.Component<EditorWindowProps> {

  public static defaultProps: DefaultEditorWindowProps = {
    locale: en_US.GsEditorWindow
  };

  public shouldComponentUpdate(nextProps: EditorWindowProps): boolean {
    return !_isEqual(this.props, nextProps);
  }

  static componentName: string = 'EditorWindow';

  render() {
    const {
      x,
      y,
      onClose,
      symbolizers,
      onSymbolizersChange,
      locale
    } = this.props;

    return (
      ReactDOM.createPortal(
        <Rnd
          className="editor-window"
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
          dragHandleClassName="editor-window-header"
        >
          <div className="header editor-window-header">
            <span className="title">
              {locale.symbolizersEditor}
            </span>
            <Button
              icon="close"
              size="small"
              onClick={onClose}
            />
          </div>
          <MultiEditor
            symbolizers={symbolizers}
            onSymbolizersChange={onSymbolizersChange}
          />
        </Rnd>,
        document.body
      )
    );
  }
}

export default localize(EditorWindow, EditorWindow.componentName);
