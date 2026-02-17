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

This demonstrates the usage of the `FilterEditorWindow` component.

```jsx
import React, { useState } from "react";
import { FilterEditorWindow, GeoStylerContext } from "geostyler";
import { Button } from "antd";

function FilterEditorWindowExample() {
  const [filter, setFilter] = useState(["==", "name", "Berlin"]);
  const [isOpen, setIsOpen] = useState(false);

  const context = {
    data: {
      schema: {
        type: "object",
        properties: {
          name: { type: "string" },
          population: { type: "number" },
        },
      },
      exampleFeatures: {
        type: "FeatureCollection",
        features: [],
      },
    },
  };

  return (
    <GeoStylerContext.Provider value={context}>
      <Button onClick={() => setIsOpen(true)}>Open Filter Editor</Button>
      {isOpen && (
        <FilterEditorWindow
          open={true}
          filter={filter}
          onFilterChange={setFilter}
          onClose={() => setIsOpen(false)}
        />
      )}
      <div style={{ marginTop: "10px" }}>
        Current filter: {JSON.stringify(filter)}
      </div>
    </GeoStylerContext.Provider>
  );
}

<FilterEditorWindowExample />;
```

This demonstrates the usage of the `FilterEditorWindow` with a complex filter.

```jsx
import React, { useState } from "react";
import { FilterEditorWindow, GeoStylerContext } from "geostyler";
import { Button } from "antd";

function FilterEditorWindowExample() {
  const [filter, setFilter] = useState([
    "&&",
    ["==", "name", "Berlin"],
    [">", "population", 1000000],
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const context = {
    data: {
      schema: {
        type: "object",
        properties: {
          name: { type: "string" },
          population: { type: "number" },
          area: { type: "number" },
        },
      },
      exampleFeatures: {
        type: "FeatureCollection",
        features: [],
      },
    },
  };

  return (
    <GeoStylerContext.Provider value={context}>
      <Button onClick={() => setIsOpen(true)}>Open Filter Editor</Button>
      {isOpen && (
        <FilterEditorWindow
          open={true}
          filter={filter}
          onFilterChange={setFilter}
          onClose={() => setIsOpen(false)}
        />
      )}
      <div style={{ marginTop: "10px" }}>
        Current filter: {JSON.stringify(filter)}
      </div>
    </GeoStylerContext.Provider>
  );
}

<FilterEditorWindowExample />;
```
