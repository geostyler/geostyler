This demonstrates the use of `ContrastField`.

```jsx
import * as React from 'react';
import { ContrastField } from 'geostyler';

class ContrastFieldExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contrast: 0
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(contrast) {
    this.setState({
      contrast: contrast
    });
  }

  render() {
    const {
      contrast
    } = this.state;

    return (
      <ContrastField
        contrast={contrast}
        onChange={this.onChange}
      />
    );
  }
}

<ContrastFieldExample />
```
