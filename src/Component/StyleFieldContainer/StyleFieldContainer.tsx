/* Released under the BSD 2-Clause License
 *
 * Copyright © 2021-present, terrestris GmbH & Co. KG and GeoStyler contributors
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

import './StyleFieldContainer.less';

import { Form } from 'antd';

import { localize } from '../LocaleWrapper/LocaleWrapper';
import en_US from '../../locale/en_US';

import FieldContainer from '../FieldContainer/FieldContainer';
import NameField from '../NameField/NameField';
import type GeoStylerLocale from '../../locale/locale';

// default props
interface StyleFieldContainerDefaultProps {
  /** Locale object containing translated text snippets */
  locale: GeoStylerLocale['StyleFieldContainer'];
}

// non default props
export interface StyleFieldContainerProps extends Partial<StyleFieldContainerDefaultProps> {
  onNameChange?: (name: string) => void;
  onTitleChange?: (name: string) => void;
  title?: string;
  name?: string;
}

export const StyleFieldContainer: React.FC<StyleFieldContainerProps> = ({
  name,
  title,
  locale = en_US.Style,
  onNameChange,
  onTitleChange,
}) => {

  return (
    <FieldContainer className="gs-style-field-container">
      <Form
        layout='vertical'
      >
        <Form.Item
          label={locale.nameFieldLabel}
        >
          <NameField
            value={name}
            onChange={onNameChange}
            placeholder={locale.nameFieldPlaceholder}
          />
        </Form.Item>
        <Form.Item
          label={locale.titleFieldLabel}
        >
          <NameField
            value={title}
            onChange={onTitleChange}
            placeholder={locale.titleFieldPlaceholder}
          />
        </Form.Item>
      </Form>
    </FieldContainer>
  );

};

export default localize(StyleFieldContainer, 'StyleFieldContainer');
