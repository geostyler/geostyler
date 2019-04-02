import * as React from 'react';

import { ColorMapEntry } from 'geostyler-style';
import ColorField from '../ColorField/ColorField';
import OffsetField from '../OffsetField/OffsetField';
import { Input, Form } from 'antd';
import OpacityField from '../OpacityField/OpacityField';
import { localize } from '../../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../../locale/en_US';

const _get = require('lodash/get');

// i18n
export interface ColorMapEntryFieldLocale {
  colorLabel?: string;
  quantityLabel?: string;
  labelLabel?: string;
  opacityLabel?: string;
}

interface ColorMapEntryFieldDefaultProps {
  labelPlaceholder: string;
  locale: ColorMapEntryFieldLocale;
}

// non default props
export interface ColorMapEntryFieldProps extends Partial<ColorMapEntryFieldDefaultProps> {
  onChange?: (colorMapEntry: ColorMapEntry) => void;
  colorMapEntry?: ColorMapEntry;
}

/**
 * ColorMapEntry Field
 */
export class ColorMapEntryField extends React.PureComponent<ColorMapEntryFieldProps> {

  static componentName = 'ColorMapEntryField';

  public static defaultProps: ColorMapEntryFieldDefaultProps = {
    labelPlaceholder: 'Color Map Label',
    locale: en_US.GsColorMapEntryField
  };

  updateColorMapEntry = (prop: string, value: any) => {
    const {
      colorMapEntry,
      onChange
    } = this.props;
    let updated: ColorMapEntry = {...colorMapEntry};
    updated[prop] = value;
    if (onChange) {
      onChange(updated);
    }
  }

  onColorChange = (color: string) => {
    this.updateColorMapEntry('color', color);
  }

  onQuantityChange = (quantity: number) => {
    this.updateColorMapEntry('quantity', quantity);
  }

  onLabelChange = (label: string) => {
   this.updateColorMapEntry('label', label);
  }

  onOpacityChange = (opacity: number) => {
    this.updateColorMapEntry('opacity', opacity);
  }

  render() {
    const {
      colorMapEntry,
      labelPlaceholder,
      locale
    } = this.props;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };

    return (
      <div>
        <Form.Item
          label={locale.colorLabel}
          {...formItemLayout}
        >
          <ColorField
            color={_get(colorMapEntry, 'color')}
            onChange={this.onColorChange}
          />
        </Form.Item>
        <Form.Item
          label={locale.quantityLabel}
          {...formItemLayout}
        >
          <OffsetField
            offset={_get(colorMapEntry, 'quantity')}
            onChange={this.onQuantityChange}
          />
        </Form.Item>
        <Form.Item
          label={locale.labelLabel}
          {...formItemLayout}
        >
          <Input
            className="editor-field colormapentry-label-field"
            defaultValue={_get(colorMapEntry, 'label')}
            value={_get(colorMapEntry, 'label')}
            placeholder={labelPlaceholder}
            onChange={(evt: any) => {
              this.onLabelChange(evt.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          label={locale.opacityLabel}
          {...formItemLayout}
        >
          <OpacityField
            opacity={_get(colorMapEntry, 'opacity')}
            onChange={this.onOpacityChange}
          />
        </Form.Item>
      </div>
    );
  }
}

export default localize(ColorMapEntryField, ColorMapEntryField.componentName);
