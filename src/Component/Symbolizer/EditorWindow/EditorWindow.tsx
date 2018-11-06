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
  onSymbolizersChange?: (symbolizers: Symbolizer[]) => void;
  onAdd?: () => void;
  onClose?: () => void;
  onRemove?: (symbolizer: Symbolizer, idx: number) => void;
  internalDataDef?: Data;
  x?: number;
  y?: number;
}

// state
interface EditorWindowState {
}

/**
 * Symbolizer editorwindow UI.
 */
export class EditorWindow extends React.Component<EditorWindowProps, EditorWindowState> {

  public static defaultProps: DefaultEditorWindowProps = {
    locale: en_US.GsEditorWindow
  };

  public shouldComponentUpdate(nextProps: EditorWindowProps, nextState: EditorWindowState): boolean {
    const diffProps = !_isEqual(this.props, nextProps);
    const diffState = !_isEqual(this.state, nextState);
    return diffProps || diffState;
  }

  static componentName: string = 'EditorWindow';

  render() {
    const {
      x,
      y,
      onAdd,
      onClose,
      onRemove,
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
            onAdd={onAdd}
            onRemove={onRemove}
          />
        </Rnd>,
        document.body
      )
    );
  }
}

export default localize(EditorWindow, EditorWindow.componentName);
