/* Released under the BSD 2-Clause License
 *
 * Copyright (c) 2018-present, terrestris GmbH & Co. KG
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

import './ColorRampCombo.less';

import { brewer } from 'chroma-js';

import { Select } from 'antd';

import en_US from '../../../locale/en_US';
import { localize } from '../../LocaleWrapper/LocaleWrapper';

import RuleGeneratorUtil from '../../../Util/RuleGeneratorUtil';

const _isEqual = require('lodash/isEqual');

// i18n
export interface ColorRampComboLocale {
  colorRampPlaceholder: string;
}

// default props
export interface ColorRampComboDefaultProps {
  /** Locale object containing translated text snippets */
  locale: ColorRampComboLocale;
  /** Object containing predefined color ramps */
  colorRamps: {
    [name: string]: string[]
  };
}

// non default props
export interface ColorRampComboProps extends Partial<ColorRampComboDefaultProps> {
  /** The callback method that is triggered when the state changes */
  onChange?: (colorRamp: string) => void;
  /** The selected color ramp */
  colorRamp?: string;
}

/**
 * Symbolizer editorwindow UI.
 */
export class ColorRampCombo extends React.Component<ColorRampComboProps> {

  public static defaultProps: ColorRampComboDefaultProps = {
    locale: en_US.GsColorRampCombo,
    colorRamps: {
      GeoStyler: ['#E7000E', '#F48E00', '#FFED00', '#00943D', '#272C82', '#611E82'],
      GreenRed: ['#00FF00', '#FF0000'],
      ...brewer
    }
  };

  public shouldComponentUpdate(nextProps: ColorRampComboProps): boolean {
    return !_isEqual(this.props, nextProps);
  }

  static componentName: string = 'ColorRampCombo';

  getColorRampOptions = () => {
    const {
      colorRamps
    } = this.props;

    return Object.keys(colorRamps).map((name: string) => {
      const colors = colorRamps[name];
      const style = RuleGeneratorUtil.generateBackgroundStyleFromColors(colors);
      return (
        <Select.Option
          className="gs-color-ramp-option"
          key={name}
          value={name}
          style={style}
        >
          {name}
        </Select.Option>
      );
    });
  }

  render() {
    const {
      colorRamp,
      colorRamps,
      onChange,
      locale
    } = this.props;

    let colorRampStyle;
    if (colorRamp) {
      const colors = colorRamps[colorRamp];
      colorRampStyle = RuleGeneratorUtil.generateBackgroundStyleFromColors(colors);
    }

    return (
      <Select
        className="gs-color-ramp-select"
        style={colorRampStyle}
        placeholder={locale.colorRampPlaceholder}
        optionFilterProp="children"
        value={colorRamp}
        onChange={onChange}
      >
        {this.getColorRampOptions()}
      </Select>
    );
  }
}

export default localize(ColorRampCombo, ColorRampCombo.componentName);
