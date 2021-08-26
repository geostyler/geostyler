<!--
 * Released under the BSD 2-Clause License
 *
 * Copyright © 2021-present, terrestris GmbH & Co. KG and GeoStyler contributors
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

This demonstrates the use of `ExpressionField`.

ExpressionField accepts any type of valid `geostyler-style` expression, i.e. `LiteralValue`, `PropertyName` and `FunctionCall`.

Providing `LiteralValue`:

```jsx
import * as React from 'react';
import { ExpressionField } from 'geostyler';

class ExpressionFieldExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expression: {
        type: 'literal',
        value: '#000000'
      }
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(expression) {
    this.setState({
      expression
    });
  }

  render() {
    const {
      expression
    } = this.state;

    return (
      <ExpressionField
        expression={expression}
        onChange={this.onChange}
      />
    );
  }
}

<ExpressionFieldExample />
```

Providing `PropertyName`:

```jsx
import * as React from 'react';
import { ExpressionField } from 'geostyler';

class ExpressionFieldExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expression: {
        type: 'property',
        value: 'MY_PROPERTY_NAME'
      }
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(expression) {
    this.setState({
      expression
    });
  }

  render() {
    const {
      expression
    } = this.state;

    return (
      <ExpressionField
        expression={expression}
        onChange={this.onChange}
      />
    );
  }
}

<ExpressionFieldExample />
```

Providing `FunctionCall`:

```jsx
import * as React from 'react';
import { ExpressionField } from 'geostyler';

class ExpressionFieldExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expression: {
        type: 'functioncall',
        name: 'Categorize',
        args: [{
          type: 'property',
          name: 'TEST_PROPERTY'
        }, {
          type: 'literal',
          value: '#000000'
        }, {
          type: 'property',
          name: 'TEST_PROPERTY'
        }, {
          type: 'literal',
          value: '#0000ff'
        }, {
          type: 'literal',
          value: '2500'
        }, {
          type: 'literal',
          value: '#00ff00'
        }]
      }
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(expression) {
    this.setState({
      expression
    });
  }

  render() {
    const {
      expression
    } = this.state;

    return (
      <ExpressionField
        expression={expression}
        onChange={this.onChange}
      />
    );
  }
}

<ExpressionFieldExample />
```
