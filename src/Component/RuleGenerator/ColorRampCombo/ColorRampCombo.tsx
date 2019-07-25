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
  locale: ColorRampComboLocale;
  colorRamps: {
    [name: string]: string[]
  };
}

// non default props
export interface ColorRampComboProps extends Partial<ColorRampComboDefaultProps> {
  onChange?: (colorRamp: string) => void;
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
