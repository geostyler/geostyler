<!-- This file is released under the BSD 2-Clause License. -->

This demonstrates the use of StepInput.

```jsx
import React, { useState } from "react";
import { StepInput } from "geostyler";

const StepInputExample = () => {
  const [stepParam, setStepParam] = useState({
    boundary: 100,
    value: "red",
  });

  return <StepInput value={stepParam} onChange={setStepParam} type="string" />;
};

<StepInputExample />;
```
