import * as React from 'react';

import { ColorSpaces } from 'chroma-js';

import { Select } from 'antd';

import en_US from '../../../locale/en_US';
import { localize } from '../../LocaleWrapper/LocaleWrapper';

const _isEqual = require('lodash/isEqual');

// i18n
export interface ColorSpaceComboLocale {
  colorSpacePlaceholder: string;
}

// default props
export interface ColorSpaceComboDefaultProps {
  locale: ColorSpaceComboLocale;
  colorSpaces: (keyof ColorSpaces)[];
}

// non default props
export interface ColorSpaceComboProps extends ColorSpaceComboDefaultProps {
  onChange?: (colorSpace: keyof ColorSpaces) => void;
  colorSpace?: keyof ColorSpaces;
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

    return colorSpaces.map((colorSpace: keyof ColorSpaces) => {
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
