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

import { Select } from 'antd';
const Option = Select.Option;
import React from 'react';
import en_US from '../../../locale/en_US';
import { localize } from '../../LocaleWrapper/LocaleWrapper';
import './SLDUnitsSelect.less';

// i18n
export interface SLDUnitsSelectLocale {
  symbolizerUnitsLabel?: string;
  symbolizerUnitsPixel?: string;
  symbolizerUnitsMeter?: string;
  symbolizerUnitsFoot?: string;
}

// props
interface SLDUnitsSelectDefaultProps {
  locale?: SLDUnitsSelectLocale;
}

// non default props
export interface SLDUnitsSelectProps extends Partial<SLDUnitsSelectDefaultProps> {
  changeHandler?: (selection: string) => void;
}

// state
interface SLDUnitsSelectState {
  symbolizerUnit: string;
}

/**
 * SLDUnitsSelect
 */
export class SLDUnitsSelect extends React.Component<SLDUnitsSelectProps, SLDUnitsSelectState> {

  static componentName: string = 'SLDUnitsSelect';

  public static defaultProps: SLDUnitsSelectDefaultProps = {
    locale: en_US.GsSLDUnitsSelect
  };

  constructor(props: SLDUnitsSelectDefaultProps) {
    super(props);
    this.state = {
      symbolizerUnit: 'pixel'
    };
  }

  unitsChanged(selection: string) {
    const {
      changeHandler
    } = this.props;

    this.setState({
      symbolizerUnit: selection
    });

    if (changeHandler) {
      changeHandler(selection);
    }
  }

  render() {
    const {
      locale
    } = this.props;
    const {
      symbolizerUnit
    } = this.state;

    return (
      <>
        <span className="symbolizer-units-label">
          {locale.symbolizerUnitsLabel}:
        </span>
        <Select
          className="gs-code-editor-format-select"
          style={{ width: 100 }}
          onSelect={(selection) => this.unitsChanged(selection)}
          value={symbolizerUnit}
        >
          <Option value="pixel">{locale.symbolizerUnitsPixel}</Option>
          <Option value="metre">{locale.symbolizerUnitsMeter}</Option>
          <Option value="foot">{locale.symbolizerUnitsFoot}</Option>
        </Select>
      </>
    );
  }
}

export default localize(SLDUnitsSelect, SLDUnitsSelect.componentName);
