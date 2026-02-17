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

This demonstrates the usage of the `ColorMapEditor` component with a basic color map.

```jsx
import React, { useState } from "react";
import { ColorMapEditor } from "geostyler";

function ColorMapEditorExample() {
  const [colorMap, setColorMap] = useState({
    type: "ramp",
    colorMapEntries: [
      { color: "#0000FF", quantity: 0 },
      { color: "#00FFFF", quantity: 10 },
      { color: "#00FF00", quantity: 20 },
      { color: "#FFFF00", quantity: 30 },
      { color: "#FF0000", quantity: 40 },
    ],
  });

  return (
    <>
      <ColorMapEditor colorMap={colorMap} onChange={setColorMap} />
      <div>Color map entries: {colorMap.colorMapEntries.length}</div>
    </>
  );
}

<ColorMapEditorExample />;
```

This demonstrates the usage of the `ColorMapEditor` with an intervals color map.

```jsx
import React, { useState } from "react";
import { ColorMapEditor } from "geostyler";

function ColorMapEditorExample() {
  const [colorMap, setColorMap] = useState({
    type: "intervals",
    colorMapEntries: [
      { color: "#0000FF", quantity: 10, label: "Low" },
      { color: "#00FF00", quantity: 50, label: "Medium" },
      { color: "#FF0000", quantity: 100, label: "High" },
    ],
  });

  return (
    <>
      <ColorMapEditor colorMap={colorMap} onChange={setColorMap} />
    </>
  );
}

<ColorMapEditorExample />;
```
