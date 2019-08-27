This demonstrates the use of `SaturationField`.

```jsx
import * as React from 'react';
import SaturationField from './SaturationField';

class SaturationFieldExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      saturation: 0
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(saturation) {
    this.setState({
      saturation: saturation
    });
  }

  render() {
    const {
      saturation
    } = this.state;

    return (
      <SaturationField
        saturation={saturation}
        onChange={this.onChange}
      />
    );
  }
}

<SaturationFieldExample />
```
