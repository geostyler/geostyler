import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Rnd } from 'react-rnd';

import { Symbolizer } from 'geostyler-style';

import MultiEditor from '../MultiEditor/MultiEditor';
import { IconLibrary } from '../IconSelector/IconSelector';

import { Data } from 'geostyler-data';

import './SymbolizerEditorWindow.css';
import { Button } from 'antd';

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
}

/**
 * Symbolizer editorwindow UI.
 */
export class SymbolizerEditorWindow extends React.Component<SymbolizerEditorWindowProps> {

  public static defaultProps: SymbolizerEditorWindowDefaultProps = {
    locale: en_US.GsSymbolizerEditorWindow,
    constrainWindow: 'body'
  };

  public shouldComponentUpdate(nextProps: SymbolizerEditorWindowProps): boolean {
    return !_isEqual(this.props, nextProps);
  }

  static componentName: string = 'SymbolizerEditorWindow';

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
      constrainWindow
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
              icon="close"
              size="small"
              onClick={onClose}
            />
          </div>
          <MultiEditor
            internalDataDef={internalDataDef}
            symbolizers={symbolizers}
            onSymbolizersChange={onSymbolizersChange}
            iconLibraries={iconLibraries}
          />
        </Rnd>,
        document.body
      )
    );
  }
}

export default localize(SymbolizerEditorWindow, SymbolizerEditorWindow.componentName);
