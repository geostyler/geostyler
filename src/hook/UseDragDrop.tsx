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
import { useRef } from 'react';
import { useDrag, useDrop, DropTargetMonitor, DropTargetHookSpec } from 'react-dnd';
import DndUtil, { Direction, DragOrientation, DragItem, ItemType, Side } from '../Util/DndUtil';

export type OnDropParams = {
  dragIndex: number;
  dropIndex: number;
  side: Side;
  direction: Direction;
};

export interface UseDragDropParams {
  itemType: ItemType;
  position: number;
  onDrop?: (opts: OnDropParams) => void;
  showIndicator?: boolean;
  dragOrientation?: DragOrientation;
}

export const useDragDrop = ({
  position,
  itemType,
  onDrop = () => {},
  showIndicator = true,
  dragOrientation = 'horizontal'
}: UseDragDropParams) => {

  const ref = useRef(null);

  const [, drag] = useDrag(() => ({
    type: itemType,
    item: {
      index: position
    }
  }));

  /**
   * Handler for the horizontal drop event.
   * Computes the dragging direction and drop side and calls onMove
   * with given arguments.
   *
   * @param item The dragged item.
   * @param monitor The dnd monitor.
   */
  const dropHandlerHorizontal = (item: DragItem, monitor: DropTargetMonitor<DragItem, DragItem>) => {
    if (!ref.current) {
      return item;
    }

    const dragIndex = item.index;
    const dropIndex = position;

    if (dragIndex === dropIndex) {
      return item;
    }

    const dropTargetBoundingRect = ref.current.getBoundingClientRect();
    const clientOffset = monitor.getClientOffset();

    const dropMiddleX = DndUtil.getDropMiddleX(dropTargetBoundingRect);
    const dragSourceX = DndUtil.getDragSourceX(clientOffset, dropTargetBoundingRect);

    const dropSide = DndUtil.getDropSide({
      dragIndex,
      dropIndex,
      dragSource: dragSourceX,
      dropMiddle: dropMiddleX
    });
    const dragDirection = DndUtil.getDragDirection({
      dragIndex,
      dropIndex,
      dragOrientation
    });

    onDrop({dragIndex, dropIndex, side: dropSide, direction: dragDirection});
    return item;
  };

  /**
   * Handler for the vertical drop event.
   * Computes the dragging direction and drop side and calls onMove
   * with given arguments.
   *
   * @param item The dragged item.
   * @param monitor The dnd monitor.
   */
  const dropHandlerVertical = (item: DragItem, monitor: DropTargetMonitor<DragItem, DragItem>) => {
    if (!ref.current) {
      return item;
    }

    const dragIndex = item.index;
    const dropIndex = position;

    if (dragIndex === dropIndex) {
      return item;
    }

    const dropTargetBoundingRect = ref.current.getBoundingClientRect();
    const clientOffset = monitor.getClientOffset();

    const dropMiddleY = DndUtil.getDropMiddleY(dropTargetBoundingRect);
    const dragSourceY = DndUtil.getDragSourceY(clientOffset, dropTargetBoundingRect);

    const dropSide = DndUtil.getDropSide({
      dragIndex,
      dropIndex,
      dragSource: dragSourceY,
      dropMiddle: dropMiddleY
    });
    const dragDirection = DndUtil.getDragDirection({
      dragIndex,
      dropIndex,
      dragOrientation
    });

    onDrop({dragIndex, dropIndex, side: dropSide, direction: dragDirection});
    return item;
  };

  /**
   * Collect handler for vertical dragging event.
   *
   * Updates the props for dragging direction and drop side.
   * This function will be called while dragging is still ongoing.
   *
   * @param monitor The dnd monitor.
   * @returns The updated props for dragging direction and drop side.
   */
  const collectHandlerIndicatorVertical = (monitor: DropTargetMonitor<DragItem, unknown>) => {
    if (!ref.current || !monitor.isOver()) {
      return {
        direction: undefined,
        side: undefined
      };
    }

    const item = monitor.getItem();
    if (!item) {
      return {
        direction: undefined,
        side: undefined
      };
    }

    const dragIndex = item.index;
    const dropIndex = position;

    if (dragIndex === dropIndex) {
      return {
        direction: undefined,
        side: undefined
      };
    }

    const dropTargetBoundingRect = ref.current.getBoundingClientRect();
    const clientOffset = monitor.getClientOffset();

    const dropMiddleY = DndUtil.getDropMiddleY(dropTargetBoundingRect);
    const dragSourceY = DndUtil.getDragSourceY(clientOffset, dropTargetBoundingRect);

    const dropSide = DndUtil.getDropSide({
      dragIndex,
      dropIndex,
      dragSource: dragSourceY,
      dropMiddle: dropMiddleY
    });
    const dragDirection = DndUtil.getDragDirection({
      dragIndex,
      dropIndex,
      dragOrientation
    });

    return {
      direction: dragDirection,
      side: dropSide
    };
  };

  /**
   * Collect handler for horizontal dragging event.
   *
   * Updates the props for dragging direction and drop side.
   * This function will be called while dragging is still ongoing.
   *
   * @param monitor The dnd monitor.
   * @returns The updated props for dragging direction and drop side.
   */
  const collectHandlerIndicatorHorizontal = (monitor: DropTargetMonitor<DragItem, unknown>) => {
    if (!ref.current || !monitor.isOver()) {
      return {
        direction: undefined,
        side: undefined
      };
    }

    const item = monitor.getItem();
    if (!item) {
      return {
        direction: undefined,
        side: undefined
      };
    }

    const dragIndex = item.index;
    const dropIndex = position;

    if (dragIndex === dropIndex) {
      return {
        direction: undefined,
        side: undefined
      };
    }

    const dropTargetBoundingRect = ref.current.getBoundingClientRect();
    const clientOffset = monitor.getClientOffset();

    const dropMiddleX = DndUtil.getDropMiddleX(dropTargetBoundingRect);
    const dragSourceX = DndUtil.getDragSourceX(clientOffset, dropTargetBoundingRect);

    const dropSide = DndUtil.getDropSide({
      dragIndex,
      dropIndex,
      dragSource: dragSourceX,
      dropMiddle: dropMiddleX
    });
    const dragDirection = DndUtil.getDragDirection({
      dragIndex,
      dropIndex,
      dragOrientation
    });

    return {
      direction: dragDirection,
      side: dropSide
    };
  };


  const [{side, direction}, drop] = useDrop(() => {
    const dropHandler = dragOrientation === 'horizontal' ? dropHandlerHorizontal : dropHandlerVertical;

    const dropConfig: DropTargetHookSpec<DragItem, DragItem, {side: Side; direction: Direction}> = {
      accept: itemType,
      drop: dropHandler
    };

    if (showIndicator) {
      const collectHandler = dragOrientation === 'horizontal' ?
        collectHandlerIndicatorHorizontal : collectHandlerIndicatorVertical;

      dropConfig.collect = collectHandler;
    }

    return dropConfig;
  });

  return [{
    side,
    direction,
    ref: drag(drop(ref))
  }];
};
