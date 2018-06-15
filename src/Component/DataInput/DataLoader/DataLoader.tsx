import * as React from 'react';

import { Select } from 'antd';
const Option = Select.Option;

import {
  Data as GsData,
  DataParserConstructable as GsDataParserConstructable
} from 'geostyler-data';

import UploadButton from '../../UploadButton/UploadButton';

// default props
interface DefaultDataLoaderProps {
  onDataRead: (data: GsData) => void;
  label: string;
}
// non default props
interface DataLoaderProps extends Partial<DefaultDataLoaderProps> {
  parsers: GsDataParserConstructable[];
}

// state
interface DataLoaderState {
  activeParser?: GsDataParserConstructable;
}

class DataLoader extends React.Component<DataLoaderProps, DataLoaderState> {

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  public static defaultProps: DefaultDataLoaderProps = {
    onDataRead: (data: GsData) => {return; },
    label: 'Load Data: '
  };

  parseData = (uploadObject: any) => {
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
      // TODO Remove JSON.parse when type of readData is more precise
      parser.readData(JSON.parse(fileContent))
        .then(this.props.onDataRead);
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
      label
    } = this.props;
    const {
      activeParser
    } = this.state;

    return (
      <div className={activeParser ? 'gs-dataloader-right' : ''}>
        {label}
        <Select
          style={{ width: 300 }}
          onSelect={this.onSelect}
        >
          {this.getParserOptions()}
        </Select>
        {
          activeParser ?
          <UploadButton
            label="Upload Data"
            onUpload={this.parseData}
          /> : null
        }
      </div>
    );
  }
}

export default DataLoader;
