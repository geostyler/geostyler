import * as React from 'react';

import {
  Symbolizer,
  MarkSymbolizer,
  WellKnownName
} from 'geostyler-style';

import WellKnownNameField from '../Field/WellKnownNameField/WellKnownNameField';
import WellKnownNameEditor from '../WellKnownNameEditor/WellKnownNameEditor';

const _cloneDeep = require('lodash/cloneDeep');
const _isEqual = require('lodash/isEqual');

// non default props
interface MarkEditorProps {
  symbolizer: MarkSymbolizer;
  onSymbolizerChange: ((changedSymb: Symbolizer) => void);
}

interface MarkEditorState {
  symbolizer: MarkSymbolizer;
}

class MarkEditor extends React.Component<MarkEditorProps, MarkEditorState> {

  constructor(props: MarkEditorProps) {
    super(props);
    this.state = {
      symbolizer: {
        kind: 'Mark',
        wellKnownName: 'Circle'
      }
    };
  }

  static getDerivedStateFromProps(
      nextProps: MarkEditorProps,
      prevState: MarkEditorState): Partial<MarkEditorState> {
    return {
      symbolizer: nextProps.symbolizer
    };
  }

  public shouldComponentUpdate(nextProps: MarkEditorProps, nextState: MarkEditorState): boolean {
    const diffProps = !_isEqual(this.props, nextProps);
    const diffState = !_isEqual(this.state, nextState);
    return diffProps || diffState;
  }

  onSymbolizerChange = (symbolizer: Symbolizer) => {
    this.props.onSymbolizerChange(symbolizer);
  }

  onWellKnownNameChange = (wkn: WellKnownName) => {
    const symbolizer = _cloneDeep(this.state.symbolizer);
    symbolizer.wellKnownName = wkn;
    this.onSymbolizerChange(symbolizer);
  }

  render() {
    const {
      symbolizer
     } = this.state;

    return (
      <div className="gs-mark-symbolizer-editor" >
        <WellKnownNameField
          wellKnownName={symbolizer.wellKnownName}
          onChange={this.onWellKnownNameChange}
        />
        <WellKnownNameEditor
          symbolizer={symbolizer}
          onSymbolizerChange={this.onSymbolizerChange}
        />
      </div>
    );
  }
}

export default MarkEditor;
