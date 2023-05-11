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

This demonstrates the use of `Editor`.

```jsx
import React, { useState } from 'react';
import { Editor } from 'geostyler';

function EditorExample () {
  const [style, setStyle] = useState({
    symbolizer: {
      kind: 'Mark',
      wellKnownName: 'circle'
    }
  });

  const onSymbolizerChange = (symbolizer) => {
    setStyle({symbolizer});
  };

  return (
    <Editor
      symbolizer={style.symbolizer}
      onSymbolizerChange={onSymbolizerChange}
      unknownSymbolizerText="Unknown Symbolizer"
    />
  );
}

<EditorExample />
```

This demonstrates the use of `Editor` with `GeoStylerContext`.

```jsx
import React, { useState } from 'react';
import { Switch } from 'antd';
import { Editor, GeoStylerContext } from 'geostyler';

function EditorExample () {
  const [myContext, setMyContext] = useState({
    composition: {
      MarkEditor: {
        visibility: true
      },
      FillEditor: {
        visibility: true
      },
      IconEditor: {
        visibility: true
      },
      LineEditor: {
        visibility: true
      },
      TextEditor: {
        visibility: true
      },
      RasterEditor: {
        visibility: true
      }
    }
  });

  const [style, setStyle] = useState({
    symbolizer: {
      kind: 'Mark',
      wellKnownName: 'circle'
    }
  });

  const onSymbolizerChange = (symbolizer) => {
    setStyle({symbolizer});
  };

  const onVisibilityChange = (visibility, editor) => {
    setMyContext(oldContext => {
      const newContext = {...oldContext};
      newContext.composition[editor].visibility = visibility;
      return newContext;
    });
  };

  return (
    <div>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '15px'}}>
        <Switch
          checked={myContext.composition.MarkEditor.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'MarkEditor')}}
          checkedChildren="Mark"
          unCheckedChildren="Mark"
        />
        <Switch
          checked={myContext.composition.FillEditor.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'FillEditor')}}
          checkedChildren="Fill"
          unCheckedChildren="Fill"
        />
        <Switch
          checked={myContext.composition.IconEditor.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'IconEditor')}}
          checkedChildren="Icon"
          unCheckedChildren="Icon"
        />
        <Switch
          checked={myContext.composition.LineEditor.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'LineEditor')}}
          checkedChildren="Line"
          unCheckedChildren="Line"
        />
        <Switch
          checked={myContext.composition.TextEditor.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'TextEditor')}}
          checkedChildren="Text"
          unCheckedChildren="Text"
        />
        <Switch
          checked={myContext.composition.RasterEditor.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'RasterEditor')}}
          checkedChildren="Raster"
          unCheckedChildren="Raster"
        />
      </div>
      <hr/>
      <GeoStylerContext.Provider value={myContext}>
        <Editor
          symbolizer={style.symbolizer}
          onSymbolizerChange={onSymbolizerChange}
          unknownSymbolizerText="Unknown Symbolizer"
        />
      </GeoStylerContext.Provider>
    </div>
  );
}

<EditorExample />
```
