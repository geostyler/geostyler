import * as React from 'react';
import {
  Form,
  Button,
  Table,
  Input,
  Popover
} from 'antd';

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';
import { ColorMap, ColorMapType, ColorMapEntry } from 'geostyler-style';
import ExtendedField from '../Field/ExtendedField/ExtendedField';
import ColorMapTypeField from '../Field/ColorMapTypeField/ColorMapTypeField';
// import ColorMapEntryField from '../Field/ColorMapEntryField/ColorMapEntryField';
import ColorField from '../Field/ColorField/ColorField';
import OffsetField from '../Field/OffsetField/OffsetField';
import OpacityField from '../Field/OpacityField/OpacityField';

import './ColorMapEditor.css';

const _get = require('lodash/get');
const _cloneDeep = require('lodash/cloneDeep');

// i18n
export interface ColorMapEditorLocale {
  typeLabel: string;
  extendedLabel: string;
  colorMapEntriesLabel: string;
}

export interface ColorMapEntryRecord extends ColorMapEntry {
  key: number;
}

interface ColorMapEditorDefaultProps {
  locale: ColorMapEditorLocale;
}

// non default props
export interface ColorMapEditorProps extends Partial<ColorMapEditorDefaultProps> {
  colorMap?: ColorMap;
  onChange?: (colorMap: ColorMap) => void;
}

export class ColorMapEditor extends React.Component<ColorMapEditorProps> {

  static componentName: string = 'ColorMapEditor';

  public static defaultProps: ColorMapEditorDefaultProps = {
    locale: en_US.GsColorMapEditor
  };

  updateColorMap = (prop: string, value: any) => {
    const {
      colorMap,
      onChange
    } = this.props;

    let newColorMap: ColorMap;
    if (colorMap) {
      newColorMap = _cloneDeep(colorMap);
    } else {
      newColorMap = {};
    }
    newColorMap[prop] = value;
    if (onChange) {
      onChange(newColorMap);
    }
  }

  onExtendedChange = (extended: boolean) => {
    this.updateColorMap('extended', extended);
  }

  onTypeChange = (type: ColorMapType) => {
    this.updateColorMap('type', type);
  }

  onColorMapEntryChange = (colorMapEntry: ColorMapEntry, idx: number) => {
    const colorMapEntries = _get(this.props, 'colorMap.colorMapEntries');
    let newColorMapEntries: ColorMapEntry[];
    if (colorMapEntries) {
      newColorMapEntries = _cloneDeep(colorMapEntries);
      newColorMapEntries[idx] = colorMapEntry;
    } else {
      newColorMapEntries = [colorMapEntry];
    }
    this.updateColorMap('colorMapEntries', newColorMapEntries);
  }

  onAddColorMapEntry = () => {
    const colorMapEntries = _get(this.props, 'colorMap.colorMapEntries');
    const colorMapEntry: ColorMapEntry = {color: ''};
    let newColorMapEntries: ColorMapEntry[];
    if (colorMapEntries) {
      newColorMapEntries = _cloneDeep(colorMapEntries);
      newColorMapEntries.push(colorMapEntry);
    } else {
      newColorMapEntries = [colorMapEntry];
    }
    this.updateColorMap('colorMapEntries', newColorMapEntries);
  }

  onRemoveColorMapEntry = (idx: number) => {
    const colorMapEntries = _get(this.props, 'colorMap.colorMapEntries');
    if (!colorMapEntries) {
      return;
    }
    const newColorMapEntries = _cloneDeep(colorMapEntries);
    newColorMapEntries.splice(idx, 1);
    this.updateColorMap('colorMapEntries', newColorMapEntries);
  }

  setValueForColorMapEntry = (idx: number, key: string, value: any) => {
    const cmEntries = _get(this.props, 'colorMap.colorMapEntries');

    let newCmEntries: ColorMapEntry[];
    if (cmEntries) {
      newCmEntries = _cloneDeep(newCmEntries);
      newCmEntries[idx][key] = value;
    } else {
      newCmEntries = [{}] as ColorMapEntry[];
      newCmEntries[0][key] = value;
    }
    this.updateColorMap('colorMapEntries', newCmEntries);
  }

  getColorMapRecords = () => {
    let cmEntries = _get(this.props, 'colorMap.colorMapEntries');
    if (!cmEntries) {
      return [];
    } else {
      return cmEntries.map((entry: ColorMapEntry, index: number): ColorMapEntryRecord => {
        return {
          key: index,
          ...entry
        };
      });
    }
  }

