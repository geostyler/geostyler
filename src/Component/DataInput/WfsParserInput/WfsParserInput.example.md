<!-- This file is released under the BSD 2-Clause License. -->

This demonstrates the use of WfsParserInput.

```jsx
import React, { useState } from "react";
import { WfsParserInput } from "geostyler";

const WfsParserInputExample = () => {
  const [wfsParams, setWfsParams] = useState();

  return (
    <>
      <WfsParserInput onClick={setWfsParams} />
      <pre>{JSON.stringify(wfsParams, null, 2)}</pre>
    </>
  );
};

<WfsParserInputExample />;
```
