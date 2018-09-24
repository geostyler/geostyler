import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Rnd } from 'react-rnd';

import { Symbolizer } from 'geostyler-style';

import MultiEditor from '../MultiEditor/MultiEditor';

import { Data } from 'geostyler-data';

import './EditorWindow.css';
import { Button } from 'antd';

// default props
export interface DefaultEditorWindowProps {
  onAdd: () => void;
  onClose: () => void;
  onRemove: (symbolizer: Symbolizer, idx: number) => void;
  symbolizers: Symbolizer[];
  onSymbolizerChange: (symbolizer: Symbolizer, key: number) => void;
}

// non default props
interface EditorWindowProps extends Partial<DefaultEditorWindowProps> {
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

  render() {
    const {
      x,
      y,
      onAdd,
      onClose,
      onRemove,
      symbolizers,
      onSymbolizerChange
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
        >
          <div className="header">
            <span className="title">
              Symbolizers Editor
            </span>
            <Button
              icon="close"
              size="small"
              onClick={onClose}
            />
          </div>
          <MultiEditor
            symbolizers={symbolizers}
            onSymbolizerChange={onSymbolizerChange}
            onAdd={onAdd}
            onRemove={onRemove}
          />
        </Rnd>,
        document.body
      )
    );
  }
}

export default EditorWindow;
