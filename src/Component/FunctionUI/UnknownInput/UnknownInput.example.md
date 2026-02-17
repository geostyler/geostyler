<!-- This file is released under the BSD 2-Clause License. -->

This demonstrates the use of UnknownInput.

```jsx
import React, { useState } from "react";
import { UnknownInput } from "geostyler";

const UnknownInputExample = () => {
  const [value, setValue] = useState("Sample Text");

  return <UnknownInput value={value} onChange={setValue} />;
};

<UnknownInputExample />;
```
