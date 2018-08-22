import * as React from 'react';

import OlMap from 'ol/map';
import OlLayerVector from 'ol/layer/vector';

import {
  Symbolizer,
  SymbolizerKind,
  IconMime
} from 'geostyler-style';

import MarkEditor from '../MarkEditor/MarkEditor';
import LineEditor from '../LineEditor/LineEditor';
import FillEditor from '../FillEditor/FillEditor';
import TextEditor from '../TextEditor/TextEditor';

import './Editor.css';

import 'ol/ol.css';
import { Data } from 'geostyler-data';

const  _cloneDeep = require('lodash/cloneDeep');

import KindField from '../Field/KindField/KindField';
import IconEditor, { DefaultIconEditorProps } from '../IconEditor/IconEditor';

// default props
interface DefaultEditorProps {
  defaultIconSource: string;
  unknownSymbolizerText?: string;
  kindLabelText?: string;
  iconEditorProps?: DefaultIconEditorProps;
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
        kind: 'Mark',
        wellKnownName: 'Circle'
      }
    };
  }

  /** reference to the underlying OpenLayers map */
  map: OlMap;

  /** refrence to the vector layer for the passed in features  */
  dataLayer: OlLayerVector;

  public static defaultProps: DefaultEditorProps = {
    defaultIconSource: 'img/openLayers_logo.svg',
    unknownSymbolizerText: `Unknown Symbolizer!`
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

  /**
   * Extract image mime-type from filename. Supported mime-types are
   * image/png, image/jpeg, image/gif and image/svg+xml
   *
   * @param {String} path The image filepath
   * @return {IconMime} The mime-type of the image or undefined if mime-type not supported
   */
  getImageFormat = (path: string): IconMime => {
    const imgExt = path.split('.').pop();
    switch (imgExt) {
      case 'png':
      case 'jpeg':
      case 'gif':
        return `image/${imgExt}` as IconMime;
      case 'svg':
        return `image/${imgExt}+xml` as IconMime;
      default:
        return undefined;
    }
  }

  getUiFromSymbolizer = (symbolizer: Symbolizer): React.ReactNode => {
    switch (symbolizer.kind) {
      case 'Mark':
        return (
          <MarkEditor
            symbolizer={symbolizer}
            onSymbolizerChange={this.onSymbolizerChange}
          />
        );
      case 'Icon':
        if (!symbolizer.image) {
          symbolizer.image = this.props.defaultIconSource;
          symbolizer.format = this.getImageFormat(symbolizer.image);
        }
        return (
          <IconEditor
            defaultIconSource={this.props.defaultIconSource}
            symbolizer={symbolizer}
            onSymbolizerChange={this.onSymbolizerChange}
            {...this.props.iconEditorProps}
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
        return this.props.unknownSymbolizerText;
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
            if (newSymbolizer.kind === 'Mark') {
              newSymbolizer.wellKnownName = 'Circle';
            }
            this.onSymbolizerChange(newSymbolizer);
          }}
        />
        {this.getUiFromSymbolizer(this.props.symbolizer)}
      </div>
    );
  }
}

export default Editor;
