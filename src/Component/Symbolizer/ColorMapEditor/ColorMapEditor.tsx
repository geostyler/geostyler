/* Released under the BSD 2-Clause License
 *
 * Copyright © 2018-present, terrestris GmbH & Co. KG and GeoStyler contributors
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

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

import './ColorMapEditor.less';

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

  /**
   * Creates the number of default ColorMapEntries according to specified
   * number of classes. Table will be updated accordingly.
   *
   */
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

  /**
   * Applies the colors of the selected colorRamp to the colorMapEntries.
   * Important: This method modifies the array of colorMapEntries 'cmEntries'.
   *
   * @return {ColorMapEntry[]} cmEntries, the modified array of colorMapEntries.
   */
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

  /**
   * Updates property 'key' with 'value' of colorMapEntry at position 'index'.
   * Creates a new colorMapEntry if it did not exist yet.
   */
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

  /**
   * Renderer method for the label column.
   */
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

  /**
   * Renderer method for the color column.
   */
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

  /**
   * Renderer method for the quantity column.
   */
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

  /**
   * Renderer method for the opacity column.
   */
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

  /**
   * Creates the columns for the table.
   */
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

    // make sure colorMapEntries does exist
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
