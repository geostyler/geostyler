This demonstrates the use of `SizeField`.

```jsx
import * as React from 'react';
import { SizeField } from 'geostyler';

class SizeFieldExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      size: 10
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(size) {
    this.setState({
      size: size
    });
  }

  render() {
    const {
      size
    } = this.state;

    return (
      <SizeField
        size={size}
        onChange={this.onChange}
      />
    );
  }
}

<SizeFieldExample />
```
