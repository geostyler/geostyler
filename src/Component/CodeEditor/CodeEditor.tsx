import * as React from 'react';
import 'codemirror/lib/codemirror.css';

import './CodeEditor.css';

import {
  Style as GsStyle,
  StyleParserConstructable as GsStyleParserConstructable
} from 'geostyler-style';

// Favourite Editor should be Monaco Editor but its React Wrapper is currently
// not very stable
import {
  UnControlled as CodeMirror
} from 'react-codemirror2';

require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');

// default props
interface DefaultCodeEditorProps {
}

// non default props
interface CodeEditorProps extends Partial<DefaultCodeEditorProps> {
  style?: GsStyle;
  parsers: GsStyleParserConstructable[];
  onStyleChange?: (rule: GsStyle) => void;
}

// state
interface CodeEditorState {
  style: GsStyle;
  invalid: boolean;
}

/**
 * Button to upload / import geodata file.
 */
class CodeEditor extends React.Component<CodeEditorProps, CodeEditorState> {

  constructor(props: CodeEditorProps) {
    super(props);
    this.state = {
      style: {
        name: 'Circle',
        type: 'Point',
        rules: []
      },
      invalid: false
    };
  }

  static getDerivedStateFromProps(
      nextProps: CodeEditorProps,
      prevState: CodeEditorState): Partial<CodeEditorState> {
    const newState: Partial<CodeEditorState> = {};
    if (nextProps.style) {
      newState.style = nextProps.style;
    }
    return newState;
  }

  public static defaultProps: DefaultCodeEditorProps = {
  };

  /**
   *
   */
  onChange = (editor: any, data: any, value: string) => {
    let style = this.state.style;
    try {
      style = JSON.parse(value);
    } catch (error) {
      // TODO improve this
      this.setState({
        invalid: true
      });
    }

    this.setState({
      style
    });
    if (this.props.onStyleChange) {
      this.props.onStyleChange(style);
    }
  }

  render() {
    const value = JSON.stringify(this.state.style, null, 2);

    return (
      <CodeMirror
        className="gs-code-editor"
        value={value}
        autoCursor={false}
        options={{
          mode: 'application/json',
          lineNumbers: true
        }}
        onChange={this.onChange}
      />
    );
  }
}

export default CodeEditor;
