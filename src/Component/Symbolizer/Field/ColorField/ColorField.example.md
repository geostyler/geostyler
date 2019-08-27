This demonstrates the use of `ColorField`.

```jsx
import * as React from 'react';
import ColorField from './ColorField';

class ColorFieldExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: '#000000'
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(color) {
    this.setState({
      color: color
    });
  }

  render() {
    const {
      color
    } = this.state;

    return (
      <ColorField
        color={color}
        label="Color"
        onChange={this.onChange}
      />
    );
  }
}

<ColorFieldExample />
```
