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

This demonstrates the use of `TextEditor`.

```jsx
import * as React from 'react';
import { TextEditor } from 'geostyler';

class TextEditorExample extends React.Component {
  constructor(props) {
    super(props);

    this.data = {
      schema: {
        properties: {
          foo: {
            type: 'Number'
          },
          bar: {
            type: 'String'
          }
        }
      }
    };

    this.state = {
      symbolizer: {
        kind: 'Text'
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
      <TextEditor
        symbolizer={symbolizer}
        onSymbolizerChange={this.onSymbolizerChange}
        internalDataDef={this.data}
      />
    );
  }
}

<TextEditorExample />
```

This demonstrates the usage of `TextEditor` with `GeoStylerContext`.

```jsx
import React, { useState } from 'react';
import { Switch } from 'antd';
import { TextEditor, GeoStylerContext } from 'geostyler';

function TextEditorExample () {

  const [myContext, setMyContext] = useState({
    composition: {
      TextEditor: {
        templateField: {
          visibility: true
        },
        colorField: {
          visibility: true
        },
        fontField: {
          visibility: true
        },
        opacityField: {
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
        haloColorField: {
          visibility: true
        },
        haloWidthField: {
          visibility: true
        }
      }
    }
  });

  const [symbolizer, setSymbolizer] = useState({
    kind: 'Text'
  });

  const onSymbolizerChange = (s) => {
    setSymbolizer(s);
  };

  const onVisibilityChange = (visibility, prop) => {
    setMyContext(oldContext => {
      const newContext = {...oldContext};
      newContext.composition.TextEditor[prop].visibility = visibility;
      return newContext;
    });
  };

  return (
    <div>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '15px'}}>
        <Switch
          checked={myContext.composition.TextEditor.templateField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'templateField')}}
          checkedChildren="Template"
          unCheckedChildren="Template"
        />
        <Switch
          checked={myContext.composition.TextEditor.colorField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'colorField')}}
          checkedChildren="Text-Color"
          unCheckedChildren="Text-Color"
        />
        <Switch
          checked={myContext.composition.TextEditor.fontField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'fontField')}}
          checkedChildren="Font"
          unCheckedChildren="Font"
        />
        <Switch
          checked={myContext.composition.TextEditor.opacityField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'opacityField')}}
          checkedChildren="Text-Opacity"
          unCheckedChildren="Text-Opacity"
        />
        <Switch
          checked={myContext.composition.TextEditor.sizeField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'sizeField')}}
          checkedChildren="Text-Size"
          unCheckedChildren="Text-Size"
        />
        <Switch
          checked={myContext.composition.TextEditor.offsetXField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'offsetXField')}}
          checkedChildren="Offset X"
          unCheckedChildren="Offset X"
        />
        <Switch
          checked={myContext.composition.TextEditor.offsetYField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'offsetYField')}}
          checkedChildren="Offset Y"
          unCheckedChildren="Offset Y"
        />
        <Switch
          checked={myContext.composition.TextEditor.rotateField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'rotateField')}}
          checkedChildren="Rotation"
          unCheckedChildren="Rotation"
        />
        <Switch
          checked={myContext.composition.TextEditor.haloColorField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'haloColorField')}}
          checkedChildren="Halo-Color"
          unCheckedChildren="Halo-Color"
        />
        <Switch
          checked={myContext.composition.TextEditor.haloWidthField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'haloWidthField')}}
          checkedChildren="Halo-Width"
          unCheckedChildren="Halo-Width"
        />
      </div>
      <hr />
      <GeoStylerContext.Provider value={myContext}>
        <TextEditor
          symbolizer={symbolizer}
          onSymbolizerChange={onSymbolizerChange}
        />
      </GeoStylerContext.Provider>
    </div>
  );
};

<TextEditorExample />
```
