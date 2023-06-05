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
  MarkSymbolizer,
  WellKnownName
} from 'geostyler-style';

import WellKnownNameField from '../Field/WellKnownNameField/WellKnownNameField';
import WellKnownNameEditor from '../WellKnownNameEditor/WellKnownNameEditor';
import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';
import { Form } from 'antd';

import _cloneDeep from 'lodash/cloneDeep';
import type GeoStylerLocale from '../../../locale/locale';
import {
  useGeoStylerComposition,
  useGeoStylerUnsupportedProperties
} from '../../../context/GeoStylerContext/GeoStylerContext';

export interface MarkEditorComposableProps {
  // TODO add wellKnownNames property that specifies the supported WKNs
  // TODO add support for default values in WellKnownNameField
  wellKnownNameField?: {
    visibility?: boolean;
  };
}

export interface MarkEditorInternalProps {
  locale?: GeoStylerLocale['MarkEditor'];
  symbolizer: MarkSymbolizer;
  onSymbolizerChange?: (changedSymb: MarkSymbolizer) => void;
}

export type MarkEditorProps = MarkEditorInternalProps & MarkEditorComposableProps;

const COMPONENTNAME = 'MarkEditor';

export const MarkEditor: React.FC<MarkEditorProps> = (props) => {

  const composition = useGeoStylerComposition('MarkEditor');

  const composed = {...props, ...composition};
  const {
    locale = en_US.MarkEditor,
    onSymbolizerChange,
    symbolizer,
    wellKnownNameField
  } = composed;

  const {
    getSupportProps
  } = useGeoStylerUnsupportedProperties(symbolizer);

  const onWellKnownNameChange = (wellKnownName: WellKnownName) => {
    const clonedSymbolizer = _cloneDeep(symbolizer);
    clonedSymbolizer.wellKnownName = wellKnownName;
    if (onSymbolizerChange) {
      onSymbolizerChange(clonedSymbolizer);
    }
  };

  return (
    <div className="gs-mark-symbolizer-editor" >
      {
        wellKnownNameField?.visibility === false ? null : (
          <Form.Item
            label={locale.wellKnownNameFieldLabel}
            {...getSupportProps('wellKnownName')}
          >
            <WellKnownNameField
              wellKnownName={symbolizer.wellKnownName}
              onChange={onWellKnownNameChange}
            />
          </Form.Item>
        )
      }
      <WellKnownNameEditor
        symbolizer={symbolizer}
        onSymbolizerChange={onSymbolizerChange}
      />
    </div>
  );
};

export default localize(MarkEditor, COMPONENTNAME);
