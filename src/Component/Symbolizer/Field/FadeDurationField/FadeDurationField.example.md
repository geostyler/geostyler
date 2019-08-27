This demonstrates the use of `FadeDurationField`.

```jsx
import * as React from 'react';
import FadeDurationField from './FadeDurationField';

class FadeDurationFieldExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fadeDuration: 300
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(fadeDuration) {
    this.setState({
      fadeDuration: fadeDuration
    });
  }

  render() {
    const {
      fadeDuration
    } = this.state;

    return (
      <FadeDurationField
        onChange={this.onChange}
      />
    );
  }
}

<FadeDurationFieldExample />
```
