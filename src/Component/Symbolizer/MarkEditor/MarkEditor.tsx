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

import {
  Symbolizer,
  MarkSymbolizer,
  WellKnownName
} from 'geostyler-style';

import WellKnownNameField from '../Field/WellKnownNameField/WellKnownNameField';
import WellKnownNameEditor from '../WellKnownNameEditor/WellKnownNameEditor';
import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';
import { CompositionContext, Compositions } from '../../CompositionContext/CompositionContext';
import CompositionUtil from '../../../Util/CompositionUtil';
import withDefaultsContext from '../../../hoc/withDefaultsContext';
import { DefaultValues } from '../../DefaultValueContext/DefaultValueContext';
import { Form } from 'antd';

import _cloneDeep from 'lodash/cloneDeep';

// i18n
export interface MarkEditorLocale {
  wellKnownNameFieldLabel: string;
}

// default props
interface MarkEditorDefaultProps {
  locale: MarkEditorLocale;
}

// non default props
export interface MarkEditorProps extends Partial<MarkEditorDefaultProps> {
  symbolizer: MarkSymbolizer;
  onSymbolizerChange?: (changedSymb: Symbolizer) => void;
  defaultValues: DefaultValues;
}

interface MarkEditorState {
  symbolizer: MarkSymbolizer;
}

export class MarkEditor extends React.Component<MarkEditorProps, MarkEditorState> {

  static componentName: string = 'MarkEditor';

  public static defaultProps: MarkEditorDefaultProps = {
    locale: en_US.GsMarkEditor
  };

  constructor(props: MarkEditorProps) {
    super(props);
    this.state = {
      symbolizer: {
        kind: 'Mark',
        wellKnownName: 'circle'
      }
    };
  }

  static getDerivedStateFromProps(
    nextProps: MarkEditorProps): Partial<MarkEditorState> {
    return {
      symbolizer: nextProps.symbolizer
    };
  }

  onWellKnownNameChange = (wkn: WellKnownName) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.state.symbolizer);
    symbolizer.wellKnownName = wkn;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  };

  /**
   * Wraps a Form Item around a given element and adds its locale
   * to the From Item label.
   */
  wrapFormItem = (locale: string, element: React.ReactElement): React.ReactElement => {
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    return element == null ? null : (
      <Form.Item
        label={locale}
        {...formItemLayout}
      >
        {element}
      </Form.Item>
    );
  };

  render() {
    const {
      locale,
      onSymbolizerChange,
      defaultValues
    } = this.props;
    const {
      symbolizer
    } = this.state;

    return (
      <CompositionContext.Consumer>
        {(composition: Compositions) => (
          <div className="gs-mark-symbolizer-editor" >
            {
              this.wrapFormItem(
                locale.wellKnownNameFieldLabel,
                CompositionUtil.handleComposition({
                  composition,
                  path: 'MarkEditor.wellKnownNameField',
                  onChange: this.onWellKnownNameChange,
                  propName: 'wellKnownName',
                  propValue: symbolizer.wellKnownName,
                  defaultValue: defaultValues?.MarkEditor?.defaultWellKnownName,
                  defaultElement: <WellKnownNameField />
                })
              )
            }
            <WellKnownNameEditor
              symbolizer={symbolizer}
              onSymbolizerChange={onSymbolizerChange}
            />
          </div>
        )}
      </CompositionContext.Consumer>
    );
  }
}

export default withDefaultsContext(localize(MarkEditor, MarkEditor.componentName));
