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

import React from 'react';

import {
  Radio
} from 'antd';

import { ColorMapType } from 'geostyler-style';
import { RadioChangeEvent } from 'antd/lib/radio';

import _get from 'lodash-es/get.js';
import { useGeoStylerLocale } from '../../../../context/GeoStylerContext/GeoStylerContext';

export interface ColorMapTypeFieldProps {
  colorMapTypeOptions?: ColorMapType[];
  onChange?: (colorMapType: ColorMapType) => void;
  value?: ColorMapType;
}

/**
 * ColorMapTypeField to select between different colormap options
 */
export const ColorMapTypeField: React.FC<ColorMapTypeFieldProps> = ({
  colorMapTypeOptions = ['ramp', 'intervals', 'values'],
  onChange,
  value
}) => {

  const locale = useGeoStylerLocale('ColorMapTypeField');

  const options = colorMapTypeOptions.map((mT: ColorMapType) => (
    <Radio.Button
      key={mT}
      value={mT}
    >{_get(locale, `${mT}MapTypeLabel`)}</Radio.Button>
  ));

  const onColorMapTypeChange = (event: RadioChangeEvent) => {
    const newMapType = event.target.value;
    if (onChange) {
      onChange(newMapType);
    }
  };

  const mapType = value ? value : colorMapTypeOptions[0];
  return (
    <Radio.Group
      className="color-map-type-field"
      defaultValue={mapType}
      buttonStyle="solid"
      onChange={onColorMapTypeChange}
      size="small"
    >
      {options}
    </Radio.Group>
  );
};
