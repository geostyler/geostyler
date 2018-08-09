import * as React from 'react';

import { Select } from 'antd';
const Option = Select.Option;
import 'antd/dist/antd.css';

import {
  Style as GsStyle,
  StyleParserConstructable as GsStyleParserConstructable
} from 'geostyler-style';

import UploadButton from '../../UploadButton/UploadButton';

import { localize } from '../../LocaleWrapper/LocaleWrapper';

// i18n
export interface StyleLoaderLocale {
  label: string;
  uploadButtonLabel: string;
}

// default props
interface DefaultStyleLoaderProps {
  onStyleRead: (style: GsStyle) => void;
  locale?: StyleLoaderLocale;
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

  constructor(props: StyleLoaderProps) {
    super(props);
    this.state = {};
  }

  static componentName: string = 'StyleLoader';

  public static defaultProps: DefaultStyleLoaderProps = {
    onStyleRead: (style: GsStyle) => {return; },
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

  render() {
    const {
      activeParser
    } = this.state;

    const { 
      locale 
    } = this.props;

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
            label={locale.uploadButtonLabel}
            onUpload={this.parseStyle}
          /> : null
        }
      </div>
    );
  }
}

export default localize(StyleLoader, StyleLoader.componentName);
