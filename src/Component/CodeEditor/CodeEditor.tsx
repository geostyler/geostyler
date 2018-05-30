import * as React from 'react';

// Favourite Editor should be Monaco Editor but its React Wrapper is currently
// not very stable
import {
  UnControlled as CodeMirror
} from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';

import './CodeEditor.css';

import { Select } from 'antd';
const Option = Select.Option;

import {
  Style as GsStyle,
  StyleParserConstructable as GsStyleParserConstructable
} from 'geostyler-style';

import {
  isEqual as _isEqual
} from 'lodash';

// default props
interface DefaultCodeEditorProps {
}

// non default props
interface CodeEditorProps extends Partial<DefaultCodeEditorProps> {
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
 * Button to upload / import geodata file.
 */
class CodeEditor extends React.Component<CodeEditorProps, CodeEditorState> {

  public static defaultProps: DefaultCodeEditorProps = {
  };

  constructor(props: CodeEditorProps) {
    super(props);
    this.state = {
      value: ''
    };
  }

  static getDerivedStateFromProps(nextProps: CodeEditorProps) {
    return {
      style: nextProps.style
    };
  }

  componentDidMount() {
    if (this.props.style) {
      this.updateValueFromStyle(this.props.style);
    }
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
    if (this.state.activeParser && this.state.activeParser.name === 'SldStyleParser') {
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
      const activeParser = this.props.parsers.find(parser => parser.name === selection);
      this.setState({activeParser}, () => {
        if (this.props.style) {
          this.updateValueFromStyle(this.props.style);
        }
      });
    }
  }

  getParserOptions = () => {
    let parserOptions = [
      <Option key="GeoStyler Style" value="GeoStyler Style" >Geostyler Style</Option>
    ];
    if (this.props.parsers) {
      const additionalOptions = this.props.parsers.map((parser: any) => {
        return <Option key={parser.name} value={parser.name}>{parser.name}</Option>;
      });
      return [...parserOptions, ...additionalOptions];
    }
    return parserOptions;
  }

  render() {
    const value = this.state.value;
    return (
      <div className="gs-code-editor">
        <div className="gs-code-editor-format-select">
          Format: <Select
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
          onChange={this.onChange}
        />
        <div className="gs-code-editor-errormessage">
          {this.state.invalidMessage}
        </div>
      </div>
    );
  }
}

export default CodeEditor;
