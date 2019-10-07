`CompositionContext` lets you disable fields and editors and/or replace fields with custom components.

In order to compose your own editors, one CompositionContext provider has to be wrapped around the editor(s) to customize. All configurations have to be set within the object passed to the value property of CompositionContext. The corresponding interface is defined in `src/Components/CompositionContext/CompositionContext.tsx`.

#### Disable single field

Disables/Enables rotation field in IconEditor.

```jsx
import * as React from 'react';
import { CompositionContext, IconEditor } from 'geostyler';
import { Switch } from 'antd';

class CompositionContextExample extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      symbolizer: {
        kind: 'Icon'
      },
      enableRotation: false
    }

    this.onSymbolizerChange = this.onSymbolizerChange.bind(this);
    this.onRotationChange = this.onRotationChange.bind(this);
  }

  onSymbolizerChange(symbolizer) {
    this.setState({
      symbolizer: symbolizer
    });
  }

  onRotationChange(enable) {
    this.setState({
      enableRotation: enable
    });
  }

  render() {
    const {
      symbolizer,
      enableRotation
    } = this.state;

    const composition = {
      IconEditor: {
        rotateField: enableRotation ? undefined : false
      }
    };

    return (
      <div>
        <span>Enable rotation field </span>
        <Switch
          checked={enableRotation}
          onChange={this.onRotationChange}
          checkedChildren="true"
          unCheckedChildren="false"
        />
        <hr/>
        <CompositionContext.Provider value={composition}>
          <IconEditor 
            symbolizer={symbolizer}
            onSymbolizerChange={this.onSymbolizerChange}
          />
        </CompositionContext.Provider>
      </div>
    );
  }
}

<CompositionContextExample />
```

#### Replace field with custom field
Replaces rotation field with custom component that limits the rotation to 90 degrees in each direction.
```jsx
import * as React from 'react';
import { CompositionContext, IconEditor } from 'geostyler';
import { Switch, InputNumber } from 'antd';

class CompositionContextExample extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      symbolizer: {
        kind: 'Icon',
        rotate: 180
      },
      customRotation: false
    }

    this.onSymbolizerChange = this.onSymbolizerChange.bind(this);
    this.toggleCustomRotation = this.toggleCustomRotation.bind(this);
  }

  onSymbolizerChange(symbolizer) {
    this.setState({
      symbolizer: symbolizer
    });
  }

  toggleCustomRotation(enable) {
    this.setState({
      customRotation: enable
    });
  }

  render() {
    const {
      symbolizer,
      customRotation
    } = this.state;

    const composition = {
      IconEditor: {
        rotateField: customRotation ? (
          <InputNumber
            className="editor-field rotate-field"
            min={-90}
            max={90}
            value={symbolizer.rotate}
          />
        ) : undefined
      }
    };

    return (
      <div>
        <span>Use custom component </span>
        <Switch
          checked={customRotation}
          onChange={this.toggleCustomRotation}
          checkedChildren="true"
          unCheckedChildren="false"
        />
        <hr/>
        <CompositionContext.Provider value={composition}>
          <IconEditor 
            symbolizer={symbolizer}
            onSymbolizerChange={this.onSymbolizerChange}
          />
        </CompositionContext.Provider>
      </div>
    );
  }
}

<CompositionContextExample />
```