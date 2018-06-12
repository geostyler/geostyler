import * as React from 'react';

import * as ol from 'openlayers';

import {
  Symbolizer
} from 'geostyler-style';

import CircleEditor from '../CircleEditor/CircleEditor';

import './Editor.css';

import 'openlayers/css/ol.css';
import LineEditor from '../LineEditor/LineEditor';

// default props
interface DefaultEditorProps {}

// non default props
interface EditorProps extends Partial<DefaultEditorProps> {
  symbolizer: Symbolizer;
  onSymbolizerChange: (symbolizer: Symbolizer) => void;
}

// state
interface EditorState {
  symbolizer: Symbolizer;
  colorPickerVisible: boolean;
}

class Editor extends React.Component<EditorProps, EditorState> {
  constructor(props: any) {
    super(props);
    this.state = {
      symbolizer: {
        kind: 'Circle'
      },
      colorPickerVisible: false
    };
  }

  /** reference to the underlying OpenLayers map */
  map: ol.Map;

  /** refrence to the vector layer for the passed in features  */
  dataLayer: ol.layer.Vector;

  public static defaultProps: DefaultEditorProps = {
  };

  static getDerivedStateFromProps(
      nextProps: EditorProps,
      prevState: EditorState): Partial<EditorState> {
    return {
      symbolizer: nextProps.symbolizer,
      colorPickerVisible: false
    };
  }

  onSymbolizerChange = (symbolizer: Symbolizer) => {
    this.props.onSymbolizerChange(symbolizer);
  }

  getUiFromSymbolizer = (symbolizer: Symbolizer): React.ReactNode => {
    const {
      // colorPickerVisible
    } = this.state;
    switch (symbolizer.kind) {
      case 'Circle':
        return (
          <CircleEditor
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
      default:
        return `Symbolizer kind ${symbolizer.kind} not yet supported!`;
    }
  }

  render() {
    return (
      <div className="gs-symbolizer-editor" >
        {this.getUiFromSymbolizer(this.props.symbolizer)}
      </div>
    );
  }
}

export default Editor;
