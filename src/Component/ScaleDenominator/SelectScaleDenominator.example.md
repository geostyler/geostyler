<!-- This file is released under the BSD 2-Clause License. -->

This demonstrates the use of SelectScaleDenominator.

```jsx
import React, { useState } from "react";
import { SelectScaleDenominator } from "geostyler";

const SelectScaleDenominatorExample = () => {
  const [scaleDenominator, setScaleDenominator] = useState({
    min: 5000,
    max: 25000,
  });

  const scales = {
    1000: 1000,
    5000: 5000,
    25000: 25000,
    100000: 100000,
  };

  return (
    <SelectScaleDenominator
      scaleDenominators={scales}
      scaleDenominator={scaleDenominator}
      onChange={setScaleDenominator}
    />
  );
};

<SelectScaleDenominatorExample />;
```
