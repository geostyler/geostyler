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

import './CodeEditor.less';

import {
  Button,
  message,
  Select
} from 'antd';
const Option = Select.Option;

import {
  Style as GsStyle,
  StyleParser
} from 'geostyler-style';

const _isEqual = require('lodash/isEqual');

import { localize } from '../LocaleWrapper/LocaleWrapper';
import en_US from '../../locale/en_US';

// i18n
export interface CodeEditorLocale {
  downloadButtonLabel: string;
  formatSelectLabel: string;
  copyButtonLabel: string;
  styleCopied: string;
}

interface CodeEditorDefaultProps {
  /** Locale object containing translated text snippets */
  locale: CodeEditorLocale;
  /** Delay in ms until onStyleChange will be called */
  delay: number;
  /** Show save button */
  showSaveButton: boolean;
  /** show copy button */
  showCopyButton: boolean;
}

// non default props
export interface CodeEditorProps extends Partial<CodeEditorDefaultProps> {
  /** GeoStyler Style Object to display */
  style?: GsStyle;
  /** List of StylerParsers to parse from/to */
  parsers?: StyleParser[];
  /** Default parser */
  defaultParser?: StyleParser;
  /** The callback method that is triggered when the state changes */
  onStyleChange?: (rule: GsStyle) => void;
}

// state
interface CodeEditorState {
  value: string;
  invalidMessage?: string;
  activeParser?: StyleParser;
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
    showSaveButton: false,
    showCopyButton: false
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
    const activeParser: any = this.state.activeParser;
    if (activeParser && activeParser.title === 'SLD Style Parser') {
      return 'application/xml';
    }
    return 'application/json';
  }

  valueFromStyleInput = (style: GsStyle) => {
    const activeParser: any = this.state.activeParser;
    return new Promise((resolve, reject) => {
      if (activeParser) {
        resolve(activeParser.writeStyle(style));
      } else {
        resolve(JSON.stringify(style, null, 2));
      }
    });
  }

  styleFromValue = (value: string) => {
    const activeParser: any = this.state.activeParser;
    return new Promise((resolve, reject) => {
      if (activeParser) {
        resolve(activeParser.readStyle(value));
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
      const activeParser = parsers.find((parser: any) => parser.title === selection);
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
        const title = parser.title;
        return <Option key={title} value={title}>{title}</Option>;
      });
      return [...parserOptions, ...additionalOptions];
    }
    return parserOptions;
  }

  onDownloadButtonClick = () => {
    const activeParser: any = this.state.activeParser;
    const {
      value
    } = this.state;
    const {
      style
    } = this.props;
    if (style) {
      let fileName = style.name;
      let type = 'application/json;charset=utf-8';
      const title = activeParser && activeParser.title;
      if (title === 'SLD Style Parser') {
        type = 'text/xml;charset=utf-8';
        fileName += '.sld';
      }
      const blob = new Blob([value], {type});
      saveAs(blob, fileName);
    }
  }

  onCopyButtonClick = () => {
    const {
      value
    } = this.state;
    this.copyToClipboard(value);
  }

  /**
   * Copies the a value to the clipboard.
   * Credits: https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
   *
   * @param {string} str The string to copy to the clipboard.
   */
  copyToClipboard = (str: string) => {
    const {
      locale
    } = this.props;
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    message.info(locale.styleCopied);
    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }
  }

  render() {
    const {
      locale,
      showSaveButton,
      showCopyButton
    } = this.props;
    const activeParser: any = this.state.activeParser;
    const {
      hasError,
      value
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
        <div className="gs-code-editor-bottombar">
          {
            !showCopyButton ? null :
              <Button
                className="gs-code-editor-copy-button"
                type="primary"
                onClick={this.onCopyButtonClick}
              >
                {locale.copyButtonLabel}
              </Button>
          }
          {
            !showSaveButton ? null :
              <Button
                className="gs-code-editor-download-button"
                type="primary"
                onClick={this.onDownloadButtonClick}
              >
                {locale.downloadButtonLabel}
              </Button>
          }
        </div>
      </div>
    );
  }
}

export default localize(CodeEditor, CodeEditor.componentName);
