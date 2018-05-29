import * as React from 'react';

import './CodeEditor.css';

import {
  Style as GsStyle,
  StyleParserConstructable as GsStyleParserConstructable
} from 'geostyler-style';

// TODO Replace with monaco code editor
import { Input } from 'antd';
const { TextArea } = Input;

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
      }
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
  onChange = (evt: any) => {
    const value = evt.target.value;
    const style = JSON.parse(value);
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
      <TextArea
        className="gs-code-editor"
        value={value}
        onChange={this.onChange}
      />
    );
  }
}

export default CodeEditor;
