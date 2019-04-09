import * as React from 'react';
import {
  Form,
  Table,
  Input,
  Popover,
  InputNumber
} from 'antd';

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';
import { ColorMap, ColorMapType, ColorMapEntry } from 'geostyler-style';
import ExtendedField from '../Field/ExtendedField/ExtendedField';
import ColorMapTypeField from '../Field/ColorMapTypeField/ColorMapTypeField';
import ColorField from '../Field/ColorField/ColorField';
import OffsetField from '../Field/OffsetField/OffsetField';
import OpacityField from '../Field/OpacityField/OpacityField';
import RasterUtil from '../../../Util/RasterUtil';
import ColorRampCombo from '../../RuleGenerator/ColorRampCombo/ColorRampCombo';
import RuleGeneratorUtil from '../../../Util/RuleGeneratorUtil';
import { brewer } from 'chroma-js';

import './ColorMapEditor.css';

const _get = require('lodash/get');
const _cloneDeep = require('lodash/cloneDeep');

// i18n
export interface ColorMapEditorLocale {
  typeLabel: string;
  extendedLabel: string;
  colorMapEntriesLabel: string;
  titleLabel: string;
  nrOfClassesLabel: string;
  colorRampLabel: string;
  colorLabel: string;
  quantityLabel: string;
  labelLabel: string;
  opacityLabel: string;
}

export interface ColorMapEntryRecord extends ColorMapEntry {
  key: number;
}

interface ColorMapEditorDefaultProps {
  locale: ColorMapEditorLocale;
  colorRamps: {
    [name: string]: string[]
  };
}

// non default props
export interface ColorMapEditorProps extends Partial<ColorMapEditorDefaultProps> {
  colorMap?: ColorMap;
  onChange?: (colorMap: ColorMap) => void;
}

export interface ColorMapEditorState {
  colorRamp: string;
}

export class ColorMapEditor extends React.Component<ColorMapEditorProps, ColorMapEditorState> {

  static componentName: string = 'ColorMapEditor';

  public static defaultProps: ColorMapEditorDefaultProps = {
    locale: en_US.GsColorMapEditor,
    colorRamps: {
      GeoStyler: ['#E7000E', '#F48E00', '#FFED00', '#00943D', '#272C82', '#611E82'],
      GreenRed: ['#00FF00', '#FF0000'],
      ...brewer
    }
  };

  constructor(props: ColorMapEditorProps) {
    super(props);

    this.state = {
      colorRamp: Object.keys(props.colorRamps)[0]
    };
  }

  updateColorMap = (prop: string, value: any) => {
    const {
      colorMap,
      onChange
    } = this.props;

    let newColorMap: ColorMap;
    if (colorMap) {
      newColorMap = _cloneDeep(colorMap);
    } else {
      newColorMap = {
        type: 'ramp'
      };
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

  onNrOfClassesChange = (value: number) => {
    const {
      colorRamp
    } = this.state;

    const cmEntries = _get(this.props, 'colorMap.colorMapEntries');
    const newCmEntries: ColorMapEntry[] = cmEntries ? _cloneDeep(cmEntries) : [];

    if (value > newCmEntries.length) {
      while (newCmEntries.length < value) {
        newCmEntries.push(RasterUtil.generateColorMapEntry());
      }
    } else {
      while (newCmEntries.length > value) {
        newCmEntries.pop();
      }
    }
    this.applyColors(colorRamp, newCmEntries);
    this.updateColorMap('colorMapEntries', newCmEntries);
  }

  onColorRampChange = (colorRamp: string) => {
    const cmEntries = _get(this.props, 'colorMap.colorMapEntries');
    const newCmEntries = this.applyColors(colorRamp, _cloneDeep(cmEntries));
    this.updateColorMap('colorMapEntries', newCmEntries);

    this.setState({
      colorRamp
    });
  }

  applyColors = (colorRamp: string, cmEntries: ColorMapEntry[] = []): ColorMapEntry[] => {
    const {
      colorRamps
    } = this.props;
    const ramp = colorRamps[colorRamp] ?
      colorRamps[colorRamp] : colorRamps[Object.keys(colorRamps)[0]];
    const colors = RuleGeneratorUtil.generateColors(ramp, cmEntries.length);
    cmEntries.forEach((entry: ColorMapEntry, idx: number) => {
      entry.color = colors[idx];
    });
    return cmEntries;
  }

  setValueForColorMapEntry = (idx: number, key: string, value: any) => {
    const cmEntries = _get(this.props, 'colorMap.colorMapEntries');

    let newCmEntries: ColorMapEntry[];
    if (cmEntries) {
      newCmEntries = _cloneDeep(cmEntries);
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
    const {
      locale
    } = this.props;

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
        title={locale.labelLabel}
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
    const {
      locale
    } = this.props;

    const columns: any = [{
      title: locale.colorLabel,
      dataIndex: 'color',
      render: this.colorRenderer
    }, {
      title: locale.quantityLabel,
      dataIndex: 'quantity',
      render: this.quantityRenderer
    }, {
      title: locale.labelLabel,
      dataIndex: 'label',
      render: this.labelRenderer
    }, {
      title: locale.opacityLabel,
      dataIndex: 'opacity',
      render: this.opacityRenderer
    }];
    return columns;
  }

  render() {
    const {
      colorMap,
      colorRamps,
      locale
    } = this.props;

    const {
      colorRamp
    } = this.state;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };

    let colorMapEntries: ColorMapEntry[] = _get(colorMap, 'colorMapEntries');
    if (!colorMapEntries) {
      colorMapEntries = [];
    }
    const nrOfClasses = colorMapEntries.length;

    return (
      <div className="gs-colormap-symbolizer-editor" >
        <div className="gs-colormap-header-row">
          <Form.Item
            {...formItemLayout}
          >
            <span>{locale.titleLabel}</span>
          </Form.Item>
          <Form.Item
            label={locale.typeLabel}
            {...formItemLayout}
          >
            <ColorMapTypeField
              colorMapType={_get(colorMap, 'type')}
              onChange={this.onTypeChange}
            />
          </Form.Item>
          <Form.Item
            label={locale.nrOfClassesLabel}
            {...formItemLayout}
          >
            <InputNumber
              min={0}
              max={255}
              value={nrOfClasses}
              onChange={this.onNrOfClassesChange}
            />
          </Form.Item>
          <Form.Item
            label={locale.colorRampLabel}
            {...formItemLayout}
          >
            <ColorRampCombo
              onChange={this.onColorRampChange}
              colorRamp={colorRamp}
              colorRamps={colorRamps}
            />
          </Form.Item>
          <Form.Item
            label={locale.extendedLabel}
            {...formItemLayout}
          >
            <ExtendedField
              extended={_get(colorMap, 'extended')}
              onChange={this.onExtendedChange}
            />
          </Form.Item>
        </div>
        <Table
          className="gs-colormap-table"
          columns={this.getColumns()}
          dataSource={this.getColorMapRecords()}
          pagination={{
            position: 'bottom',
            defaultPageSize: 5
          }}
          size="small"
        />
      </div>
    );
  }
}

export default localize(ColorMapEditor, ColorMapEditor.componentName);
