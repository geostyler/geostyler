This demonstrates the use of `GammaField`.

```jsx
import * as React from 'react';

class GammaFieldExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gamma: 10
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(gamma) {
    this.setState({
      gamma: gamma
    });
  }

  render() {
    const {
      gamma
    } = this.state;

    return (
      <BrightnessField
        gamma={gamma}
        onChange={this.onChange}
      />
    );
  }
}

<GammaFieldExample />
```
