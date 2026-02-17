<!-- This file is released under the BSD 2-Clause License. -->

This demonstrates the use of CaseInput.

```jsx
import React, { useState } from "react";
import { CaseInput } from "geostyler";

const CaseInputExample = () => {
  const [caseParam, setCaseParam] = useState({
    case: ["==", "population", 1000000],
    value: "Large City",
  });

  return <CaseInput value={caseParam} onChange={setCaseParam} type="string" />;
};

<CaseInputExample />;
```
