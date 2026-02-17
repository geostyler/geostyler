<!-- This file is released under the BSD 2-Clause License. -->

This demonstrates the use of FunctionNameCombo.

```jsx
import React, { useState } from "react";
import { FunctionNameCombo } from "geostyler";

const FunctionNameComboExample = () => {
  const [functionName, setFunctionName] = useState("Case");

  return (
    <FunctionNameCombo
      value={functionName}
      onChange={setFunctionName}
      type="string"
    />
  );
};

<FunctionNameComboExample />;
```
