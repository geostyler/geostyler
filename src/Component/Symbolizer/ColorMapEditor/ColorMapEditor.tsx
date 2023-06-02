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

import React, { useState } from 'react';
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

import _cloneDeep from 'lodash/cloneDeep';
import type GeoStylerLocale from '../../../locale/locale';
import { InputConfig, useGeoStylerComposition } from '../../../context/GeoStylerContext/GeoStylerContext';

export interface ColorMapEntryRecord extends ColorMapEntry {
  key: number;
}

export interface ColorMapEditorComposableProps {
  // TODO add support for default values in ColorMapTypeField
  colorMapTypeField?: {
    visibility?: boolean;
  };
  nrOfClassesField?: InputConfig<number>;
  // TODO add support for default values in ColorRampCombo
  colorRampComboField?: {
    visibility?: boolean;
  };
  // TODO add support for default values in ExtendedField
  extendedField?: {
    visibility?: boolean;
  };
  // TODO add support for default values in ColorMapTable
  colorMapTable?: {
    visibility?: boolean;
  };
}

// non default props
export interface ColorMapEditorProps {
  locale?: GeoStylerLocale['ColorMapEditor'];
  colorRamps?: {
    [name: string]: string[];
  };
  colorMap?: ColorMap;
  onChange?: (colorMap: ColorMap) => void;
}

const COMPONENTNAME = 'ColorMapEditor';

