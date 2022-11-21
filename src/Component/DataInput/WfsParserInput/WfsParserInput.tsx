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

import React, { useState } from 'react';

import { ReadParams, RequestParams } from 'geostyler-wfs-parser';

import {
  Form,
  Button,
  Input,
  Select,
  InputNumber
} from 'antd';
const Option = Select.Option;

import './WfsParserInput.less';
import { GeoStylerLocale } from '../../../locale/locale';
import en_US from '../../../locale/en_US';

type WfsVersion = RequestParams['version'];

// default props
interface WfsParserInputDefaultProps {
  /** Locale object containing translated text snippets */
  locale: GeoStylerLocale['WfsParserInput'];
}

// non default props
export interface WfsParserInputProps extends Partial<WfsParserInputDefaultProps> {
  /** The callback method that is triggered when the state changes */
  onClick: (wfsParams: ReadParams) => void;
}

/**
 * WfsParserInput
 */
export const WfsParserInput: React.FC<WfsParserInputProps> = ({
  locale = en_US.WfsParserInput,
  onClick: onClickProp
}) => {

  const [url, setUrl] = useState<string>('https://ows-demo.terrestris.de/geoserver/terrestris/ows');
  const [version, setVersion] = useState<WfsVersion>('1.1.0');
  const [typeName, setTypeName] = useState<string>('terrestris:bundeslaender');
  const [featureID, setFeatureID] = useState<string>();
  const [propertyName, setPropertyName] = useState<string>();
  const [srsName, setSrsName] = useState<string>();
  const [maxFeatures, setMaxFeatures] = useState<number>();
  const [validation, setValidation] = useState({
    url: undefined,
    version: undefined,
    typeName: undefined,
    featureID: undefined,
    propertyName: undefined,
    maxFeatures: undefined,
    fetchParams: undefined,
    srsName: undefined
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

  const onSrsNameChange = (event: any) => {
    setSrsName(event.target.value);
  };

  const onPropertyNameChange = (newPropertyName: string) => {
    setPropertyName(newPropertyName);
  };

  const onMaxFeaturesChange = (newMaxFeatures: number) => {
    setMaxFeatures(newMaxFeatures);
  };

  const onClick = () => {
    let requestParams: RequestParams;
    if (version === '1.1.0') {
      requestParams = {
        version,
        typeName,
        maxFeatures,
        featureID,
        propertyName,
        srsName
      };
    } else {
      requestParams = {
        version,
        typeNames: typeName,
        count: maxFeatures,
        featureID,
        propertyName,
        srsName
      };
    }
    onClickProp({
      url,
      requestParams
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
          <Option value="1.1.0">1.1.0</Option>
          <Option value="2.0.0">2.0.0</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label={locale.srsNameLabel}
        validateStatus={validation?.srsName?.status}
        help={validation?.srsName?.message}
        hasFeedback={true}
      >
        <Input
          className='wfs-srsName-input'
          value={srsName}
          onChange={onSrsNameChange}
        />
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
