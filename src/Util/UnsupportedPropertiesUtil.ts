/* Released under the BSD 2-Clause License
 *
 * Copyright © 2022-present, terrestris GmbH & Co. KG and GeoStyler contributors
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

import { FormItemProps } from 'antd';
import { SupportDef, Symbolizer, UnsupportedProperties } from 'geostyler-style';
import defaultLocale from '../locale/en_US';
import { UnsupportedPropertiesContext } from '../context/GeoStylerContext/GeoStylerContext';

export type SymbolizerName = `${Symbolizer['kind']}Symbolizer`;

type UnsupportedSymbolizerProps<T extends Symbolizer> = SupportDef | {
  [key in keyof Required<T>]?: SupportDef
};

/**
 * @class UnsupportedPropertiesUtil
 */
class UnsupportedPropertiesUtil {

  static getFormItemSupportProps = <T extends Symbolizer>({
    propName,
    symbolizerName,
    context
  }: {
    propName: keyof T;
    symbolizerName: SymbolizerName;
    context: UnsupportedPropertiesContext;
  }): Partial<FormItemProps> => {

    if (!context || Object.keys(context).length < 1) {
      return {};
    }

    const {
      hideUnsupported = false,
      locale = defaultLocale.UnsupportedPropertiesUtil
    } = context.options;

    const props: Partial<FormItemProps> = {};
    const unsupportedSymbolizerProps = UnsupportedPropertiesUtil
      .getUnsupportedPropsForSymbolizer<T>(context, symbolizerName);

    const prop = propName as keyof UnsupportedSymbolizerProps<T>;
    const val = unsupportedSymbolizerProps?.[prop] as SupportDef;
    if (val) {
      props.hasFeedback = true;
      if (val === 'none') {
        props.help = locale.notSupported;
        props.validateStatus = 'warning';
        if (hideUnsupported) {
          props.hidden = true;
        }
      } else if (val === 'partial') {
        props.help = locale.partiallySupported;
        props.validateStatus = 'warning';
      } else {
        props.help = val.info;
        props.validateStatus = 'warning';
        if (val.support === 'none' && hideUnsupported) {
          props.hidden = true;
        }
      }
    }

    return props;
  };

  static getUnsupportedPropsForSymbolizer = <T extends Symbolizer>(
    unsupportedProperties: UnsupportedProperties,
    symbolizerName: SymbolizerName
  ): UnsupportedSymbolizerProps<T> => {
    const symbolizer = symbolizerName as keyof UnsupportedProperties['Symbolizer'];
    return unsupportedProperties?.Symbolizer?.[symbolizer];
  };
}

export default UnsupportedPropertiesUtil;
