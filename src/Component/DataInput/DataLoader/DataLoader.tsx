import * as React from 'react';

import { Select, Modal } from 'antd';
const Option = Select.Option;
const _isEqual = require('lodash/isEqual');

import {
  VectorData,
  DataParser
} from 'geostyler-data';

import UploadButton, { CustomRequest } from '../../UploadButton/UploadButton';
import WfsParserInput from '../WfsParserInput/WfsParserInput';

/**
 * Interface representing the parameters to be send to WFS
 */
export interface ReadParams {
  url: string;
  version: string;
  typeName: string;
  featureID?: string;
  propertyName?: string[];
  maxFeatures?: number;
  fetchParams?: Object;
  srsName: string;
}

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';

// i18n
export interface DataLoaderLocale {
  label: string;
  uploadButtonLabel: string;
}

// default props
interface DataLoaderDefaultProps {
  /** The callback method that is triggered when the state changes */
  onDataRead: (data: VectorData) => void;
  /** Locale object containing translated text snippets */
  locale: DataLoaderLocale;
}

// non default props
export interface DataLoaderProps extends Partial<DataLoaderDefaultProps> {
  /** List of data parsers to use */
  parsers: DataParser[];
}

// state
interface DataLoaderState {
  activeParser?: DataParser;
  modalVisible?: boolean;
}

export class DataLoader extends React.Component<DataLoaderProps, DataLoaderState> {

  constructor(props: DataLoaderProps) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }

  public shouldComponentUpdate(nextProps: DataLoaderProps, nextState: DataLoaderState): boolean {
    const diffProps = !_isEqual(this.props, nextProps);
    const diffState = !_isEqual(this.state, nextState);
    return diffProps || diffState;
  }

  static componentName: string = 'DataLoader';

  public static defaultProps: DataLoaderDefaultProps = {
    locale: en_US.GsDataLoader,
    onDataRead: (data: VectorData) => {return; }
  };

  parseGeoJsonUploadData = (uploadObject: CustomRequest) => {
    const {
      activeParser
    } = this.state;
    if (!activeParser) {
      return;
    }
    const file = uploadObject.file as File;
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const fileContent = reader.result.toString();

      // TODO: Remove JSON.parse when type of readData is more precise
      activeParser.readData(JSON.parse(fileContent))
        .then((data: VectorData) => {
          this.props.onDataRead(data);
          uploadObject.onSuccess(null, uploadObject.file);
        })
        .catch((e) => {
          uploadObject.onError(e, 'Upload failed. Invalid Data.');
        });
    };
  }

  parseShapefileUploadData = (uploadObject: CustomRequest) => {
    const {
      activeParser
    } = this.state;
    if (!activeParser) {
      return;
    }
    const file = uploadObject.file as File;
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      activeParser.readData(reader.result)
      .then((data: VectorData) => {
          this.props.onDataRead(data);
          uploadObject.onSuccess(null, uploadObject.file);
        })
        .catch((e) => {
          uploadObject.onError(e, 'Upload failed. Invalid Data.');
        });
    };
  }

  parseWfsData = (wfsReadParams: ReadParams) => {
    const {
      activeParser
    } = this.state;
    if (!activeParser) {
      return;
    }
    // The dataProjection of the Preview
    wfsReadParams.srsName = 'EPSG:4326';
    activeParser.readData(wfsReadParams)
      .then((data: VectorData) => {
        this.props.onDataRead(data);
        this.setState({
          modalVisible: false
        });
      });
  }

  getParserOptions = () => {
    return this.props.parsers.map((parser: any) => {
      return <Option key={parser.title} value={parser.title}>{parser.title}</Option>;
    });
  }

  onSelect = (selection: string) => {
    const activeParser = this.props.parsers.find(parser => parser.title === selection);
    if (activeParser) {
      this.setState({
        activeParser,
        modalVisible: activeParser.title === 'WFS Data Parser'
      });
    }
  }

  closeModal = () => {
    this.setState({modalVisible: false});
  }

  getInputFromParser = () => {
    const {
      activeParser
    } = this.state;

    if (activeParser) {
      switch (activeParser.title) {
        case 'GeoJSON Data Parser':
          return (
            <UploadButton
              onUpload={this.parseGeoJsonUploadData}
            />
          );
        case 'Shapefile Data Parser':
          return (
            <UploadButton
              onUpload={this.parseShapefileUploadData}
            />
          );
        case 'WFS Data Parser':
          return (
            <Modal
              className="wfs-parser-modal"
              title={activeParser.title}
              visible={this.state.modalVisible}
              onCancel={this.closeModal}
              onOk={this.closeModal}
            >
              <WfsParserInput
                onClick={this.parseWfsData}
              />
            </Modal>
          );
        default:
          return (
            <UploadButton
              onUpload={this.parseGeoJsonUploadData}
            />
          );
      }
    }
    return null;
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
        {this.getInputFromParser()}
      </div>
    );
  }
}

export default localize(DataLoader, DataLoader.componentName);
