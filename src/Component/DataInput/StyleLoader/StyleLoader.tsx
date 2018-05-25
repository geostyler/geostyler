import * as React from 'react';

import { Select } from 'antd';
const Option = Select.Option;
import 'antd/dist/antd.css';

import {
  Style as GsStyle,
  StyleParser as GsStyleParser,
} from 'geostyler-style';

import UploadButton from '../../UploadButton/UploadButton';

// default props
interface DefaultStyleLoaderProps {
  onStyleRead: (style: GsStyle) => void;
}
// non default props
interface StyleLoaderProps extends Partial<DefaultStyleLoaderProps> {
  parsers: GsStyleParser[];
}

// state
interface StyleLoaderState {
  file?: File;
  activeParser: GsStyleParser;
}

class StyleLoader extends React.Component<StyleLoaderProps, StyleLoaderState> {

  public static defaultProps: DefaultStyleLoaderProps = {
    onStyleRead: (style: GsStyle) => {return; }
  };

  parseStyle = (uploadObject: any) => {
    const {
      activeParser
    } = this.state;

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
      return <Option key={parser.name} value={parser.name}>{parser.name}</Option>;
    });
  }

  render() {
    return (
      <div>
        Style Type:
        <Select
          style={{ width: 300 }}
          onSelect={() => {
            // TODO refactor
            const activeParser = this.props.parsers[1];
            this.setState({activeParser});
          }}
        >
          {this.getParserOptions()}
        </Select>
        <UploadButton
          style={{'marginBottom': '20px'}}
          onUpload={this.parseStyle}
        />
      </div>
    );
  }
}

export default StyleLoader;
