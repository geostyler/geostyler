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

// state
interface StyleLoaderState {
  activeParser?: StyleParser;
}

export class StyleLoader extends React.Component<StyleLoaderProps, StyleLoaderState> {

  static componentName: string = 'StyleLoader';

  public static defaultProps: StyleLoaderDefaultProps = {
    locale: en_US.GsStyleLoader,
    onStyleRead: (style: GsStyle) => {return; }
  };

  constructor(props: StyleLoaderProps) {
    super(props);
    this.state = {};
  }

  public shouldComponentUpdate(nextProps: StyleLoaderProps, nextState: StyleLoaderState): boolean {
    const diffProps = !_isEqual(this.props, nextProps);
    const diffState = !_isEqual(this.state, nextState);
    return diffProps || diffState;
  }

  parseStyle = async (uploadObject: UploadRequestOption<any>): Promise<Style|undefined> => {
    const {
      activeParser
    } = this.state;
    if (!activeParser) {
      return undefined;
    }
    const file = uploadObject.file as File;
    let fileContent;
    try {
      fileContent = await this.readFile(file);
    } catch (error) {
      uploadObject.onError(error);
      return error;
    }

    try {
      const style = await activeParser.readStyle(fileContent);
      this.props.onStyleRead(style);
      return style;
    } catch (error) {
      uploadObject.onError(error);
      return error;
    }
  };

  readFile = async (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const fileContent = reader.result;
        resolve(fileContent);
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  getParserOptions = () => {
    return this.props.parsers.map((parser: any) => {
      return <Option key={parser.title} value={parser.title}>{parser.title}</Option>;
    });
  };

  onSelect = (selection: string) => {
    const activeParser = this.props.parsers.find(parser => parser.title === selection);
    if (activeParser) {
      this.setState({activeParser});
    }
  };

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
              customRequest={this.parseStyle}
            /> : null
        }
      </div>
    );
  }
}

export default localize(StyleLoader, StyleLoader.componentName);
