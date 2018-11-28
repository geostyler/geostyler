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

interface CodeEditorDefaultProps {
  locale: CodeEditorLocale;
  delay: number;
  showSaveButton: boolean;
}

// non default props
export interface CodeEditorProps extends Partial<CodeEditorDefaultProps> {
  style?: GsStyle;
  parsers?: GsStyleParserConstructable[];
  defaultParser?: GsStyleParserConstructable;
  onStyleChange?: (rule: GsStyle) => void;
  showSaveButton?: boolean;
}

// state
interface CodeEditorState {
  value: string;
  invalidMessage?: string;
  activeParser?: GsStyleParserConstructable;
  hasError: boolean;
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
      value: '',
      hasError: false
    };
  }

  public static defaultProps: CodeEditorDefaultProps = {
    locale: en_US.GsCodeEditor,
    delay: 500,
    showSaveButton: true
  };

  componentDidMount() {
    this.setState({
      activeParser: this.props.defaultParser
    }, () => {
      if (this.props.style) {
        this.updateValueFromStyle(this.props.style);
      }
    });
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

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      hasError: true
    });
  }

  updateValueFromStyle = (style: GsStyle) => {
    this.valueFromStyleInput(style)
      .then((parsedStyle: string) => {
        this.setState({
          value: parsedStyle
        });
      });
  }

  getModeByParser = (): string => {
    const {
      activeParser
    } = this.state;
    if (activeParser && activeParser.title === 'SLD Style Parser') {
      return 'application/xml';
    }
    return 'application/json';
  }

  valueFromStyleInput = (style: GsStyle) => {
    const {
      activeParser
    } = this.state;
    return new Promise((resolve, reject) => {
      if (activeParser) {
        const StyleParser = activeParser;
        const parserInstance = new StyleParser();
        resolve(parserInstance.writeStyle(style));
      } else {
        resolve(JSON.stringify(style, null, 2));
      }
    });
  }

  styleFromValue = (value: string) => {
    const {
      activeParser
    } = this.state;
    return new Promise((resolve, reject) => {
      if (activeParser) {
        const StyleParser = activeParser;
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
    const {
      onStyleChange
    } = this.props;
    try {
      this.styleFromValue(value)
        .then((style: GsStyle) => {
          if (onStyleChange) {
            onStyleChange(style);
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
    const {
      parsers,
      style
    } = this.props;
    if (parsers) {
      const activeParser = parsers.find(parser => parser.title === selection);
      this.setState({activeParser}, () => {
        if (style) {
          this.updateValueFromStyle(style);
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
    const {
      locale,
      showSaveButton
    } = this.props;
    const {
      hasError,
      value,
      activeParser
    } = this.state;
    if (hasError) {
      return <h1>An error occured in the CodeEditor UI.</h1>;
    }
    return (
      <div className="gs-code-editor">
        <div className="gs-code-editor-toolbar" >
          {locale.formatSelectLabel}: <Select
            className="gs-code-editor-format-select"
            style={{ width: 300 }}
            onSelect={this.onSelect}
            value={activeParser ? activeParser.title : 'GeoStyler Style'}
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
        {showSaveButton ?
        <Button
            className="gs-code-editor-download-button"
            type="primary"
            onClick={this.onDownloadButtonClick}
        >
            {locale.downloadButtonLabel}
        </Button>
        : undefined}
      </div>
    );
  }
}

export default localize(CodeEditor, CodeEditor.componentName);
