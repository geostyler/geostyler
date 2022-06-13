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

import React, { ReactNode, useState } from 'react';
import './Selectable.less';
import SelectableItem from './SelectableItem/SelectableItem';

// default props
export interface SelectableDefaultProps {
}

// non default props
export interface SelectableProps extends Partial<SelectableDefaultProps> {
  /** The ids of the selected items. */
  selection?: number[];
  /** The change event that is triggered, when the selection changes. */
  onSelectionChange?: (selectedIdxs: number[]) => void;
}

export const Selectable: React.FC<SelectableProps> = ({
  selection,
  onSelectionChange,
  children
}) => {

  const [selectedItems, setSelectedItems] = useState<number[]>(selection || []);

  const onItemClick = (clickedItemIdx: number) => {
    const existingIdx = selectedItems.indexOf(clickedItemIdx);
    let newSelectedItems;
    if (existingIdx > -1) {
      newSelectedItems = [...selectedItems];
      newSelectedItems.splice(existingIdx, 1);
    } else {
      newSelectedItems = [...selectedItems, clickedItemIdx];
    }
    setSelectedItems(newSelectedItems);
    if (onSelectionChange) {
      onSelectionChange(newSelectedItems);
    }
  };

  const isSelected = (idx: number) => {
    return selectedItems.includes(idx);
  };

  return (
    <div
      className='gs-selectable'
    >
      {
        React.Children.map(children, (child: ReactNode, idx: number) => {
          return (
            <SelectableItem
              key={idx}
              onItemClick={() => {
                onItemClick(idx);
              }}
              selected={isSelected(idx)}
            >
              {child}
            </SelectableItem>
          );
        })
      }
    </div>
  );
};

export default Selectable;
