<!--
 * Released under the BSD 2-Clause License
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
 *
-->

This demonstrates the usage of the `DragDroppable` component.

```jsx
import * as React from 'react';
import { DragDroppable } from 'geostyler';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ItemType } from '../../Util/DndUtil';

class DragDroppableExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      info: ''
    };
  }

  render () {
    const {
      info
    } = this.state;

    return (
      <div style={{height: '300px'}}>
        <DndProvider backend={HTML5Backend}>
          <DragDroppable
            dragOrientation={'vertical'}
            itemType={ItemType.RULE}
            position={0}
            onDrop={({dragIndex, dropIndex}) => {this.setState({info: `Dragged item ${dragIndex} on item ${dropIndex}`});}}
          >
            <div style={{width: '100px', height: '100px', border: 'solid 1px'}}>Item 0</div>
          </DragDroppable>
          <DragDroppable
            dragOrientation={'vertical'}
            itemType={ItemType.RULE}
            position={1}
            onDrop={({dragIndex, dropIndex}) => {this.setState({info: `Dragged item ${dragIndex} on item ${dropIndex}`});}}
          >
            <div style={{width: '100px', height: '100px', border: 'solid 1px'}}>Item 1</div>
          </DragDroppable>
        </DndProvider>
        {info}
      </div>
    );
  }
}

<DragDroppableExample />
```
