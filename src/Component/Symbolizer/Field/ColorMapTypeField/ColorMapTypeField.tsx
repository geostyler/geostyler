import * as React from 'react';

import {
  Radio
} from 'antd';

import { ColorMapType } from 'geostyler-style';
import { localize } from '../../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../../locale/en_US';
import { RadioChangeEvent } from 'antd/lib/radio';

const _get = require('lodash/get');

// i18n
export interface ColorMapTypeFieldLocale {
  rampMapTypeLabel: string;
  intervalsMapTypeLabel: string;
  valuesMapTypeLabel: string;
}

// default props
interface ColorMapTypeFieldDefaultProps {
  colorMapTypeOptions: ColorMapType[];
  locale: ColorMapTypeFieldLocale;
}

// non default props
export interface ColorMapTypeFieldProps extends Partial<ColorMapTypeFieldDefaultProps> {
  onChange?: (colorMapType: ColorMapType) => void;
  colorMapType?: ColorMapType;
}

/**
 * ColorMapTypeField to select between different colormap options
 */
export class ColorMapTypeField extends React.Component<ColorMapTypeFieldProps> {

  static componentName: string = 'ColorMapTypeField';

  public static defaultProps: ColorMapTypeFieldDefaultProps = {
    colorMapTypeOptions: ['ramp', 'intervals', 'values'],
    locale: en_US.GsColorMapTypeField
  };

  getColorMapTypeOptions = () => {
    const {
      colorMapTypeOptions,
      locale
    } = this.props;

    return colorMapTypeOptions.map((mapType: ColorMapType) => {
      return (
        <Radio.Button
          key={mapType}
          value={mapType}
        >{_get(locale, `${mapType}MapTypeLabel`)}</Radio.Button>
      );
    });
  }

  onColorMapTypeChange = (event: RadioChangeEvent) => {
    const {
      onChange
    } = this.props;

    const mapType = event.target.value;
    if (onChange) {
      onChange(mapType);
    }
  }

  render() {
    const {
      colorMapType,
      colorMapTypeOptions
    } = this.props;

    const mapType = colorMapType ? colorMapType : colorMapTypeOptions[0];
    return (
      <Radio.Group
        defaultValue={mapType}
        buttonStyle="solid"
        onChange={this.onColorMapTypeChange}
        size="small"
      >
        {this.getColorMapTypeOptions()}
      </Radio.Group>
    );
  }
}

export default localize(ColorMapTypeField, ColorMapTypeField.componentName);
