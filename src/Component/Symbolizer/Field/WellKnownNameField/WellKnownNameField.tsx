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
  Select
} from 'antd';
import { WellKnownName } from 'geostyler-style';

import { localize } from '../../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../../locale/en_US';

import _get from 'lodash/get';
import type GeoStylerLocale from '../../../../locale/locale';
const Option = Select.Option;

// default props
interface WellKnownNameFieldDefaultProps {
  wellKnownName: WellKnownName;
  wellKnownNames: WellKnownName[];
  locale: GeoStylerLocale['WellKnownNameField'];
}

// non default props
export interface WellKnownNameFieldProps extends Partial<WellKnownNameFieldDefaultProps> {
  onChange?: (wellKnownName: WellKnownName) => void;
}

/**
 * WellKnownNameField
 */
export const WellKnownNameField: React.FC<WellKnownNameFieldProps> = ({
  onChange,
  locale = en_US.WellKnownNameField,
  wellKnownName = 'circle',
  wellKnownNames = ['circle', 'square', 'triangle', 'star', 'cross', 'x',
    'shape://backslash', 'shape://carrow', 'shape://dot',
    'shape://horline', 'shape://oarrow', 'shape://plus',
    'shape://slash', 'shape://times', 'shape://vertline']
}) => {

  const getWKNSelectOptions = () => {
    return wellKnownNames.map(name => {
      // if locales are not available, set Option text to name value
      const loc = _get(locale, 'wellKnownNames[' + name + ']') || name;
      return (
        <Option
          key={name}
          value={name}
        >
          {loc}
        </Option>
      );
    });
  };

  return (
    <Select
      className="editor-field wellknownname-field"
      value={wellKnownName}
      onChange={onChange}
    >
      {getWKNSelectOptions()}
    </Select>
  );
};

export default localize(WellKnownNameField, 'WellKnownNameField');
