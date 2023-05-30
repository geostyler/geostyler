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

import React, {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';

import Editor, { useMonaco } from '@monaco-editor/react';

import 'blob';
import {
  saveAs
} from 'file-saver';

import './CodeEditor.less';

import {
  Button,
  message,
  Select
} from 'antd';
const Option = Select.Option;

import {
  ReadStyleResult,
  Style as GsStyle,
  StyleParser,
  WriteStyleResult
} from 'geostyler-style';

import schema from 'geostyler-style/schema.json';

import _isEqual from 'lodash/isEqual';

import { localize } from '../LocaleWrapper/LocaleWrapper';
import en_US from '../../locale/en_US';
import SldStyleParser from 'geostyler-sld-parser';
import { SLDUnitsSelect } from '../Symbolizer/SLDUnitsSelect/SLDUnitsSelect';
import { usePrevious } from '../../hook/UsePrevious';
import ParserFeedback from '../ParserFeedback/ParserFeedback';
import { ExclamationCircleTwoTone, WarningTwoTone } from '@ant-design/icons';
import type GeoStylerLocale from '../../locale/locale';
import QGISStyleParser from 'geostyler-qgis-parser';
import MapboxStyleParser from 'geostyler-mapbox-parser';

// non default props
export interface CodeEditorProps {
  /** Locale object containing translated text snippets */
  locale?: GeoStylerLocale['CodeEditor'];
  /** Delay in ms until onStyleChange will be called */
  delay?: number;
  /** Show save button */
  showSaveButton?: boolean;
  /** show copy button */
  showCopyButton?: boolean;
  /** GeoStyler Style Object to display */
  style?: GsStyle;
  /** List of StylerParsers to parse from/to */
  parsers?: StyleParser[];
  /** Default parser */
  defaultParser?: StyleParser;
  /** The callback method that is triggered when the state changes */
  onStyleChange?: (rule: GsStyle) => void;
}

type EditorLanguage = 'xml' | 'json' | 'plaintext';
type FileExtension = '.sld' | '.qml' | '.json' | '.txt' ;
type MimeType = 'application/json' | 'text/xml' | 'text/plain';

type FileFormat = {
  language: EditorLanguage,
  extension: FileExtension,
  mimeType: MimeType
}

const MODELPATH = 'geostyler.json'; // associate with our model
const SCHEMAURI = schema.$id;

export const COMPONENTNAME = 'CodeEditor';

const getFileFormat = (parser: StyleParser): FileFormat => {
  let fileFormat :FileFormat = {
    extension: '.txt',
    language: 'plaintext',
    mimeType: 'text/plain',
  }

  if (parser instanceof SldStyleParser){
    fileFormat = {
      extension: '.sld',
      language: 'xml',
      mimeType: 'text/xml',
    }
  } else if (parser instanceof QGISStyleParser){
    fileFormat = {
      extension: '.qml',
      language: 'xml',
      mimeType: 'text/xml',
    }
  } else if (parser instanceof MapboxStyleParser){
    fileFormat = {
      extension: '.json',
      language: 'json',
      mimeType: 'application/json',
    }
  } else if (parser == undefined ) {
    // parser == undefined -> GeostylerStyle
    fileFormat = {
      extension: '.json',
      language: 'json',
      mimeType: 'application/json',
    }
  }

  return fileFormat;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  defaultParser,
  delay = 500,
  locale = en_US.CodeEditor,
  onStyleChange = () => undefined,
  parsers = [],
  showCopyButton = false,
  showSaveButton = false,
  style
}) => {

  const editTimeout = useRef<number>();
  const [activeParser, setActiveParser] = useState<StyleParser>(defaultParser);
  const [fileFormat, setFileFormat] = useState<FileFormat>(getFileFormat(defaultParser));
  const [value, setValue] = useState<string>('');
  const [writeStyleResult, setWriteStyleResult] = useState<WriteStyleResult>();
  const [readStyleResult, setReadStyleResult] = useState<ReadStyleResult>();
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const previousStyle = usePrevious(style);
  const previouseParser = usePrevious(activeParser);
  const monaco = useMonaco();

  useEffect(() => {
    if (writeStyleResult?.output) {
      setValue(writeStyleResult.output);
    }
  }, [writeStyleResult]);

  useEffect(() => {
    if (monaco) {
      monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
        validate: true,
        schemas: [{
          uri: SCHEMAURI,
          fileMatch: [MODELPATH],
          schema
        }]
      });
    }
  }, [monaco]);

  const updateValueFromStyle = useCallback((s: GsStyle) => {
    setHasError(false);
    setWriteStyleResult(undefined);
    (new Promise(async() => {
      if (activeParser) {
        setWriteStyleResult(await activeParser.writeStyle(s));
      } else {
        setValue(JSON.stringify(s, null, 2));
      }
    })).catch((err) => {
      setWriteStyleResult({
        errors: [err.message]
      });
    });
  }, [activeParser]);

  useEffect(() => {
    if (!_isEqual(previousStyle, style) || !_isEqual(previouseParser, activeParser) ) {
      updateValueFromStyle(style);
    }
  }, [activeParser, style, updateValueFromStyle, previousStyle, previouseParser]);

  useEffect(() => {
    setFileFormat(getFileFormat(activeParser))
  }, [activeParser]);

  if (hasError) {
    return (<h1>An error occurred in the CodeEditor UI.</h1>);
  }

  const onChange = async(v: string) => {
    setValue(v);
    setReadStyleResult(undefined);
    try {
      let parsedStyle;
      if (activeParser) {
        const result = await activeParser.readStyle(v);
        setReadStyleResult(result);
        onStyleChange(result.output);
      } else {
        parsedStyle = JSON.parse(v);
        onStyleChange(parsedStyle);
      }
    } catch (err: any) {
      setReadStyleResult({
        errors: [err?.message]
      });
    }
  };

  const onParserSelect = (selection: string) => {
    const parser = parsers.find((p: any) => p.title === selection);
    setActiveParser(parser);
  };

  const onUnitSelect = (selection: string) => {
    if (activeParser) {
      const parser = activeParser as SldStyleParser;
      parser.symbolizerUnits = selection;
      updateValueFromStyle(style);
    }
  };

  const handleOnChange = (v?: string) => {
    clearTimeout(editTimeout.current);
    editTimeout.current = window.setTimeout(
      () => {
        onChange(v);
      },
      delay
    );
  };

  let parserOptions = [
    <Option key="GeoStyler Style" value="GeoStyler Style" >Geostyler Style</Option>
  ];
  const additionalOptions = parsers.map((parser: any) => {
    const title = parser.title;
    return <Option key={title} value={title}>{title}</Option>;
  });
  parserOptions = [...parserOptions, ...additionalOptions];

  const onDownloadButtonClick = () => {
    if (style) {
      let fileName = style.name;
      fileName += fileFormat.extension;

      const type = `${fileFormat.mimeType};charset=utf-8`
      const blob = new Blob([value], {type});
      saveAs(blob, fileName);
    }
  };

  /**
   * Copies the a value to the clipboard.
   * Credits: https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
   *
   * @param {string} str The string to copy to the clipboard.
   */
  const copyToClipboard = (str: string) => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    message.info(locale.styleCopied);
    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }
  };

  const onCopyButtonClick = () => {
    copyToClipboard(value);
  };

  const toggleFeedback = () => {
    setShowFeedback(!showFeedback);
  };

  const parserHasUnitSelect = activeParser && activeParser instanceof SldStyleParser && (activeParser as SldStyleParser).sldVersion !== '1.0.0';

  const writeStyleHasFeedback = writeStyleResult?.errors ||
    writeStyleResult?.warnings ||
    writeStyleResult?.unsupportedProperties;
  const readStyleHasFeedback = readStyleResult?.errors ||
    readStyleResult?.warnings ||
    readStyleResult?.unsupportedProperties;
  const hasAlerts = writeStyleResult?.errors || readStyleResult?.errors;
  const hasWarnings = readStyleHasFeedback || writeStyleHasFeedback && (!hasAlerts);

  const alertExtraClass = showFeedback ? 'feedback-visible' : 'feedback-hidden';

  return (
    <div className="gs-code-editor">
      <div className="gs-code-editor-toolbar" >
        {locale.formatSelectLabel}: <Select
          className="gs-code-editor-format-select"
          onSelect={onParserSelect}
          value={activeParser ? activeParser.title : 'GeoStyler Style'}
        >
          {parserOptions}
        </Select>
        {
          parserHasUnitSelect &&
            <SLDUnitsSelect changeHandler={onUnitSelect} />
        }
      </div>
      <Editor
        className="gs-code-editor-monaco"
        value={value}
        path={activeParser instanceof SldStyleParser ? undefined : MODELPATH}
        language={fileFormat.language}
        onChange={handleOnChange}
      />
      <div className={`gs-code-editor-feedback ${alertExtraClass}`}>
        {
          (writeStyleHasFeedback) &&
          <div className='write-feedback'>
            <span>{`${locale.writeFeedback} ${activeParser?.title}`}</span>
            <ParserFeedback feedback={writeStyleResult} />
          </div>
        }
        {
          (readStyleHasFeedback) &&
            <div className='read-feedback'>
              <span>{`${locale.readFeedback} ${activeParser?.title}`}</span>
              <ParserFeedback feedback={readStyleResult} />
            </div>
        }
      </div>
      <div className="gs-code-editor-bottombar">
        <div className='left-items'>
          { hasAlerts && <WarningTwoTone twoToneColor="#ff4d4f" onClick={toggleFeedback} /> }
          { hasWarnings && <ExclamationCircleTwoTone twoToneColor="#faad14" onClick={toggleFeedback} /> }
        </div>
        <div className='center-items'>
          {
            showCopyButton &&
            <Button
              className="gs-code-editor-copy-button"
              type="primary"
              onClick={onCopyButtonClick}
            >
              {locale.copyButtonLabel}
            </Button>
          }
          {
            showSaveButton &&
            <Button
              className="gs-code-editor-download-button"
              type="primary"
              onClick={onDownloadButtonClick}
            >
              {locale.downloadButtonLabel}
            </Button>
          }
        </div>
        <div className='right-items'>
        </div>
      </div>
    </div>
  );
};

export default localize(CodeEditor, COMPONENTNAME);
