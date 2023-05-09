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

import React, { useContext } from 'react';

import {
  Symbolizer,
  MarkSymbolizer,
  WellKnownName
} from 'geostyler-style';

import WellKnownNameField from '../Field/WellKnownNameField/WellKnownNameField';
import WellKnownNameEditor from '../WellKnownNameEditor/WellKnownNameEditor';
import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';
import withDefaultsContext from '../../../hoc/withDefaultsContext';
import { Form } from 'antd';

import _cloneDeep from 'lodash/cloneDeep';
import { GeoStylerLocale } from '../../../locale/locale';
import {
  UnsupportedPropertiesContext
} from '../../../context/UnsupportedPropertiesContext/UnsupportedPropertiesContext';
import UnsupportedPropertiesUtil from '../../../Util/UnsupportedPropertiesUtil';
import { useGeoStylerComposition } from '../../../context/GeoStylerContext/GeoStylerContext';

// default props
interface MarkEditorDefaultProps {
  locale: GeoStylerLocale['MarkEditor'];
}

// non default props
export interface MarkEditorProps extends Partial<MarkEditorDefaultProps> {
  symbolizer: MarkSymbolizer;
  onSymbolizerChange?: (changedSymb: Symbolizer) => void;
}

const COMPONENTNAME = 'MarkEditor';

export const MarkEditor: React.FC<MarkEditorProps> = (props) => {

  const composition = useGeoStylerComposition('MarkEditor', {});
  const wknComposition = useGeoStylerComposition('WellKnownNameEditor', {});

  const composed = {...props, ...composition};

  const {
    locale = en_US.MarkEditor,
    symbolizer,
    onSymbolizerChange,
  } = composed;

  const {
    unsupportedProperties,
    options
  } = useContext(UnsupportedPropertiesContext);

  const onWellKnownNameChange = (wellKnownName: WellKnownName) => {
    const clonedSymbolizer = _cloneDeep(symbolizer);
    clonedSymbolizer.wellKnownName = wellKnownName;
    if (onSymbolizerChange) {
      onSymbolizerChange(clonedSymbolizer);
    }
  };

  const getSupportProps = (propName: keyof MarkSymbolizer) => {
    return UnsupportedPropertiesUtil.getSupportProps<MarkSymbolizer>({
      propName,
      symbolizerName: 'MarkSymbolizer',
      unsupportedProperties,
      ...options
    });
  };

  return (
    <div className="gs-mark-symbolizer-editor" >
      {
        composition.wellKnownNameField?.visibility === false ? null : (
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
      {
        wknComposition.visibility === false ? null : (
          <WellKnownNameEditor
            symbolizer={symbolizer}
            onSymbolizerChange={onSymbolizerChange}
          />
        )
      }
    </div>
  );
};

export default withDefaultsContext(localize(MarkEditor, COMPONENTNAME));
