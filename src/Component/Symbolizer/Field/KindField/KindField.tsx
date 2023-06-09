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
import { SymbolizerKind } from 'geostyler-style';
import { useGeoStylerLocale } from '../../../../context/GeoStylerContext/GeoStylerContext';

const Option = Select.Option;

export interface KindFieldProps {
  kind?: SymbolizerKind;
  symbolizerKinds?: SymbolizerKind[];
  onChange?: (kind: SymbolizerKind) => void;
}

/**
 * KindField
 */
export const KindField: React.FC<KindFieldProps> = ({
  onChange,
  kind = 'Mark',
  symbolizerKinds = ['Mark', 'Fill', 'Icon', 'Line', 'Text', 'Raster']
}) => {

  const locale = useGeoStylerLocale('KindField');

  const kindSelectOptions = symbolizerKinds.map(symbolizerKind =>
    <Option
      key={symbolizerKind}
      value={symbolizerKind}
    >
      {locale.symbolizerKinds?.[symbolizerKind] || symbolizerKind}
    </Option>
  );

  return (
    <Select
      className="editor-field kind-field"
      value={kind}
      onChange={onChange}
    >
      {kindSelectOptions}
    </Select>
  );
};
