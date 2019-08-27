This demonstrates the use of `OffsetField`.

```jsx
import * as React from 'react';
import { OffsetField } from 'geostyler';

class OffsetFieldExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 10
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(offset) {
    this.setState({
      offset: offset
    });
  }

  render() {
    const {
      offset
    } = this.state;

    return (
      <OffsetField
        offset={offset}
        onChange={this.onChange}
      />
    );
  }
}

<OffsetFieldExample />
```
