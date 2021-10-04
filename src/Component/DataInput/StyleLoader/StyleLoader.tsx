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

import { Select } from 'antd';
import { UploadRequestOption } from 'rc-upload/lib/interface';
const Option = Select.Option;
import _isEqual from 'lodash/isEqual';

import {
  Style as GsStyle,
  Style,
  StyleParser
} from 'geostyler-style';

import UploadButton from '../../UploadButton/UploadButton';

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';
import FileUtil from '../../../Util/FileUtil';

// i18n
export interface StyleLoaderLocale {
  label: string;
  uploadButtonLabel: string;
}

// default props
interface StyleLoaderDefaultProps {
  /** The callback method that is triggered when the state changes */
  onStyleRead: (style: GsStyle) => void;
  /** Locale object containing translated text snippets */
  locale: StyleLoaderLocale;
}

// non default props
export interface StyleLoaderProps extends Partial<StyleLoaderDefaultProps> {
  /** List of data parsers to use */
  parsers: StyleParser[];
}


export const StyleLoader: React.FC<StyleLoaderProps> = ({
  parsers,
  locale = en_US.GsStyleLoader,
  onStyleRead = (style: GsStyle) => {return; }
}) => {

  const [activeParser, setActiveParser] = React.useState<StyleParser>();

  const parseStyle = async (uploadObject: UploadRequestOption<any>): Promise<Style|undefined> => {
    if (!activeParser) {
      return undefined;
    }
    const file = uploadObject.file as File;
    let fileContent;
    try {
      fileContent = await FileUtil.readFile(file);
    } catch (error) {
      uploadObject.onError(error);
      return error;
    }

    const {
      output: style,
      errors
    } = await activeParser.readStyle(fileContent);
    onStyleRead(style);
    if (errors?.length > 0) {
      errors.forEach(uploadObject.onError);
      return undefined;
    } else {
      return style;
    }
  };

  const parserOptions = parsers.map((parser: any) =>
    <Option key={parser.title} value={parser.title}>{parser.title}</Option>
  );

  const onSelect = (selection: string) => {
    const newActiveParser = parsers.find(parser => parser.title === selection);
    if (newActiveParser) {
      setActiveParser(newActiveParser);
    }
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
      {
        activeParser ?
          <UploadButton
            customRequest={parseStyle}
          /> : null
      }
    </div>
  );
};

export default localize(StyleLoader, 'StyleLoader');
