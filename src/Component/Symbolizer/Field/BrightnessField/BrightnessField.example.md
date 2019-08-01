This demonstrates the use of `BrightnessField`.

```jsx
import * as React from 'react';
import BrightnessField from './BrightnessField';

class BrightnessFieldExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      brightness: 10
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(brightness) {
    this.setState({
      brightness: brightness
    });
  }

  render() {
    const {
      brightness
    } = this.state;

    return (
      <BrightnessField
        brightness={brightness}
        onChange={this.onChange}
      />
    );
  }
}

<BrightnessFieldExample />
```