export const ColorMapEditor: React.FC<ColorMapEditorProps & ColorMapEditorComposableProps> = (props) => {

  const composition = useGeoStylerComposition('ColorMapEditor');
  const composed = {...props, ...composition};
  const {
    colorMap,
    colorMapTable,
    colorMapTypeField,
    colorRampComboField,
    colorRamps = {
      GeoStyler: ['#E7000E', '#F48E00', '#FFED00', '#00943D', '#272C82', '#611E82'],
      GreenRed: ['#00FF00', '#FF0000'],
      ...brewer
    },
    extendedField,
    locale = en_US.ColorMapEditor,
    nrOfClassesField,
    onChange
  } = composed;

  // TODO add colorRamp to CompositionContext
  const [colorRamp, setColorRamp] = useState<string>(Object.keys(colorRamps)[0]);

  const updateColorMap = (prop: string, value: any) => {
    let newColorMap: ColorMap;
    if (colorMap) {
      newColorMap = _cloneDeep(colorMap);
    } else {
      newColorMap = {
        type: 'ramp'
      };
    }
    newColorMap[prop as keyof ColorMap] = value;
    if (onChange) {
      onChange(newColorMap);
    }
  };

  const onExtendedChange = (extended: boolean) => {
    updateColorMap('extended', extended);
  };

  const onTypeChange = (type: ColorMapType) => {
    updateColorMap('type', type);
  };

  /**
   * Creates the number of default ColorMapEntries according to specified
   * number of classes. Table will be updated accordingly.
   *
   */
  const onNrOfClassesChange = (value: number) => {
    const cmEntries = colorMap?.colorMapEntries;
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
    applyColors(colorRamp, newCmEntries);
    updateColorMap('colorMapEntries', newCmEntries);
  };

  const onColorRampChange = (newColorRamp: string) => {
    const cmEntries = colorMap?.colorMapEntries;
    const newCmEntries = applyColors(newColorRamp, _cloneDeep(cmEntries));
    updateColorMap('colorMapEntries', newCmEntries);
    setColorRamp(newColorRamp);
  };

  /**
   * Applies the colors of the selected colorRamp to the colorMapEntries.
   * Important: This method modifies the array of colorMapEntries 'cmEntries'.
   *
   * @return {ColorMapEntry[]} cmEntries, the modified array of colorMapEntries.
   */
  const applyColors = (newColorRamp: string, cmEntries: ColorMapEntry[] = []): ColorMapEntry[] => {
    const ramp = colorRamps[newColorRamp] ?
      colorRamps[newColorRamp] : colorRamps[Object.keys(colorRamps)[0]];
    const colors = RuleGeneratorUtil.generateColors(ramp, cmEntries.length);
    cmEntries.forEach((entry: ColorMapEntry, idx: number) => {
      entry.color = colors[idx];
    });
    return cmEntries;
  };

  /**
   * Updates property 'key' with 'value' of colorMapEntry at position 'index'.
   * Creates a new colorMapEntry if it did not exist yet.
   */
  const setValueForColorMapEntry = (idx: number, key: string, value: any) => {
    const cmEntries = colorMap?.colorMapEntries;
    let newCmEntries: ColorMapEntry[];
    if (cmEntries) {
      newCmEntries = _cloneDeep(cmEntries);
      newCmEntries[idx][key as keyof ColorMapEntry] = value;
    } else {
      newCmEntries = [{}] as ColorMapEntry[];
      newCmEntries[0][key as keyof ColorMapEntry] = value;
    }
    updateColorMap('colorMapEntries', newCmEntries);
  };

  const colorMapRecords = colorMap?.colorMapEntries?.map((entry: ColorMapEntry, index: number): ColorMapEntryRecord => {
    return {
      key: index,
      ...entry
    };
  });

  /**
   * Renderer method for the label column.
   */
  const labelRenderer = (text: string, record: ColorMapEntryRecord) => {
    const input = (
      <Input
        className="gs-colormap-label-input"
        value={record.label as string}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const target = event.target;
          setValueForColorMapEntry(record.key, 'label', target.value);
        }}
      />);
    return (
      <Popover
        content={record.label as string}
        title={locale.labelLabel}
      >
        {input}
      </Popover>
    );
  };

  /**
   * Renderer method for the color column.
   */
  const colorRenderer = (text: string, record: ColorMapEntryRecord) => {
    const input = (
      <ColorField
        value={record.color as string}
        onChange={(color: string) => {
          setValueForColorMapEntry(record.key, 'color', color);
        }}
      />
    );
    return input;
  };

  /**
   * Renderer method for the quantity column.
   */
  const quantityRenderer = (text: string, record: ColorMapEntryRecord) => {
    const input = (
      <OffsetField
        className="gs-colormap-quantity-input"
        offset={record.quantity}
        onChange={value => {
          setValueForColorMapEntry(record.key, 'quantity', value);
        }}
      />
    );
    return input;
  };

  /**
   * Renderer method for the opacity column.
   */
  const opacityRenderer = (text: string, record: ColorMapEntryRecord) => {
    const input = (
      <OpacityField
        className="gs-colormap-opacity-input"
        value={record.opacity}
        onChange={opacity => {
          setValueForColorMapEntry(record.key, 'opacity', opacity);
        }}
      />
    );
    return input;
  };

  const columns: any = [{
    title: locale.colorLabel,
    dataIndex: 'color',
    render: colorRenderer
  }, {
    title: locale.quantityLabel,
    dataIndex: 'quantity',
    render: quantityRenderer
  }, {
    title: locale.labelLabel,
    dataIndex: 'label',
    render: labelRenderer
  }, {
    title: locale.opacityLabel,
    dataIndex: 'opacity',
    render: opacityRenderer
  }];

  // make sure colorMapEntries does exist
  let colorMapEntries: ColorMapEntry[] = colorMap?.colorMapEntries;
  if (!colorMapEntries) {
    colorMapEntries = [];
  }
  const nrOfClasses = colorMapEntries.length;

  return (
    <div className="gs-colormap-symbolizer-editor" >
      <div className="gs-colormap-header-row">
        <Form.Item
        >
          <span>{locale.titleLabel}</span>
        </Form.Item>
        {
          colorMapTypeField?.visibility === false ? null : (
            <Form.Item
              label={locale.typeLabel}
            >
              <ColorMapTypeField
                colorMapType={colorMap?.type}
                onChange={onTypeChange}
              />
            </Form.Item>
          )
        }
        {
          nrOfClassesField?.visibility === false ? null : (
            <Form.Item
              label={locale.nrOfClassesLabel}
            >
              <InputNumber
                className="number-of-classes-field"
                min={0}
                max={255}
                value={nrOfClasses}
                onChange={onNrOfClassesChange}
                defaultValue={nrOfClassesField?.default}
              />
            </Form.Item>
          )
        }
        {
          colorRampComboField?.visibility === false ? null : (
            <Form.Item
              label={locale.colorRampLabel}
            >
              <ColorRampCombo
                onChange={onColorRampChange}
                colorRamp={colorRamp}
                colorRamps={colorRamps}
              />
            </Form.Item>
          )
        }
        {
          extendedField?.visibility === false ? null : (
            <Form.Item
              label={locale.extendedLabel}
            >
              <ExtendedField
                extended={colorMap?.extended as boolean}
                onChange={onExtendedChange}
              />
            </Form.Item>
          )
        }
      </div>
      {
        colorMapTable?.visibility === false ? null : (
          <Table
            className="gs-colormap-table"
            columns={columns}
            dataSource={colorMapRecords}
            pagination={{
              position: ['bottomCenter']
            }}
            size="small"
          />
        )
      }
    </div>
  );
};

export default localize(ColorMapEditor, COMPONENTNAME);
