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
  parser?: GsStyleParserConstructable;
  onStyleChange?: (rule: GsStyle) => void;
}

// state
interface CodeEditorState {
  value: string;
  style?: GsStyle;
  invalidMessage?: string;
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
    if (this.props.parser && this.props.parser.name === 'SldStyleParser') {
      return 'application/xml';
    }
    return 'application/json';
  }

  valueFromStyleInput(style: GsStyle) {
    return new Promise((resolve, reject) => {
      if (this.props.parser) {
        const StyleParser = this.props.parser;
        const parserInstance = new StyleParser();
        resolve(parserInstance.writeStyle(style));
      } else {
        resolve(JSON.stringify(style, null, 2));
      }
    });
  }

  styleFromValue(value: string) {
    return new Promise((resolve, reject) => {
      if (this.props.parser) {
        const StyleParser = this.props.parser;
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
    let invalidMessage;
    this.setState({
      value
    });
    try {
      this.styleFromValue(value)
        .then((style: GsStyle) => {
          if (this.props.onStyleChange) {
            this.props.onStyleChange(style);
          }
        }).catch(err => {debugger; });
    } catch (error) {
      invalidMessage = 'Error';
    } finally {
      this.setState({
          invalidMessage
      });
    }
  }

  render() {
    const value = this.state.value;
    return (
      <CodeMirror
        className="gs-code-editor"
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
    );
  }
}

export default CodeEditor;
