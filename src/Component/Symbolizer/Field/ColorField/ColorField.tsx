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
const Color = require('color');
// import * as Color from 'color';
import {
  SketchPicker,
  ColorResult
} from 'react-color';

import {
  Button
} from 'antd';

import './ColorField.less';

import { localize } from '../../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../../locale/en_US';

import _isEqual from 'lodash/isEqual';

// i18n
export interface ColorFieldLocale {
  closeText: string;
  editText: string;
  chooseText: string;
}

// default props
interface ColorFieldDefaultProps {
  locale: ColorFieldLocale;
}

// non default props
export interface ColorFieldProps extends Partial<ColorFieldDefaultProps> {
  onChange?: (color: string) => void;
  color?: string;
  defaultValue?: string;
}

// state
interface ColorFieldState {
  colorPickerVisible: boolean;
}

/**
 * ColorField
 */
export class ColorField extends React.Component<ColorFieldProps, ColorFieldState> {

  static componentName: string = 'ColorField';

  public static defaultProps: ColorFieldDefaultProps = {
    locale: en_US.GsColorField
  };

  constructor(props: ColorFieldProps) {
    super(props);
    this.state = {
      colorPickerVisible: false
    };
  }

  public shouldComponentUpdate(nextProps: ColorFieldProps, nextState: ColorFieldState): boolean {
    const diffProps = !_isEqual(this.props, nextProps);
    const diffState = !_isEqual(this.state, nextState);
    return diffProps || diffState;
  }

  onColorPreviewClick = () => {
    this.setState({
      colorPickerVisible: !this.state.colorPickerVisible
    });
  };

  onChangeComplete = (colorResult: ColorResult) => {
    const {
      onChange
    } = this.props;
    if (onChange) {
      onChange(colorResult.hex);
    }
  };

  render() {
    const {
      colorPickerVisible = false
    } = this.state;
    const {
      color,
      locale,
      defaultValue
    } = this.props;
    let textColor;

    if (!color && !defaultValue) {
      textColor = '#000000';
    } else {
      try {
        textColor = Color(color || defaultValue).negate().grayscale().string();
      } catch (error) {
        textColor = '#000000';
      }
    }

    return (
      <div className="editor-field color-field">
        <div className="color-preview-wrapper">
          <Button
            className="color-preview editor-field"
            style={{
              backgroundColor: color || defaultValue,
              color: textColor
            }}
            onClick={this.onColorPreviewClick}
          >
            {colorPickerVisible ? locale.closeText : color ? locale.editText : locale.chooseText}
          </Button>
          {
            colorPickerVisible ?
              <SketchPicker
                color={color}
                disableAlpha={true}
                onChangeComplete={this.onChangeComplete}
              /> : null
          }
        </div>
      </div>
    );
  }
}

export default localize(ColorField, ColorField.componentName);
