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

This demonstrates the usage of the `CodeEditor` component.

```jsx
import * as React from "react";
import { CodeEditor } from "geostyler";
import SldStyleParser from "geostyler-sld-parser";
import QgisStyleParser from "geostyler-qgis-parser";
import MapboxStyleParser from 'geostyler-mapbox-parser';

const CodeEditorExample = () => {
  const sldParser = new SldStyleParser({
    sldVersion: "1.1.0",
    builderOptions: {
      format: true,
    },
  });
  const qgisStyleParser = new QgisStyleParser();
  const mapboxStyleParser = new MapboxStyleParser({ pretty: true });
  const style = {
    name: "Demo Style",
    rules: [
      {
        name: "Rule 1",
        symbolizers: [
          {
            kind: "Mark",
            wellKnownName: "circle",
          },
        ],
      },
    ],
  };

  return (
    <div style={{ height: "300px" }}>
      <CodeEditor
        style={style}
        parsers={[sldParser, qgisStyleParser, mapboxStyleParser]}
        defaultParser={sldParser}
        showSaveButton={true}
        showCopyButton={true}
      />
    </div>
  );
}

<CodeEditorExample />;
```
