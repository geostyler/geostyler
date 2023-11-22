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

import { WellKnownNameField } from '../Field/WellKnownNameField/WellKnownNameField';
import { WellKnownNameEditor } from '../WellKnownNameEditor/WellKnownNameEditor';

import { Form } from 'antd';

import _cloneDeep from 'lodash/cloneDeep';

import {
  InputConfig,
  useGeoStylerComposition,
  useGeoStylerLocale,
  useGeoStylerUnsupportedProperties
} from '../../../context/GeoStylerContext/GeoStylerContext';
import VisibilityField, { VisibilityFieldProps } from '../Field/VisibilityField/VisibilityField';
import { getFormItemConfig } from '../../../Util/FormItemUtil';

export interface MarkEditorComposableProps {
  // TODO add wellKnownNames property that specifies the supported WKNs
  // TODO add support for default values in WellKnownNameField
  wellKnownNameField?: {
    visibility?: boolean;
  };
  // TODO add support for default values in VisibilityField
  visibilityField?: InputConfig<VisibilityFieldProps['visibility']>;
}

export interface MarkEditorInternalProps {
  symbolizer: MarkSymbolizer;
  onSymbolizerChange?: (changedSymb: MarkSymbolizer) => void;
}

export type MarkEditorProps = MarkEditorInternalProps & MarkEditorComposableProps;

export const MarkEditor: React.FC<MarkEditorProps> = (props) => {

  const composition = useGeoStylerComposition('MarkEditor');

  const composed = { ...props, ...composition };
  const {
    onSymbolizerChange,
    symbolizer,
    visibilityField,
    wellKnownNameField
  } = composed;

  const locale = useGeoStylerLocale('MarkEditor');

  const {
    getFormItemSupportProps
  } = useGeoStylerUnsupportedProperties(symbolizer);

  const onWellKnownNameChange = (wellKnownName: WellKnownName) => {
    const clonedSymbolizer = _cloneDeep(symbolizer);
    clonedSymbolizer.wellKnownName = wellKnownName;
    if (onSymbolizerChange) {
      onSymbolizerChange(clonedSymbolizer);
    }
  };

  const onVisibilityChange = (newVisibility: MarkSymbolizer['visibility']) => {
    const symbolizerClone: MarkSymbolizer = _cloneDeep(symbolizer);
    symbolizerClone.visibility = newVisibility;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const itemConfig = getFormItemConfig();

  return (
    <div className="gs-mark-symbolizer-editor" >
      {
        visibilityField?.visibility === false ? null : (
          <Form.Item
            {...itemConfig}
            label={locale.visibilityLabel}
          >
            <VisibilityField
              visibility={symbolizer.visibility}
              onChange={onVisibilityChange}
            />
          </Form.Item>
        )
      }
      {
        wellKnownNameField?.visibility === false ? null : (
          <Form.Item
            {...itemConfig}
            label={locale.wellKnownNameFieldLabel}
            {...getFormItemSupportProps('wellKnownName')}
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
