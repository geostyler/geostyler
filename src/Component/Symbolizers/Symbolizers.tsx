/* eslint-disable camelcase */
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

import React, { useState } from 'react';

import _merge from 'lodash/merge';

import {
  Symbolizer as GsSymbolizer
} from 'geostyler-style';

import { localize } from '../LocaleWrapper/LocaleWrapper';
import en_US from '../../locale/en_US';

import './Symbolizers.less';
import { Button, Card, Divider } from 'antd';

import _cloneDeep from 'lodash/cloneDeep';
import Removable from '../Removable/Removable';
import { SymbolizerCard, SymbolizerCardProps } from '../SymbolizerCard/SymbolizerCard';
import { PlusOutlined } from '@ant-design/icons';
import SymbolizerUtil from '../../Util/SymbolizerUtil';

// i18n
export interface SymbolizersLocale {
  symbolizersTitle: string;
  addSymbolizer: string;
  showAll: string;
  hide: string;
}

// default props
interface SymbolizersDefaultProps {
  /** Locale object containing translated text snippets */
  locale: SymbolizersLocale;
  /** The callback function that is triggered when the symbolizers change. */
  onSymbolizersChange: (symbolizers: GsSymbolizer[]) => void;
  /** The callback function that is triggered when a symbolizer was clicked. */
  onEditSymbolizerClick: (symbolizerId: number) => void;
}

// non default props
export interface SymbolizersProps extends Partial<SymbolizersDefaultProps> {
  /** List of symbolizers to display */
  symbolizers: GsSymbolizer[];
  /** The passthrough props for the SymbolizerCard component. */
  symbolizerCardProps?: Partial<SymbolizerCardProps>;
}

export const Symbolizers: React.FC<SymbolizersProps> = ({
  locale = en_US.GsSymbolizers,
  symbolizers,
  onSymbolizersChange = () => {},
  onEditSymbolizerClick = () => {},
  symbolizerCardProps
}) => {

  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const removeSymbolizer = (symbolizerIdx: number) => {
    // TODO fix removing/rerendering since we added
    //      the add-button to the list of removables
    const symbolizersClone = _cloneDeep(symbolizers);
    symbolizersClone.splice(symbolizerIdx, 1);
    onSymbolizersChange(symbolizersClone);
  };

  const onAddSymbolizerClick = () => {
    const symbolizersClone = _cloneDeep(symbolizers);
    symbolizersClone.push(SymbolizerUtil.defaultSymbolizer);
    onSymbolizersChange(symbolizersClone);
  };

  const symbolizerCards = symbolizers.map((symbolizer: GsSymbolizer, idx: number) => {
    return (
      <SymbolizerCard
        symbolizer={symbolizer}
        key={idx}
        onSymbolizerClick={() => {
          onEditSymbolizerClick(idx);
        }}
        // TODO properly handle passthrough props
        {...symbolizerCardProps}
      />
    );
  });

  return (
    <div className='gs-symbolizers'>
      <div className='gs-symbolizers-header'>
        <h2>{locale.symbolizersTitle}</h2>
      </div>
      <Divider />
      <div className='gs-symbolizers-content'>
        <div className={`${showAll ? 'gs-symbolizers-grid' : 'gs-symbolizers-list'}`}>
          {
            showAll && (
              <Removable
                onRemoveClick={removeSymbolizer}
              >
                {symbolizerCards}
                <div>
                  <Card
                    className='gs-symbolizer-card gs-add-button'
                    hoverable={true}
                    onClick={onAddSymbolizerClick}
                  >
                    <PlusOutlined />
                  </Card>
                </div>
              </Removable>
            )
          }
          {
            !showAll && (
              <Removable
                onRemoveClick={removeSymbolizer}
              >
                {symbolizerCards}
              </Removable>
            )
          }
        </div>
        {
          !showAll && (
            <div>
              <Card
                className='gs-symbolizer-card gs-add-button'
                hoverable={true}
                onClick={onAddSymbolizerClick}
              >
                <PlusOutlined />
              </Card>
            </div>
          )
        }
      </div>
      <div className='gs-symbolizers-footer'>
        <Button
          type="link"
          onClick={toggleShowAll}
        >{showAll ? locale.hide : locale.showAll}</Button>
      </div>
    </div>
  );
};

export default localize(Symbolizers, 'Symbolizers');
