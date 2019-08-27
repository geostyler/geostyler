This demonstrates the use of `RadiusField`.

```jsx
import * as React from 'react';
import { RadiusField } from 'geostyler';

class RadiusFieldExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      radius: 10
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(radius) {
    this.setState({
      radius: radius
    });
  }

  render() {
    const {
      radius
    } = this.state;

    return (
      <RadiusField
        radius={radius}
        onChange={this.onChange}
      />
    );
  }
}

<RadiusFieldExample />
```
