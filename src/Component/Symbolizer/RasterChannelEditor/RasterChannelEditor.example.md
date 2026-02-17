<!-- This file is released under the BSD 2-Clause License. -->

This demonstrates the use of RasterChannelEditor.

```jsx
import React, { useState } from "react";
import { RasterChannelEditor } from "geostyler";

const RasterChannelEditorExample = () => {
  const [channelSelection, setChannelSelection] = useState({
    grayChannel: {
      sourceChannelName: "1",
    },
  });

  return (
    <RasterChannelEditor
      sourceChannelNames={["1", "2", "3"]}
      channelSelection={channelSelection}
      onChange={setChannelSelection}
    />
  );
};

<RasterChannelEditorExample />;
```
