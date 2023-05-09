/* Released under the BSD 2-Clause License
 *
 * Copyright © 2018-present, terrestris GmbH & Co. KG and GeoStyler contributors
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

import * as React from 'react';

import { Select, Modal } from 'antd';
import { UploadRequestOption } from 'rc-upload/lib/interface';

const Option = Select.Option;

import {
  VectorData,
  DataParser,
  Data
} from 'geostyler-data';

import { ReadParams } from 'geostyler-wfs-parser';

import UploadButton, { UploadButtonProps } from '../../UploadButton/UploadButton';
import WfsParserInput from '../WfsParserInput/WfsParserInput';

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import type GeoStylerLocale from '../../../locale/locale';
import en_US from '../../../locale/en_US';


// default props
interface DataLoaderDefaultProps {
  /** The callback method that is triggered when the state changes */
  onDataRead: (data: VectorData) => void;
  /** Locale object containing translated text snippets */
  locale: GeoStylerLocale['DataLoader'];
}

// non default props
export interface DataLoaderProps extends Partial<DataLoaderDefaultProps> {
  /** List of data parsers to use */
  parsers: DataParser[];
  /** Properties that get passed to the UploadButton. */
  uploadButtonProps?: UploadButtonProps;
}

export const DataLoader: React.FC<DataLoaderProps> = ({
  parsers,
  locale = en_US.DataLoader,
  uploadButtonProps,
  onDataRead = () => {
    return;
  }
}) => {

  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [activeParser, setActitveParser] = React.useState<DataParser>();

  const parseGeoJsonUploadData = (uploadObject: UploadRequestOption<any>) => {
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
        .then(data => {
          onDataRead(data as VectorData);
          uploadObject.onSuccess(data);
        })
        .catch((e) => {
          uploadObject.onError(e, 'Upload failed. Invalid Data.');
        });
    };
  };

  const parseShapefileUploadData = (uploadObject: UploadRequestOption<any>) => {
    if (!activeParser) {
      return;
    }
    const file = uploadObject.file as File;
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      activeParser.readData(reader.result)
        .then(data => {
          onDataRead(data as VectorData);
          uploadObject.onSuccess(data);
        })
        .catch((e) => {
          uploadObject.onError(e, 'Upload failed. Invalid Data.');
        });
    };
  };

  const parseWfsData = (wfsReadParams: ReadParams) => {
    if (!activeParser) {
      return;
    }
    // The dataProjection of the Preview
    activeParser.readData({
      ...wfsReadParams,
      srsName: 'EPSG:4326'
    })
      .then((data: Data) => {
        onDataRead(data as VectorData);
        setModalVisible(false);
      });
  };

  const parserOptions = parsers.map((parser: any) =>
    <Option key={parser.title} value={parser.title}>{parser.title}</Option>
  );

  const onSelect = (selection: string) => {
    const newActiveParser = parsers.find(parser => parser.title === selection);
    if (newActiveParser) {
      setActitveParser(newActiveParser);
      setModalVisible(newActiveParser.title === 'WFS Data Parser');
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const getInputFromParser = () => {
    if (activeParser) {
      switch (activeParser.title) {
        case 'GeoJSON Data Parser':
          return (
            <UploadButton
              customRequest={parseGeoJsonUploadData}
              {...uploadButtonProps}
            />
          );
        case 'Shapefile Data Parser':
          return (
            <UploadButton
              customRequest={parseShapefileUploadData}
              {...uploadButtonProps}
            />
          );
        case 'WFS Data Parser':
          return (
            <Modal
              className="wfs-parser-modal"
              title={activeParser.title}
              open={modalVisible}
              onCancel={closeModal}
              onOk={closeModal}
            >
              <WfsParserInput
                onClick={parseWfsData}
              />
            </Modal>
          );
        default:
          return (
            <UploadButton
              customRequest={parseGeoJsonUploadData}
            />
          );
      }
    }
    return null;
  };

  return (
    <div className={activeParser ? 'gs-dataloader-right' : ''}>
      {locale.label}
      <Select
        style={{ width: 300 }}
        onSelect={onSelect}
      >
        {parserOptions}
      </Select>
      {getInputFromParser()}
    </div>
  );
};

export default localize(DataLoader, 'DataLoader');
