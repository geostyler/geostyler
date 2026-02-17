<!--
 * Released under the BSD 2-Clause License
 *
 * Copyright © 2023-present, terrestris GmbH & Co. KG and GeoStyler contributors
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

This demonstrates the usage of the `StringExpressionInput` component with a simple string value.

```jsx
import React, { useState } from "react";
import { StringExpressionInput } from "geostyler";

function StringExpressionInputExample() {
  const [value, setValue] = useState("Berlin");

  return (
    <>
      <StringExpressionInput value={value} onChange={setValue} />
      <div>Current value: {JSON.stringify(value)}</div>
    </>
  );
}

<StringExpressionInputExample />;
```

This demonstrates the usage of the `StringExpressionInput` with a GeoStyler function.

```jsx
import React, { useState } from "react";
import { StringExpressionInput, GeoStylerContext } from "geostyler";

function StringExpressionInputExample() {
  const [value, setValue] = useState({
    name: "property",
    args: ["name"],
  });

  const context = {
    data: {
      schema: {
        type: "object",
        properties: {
          name: { type: "string" },
          city: { type: "string" },
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
      <StringExpressionInput
        value={value}
        onChange={setValue}
        onCancel={() => setValue("")}
      />
      <div>Current value: {JSON.stringify(value)}</div>
    </GeoStylerContext.Provider>
  );
}

<StringExpressionInputExample />;
```
