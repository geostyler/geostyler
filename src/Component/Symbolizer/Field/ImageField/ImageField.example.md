This demonstrates the use of `ImageField`.

```jsx
import * as React from 'react';

class ImageFieldExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.setState({
      value: value
    });
  }

  render() {
    const {
      value
    } = this.state;

    return (
      <ImageField
        value={value}
        placeholder="URL to image"
        onChange={this.onChange}
      />
    );
  }
}

<ImageFieldExample />
```
