/* eslint-disable camelcase */
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
  Symbolizer as GsSymbolizer
} from 'geostyler-style';

import './SymbolizerOverview.less';
import { localize } from '../LocaleWrapper/LocaleWrapper';
import en_US from '../../locale/en_US';
import { Renderer } from 'src';

// i18n
export interface SymbolizerOverviewLocale {
}

// default props
interface SymbolizerOverviewDefaultProps {
  locale: SymbolizerOverviewLocale;
}

// non default props
export interface SymbolizerOverviewProps extends Partial<SymbolizerOverviewDefaultProps> {
  /** A GeoStyler-Style object. */
  symbolizer: GsSymbolizer;
  /** The callback when the symbolizer was clicked. */
  onSymbolizerClick?: (symbolizer: GsSymbolizer, event: any) => void;
}

export const SymbolizerOverview: React.FC<SymbolizerOverviewProps> = ({
  symbolizer,
  onSymbolizerClick,
  locale = en_US.GsSymbolizerOverview,
}) => {

  const onSymbolizersClick = (symbolizers: GsSymbolizer[], event: any) => {
    if (onSymbolizerClick) {
      onSymbolizerClick(symbolizers[0], event);
    }
  };

  return (
    <div className='gs-symbolizer-overview'>
      {/* TODO use generic renderer component instead of this one */}
      <Renderer
        symbolizers={[symbolizer]}
        onClick={onSymbolizersClick}
      />
    </div>
  );
};

export default localize(SymbolizerOverview, 'SymbolizerOverview');
