import * as React from 'react';

import { Select } from 'antd';
const Option = Select.Option;
import 'antd/dist/antd.css';

import {
  Style as GsStyle,
  StyleParserConstructable as GsStyleParserConstructable
} from 'geostyler-style';

import UploadButton from '../../UploadButton/UploadButton';

import en_US from './locale/en_US';
import LocaleReceiver from 'antd/lib/locale-provider/LocaleReceiver';

// default props
interface DefaultStyleLoaderProps {
  onStyleRead: (style: GsStyle) => void;
  label: string;
}
// non default props
interface StyleLoaderProps extends Partial<DefaultStyleLoaderProps> {
  parsers: GsStyleParserConstructable[];
}

// state
interface StyleLoaderState {
  activeParser?: GsStyleParserConstructable;
}

class StyleLoader extends React.Component<StyleLoaderProps, StyleLoaderState> {

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  public static defaultProps: DefaultStyleLoaderProps = {
    onStyleRead: (style: GsStyle) => {return; },
    label: 'Load Style: '
  };

  parseStyle = (uploadObject: any) => {
    const {
      activeParser
    } = this.state;
    if (!activeParser) {
      return;
    }
    const parser = new activeParser();
    const file = uploadObject.file as File;
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const fileContent = reader.result;
      parser.readStyle(fileContent)
      .then(this.props.onStyleRead);
    };
  }

  getParserOptions = () => {
    return this.props.parsers.map((parser: any) => {
      return <Option key={parser.title} value={parser.title}>{parser.title}</Option>;
    });
  }

  onSelect = (selection: string) => {
    const activeParser = this.props.parsers.find(parser => parser.title === selection);
    if (activeParser) {
      this.setState({activeParser});
    }
  }

  renderStyleLoader = (locale: any) => {
    const {
      activeParser
    } = this.state;

    return (
      <div className={activeParser ? 'gs-dataloader-right' : ''}>
        {locale.label}
        <Select
          style={{ width: 300 }}
          onSelect={this.onSelect}
        >
          {this.getParserOptions()}
        </Select>
        {
          activeParser ?
          <UploadButton
            label="Upload Style"
            onUpload={this.parseStyle}
          /> : null
        }
      </div>
    );
  }

  render() {
    return (
      <LocaleReceiver
        componentName="GsStyleLoader"
        defaultLocale={en_US}
      >
        {this.renderStyleLoader}
      </LocaleReceiver>
    );
  }
}

export default StyleLoader;
