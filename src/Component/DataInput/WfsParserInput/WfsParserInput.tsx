/* eslint-disable camelcase */
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

import {
  Form,
  Button,
  Input,
  Select,
  InputNumber
} from 'antd';
const Option = Select.Option;

// TODO This should be importable from the wfs-parser
type WfsVersion = '1.0.0' | '1.1.0' | '1.1.3' | '2.0' | '2.0.2';

export interface WfsParams {
  url: string;
  version: WfsVersion;
  typeName: string;
  featureID?: string;
  propertyName?: string[];
  maxFeatures?: number;
}

import en_US from '../../../locale/en_US';

import _get from 'lodash/get';

import './WfsParserInput.less';

export interface WfsParserInputLocale {
  requestButtonText: string;
  urlLabel: string;
  versionLabel: string;
  typeNameLabel: string;
  featureIDLabel: string;
  propertyNameLabel: string;
  maxFeaturesLabel: string;
  fetchParamsLabel: string;
}

// default props
interface WfsParserInputDefaultProps {
  /** Locale object containing translated text snippets */
  locale: WfsParserInputLocale;
}

// non default props
export interface WfsParserInputProps extends Partial<WfsParserInputDefaultProps> {
  /** The callback method that is triggered when the state changes */
  onClick: (wfsParams: WfsParams) => void;
}

/**
 * WfsParserInput
 */
export const WfsParserInput: React.FC<WfsParserInputProps> = ({
  locale = en_US.GsWfsParserInput,
  onClick: onClickProp
}) => {

  const [url, setUrl] = React.useState<string>('https://ows-demo.terrestris.de/geoserver/terrestris/ows');
  const [version, setVersion] = React.useState<WfsVersion>('1.1.0');
  const [typeName, setTypeName] = React.useState<string>('terrestris:bundeslaender');
  const [featureID, setFeatureID] = React.useState<string>();
  const [propertyName, setPropertyName] = React.useState<string[]>();
  const [maxFeatures, setMaxFeatures] = React.useState<number>();
  const [validation, setValidation] = React.useState({
    url: undefined,
    version: undefined,
    typeName: undefined,
    featureID: undefined,
    propertyName: undefined,
    maxFeatures: undefined,
    fetchParams: undefined
  });

  const onUrlChange = (event: any) => {
    const newUrl = event.target.value;
    let urlValidation = {};
    if (newUrl.length <= 0) {
      urlValidation = {
        status: 'error',
        message: 'Url is required'
      };
    }
    setUrl(newUrl);
    setValidation({
      ...validation,
      url: urlValidation
    });
  };

  const onTypeNameChange = (event: any) => {
    const newTypeName = event.target.value;
    let typeNameValidation = {};
    if (newTypeName.length <= 0) {
      typeNameValidation = {
        status: 'error',
        message: 'TypeName is required'
      };
    }
    setTypeName(newTypeName);
    setValidation({
      ...validation,
      typeName: typeNameValidation
    });
  };

  const onVersionChange = (newVersion: WfsVersion) => {
    let versionValidation = {};
    if (newVersion.length <= 0) {
      versionValidation = {
        status: 'error',
        message: 'Version is required'
      };
    }
    setVersion(newVersion);
    setValidation({
      ...validation,
      version: versionValidation
    });
  };

  const onFeatureIDChange = (event: any) => {
    setFeatureID(event.target.value);
  };

  const onPropertyNameChange = (newPropertyName: string[]) => {
    setPropertyName(newPropertyName);
  };

  const onMaxFeaturesChange = (newMaxFeatures: number) => {
    setMaxFeatures(newMaxFeatures);
  };

  const onClick = () => {
    onClickProp({
      url,
      version,
      typeName,
      maxFeatures,
      featureID,
      propertyName
    });
  };

  return (
    <div className="wfs-parser-input">
      <Form.Item
        label={locale.urlLabel}
        validateStatus={validation?.url?.status}
        help={validation?.url?.message}
        hasFeedback={true}
        required={true}
      >
        <Input
          className='wfs-url-input'
          value={url}
          onChange={onUrlChange}
        />
      </Form.Item>
      <Form.Item
        label={locale.typeNameLabel}
        validateStatus={validation?.typeName?.status}
        help={validation?.typeName?.message}
        hasFeedback={true}
        required={true}
      >
        <Input
          className='wfs-typename-input'
          value={typeName}
          onChange={onTypeNameChange}
        />
      </Form.Item>
      <Form.Item
        label={locale.versionLabel}
        validateStatus={validation?.version?.status}
        help={validation?.version?.message}
        hasFeedback={true}
        required={true}
      >
        <Select
          className='wfs-version-input'
          style={{width: '100%'}}
          value={version}
          onChange={onVersionChange}
        >
          <Option value="1.0.0">1.0.0</Option>
          <Option value="1.1.0">1.1.0</Option>
          <Option value="1.1.3">1.1.3</Option>
          <Option value="2.0">2.0</Option>
          <Option value="2.0.2">2.0.2</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label={locale.featureIDLabel}
        validateStatus={validation?.featureID?.status}
        help={validation?.featureID?.message}
        hasFeedback={true}
      >
        <Input
          className='wfs-featureid-input'
          value={featureID}
          onChange={onFeatureIDChange}
        />
      </Form.Item>
      <Form.Item
        label={locale.propertyNameLabel}
        validateStatus={validation?.propertyName?.status}
        help={validation?.propertyName?.message}
        hasFeedback={true}
      >
        <Select
          className='wfs-propertyname-input'
          style={{width: '100%'}}
          mode="tags"
          value={propertyName}
          onChange={onPropertyNameChange}
        />
      </Form.Item>
      <Form.Item
        label={locale.maxFeaturesLabel}
        validateStatus={validation?.maxFeatures?.status}
        help={validation?.maxFeatures?.message}
        hasFeedback={true}
      >
        <InputNumber
          className='wfs-maxfeatures-input'
          style={{width: '100%'}}
          min={0}
          value={maxFeatures}
          onChange={onMaxFeaturesChange}
          precision={0}
        />
      </Form.Item>
      <Form.Item>
        <Button
          className="wfs-parser-submit-button"
          type="primary"
          onClick={onClick}
        >
          {locale.requestButtonText}
        </Button>
      </Form.Item>
    </div>
  );
};

export default WfsParserInput;
