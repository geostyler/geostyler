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
import { CompositionContext, Compositions } from '../../../context/CompositionContext/CompositionContext';
import CompositionUtil from '../../../Util/CompositionUtil';
import withDefaultsContext from '../../../hoc/withDefaultsContext';
import { DefaultValues } from '../../../context/DefaultValueContext/DefaultValueContext';
import { Form } from 'antd';

import _cloneDeep from 'lodash/cloneDeep';
import { GeoStylerLocale } from '../../../locale/locale';
import {
  UnsupportedPropertiesContext
} from '../../../context/UnsupportedPropertiesContext/UnsupportedPropertiesContext';
import UnsupportedPropertiesUtil from '../../../Util/UnsupportedPropertiesUtil';

// default props
interface MarkEditorDefaultProps {
  locale: GeoStylerLocale['MarkEditor'];
}

// non default props
export interface MarkEditorProps extends Partial<MarkEditorDefaultProps> {
  symbolizer: MarkSymbolizer;
  onSymbolizerChange?: (changedSymb: Symbolizer) => void;
  defaultValues?: DefaultValues;
}

const COMPONENTNAME = 'MarkEditor';

export const MarkEditor: React.FC<MarkEditorProps> = ({
  locale = en_US.MarkEditor,
  symbolizer,
  onSymbolizerChange,
  defaultValues
}) => {

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

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  };

  const getSupportProps = (propName: keyof MarkSymbolizer) => {
    return UnsupportedPropertiesUtil.getSupportProps<MarkSymbolizer>({
      propName,
      symbolizerName: 'MarkSymbolizer',
      unsupportedProperties,
      hideUnsupported: options?.hideUnsupported
    });
  };

  return (
    <CompositionContext.Consumer>
      {(composition: Compositions) => (
        <div className="gs-mark-symbolizer-editor" >
          <Form.Item
            label={locale.wellKnownNameFieldLabel}
            {...getSupportProps('wellKnownName')}
            {...formItemLayout}
          >
            {
              CompositionUtil.handleComposition({
                composition,
                path: 'MarkEditor.wellKnownNameField',
                onChange: onWellKnownNameChange,
                propName: 'wellKnownName',
                propValue: symbolizer.wellKnownName,
                defaultValue: defaultValues?.MarkEditor?.defaultWellKnownName,
                defaultElement: <WellKnownNameField />
              })
            }
          </Form.Item>
          <WellKnownNameEditor
            symbolizer={symbolizer}
            onSymbolizerChange={onSymbolizerChange}
          />
        </div>
      )}
    </CompositionContext.Consumer>
  );
};

export default withDefaultsContext(localize(MarkEditor, COMPONENTNAME));
