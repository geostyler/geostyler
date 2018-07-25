import * as React from 'react';
import * as Color from 'color';
import {
  SketchPicker,
  ColorResult
} from 'react-color';

import {
  Button
} from 'antd';

import './ColorField.css';

import { localize } from '../../../LocaleWrapper/LocaleWrapper';

// i18n
interface ColorFieldLocale {
  closeText: string;
  editText: string;
  chooseText: string;
}

// default props
interface ColorFieldDefaultProps {
  label: string;
  locale?: ColorFieldLocale;
}

// non default props
interface ColorFieldProps extends Partial<ColorFieldDefaultProps> {
  onChange: ((color: string) => void);
  color?: string;
}

// state
interface ColorFieldState {
  colorPickerVisible: boolean;
}

/**
 * ColorField
 */
class ColorField extends React.Component<ColorFieldProps, ColorFieldState> {

  public static defaultProps: ColorFieldDefaultProps = {
    label: 'Color'
  };

  constructor(props: ColorFieldProps) {
    super(props);
    this.state = {
      colorPickerVisible: false
    };
  }

  onColorPreviewClick = () => {
    this.setState({
      colorPickerVisible: !this.state.colorPickerVisible
    });
  }

  render() {
    const {
      colorPickerVisible = false
    } = this.state;
    const {
      color,
      label,
      locale
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
        <span className="label">{`${label}:`}</span>
        <div className="color-preview-wrapper">
          <Button
            className="color-preview"
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
              onChangeComplete={(colorResult: ColorResult) => {
                this.props.onChange(colorResult.hex);
              }}
            /> : null
          }
          </div>
      </div>
    );
  }
}

export default localize(ColorField);
