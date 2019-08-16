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

const _isEqual = require('lodash/isEqual');

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
}

// state
interface ColorFieldState {
  colorPickerVisible: boolean;
}

/**
 * ColorField
 */
export class ColorField extends React.Component<ColorFieldProps, ColorFieldState> {

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

  static componentName: string = 'ColorField';

  onColorPreviewClick = () => {
    this.setState({
      colorPickerVisible: !this.state.colorPickerVisible
    });
  }

  onChangeComplete = (colorResult: ColorResult) => {
    const {
      onChange
    } = this.props;
    if (onChange) {
      onChange(colorResult.hex);
    }
  }

  render() {
    const {
      colorPickerVisible = false
    } = this.state;
    const {
      color,
      locale,
    } = this.props;
    let textColor;

    if (!color) {
      textColor = '#000000';
    } else {
      try {
        textColor = Color(color).negate().grayscale().string();
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
              backgroundColor: color,
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
