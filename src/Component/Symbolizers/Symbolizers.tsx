
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

import {
  Symbolizer as GsSymbolizer
} from 'geostyler-style';

import { closestCenter, DndContext } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';

import './Symbolizers.css';
import { Button, Card, Divider } from 'antd';

import _cloneDeep from 'lodash-es/cloneDeep.js';
import _uniqueId from 'lodash-es/uniqueId.js';
import { SymbolizerCard } from '../SymbolizerCard/SymbolizerCard';
import { PlusOutlined } from '@ant-design/icons';
import SymbolizerUtil from '../../Util/SymbolizerUtil';
import { SortableItem } from '../SortableItem/SortableItem';
import { useDragDropSensors } from '../../hook/UseDragDropSensors';
import { RemovableItem } from '../RemovableItem/RemovableItem';
import { useGeoStylerLocale } from '../../context/GeoStylerContext/GeoStylerContext';

export interface SymbolizersProps {
  /** The callback function that is triggered when the symbolizers change. */
  onSymbolizersChange?: (symbolizers: GsSymbolizer[]) => void;
  /** The callback function that is triggered when a symbolizer was clicked. */
  onEditSymbolizerClick?: (symbolizerId: number) => void;
  /** List of symbolizers to display */
  symbolizers: GsSymbolizer[];
}

export const Symbolizers: React.FC<SymbolizersProps> = ({
  symbolizers,
  onSymbolizersChange = () => { },
  onEditSymbolizerClick = () => { }
}) => {

  const locale = useGeoStylerLocale('Symbolizers');

  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const removeSymbolizer = (symbolizerIdx: number) => {
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
        key={_uniqueId('symbolizer')}
        symbolizer={symbolizer}
        onSymbolizerClick={() => {
          onEditSymbolizerClick(idx);
        }}
      />
    );
  });

  const removableSymbolizerCards = symbolizerCards.map((symbolizerCard, idx) => {
    const key = _uniqueId('symbolizer');

    return (
      <RemovableItem
        key={key}
        onRemoveClick={() => {
          removeSymbolizer(idx);
        }}
      >
        {symbolizerCard}
      </RemovableItem>
    );
  });

  const sortableAndRemovableSymbolizerCards = removableSymbolizerCards.map((symbolizerCard, idx) => {
    const key = _uniqueId('symbolizer');
    // id must be truthy, so we have to increment the index by 1
    const id = idx + 1;

    return (
      <SortableItem
        key={key}
        id={id}
      >
        {symbolizerCard}
      </SortableItem>
    );
  });

  const onDragEnd = (evt: any) => {
    const { active, over } = evt;
    if (active.id !== over.id) {
      const newOrder = arrayMove([...symbolizers], active.id - 1, over.id - 1);
      onSymbolizersChange(newOrder);
    }
  };

  const sensors = useDragDropSensors();

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
              <DndContext
                onDragEnd={onDragEnd}
                sensors={sensors}
                collisionDetection={closestCenter}
              >
                <SortableContext
                  items={symbolizers.map((s, idx) => idx + 1)}
                >
                  {sortableAndRemovableSymbolizerCards}
                  <div>
                    <Card
                      className='gs-symbolizer-card gs-add-button'
                      hoverable={true}
                      onClick={onAddSymbolizerClick}
                    >
                      <PlusOutlined />
                    </Card>
                  </div>
                </SortableContext>
              </DndContext>
            )
          }
          {
            !showAll && (
              <DndContext
                onDragEnd={onDragEnd}
                sensors={sensors}
                collisionDetection={closestCenter}
              >
                <SortableContext
                  items={symbolizers.map((s, idx) => idx + 1)}
                >
                  {sortableAndRemovableSymbolizerCards}
                </SortableContext>
              </DndContext>
            )
          }
        </div>
        {
          !showAll && (
            <div className='gs-symbolizer-card'>
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
