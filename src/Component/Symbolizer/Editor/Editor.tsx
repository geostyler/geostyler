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
import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';
import RasterEditor from '../RasterEditor/RasterEditor';
import DataUtil from '../../../Util/DataUtil';
import { Form } from 'antd';

// i18n
export interface EditorLocale {
  kindFieldLabel: string;
}

// default props
interface EditorDefaultProps {
  locale: EditorLocale;
  unknownSymbolizerText?: string;
}

// non default props
export interface EditorProps extends Partial<EditorDefaultProps> {
  symbolizer: Symbolizer;
  internalDataDef?: Data;
  iconEditorProps?: Partial<IconEditorProps>;
  onSymbolizerChange?: (symbolizer: Symbolizer) => void;
  iconLibraries?: IconLibrary[];
  colorRamps?: {
    [name: string]: string[]
  };
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

  static componentName: string = 'SymbolizerEditor';

  public static defaultProps: EditorDefaultProps = {
    locale: en_US.GsSymbolizerEditor,
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
      iconLibraries,
      colorRamps,
      internalDataDef
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
            internalDataDef={internalDataDef && DataUtil.isVector(internalDataDef) ? internalDataDef : undefined}
          />
        );
      case 'Raster':
        return (
          <RasterEditor
            symbolizer={symbolizer}
            onSymbolizerChange={this.onSymbolizerChange}
            colorRamps={colorRamps}
            internalDataDef={internalDataDef && DataUtil.isRaster(internalDataDef) ? internalDataDef : undefined}
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
    const {
      locale
    } = this.props;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };

    const symbolizer = _cloneDeep(this.state.symbolizer);
    return (
      <div className="gs-symbolizer-editor" >
        <Form.Item
          label={locale.kindFieldLabel}
          {...formItemLayout}
        >
          <KindField
            kind={symbolizer.kind}
            onChange={this.onKindFieldChange}
          />
        </Form.Item>
        {this.getUiFromSymbolizer(this.props.symbolizer)}
      </div>
    );
  }
}

export default localize(Editor, Editor.componentName);
