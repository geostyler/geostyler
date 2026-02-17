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

This demonstrates the use of `ImageField`.

```jsx
import React, { useState } from "react";
import { ImageField } from "geostyler";

function ImageFieldExample() {
  const [value, setValue] = useState("");

  return (
    <ImageField value={value} placeholder="URL to image" onChange={setValue} />
  );
}

<ImageFieldExample />;
```

`ImageField` with a Sprite value.

```jsx
import React, { useState } from "react";
import { OlRenderer } from "geostyler";

const ImageFieldExample = () => {
  const [value, setValue] = useState({
    source: "./Geo_Styler_Logo_300_RGB.jpg",
    position: [164, 33],
    size: [95, 110],
  });

  return <ImageField value={value} onChange={setValue} />;
};

<ImageFieldExample />;
```

`ImageField` with iconLibraries.

```jsx
import React, { useState } from "react";
import { ImageField } from "geostyler";

function ImageFieldExample() {
  const [value, setValue] = useState("");

  const iconLibraries = [
    {
      name: "foo",
      icons: [
        {
          src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Parking_icon.svg/128px-Parking_icon.svg.png",
          caption: "Parking",
        },
        {
          src: "https://raw.githubusercontent.com/geostyler/geostyler/master/public/logo.svg",
          caption: "GeoStyler Logo",
        },
      ],
    },
    {
      name: "bar",
      icons: [
        {
          src: "https://upload.wikimedia.org/wikipedia/commons/a/ac/RWB-RWBA_Autobahn.svg",
          caption: "Highway",
        },
      ],
    },
  ];

  return (
    <ImageField
      value={value}
      placeholder="URL to image"
      onChange={setValue}
      iconLibraries={iconLibraries}
    />
  );
}

<ImageFieldExample />;
```

`ImageField` with custom implementation of iconLibraries view.

```jsx
import React, { useState } from "react";
import { ImageField } from "geostyler";

function ImageFieldExample() {
  const [value, setValue] = useState("");
  const [customViewOpened, setCustomViewOpened] = useState(false);

  const iconLibraries = [
    {
      name: "foo",
      icons: [
        {
          src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Parking_icon.svg/128px-Parking_icon.svg.png",
          caption: "Parking",
        },
        {
          src: "https://raw.githubusercontent.com/geostyler/geostyler/master/public/logo.svg",
          caption: "GeoStyler Logo",
        },
      ],
    },
    {
      name: "bar",
      icons: [
        {
          src: "https://upload.wikimedia.org/wikipedia/commons/a/ac/RWB-RWBA_Autobahn.svg",
          caption: "Highway",
        },
      ],
    },
  ];

  return (
    <>
      <ImageField
        value={value}
        placeholder="URL to image"
        onChange={setValue}
        iconLibraries={iconLibraries}
        windowless={true}
        onIconLibrariesClick={() => setCustomViewOpened(true)}
      />
      {customViewOpened && (
        <div style={{ border: "solid lightgrey" }}>
          Implement your custom iconLibraries view here, or anywhere you like.
          <button onClick={() => setCustomViewOpened(false)}>Close</button>
        </div>
      )}
    </>
  );
}

<ImageFieldExample />;
```
