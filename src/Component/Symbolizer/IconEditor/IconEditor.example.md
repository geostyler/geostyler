<!--
 * Released under the BSD 2-Clause License
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
 *
-->

This demonstrates the use of `IconEditor`.

```jsx
import * as React from 'react';
import { IconEditor } from 'geostyler';

class IconEditorExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      symbolizer: {
        kind: 'Icon'
      }
    };

    this.onSymbolizerChange = this.onSymbolizerChange.bind(this);
  }

  onSymbolizerChange(symbolizer) {
    this.setState({
      symbolizer: symbolizer
    });
  }

  render() {
    const {
      symbolizer
    } = this.state;

    return (
      <IconEditor
        symbolizer={symbolizer}
        onSymbolizerChange={this.onSymbolizerChange}
      />
    );
  }
}

<IconEditorExample />
```

This demonstrates the usage of `IconEditor` with `GeoStylerContext`.

```jsx
import React, { useState } from 'react';
import { Switch } from 'antd';
import { IconEditor, GeoStylerContext } from 'geostyler';

function IconEditorExample () {

  const [myContext, setMyContext] = useState({
    composition: {
      IconEditor: {
        imageField: {
          visibility: true
        },
        sizeField: {
          visibility: true
        },
        offsetXField: {
          visibility: true
        },
        offsetYField: {
          visibility: true
        },
        rotateField: {
          visibility: true
        },
        opacityField: {
          visibility: true
        }
      }
    }
  });

  const [symbolizer, setSymbolizer] = useState({
    kind: 'Icon'
  });

  const onSymbolizerChange = (s) => {
    setSymbolizer(s);
  };

  const onVisibilityChange = (visibility, prop) => {
    setMyContext(oldContext => {
      const newContext = {...oldContext};
      newContext.composition.IconEditor[prop].visibility = visibility;
      return newContext;
    })
  };

  return (
    <div>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '15px'}}>
        <Switch
          checked={myContext.composition.IconEditor.imageField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'imageField')}}
          checkedChildren="Source"
          unCheckedChildren="Source"
        />
        <Switch
          checked={myContext.composition.IconEditor.sizeField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'sizeField')}}
          checkedChildren="Size"
          unCheckedChildren="Size"
        />
        <Switch
          checked={myContext.composition.IconEditor.offsetXField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'offsetXField')}}
          checkedChildren="Offset X"
          unCheckedChildren="Offset X"
        />
        <Switch
          checked={myContext.composition.IconEditor.offsetYField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'offsetYField')}}
          checkedChildren="Offset Y"
          unCheckedChildren="Offset Y"
        />
        <Switch
          checked={myContext.composition.IconEditor.rotateField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'rotateField')}}
          checkedChildren="Rotation"
          unCheckedChildren="Rotation"
        />
        <Switch
          checked={myContext.composition.IconEditor.opacityField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'opacityField')}}
          checkedChildren="Opacity"
          unCheckedChildren="Opacity"
        />
      </div>
      <hr />
      <GeoStylerContext.Provider value={myContext}>
        <IconEditor
          symbolizer={symbolizer}
          onSymbolizerChange={onSymbolizerChange}
        />
      </GeoStylerContext.Provider>
    </div>
  );
};

<IconEditorExample />
```
