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

import { Select } from 'antd';

import { InterpolationMode } from 'chroma-js';

import _isEqual from 'lodash/isEqual';
import { useGeoStylerLocale } from '../../../context/GeoStylerContext/GeoStylerContext';

export interface ColorSpaceComboProps {
  /** List of color supported color spaces */
  colorSpaces?: (InterpolationMode)[];
  /** The callback method that is triggered when the state changes */
  onChange?: (colorSpace: InterpolationMode) => void;
  /** The selected color space */
  colorSpace?: InterpolationMode;
}

/**
 * Symbolizer editorwindow UI.
 */
export const ColorSpaceCombo: React.FC<ColorSpaceComboProps> = ({
  colorSpaces = ['hsl', 'hsv', 'hsi', 'lab', 'lch', 'hcl', 'rgb'],
  onChange,
  colorSpace
}) => {

  const locale = useGeoStylerLocale('ColorSpaceCombo');

  const colorSpaceOptions = colorSpaces.map((cSpace: InterpolationMode) => {
    return (
      <Select.Option
        className="color-space-option"
        key={cSpace}
        value={cSpace}
      >
        {cSpace.toUpperCase()}
      </Select.Option>
    );
  });


  return (
    <Select
      className="color-space-select"
      placeholder={locale.colorSpacePlaceholder}
      optionFilterProp="children"
      value={colorSpace}
      onChange={onChange}
    >
      {colorSpaceOptions}
    </Select>
  );
};
