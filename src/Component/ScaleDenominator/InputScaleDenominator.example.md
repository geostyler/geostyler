<!-- This file is released under the BSD 2-Clause License. -->

This demonstrates the use of InputScaleDenominator.

```jsx
import React, { useState } from "react";
import { InputScaleDenominator } from "geostyler";

const InputScaleDenominatorExample = () => {
  const [scaleDenominator, setScaleDenominator] = useState({
    min: 1000,
    max: 10000,
  });

  return (
    <InputScaleDenominator
      scaleDenominator={scaleDenominator}
      onChange={setScaleDenominator}
    />
  );
};

<InputScaleDenominatorExample />;
```