  labelRenderer = (text: string, record: ColorMapEntryRecord) => {
    const input = (
      <Input
        className="gs-colormap-label-input"
        value={record.label}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const target = event.target;
          this.setValueForColorMapEntry(record.key, 'label', target.value);
        }}
    />);
    return (
      <Popover
        content={record.label}
        // TODO replace title string with locale
        title="label"
      >
        {input}
      </Popover>
    );
  }

  colorRenderer = (text: string, record: ColorMapEntryRecord) => {
    const input = (
      <ColorField
        color={record.color}
        onChange={(color: string) => {
          this.setValueForColorMapEntry(record.key, 'color', color);
        }}
      />
    );
    return input;
  }

  quantityRenderer = (text: string, record: ColorMapEntryRecord) => {
    const input = (
      <OffsetField
        className="gs-colormap-quantity-input"
        offset={record.quantity}
        onChange={(value: number) => {
          this.setValueForColorMapEntry(record.key, 'quantity', value);
        }}
      />
    );
    return input;
  }

  opacityRenderer = (text: string, record: ColorMapEntryRecord) => {
    const input = (
      <OpacityField
        className="gs-colormap-opacity-input"
        opacity={record.opacity}
        onChange={(opacity: number) => {
          this.setValueForColorMapEntry(record.key, 'opacity', opacity);
        }}
      />
    );
    return input;
  }

  getColumns = () => {
    // const {
    //   locale
    // } = this.props;

    const columns: any = [{
      // TODO replace title string with locale vals
      title: 'label',
      dataIndex: 'label',
      render: this.labelRenderer
    }, {
      title: 'color',
      dataIndex: 'color',
      render: this.colorRenderer
    }, {
      title: 'quantity',
      dataIndex: 'quantity',
      render: this.quantityRenderer
    }, {
      title: 'opacity',
      dataIndex: 'opacity',
      render: this.opacityRenderer
    }];
    return columns;
  }

  render() {
    const {
      colorMap,
      locale
    } = this.props;

    // const formItemLayout = {
    //   labelCol: { span: 8 },
    //   wrapperCol: { span: 16 }
    // };

    let colorMapEntries: ColorMapEntry[] = _get(colorMap, 'colorMapEntries');
    if (!colorMapEntries) {
      // colorMapEntries = [{color: undefined}];
      colorMapEntries = [];
    }

    return (
      <div className="gs-colormap-symbolizer-editor" >
        <div className="gs-colormap-header-row">
          <Form.Item
            label={locale.typeLabel}
          >
            <ColorMapTypeField
              colorMapTye={_get(colorMap, 'type')}
              onChange={this.onTypeChange}
            />
          </Form.Item>
          <ExtendedField
            extended={_get(colorMap, 'extended')}
            extendedLabel={locale.extendedLabel}
            onChange={this.onExtendedChange}
          />
        </div>
        <Table
          className="gs-colormap-table"
          columns={this.getColumns()}
          dataSource={this.getColorMapRecords()}
          pagination={false}
        />
            {/* <Form.Item
              label={locale.typeLabel}
              {...formItemLayout}
            >
              <ColorMapTypeField
                colorMapTye={_get(colorMap, 'type')}
                onChange={this.onTypeChange}
              />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
            >
              <ExtendedField
                extended={_get(colorMap, 'extended')}
                extendedLabel={locale.extendedLabel}
                onChange={this.onExtendedChange}
              />
            </Form.Item> */}
            {/* {
              colorMapEntries.map((entry: ColorMapEntry, index: number) => {
                return (
                  <Form.Item
                  label={locale.colorMapEntriesLabel}
                  {...formItemLayout}
                  >
                    <ColorMapEntryField
                      key={index}
                      colorMapEntry={entry}
                      onChange={(cmEntry: ColorMapEntry) => {
                        this.onColorMapEntryChange(cmEntry, index);
                      }}
                    />
                    <Button
                      className="gs-remove-colormapentry-button"
                      icon="minus"
                      onClick={() => {
                        this.onRemoveColorMapEntry(index);
                      }}
                    />
                  </Form.Item>
                );
              })
            } */}
            <Button
              className="gs-add-colormapentry-button"
              icon="plus"
              onClick={this.onAddColorMapEntry}
            />
      </div>
    );
  }
}

export default localize(ColorMapEditor, ColorMapEditor.componentName);
