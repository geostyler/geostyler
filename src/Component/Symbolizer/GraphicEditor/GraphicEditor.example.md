This demonstrates the use of `GraphicEditor`.

```jsx
import * as React from 'react';
import { GraphicEditor } from 'geostyler';

class GraphicEditorExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      graphic: {
        kind: 'Mark',
        wellKnownName: 'Circle'
      },
      graphicType: 'Mark'
    };

    this.onGraphicChange = this.onGraphicChange.bind(this);
  }

  onGraphicChange(graphic) {
    this.setState({
      graphic: graphic,
      graphicType: graphic.kind
    });
  }

  render() {
    const {
      graphic,
      graphicType
    } = this.state;

    return (
      <GraphicEditor
        graphic={graphic}
        graphicType={graphicType}
        onGraphicChange={this.onGraphicChange}
      />
    );
  }
}

<GraphicEditorExample />
```
