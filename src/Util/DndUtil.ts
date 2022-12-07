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

/**
 * Properties of a drag item.
 */
export type DragItem = {
  index: number;
};

/**
 * The drag orientation. Either dragging vertically or horizontally.
 */
export type DragOrientation = 'vertical' | 'horizontal';

/**
 * The drag item type. Used for specifiying which
 * items can be dropped at which targets.
 */
export enum ItemType {
  SYMBOLIZER = 'SYMBOLIZER',
  RULE = 'RULE'
}

/**
 * The direction in which an item is being dragged.
 */
export enum Direction {
  /** Dragging to the left. */
  LEFT,
  /** Dragging to the right. */
  RIGHT,
  /** Dragging upwards. */
  UP,
  /** Dragging downwards. */
  DOWN
}

/**
 * The side on which an element was dropped.
 */
export enum Side {
  /** Dropping an element at the further away side in dragging direction. */
  BEHIND,
  /** Dropping an element at the nearer side in dragging direction. */
  BEFORE
}

type GetDropSideParams = {
  /** The index of the drag item. */
  dragIndex: number;
  /** The index of the drop target. */
  dropIndex: number;
  /** The source of the drag item. */
  dragSource: number;
  /** The pixel ordinate of the drop target in drag orientation. */
  dropMiddle: number;
};

type GetDragDirectionParams = {
  /** The index of the drag item. */
  dragIndex: number;
  /** The index of the drop target. */
  dropIndex: number;
  /** The orientation of the dragdrop. */
  dragOrientation: DragOrientation;
};

/**
 * @class DndUtil
 */
class DndUtil {

  /**
   * Move an element within an array in-place.
   *
   * @param from Index of the element to move.
   * @param to Target index.
   * @param arr Array in which the element is moved.
   */
  static moveElementInPlace = (from: number, to: number, arr: any[]) => {
    if (to >= arr.length) {
      var k = to - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(to, 0, arr.splice(from, 1)[0]);
  };

  /**
   * Get the drop side of a drop event.
   *
   * @returns The side on which was dropped.
   */
  static getDropSide = ({dragIndex, dropIndex, dragSource, dropMiddle}: GetDropSideParams) => {
    let behind = true;
    // dragging right/down
    if (dragIndex < dropIndex && dragSource < dropMiddle) {
      behind = false;
    }

    // dragging left/up
    if (dragIndex > dropIndex && dragSource > dropMiddle) {
      behind = false;
    }

    return behind ? Side.BEHIND : Side.BEFORE;
  };

  /**
   * Get the direction of the dragging event.
   *
   * @returns The direction.
   */
  static getDragDirection = ({dragIndex, dropIndex, dragOrientation}: GetDragDirectionParams) => {
    if (dragOrientation === 'horizontal') {
      return dragIndex > dropIndex ? Direction.LEFT : Direction.RIGHT;
    } else {
      return dragIndex > dropIndex ? Direction.UP : Direction.DOWN;
    }
  };

  /**
   * Get the x value of the middle of the drop target.
   *
   * @param dropTargetBoundingRect The bounding rectangle of the drop target.
   * @returns The x value of the middle of the drop target.
   */
  static getDropMiddleX = (dropTargetBoundingRect: any) =>
    (dropTargetBoundingRect.right - dropTargetBoundingRect.left) / 2;

  /**
   * Get the y value of the middle of the drop target.
   *
   * @param dropTargetBoundingRect The bounding rectangle of the drop target.
   * @returns The y value of the middle of the drop target.
   */
  static getDropMiddleY = (dropTargetBoundingRect: any) =>
    (dropTargetBoundingRect.bottom - dropTargetBoundingRect.top) / 2;

  /**
   * Get the x value of the dragged element.
   *
   * @param clientOffset The client offset.
   * @param dropTargetBoundingRect The bounding rectangle of the drop target.
   * @returns The x value of the drag source.
   */
  static getDragSourceX = (clientOffset: any, dropTargetBoundingRect: any) =>
    clientOffset.x - dropTargetBoundingRect.left;

  /**
   * Get the y value of the dragged element.
   *
   * @param clientOffset The client offset.
   * @param dropTargetBoundingRect The bounding rectangle of the drop target.
   * @returns The y value of the drag source.
   */
  static getDragSourceY = (clientOffset: any, dropTargetBoundingRect: any) =>
    clientOffset.y - dropTargetBoundingRect.top;

}

export default DndUtil;
