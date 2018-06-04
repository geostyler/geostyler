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

// default props
interface ColorFieldDefaultProps {
  color: string;
  closeText: string;
  editText: string;
  label: string;
}

// non default props
interface ColorFieldProps extends Partial<ColorFieldDefaultProps> {
  onChange: ((color: string) => void);
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
    color: '#AA1337',
    closeText: 'Close',
    editText: 'Change',
    label: 'Color'
  };

  constructor(props: any) {
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
      closeText,
      editText,
      label
    } = this.props;
    let textColor;

    try {
      textColor = Color(color).negate().grayscale().string();
    } catch (error) {
      textColor = '#000000';
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
            {colorPickerVisible ? closeText : editText}
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

export default ColorField;
