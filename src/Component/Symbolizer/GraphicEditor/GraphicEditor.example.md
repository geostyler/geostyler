This demonstrates the use of GraphicEditor.

```jsx
const React = require('react');
const { GraphicEditor } = require('../../../index');
require('antd/dist/antd.css');

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
