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

import { localize } from '../../LocaleWrapper/LocaleWrapper';

import _isEqual from 'lodash/isEqual';
import { GeoStylerLocale } from '../../../locale/locale';
import en_US from '../../../locale/en_US';

import './ClassificationCombo.less';

export type ClassificationMethod = 'equalInterval' | 'quantile' | 'logarithmic' | 'kmeans';

// default props
export interface ClassificationComboDefaultProps {
  /** Locale object containing translated text snippets */
  locale: GeoStylerLocale['ClassificationCombo'];
  /** List of supported classification methods */
  classifications: ClassificationMethod[];
}

// non default props
export interface ClassificationComboProps extends Partial<ClassificationComboDefaultProps> {
  /** The callback method that is triggered when the state changes */
  onChange?: (classification: ClassificationMethod) => void;
  /** The selected classification method */
  classification?: ClassificationMethod;
}

const COMPONENTNAME = 'ClassificationCombo';

/**
 * Symbolizer editorwindow UI.
 */
export const ClassificationCombo: React.FC<ClassificationComboProps> = ({
  locale = en_US.ClassificationCombo,
  classifications = ['equalInterval', 'quantile', 'logarithmic', 'kmeans'],
  onChange,
  classification
}) => {

  const classificationOptions = classifications.map((method: ClassificationMethod) => {
    return (
      <Select.Option
        className="classification-option"
        key={method}
        value={method}
      >
        {locale[method] || method}
      </Select.Option>
    );
  });

  return (
    <Select
      className="classification-combo"
      optionFilterProp="children"
      value={classification}
      onChange={onChange}
    >
      {classificationOptions}
    </Select>
  );
};

export default localize(ClassificationCombo, COMPONENTNAME);
