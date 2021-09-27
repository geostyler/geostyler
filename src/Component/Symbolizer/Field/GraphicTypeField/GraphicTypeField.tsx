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
import { Select } from 'antd';

import { GraphicType } from 'geostyler-style';

import { localize } from '../../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../../locale/en_US';

import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';

const Option = Select.Option;

interface GraphicTypeFieldLocale {
  /** Rendered Text for Mark Option */
  Mark: string;
  /** Rendered Text for Icon Option */
  Icon: string;
}

export interface GraphicTypeFieldDefaultProps {
  /** List of selectable GraphicTypes for Select */
  graphicTypes: GraphicType[];
  /** Language package */
  locale: GraphicTypeFieldLocale;
  /** If true GraphicTypeField can be cleared  */
  clearable: boolean;
}

export interface GraphicTypeFieldProps extends Partial<GraphicTypeFieldDefaultProps> {
  /** Currently selected GraphicType */
  graphicType?: GraphicType;
  /** Callback when selection changes */
  onChange?: (type: GraphicType) => void;
}

/** GraphicTypeField to select between different GraphicTypes */
export const GraphicTypeField: React.FC<GraphicTypeFieldProps> = ({
  onChange,
  graphicType,
  locale = en_US.GsGraphicTypeField,
  graphicTypes = ['Mark', 'Icon'],
  clearable = true,
  ...passThroughProps
}) => {

  /**
   * Iterates over props.graphicTypes and returns an Option according to GraphicType
   *
   * @param {GraphicTypeFieldLocale} l Language package used for the displayed text of an Option
   * @return {React.ReactNode[]} List of Options
   */
  const getTypeSelectOptions = (l: GraphicTypeFieldLocale): React.ReactNode[] => {
    return (graphicTypes.map((type: GraphicType) => {
      const loc = _get(l, type) || type;
      return (
        <Option
          key={type}
          value={type}
        >
          {loc}
        </Option>
      );
    }));
  };

  return (
    <Select
      className="editor-field graphictype-field"
      value={graphicType}
      onChange={onChange}
      allowClear={clearable}
      {...passThroughProps}
    >
      {getTypeSelectOptions(locale)}
    </Select>
  );
};

export default localize(GraphicTypeField, 'GraphicTypeField');
