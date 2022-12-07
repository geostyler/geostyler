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

import DndUtil, { Direction, DragOrientation, Side } from './DndUtil';

describe('DndUtil', () => {

  describe('moveElementInPlace', () => {
    it('moves an item forward in the array', () => {
      const from = 2;
      const to = 1;
      const arr = [1, 2, 3];
      DndUtil.moveElementInPlace(from, to, arr);
      expect(arr[0]).toEqual(1);
      expect(arr[1]).toEqual(3);
      expect(arr[2]).toEqual(2);
    });

    it('moves an item backwards in the array', () => {
      const from = 1;
      const to = 2;
      const arr = [1, 2, 3];
      DndUtil.moveElementInPlace(from, to, arr);
      expect(arr[0]).toEqual(1);
      expect(arr[1]).toEqual(3);
      expect(arr[2]).toEqual(2);
    });
  });

  describe('getDropSide', () => {

    describe('dragging right/down', () => {
      it('returns BEFORE when dropping left/above the middle', () => {
        const dragIndex = 0;
        const dropIndex = 1;
        const dragSource = 1;
        const dropMiddle = 2;

        const dropSide = DndUtil.getDropSide({
          dragIndex,
          dropIndex,
          dragSource,
          dropMiddle
        });
        expect(dropSide).toEqual(Side.BEFORE);
      });

      it('returns BEHIND when dropping right/below the middle', () => {
        const dragIndex = 0;
        const dropIndex = 1;
        const dragSource = 3;
        const dropMiddle = 2;

        const dropSide = DndUtil.getDropSide({
          dragIndex,
          dropIndex,
          dragSource,
          dropMiddle
        });
        expect(dropSide).toEqual(Side.BEHIND);
      });

    });

    describe('dragging left/up', () => {
      it('returns BEFORE when dropping right/below the middle', () => {
        const dragIndex = 1;
        const dropIndex = 0;
        const dragSource = 3;
        const dropMiddle = 2;

        const dropSide = DndUtil.getDropSide({
          dragIndex,
          dropIndex,
          dragSource,
          dropMiddle
        });
        expect(dropSide).toEqual(Side.BEFORE);
      });

      it('returns BEHIND when dropping left/above the middle', () => {
        const dragIndex = 1;
        const dropIndex = 0;
        const dragSource = 1;
        const dropMiddle = 2;

        const dropSide = DndUtil.getDropSide({
          dragIndex,
          dropIndex,
          dragSource,
          dropMiddle
        });
        expect(dropSide).toEqual(Side.BEHIND);
      });

    });
  });

  describe('getDragDirection', () => {
    describe('horizontal', () => {
      it('returns LEFT when dropIndex is less then dragIndex', () => {
        const dragIndex = 2;
        const dropIndex = 1;
        const dragOrientation: DragOrientation = 'horizontal';

        const dragDirection = DndUtil.getDragDirection({
          dragIndex,
          dropIndex,
          dragOrientation
        });
        expect(dragDirection).toEqual(Direction.LEFT);
      });

      it('returns RIGHT when dropIndex is greater then dragIndex', () => {
        const dragIndex = 1;
        const dropIndex = 2;
        const dragOrientation: DragOrientation = 'horizontal';

        const dragDirection = DndUtil.getDragDirection({
          dragIndex,
          dropIndex,
          dragOrientation
        });
        expect(dragDirection).toEqual(Direction.RIGHT);
      });

      it('returns RIGHT when dropIndex is equal to dragIndex', () => {
        const dragIndex = 2;
        const dropIndex = 2;
        const dragOrientation: DragOrientation = 'horizontal';

        const dragDirection = DndUtil.getDragDirection({
          dragIndex,
          dropIndex,
          dragOrientation
        });
        expect(dragDirection).toEqual(Direction.RIGHT);
      });
    });

    describe('vertical', () => {
      it('returns UP when dropIndex is less then dragIndex', () => {
        const dragIndex = 2;
        const dropIndex = 1;
        const dragOrientation: DragOrientation = 'vertical';

        const dragDirection = DndUtil.getDragDirection({
          dragIndex,
          dropIndex,
          dragOrientation
        });
        expect(dragDirection).toEqual(Direction.UP);
      });

      it('returns DOWN when dropIndex is greater then dragIndex', () => {
        const dragIndex = 1;
        const dropIndex = 2;
        const dragOrientation: DragOrientation = 'vertical';

        const dragDirection = DndUtil.getDragDirection({
          dragIndex,
          dropIndex,
          dragOrientation
        });
        expect(dragDirection).toEqual(Direction.DOWN);
      });

      it('returns DOWN when dropIndex is equal to dragIndex', () => {
        const dragIndex = 2;
        const dropIndex = 2;
        const dragOrientation: DragOrientation = 'vertical';

        const dragDirection = DndUtil.getDragDirection({
          dragIndex,
          dropIndex,
          dragOrientation
        });
        expect(dragDirection).toEqual(Direction.DOWN);
      });
    });
  });

  describe('getDropMiddleX', () => {
    it('gets the drop middle on the x-axis', () => {
      const boundingRect = {
        right: 10,
        left: 0
      };

      const dropMiddleX = DndUtil.getDropMiddleX(boundingRect);
      expect(dropMiddleX).toEqual(5);
    });
  });

  describe('getDropMiddleY', () => {
    it('gets the drop middle on the y-axis', () => {
      const boundingRect = {
        bottom: 10,
        top: 0
      };

      const dropMiddleY = DndUtil.getDropMiddleY(boundingRect);
      expect(dropMiddleY).toEqual(5);
    });
  });

  describe('getDragSourceX', () => {
    it('gets the x value of the drag source', () => {
      const clientOffset = {
        x: 10
      };
      const boundingRect = {
        left: 3
      };

      const dragSourceX = DndUtil.getDragSourceX(clientOffset, boundingRect);
      expect(dragSourceX).toEqual(7);
    });
  });

  describe('getDragSourceY', () => {
    it('gets the y value of the drag source', () => {
      const clientOffset = {
        y: 10
      };
      const boundingRect = {
        top: 3
      };

      const dragSourceY = DndUtil.getDragSourceY(clientOffset, boundingRect);
      expect(dragSourceY).toEqual(7);
    });
  });
});
