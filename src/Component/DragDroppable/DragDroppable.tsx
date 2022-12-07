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
import React, { ReactElement } from 'react';
import { Direction, DragOrientation, ItemType, Side } from '../../Util/DndUtil';
import { OnDropParams, useDragDrop } from '../../hook/UseDragDrop';
import DropIndicator from '../DropIndicator/DropIndicator';

import './DragDroppable.less';

export interface DragDroppableProps extends React.PropsWithChildren {
  position: number;
  itemType: ItemType;
  onDrop?: (opts: OnDropParams) => void;
  dragOrientation?: DragOrientation;
  showIndicator?: boolean;
}

export const DragDroppable: React.FC<DragDroppableProps> = ({
  position,
  itemType,
  onDrop = () => {},
  dragOrientation = 'horizontal',
  showIndicator,
  children
}) => {

  const [{ ref, direction, side }] = useDragDrop({
    position,
    itemType,
    onDrop,
    dragOrientation,
    showIndicator
  });

  const showFrontIndicatorHorizontal = (direction === Direction.LEFT && side === Side.BEHIND)
    || (direction === Direction.RIGHT && side === Side.BEFORE);

  const showBackIndicatorHorizontal = (direction === Direction.LEFT && side === Side.BEFORE)
    || (direction === Direction.RIGHT && side === Side.BEHIND);

  const showFrontIndicatorVertical = (direction === Direction.UP && side === Side.BEHIND)
    || (direction === Direction.DOWN && side === Side.BEFORE);

  const showBackIndicatorVertical = (direction === Direction.UP && side === Side.BEFORE)
    || (direction === Direction.DOWN && side === Side.BEHIND);

  const showFrontIndicator = dragOrientation === 'horizontal' ?
    showFrontIndicatorHorizontal : showFrontIndicatorVertical;

  const showBackIndicator = dragOrientation === 'horizontal' ?
    showBackIndicatorHorizontal : showBackIndicatorVertical;

  const orientationClass = dragOrientation === 'horizontal' ? 'horizontal' : 'vertical';

  return (
    <div className={`gs-drag-droppable ${orientationClass}`}>
      {
        showFrontIndicator && <DropIndicator />
      }
      {
        React.cloneElement(children as ReactElement, {ref})
      }
      {
        showBackIndicator && <DropIndicator />
      }
    </div>
  );
};

export default DragDroppable;
