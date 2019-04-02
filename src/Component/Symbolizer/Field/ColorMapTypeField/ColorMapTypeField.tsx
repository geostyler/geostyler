import * as React from 'react';

import {
  Select
} from 'antd';
import { ColorMapType } from 'geostyler-style';
const Option = Select.Option;

// default props
interface ColorMapTypeFieldDefaultProps {
  colorMapTypeOptions: ColorMapType[];
}

// non default props
export interface ColorMapTypeFieldProps extends Partial<ColorMapTypeFieldDefaultProps> {
  onChange?: (colorMapType: ColorMapType) => void;
  colorMapTye?: ColorMapType;
}

/**
 * ColorMapTypeField to select between different colormap options
 */
export class ColorMapTypeField extends React.Component<ColorMapTypeFieldProps> {

  public static defaultProps: ColorMapTypeFieldDefaultProps = {
    colorMapTypeOptions: ['ramp', 'intervals', 'values']
  };

  getColorMapTypeSelectOptions = () => {
    return this.props.colorMapTypeOptions.map(colorMapTypeOpt => {
        return (
            <Option
                key={colorMapTypeOpt}
                value={colorMapTypeOpt}
            >
            {colorMapTypeOpt}
            </Option>
        );
    });
  }

  render() {
    const {
      colorMapTye,
      onChange
    } = this.props;

    return (
      <Select
        className="editor-field colormaptype-field"
        allowClear={true}
        value={colorMapTye}
        onChange={onChange}
      >
        {this.getColorMapTypeSelectOptions()}
      </Select>
    );
  }
}

export default ColorMapTypeField;
