<!--
 * Released under the BSD 2-Clause License
 *
 * Copyright © 2023-present, terrestris GmbH & Co. KG and GeoStyler contributors
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

This demonstrates the usage of the `FunctionUI` component. Choose one of the types
'string', 'number' or 'boolean'. Then select one of the corresponding functions
from the dropdown.

```jsx
import React, { useState } from 'react';
import { FunctionUI } from 'geostyler';
import { Radio } from 'antd';

const FunctionUIExample = () => {

  const [type, setType] = useState('string');
  const [gsFunction, setGsFunction] = useState();

  const style = {
    height: '300px',
    width: '300px'
  };

  const onChange = (evt) => {
    setType(evt.target.value);
    setGsFunction();
  };

  return (
    <div style={style}>
      Function Type:
      <Radio.Group onChange={onChange} value={type} >
        <Radio.Button value="string">string</Radio.Button>
        <Radio.Button value="number">number</Radio.Button>
        <Radio.Button value="boolean">boolean</Radio.Button>
      </Radio.Group>
      <div style={{height: '10px'}} />
      <FunctionUI
        type={type}
        value={gsFunction}
        onChange={setGsFunction}
      />
    </div>
  );
}

<FunctionUIExample />
```
