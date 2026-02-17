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

This demonstrates the usage of the `TextFilterField` component.

```jsx
import React, { useState } from "react";
import { TextFilterField } from "geostyler";

function TextFilterFieldExample() {
  const [value, setValue] = useState("Berlin");

  return (
    <>
      <TextFilterField value={value} onValueChange={setValue} />
      <div>Current value: {value}</div>
    </>
  );
}

<TextFilterFieldExample />;
```

This demonstrates the usage of the `TextFilterField` with autocomplete suggestions from data.

```jsx
import React, { useState } from "react";
import { TextFilterField, GeoStylerContext } from "geostyler";

function TextFilterFieldExample() {
  const [value, setValue] = useState("Berlin");

  const context = {
    data: {
      schema: {
        type: "object",
        properties: {
          city: { type: "string" },
        },
      },
      exampleFeatures: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: { city: "Berlin" },
            geometry: null,
          },
          {
            type: "Feature",
            properties: { city: "Hamburg" },
            geometry: null,
          },
          {
            type: "Feature",
            properties: { city: "Munich" },
            geometry: null,
          },
        ],
      },
    },
  };

  return (
    <GeoStylerContext.Provider value={context}>
      <TextFilterField
        value={value}
        onValueChange={setValue}
        selectedAttribute="city"
      />
      <div>Current value: {value}</div>
    </GeoStylerContext.Provider>
  );
}

<TextFilterFieldExample />;
```

This demonstrates the usage of the `TextFilterField` with validation.

```jsx
import React, { useState } from "react";
import { TextFilterField } from "geostyler";

function TextFilterFieldExample() {
  const [value, setValue] = useState("");

  return (
    <>
      <TextFilterField
        value={value}
        onValueChange={setValue}
        validateStatus={value ? "success" : "error"}
      />
      <div>Current value: {value || "empty"}</div>
    </>
  );
}

<TextFilterFieldExample />;
```
