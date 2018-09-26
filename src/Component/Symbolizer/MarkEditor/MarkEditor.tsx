import * as React from 'react';

import {
  Symbolizer,
  MarkSymbolizer,
  WellKnownName
} from 'geostyler-style';

import WellKnownNameField from '../Field/WellKnownNameField/WellKnownNameField';
import WellKnownNameEditor from '../WellKnownNameEditor/WellKnownNameEditor';

const _cloneDeep = require('lodash/cloneDeep');

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

  onSymbolizerChange = (symbolizer: Symbolizer) => {
    this.props.onSymbolizerChange(symbolizer);
  }

  render() {
    const symbolizer = _cloneDeep(this.state.symbolizer);

    return (
      <div className="gs-mark-symbolizer-editor" >
        <WellKnownNameField
          wellKnownName={symbolizer.wellKnownName}
          onChange={(wkn: WellKnownName) => {
            symbolizer.wellKnownName = wkn;
            this.onSymbolizerChange(symbolizer);
          }}
        />
        <WellKnownNameEditor
          symbolizer={symbolizer}
          onSymbolizerChange={(symb: Symbolizer) => {
            this.onSymbolizerChange(symb);
          }}
        />
      </div>
    );
  }
}

export default MarkEditor;
