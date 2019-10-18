import * as React from 'react';

import { Select } from 'antd';

import en_US from '../../../locale/en_US';
import { localize } from '../../LocaleWrapper/LocaleWrapper';
import { InterpolationMode } from 'chroma-js';

const _isEqual = require('lodash/isEqual');

// i18n
export interface ColorSpaceComboLocale {
  colorSpacePlaceholder: string;
}

// default props
export interface ColorSpaceComboDefaultProps {
  /** Locale object containing translated text snippets */
  locale: ColorSpaceComboLocale;
  /** List of color supported color spaces */
  colorSpaces: (InterpolationMode)[];
}

// non default props
export interface ColorSpaceComboProps extends Partial<ColorSpaceComboDefaultProps> {
  /** The callback method that is triggered when the state changes */
  onChange?: (colorSpace: InterpolationMode) => void;
  /** The selected color space */
  colorSpace?: InterpolationMode;
}

/**
 * Symbolizer editorwindow UI.
 */
export class ColorSpaceCombo extends React.Component<ColorSpaceComboProps> {

  public static defaultProps: ColorSpaceComboDefaultProps = {
    locale: en_US.GsColorSpaceCombo,
    colorSpaces: ['hsl', 'hsv', 'hsi', 'lab', 'lch', 'hcl', 'rgb']
  };

  public shouldComponentUpdate(nextProps: ColorSpaceComboProps): boolean {
    return !_isEqual(this.props, nextProps);
  }

  static componentName: string = 'ColorSpaceCombo';

  getColorSpaceOptions = () => {
    const {
      colorSpaces
    } = this.props;

    return colorSpaces.map((colorSpace: InterpolationMode) => {
      return (
        <Select.Option
          className="color-space-option"
          key={colorSpace}
          value={colorSpace}
        >
          {colorSpace.toUpperCase()}
        </Select.Option>
      );
    });
  }

  render() {
    const {
      colorSpace,
      onChange,
      locale
    } = this.props;

    return (
      <Select
        className="color-space-select"
        placeholder={locale.colorSpacePlaceholder}
        optionFilterProp="children"
        value={colorSpace}
        onChange={onChange}
      >
        {this.getColorSpaceOptions()}
      </Select>
    );
  }
}

export default localize(ColorSpaceCombo, ColorSpaceCombo.componentName);
