import * as React from 'react';

import * as ol from 'openlayers';

import {
  Symbolizer,
  SymbolizerKind
} from 'geostyler-style';

import CircleEditor from '../CircleEditor/CircleEditor';
import LineEditor from '../LineEditor/LineEditor';
import FillEditor from '../FillEditor/FillEditor';
import TextEditor from '../TextEditor/TextEditor';

import './Editor.css';

import 'openlayers/css/ol.css';
import { Data } from 'geostyler-data';

import {
  cloneDeep as _cloneDeep
} from 'lodash';
import KindField from '../Field/KindField/KindField';
import IconEditor from '../IconEditor/IconEditor';

// default props
interface DefaultEditorProps {
  defaultIconSource: string;
}

// non default props
interface EditorProps extends Partial<DefaultEditorProps> {
  symbolizer: Symbolizer;
  internalDataDef?: Data;
  onSymbolizerChange: (symbolizer: Symbolizer) => void;
}

// state
interface EditorState {
  symbolizer: Symbolizer;
}

class Editor extends React.Component<EditorProps, EditorState> {
  constructor(props: any) {
    super(props);
    this.state = {
      symbolizer: {
        kind: 'Circle'
      }
    };
  }

  /** reference to the underlying OpenLayers map */
  map: ol.Map;

  /** refrence to the vector layer for the passed in features  */
  dataLayer: ol.layer.Vector;

  public static defaultProps: DefaultEditorProps = {
    defaultIconSource: 'https://upload.wikimedia.org/wikipedia/commons/6/67/OpenLayers_logo.svg'
  };

  static getDerivedStateFromProps(
      nextProps: EditorProps,
      prevState: EditorState): Partial<EditorState> {
    return {
      symbolizer: nextProps.symbolizer
    };
  }

  onSymbolizerChange = (symbolizer: Symbolizer) => {
    this.props.onSymbolizerChange(symbolizer);
  }

  getUiFromSymbolizer = (symbolizer: Symbolizer): React.ReactNode => {
    switch (symbolizer.kind) {
      case 'Circle':
        return (
          <CircleEditor
            symbolizer={symbolizer}
            onSymbolizerChange={this.onSymbolizerChange}
          />
        );
      case 'Icon':
        if (!symbolizer.image) {
          symbolizer.image = this.props.defaultIconSource;
        }
        return (
          <IconEditor
            defaultIconSource={this.props.defaultIconSource}
            symbolizer={symbolizer}
            onSymbolizerChange={this.onSymbolizerChange}
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
            internalDataDef={this.props.internalDataDef}
            onSymbolizerChange={this.onSymbolizerChange}
          />
        );
      default:
        return `Unknown Symbolizer!`;
    }
  }

  render() {
    const symbolizer = _cloneDeep(this.state.symbolizer);
    return (
      <div className="gs-symbolizer-editor" >
        <KindField
          kind={symbolizer.kind}
          onChange={(kind: SymbolizerKind) => {
            const newSymbolizer = {kind} as Symbolizer;
            this.onSymbolizerChange(newSymbolizer);
          }}
        />
        {this.getUiFromSymbolizer(this.props.symbolizer)}
      </div>
    );
  }
}

export default Editor;
