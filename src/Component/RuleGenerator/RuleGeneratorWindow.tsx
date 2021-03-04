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
import * as ReactDOM from 'react-dom';
import { brewer, InterpolationMode } from 'chroma-js';

import { Rnd } from 'react-rnd';

import {
  Rule
} from 'geostyler-style';

import { Data } from 'geostyler-data';

import './RuleGeneratorWindow.less';
import { Button } from 'antd';

import { CloseOutlined } from '@ant-design/icons';

import { localize } from '../LocaleWrapper/LocaleWrapper';
import en_US from '../../locale/en_US';
import RuleGenerator from './RuleGenerator';

import _isEqual from 'lodash/isEqual';
import _isFinite from 'lodash/isFinite';
// i18n
export interface RuleGeneratorWindowLocale {
  ruleGenerator: string;
}

// default props
export interface RuleGeneratorWindowDefaultProps {
  locale: RuleGeneratorWindowLocale;
}

// non default props
export interface RuleGeneratorWindowProps extends Partial<RuleGeneratorWindowDefaultProps> {
  internalDataDef: Data;
  x?: number;
  y?: number;
  onClose?: () => void;
  onRulesChange?: (rules: Rule[]) => void;
  colorRamps?: {
    [name: string]: string[];
  };
  useBrewerColorRamps?: boolean;
  colorSpaces?: (InterpolationMode)[];
}

/**
 * Symbolizer editorwindow UI.
 */
export class RuleGeneratorWindow extends React.Component<RuleGeneratorWindowProps> {

  static componentName: string = 'RuleGeneratorWindow';

  public static defaultProps: RuleGeneratorWindowDefaultProps = {
    locale: en_US.GsRuleGeneratorWindow
  };

  public shouldComponentUpdate(nextProps: RuleGeneratorWindowProps): boolean {
    return !_isEqual(this.props, nextProps);
  }

  render() {
    const {
      x,
      y,
      onClose,
      onRulesChange,
      locale,
      internalDataDef,
      colorRamps,
      colorSpaces,
      useBrewerColorRamps
    } = this.props;

    let ramps = colorRamps;
    if (colorRamps && useBrewerColorRamps) {
      ramps = Object.assign(colorRamps, brewer);
    }

    return (
      ReactDOM.createPortal(
        <Rnd
          className="rule-generator-window"
          default={{
            x: _isFinite(x) ? x : window.innerWidth / 2,
            y: _isFinite(y) ? y : window.innerHeight / 2,
            width: undefined,
            height: undefined
          }}
          enableResizing={{
            bottom: false,
            bottomLeft: false,
            bottomRight: false,
            left: false,
            right: false,
            top: false,
            topLeft: false,
            topRight: false
          }}
          bounds="window"
          dragHandleClassName="rule-generator-window-header"
        >
          <div className="header rule-generator-window-header">
            <span className="title">
              {locale.ruleGenerator}
            </span>
            <Button
              icon={<CloseOutlined />}
              size="small"
              onClick={onClose}
            />
          </div>
          <RuleGenerator
            internalDataDef={internalDataDef}
            onRulesChange={onRulesChange}
            colorRamps={ramps}
            colorSpaces={colorSpaces}
          />
        </Rnd>,
        document.body
      )
    );
  }
}

export default localize(RuleGeneratorWindow, RuleGeneratorWindow.componentName);
