import * as React from 'react';
// Favourite Editor should be Monaco Editor but its React Wrapper is currently
// not very stable
import {
  UnControlled as CodeMirror
} from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';

import 'blob';
import {
  saveAs
} from 'file-saver';

import './CodeEditor.css';

import { Select, Button } from 'antd';
const Option = Select.Option;

import {
  Style as GsStyle,
  StyleParserConstructable as GsStyleParserConstructable
} from 'geostyler-style';

const _isEqual = require('lodash/isEqual');

import { localize } from '../LocaleWrapper/LocaleWrapper';
import en_US from '../../locale/en_US';

// i18n
export interface CodeEditorLocale {
  downloadButtonLabel: string;
  formatSelectLabel: string;
}

interface DefaultCodeEditorProps {
  locale: CodeEditorLocale;
  delay: number;
}

// non default props
export interface CodeEditorProps extends Partial<DefaultCodeEditorProps> {
  style?: GsStyle;
  parsers?: GsStyleParserConstructable[];
  onStyleChange?: (rule: GsStyle) => void;
}

// state
interface CodeEditorState {
  value: string;
  invalidMessage?: string;
  activeParser?: GsStyleParserConstructable;
}

/**
 * The CodeEditor.
 */
export class CodeEditor extends React.Component<CodeEditorProps, CodeEditorState> {

  static componentName: string = 'CodeEditor';

  private editTimeout: any;

  constructor(props: CodeEditorProps) {
    super(props);
    this.editTimeout =  null;
    this.state = {
      value: ''
    };
  }

  public static defaultProps: DefaultCodeEditorProps = {
    locale: en_US.GsCodeEditor,
    delay: 500
  };

  componentDidMount() {
    if (this.props.style) {
      this.updateValueFromStyle(this.props.style);
    }
  }

  public shouldComponentUpdate(nextProps: CodeEditorProps, nextState: CodeEditorState): boolean {
    const diffProps = !_isEqual(this.props, nextProps);
    const diffState = !_isEqual(this.state, nextState);
    return diffProps || diffState;
  }

  componentDidUpdate(prevProps: CodeEditorProps, prevState: CodeEditorState) {
    if (this.props.style && !_isEqual(this.props.style, prevProps.style)) {
      this.updateValueFromStyle(this.props.style);
    }
  }

  updateValueFromStyle (style: GsStyle) {
    this.valueFromStyleInput(style)
      .then((parsedStyle: string) => {
        this.setState({
          value: parsedStyle
        });
      });
  }

  getModeByParser(): string {
    if (this.state.activeParser && this.state.activeParser.title === 'SLD Style Parser') {
      return 'application/xml';
    }
    return 'application/json';
  }

  valueFromStyleInput(style: GsStyle) {
    return new Promise((resolve, reject) => {
      if (this.state.activeParser) {
        const StyleParser = this.state.activeParser;
        const parserInstance = new StyleParser();
        resolve(parserInstance.writeStyle(style));
      } else {
        resolve(JSON.stringify(style, null, 2));
      }
    });
  }

  styleFromValue(value: string) {
    return new Promise((resolve, reject) => {
      if (this.state.activeParser && this.state.activeParser ) {
        const StyleParser = this.state.activeParser;
        const parserInstance = new StyleParser();
        resolve(parserInstance.readStyle(value));
      } else {
        resolve(JSON.parse(value));
      }
    });
  }

  /**
   *
   */
  onChange = (editor: any, data: any, value: string) => {
    this.setState({
      value,
      invalidMessage: undefined
    });
    try {
      this.styleFromValue(value)
        .then((style: GsStyle) => {
          if (this.props.onStyleChange) {
            this.props.onStyleChange(style);
          }
        }).catch(err => {
          this.setState({
            invalidMessage: err.message
          });
        });
    } catch (err) {
      this.setState({
        invalidMessage: 'Error'
      });
    }
  }

  onSelect = (selection: string) => {
    if (this.props.parsers) {
      const activeParser = this.props.parsers.find(parser => parser.title === selection);
      this.setState({activeParser}, () => {
        if (this.props.style) {
          this.updateValueFromStyle(this.props.style);
        }
      });
    }
  }

  handleOnChange = (editor: any, data: any, value: string) => {
    const {
      delay
    } = this.props;
    clearTimeout(this.editTimeout);
    this.editTimeout = setTimeout(
      () => {
        this.onChange(editor, data, value);
      },
      delay
    );
  }

  getParserOptions = () => {
    let parserOptions = [
      <Option key="GeoStyler Style" value="GeoStyler Style" >Geostyler Style</Option>
    ];
    if (this.props.parsers) {
      const additionalOptions = this.props.parsers.map((parser: any) => {
        return <Option key={parser.title} value={parser.title}>{parser.title}</Option>;
      });
      return [...parserOptions, ...additionalOptions];
    }
    return parserOptions;
  }

  onDownloadButtonClick = () => {
    const {
      activeParser,
      value
    } = this.state;
    const {
      style
    } = this.props;
    if (style) {
      let type = 'application/json;charset=utf-8';
      if (activeParser && activeParser.title === 'SLD Style Parser') {
        type = 'text/xml;charset=utf-8';
      }
      const blob = new Blob([value], {type});
      saveAs(blob, style.name);
    }

  }

  render() {
    const value = this.state.value;
    const { locale } = this.props;
    return (
      <div className="gs-code-editor">
        <div className="gs-code-editor-toolbar" >
          {locale.formatSelectLabel}: <Select
            className="gs-code-editor-format-select"
            style={{ width: 300 }}
            onSelect={this.onSelect}
            defaultValue="GeoStyler Style"
          >
            {this.getParserOptions()}
          </Select>
        </div>
        <CodeMirror
          className="gs-code-editor-codemirror"
          value={value}
          autoCursor={false}
          options={{
            gutters: ['CodeMirror-lint-markers'],
            lint: true,
            mode: this.getModeByParser(),
            lineNumbers: true,
            lineWrapping: true
          }}
          onChange={this.handleOnChange}
        />
        <div className="gs-code-editor-errormessage">
          {this.state.invalidMessage}
        </div>
        <Button
            className="gs-code-editor-download-button"
            type="primary"
            onClick={this.onDownloadButtonClick}
        >
            {locale.downloadButtonLabel}
        </Button>
      </div>
    );
  }
}

export default localize(CodeEditor, CodeEditor.componentName);
