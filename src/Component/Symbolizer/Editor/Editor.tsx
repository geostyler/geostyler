import * as React from 'react';

import {
  Symbolizer,
  SymbolizerKind
} from 'geostyler-style';

import MarkEditor from '../MarkEditor/MarkEditor';
import LineEditor from '../LineEditor/LineEditor';
import FillEditor from '../FillEditor/FillEditor';
import TextEditor from '../TextEditor/TextEditor';

import './Editor.css';

import 'ol/ol.css';
import { Data } from 'geostyler-data';

const _cloneDeep = require('lodash/cloneDeep');

import KindField from '../Field/KindField/KindField';
import IconEditor, { IconEditorProps } from '../IconEditor/IconEditor';
import SymbolizerUtil from '../../../Util/SymbolizerUtil';
import { IconLibrary } from '../IconSelector/IconSelector';

// default props
interface EditorDefaultProps {
  unknownSymbolizerText?: string;
}

// non default props
export interface EditorProps extends Partial<EditorDefaultProps> {
  symbolizer: Symbolizer;
  internalDataDef?: Data;
  iconEditorProps?: Partial<IconEditorProps>;
  onSymbolizerChange?: (symbolizer: Symbolizer) => void;
  iconLibraries?: IconLibrary[];
}

// state
interface EditorState {
  symbolizer: Symbolizer;
  hasError: boolean;
}

export class Editor extends React.Component<EditorProps, EditorState> {
  constructor(props: any) {
    super(props);
    this.state = {
      symbolizer: SymbolizerUtil.generateSymbolizer(),
      hasError: false
    };
  }

  public static defaultProps: EditorDefaultProps = {
    unknownSymbolizerText: 'Unknown Symbolizer!'
  };

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
  }

  getUiFromSymbolizer = (symbolizer: Symbolizer): React.ReactNode => {
    const {
      iconEditorProps,
      iconLibraries
    } = this.props;

    switch (symbolizer.kind) {
      case 'Mark':
        return (
          <MarkEditor
            symbolizer={symbolizer}
            onSymbolizerChange={this.onSymbolizerChange}
          />
        );
      case 'Icon':
        return (
          <IconEditor
            symbolizer={symbolizer}
            onSymbolizerChange={this.onSymbolizerChange}
            iconLibraries={iconLibraries}
            {...iconEditorProps}
          />
        );
      case 'Line':
        return (
          <LineEditor
            symbolizer={symbolizer}
            onSymbolizerChange={this.onSymbolizerChange}
          />
        );
      case 'Fill':
        return (
          <FillEditor
            symbolizer={symbolizer}
            onSymbolizerChange={this.onSymbolizerChange}
          />
        );
      case 'Text':
        return (
          <TextEditor
            symbolizer={symbolizer}
            onSymbolizerChange={this.onSymbolizerChange}
            internalDataDef={this.props.internalDataDef}
          />
        );
      default:
        return this.props.unknownSymbolizerText;
    }
  }

  onKindFieldChange = (kind: SymbolizerKind) => {
    const newSymbolizer = SymbolizerUtil.generateSymbolizer(kind);
    this.onSymbolizerChange(newSymbolizer);
  }

  render() {
    if (this.state.hasError) {
      return <h1>An error occured in the Symbolizer Editor UI.</h1>;
    }
    const symbolizer = _cloneDeep(this.state.symbolizer);
    return (
      <div className="gs-symbolizer-editor" >
        <KindField
          kind={symbolizer.kind}
          onChange={this.onKindFieldChange}
        />
        {this.getUiFromSymbolizer(this.props.symbolizer)}
      </div>
    );
  }
}

export default Editor;
