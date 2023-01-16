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

This demonstrates the use of `RuleGenerator`.

```jsx
import React, { useEffect, useState } from 'react';
import { RuleGenerator, RuleTable } from 'geostyler';
import Parser from 'geostyler-geojson-parser';

const geojson = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          90.0,
          10.0
        ]
      },
      "properties": {
        "name": "point_0",
        "distance [m]": 10
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          90.01,
          10.0
        ]
      },
      "properties": {
        "name": "point_1",
        "distance [m]": 11
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          90.02,
          10.0
        ]
      },
      "properties": {
        "name": "point_2",
        "distance [m]": 12
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          90.03,
          10.0
        ]
      },
      "properties": {
        "name": "point_3",
        "distance [m]": 13
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          90.04,
          10.0
        ]
      },
      "properties": {
        "name": "point_4",
        "distance [m]": 14
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          90.05,
          10.0
        ]
      },
      "properties": {
        "name": "point_5",
        "distance [m]": 15
      }
    }
  ]
};

const RuleGeneratorExample = ({}) => {

  const [data, setData] = useState();
  const [rules, setRules] = useState();

  const readData = async () => {
    const parser = new Parser();
    const newData = await parser.readData(geojson);
    setData(newData);
  };

  useEffect(() => {
    readData();
  }, [Parser])

  return (
    <div>
      <RuleGenerator internalDataDef={data} onRulesChange={setRules} />
      <RuleTable rules={rules} />
    </div>
  );
}

<RuleGeneratorExample />
```
