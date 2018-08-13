import * as React from 'react';

import {
  Symbolizer,
  MarkSymbolizer,
  WellKnownName,
  CircleSymbolizer,
  SquareSymbolizer,
  TriangleSymbolizer,
  StarSymbolizer,
  CrossSymbolizer,
  XSymbolizer
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

  getDefaultMarkSymbolizer = (wkn: WellKnownName): MarkSymbolizer => {
    switch (wkn) {
      case 'Circle':
        const circleSymbolizer: CircleSymbolizer = {
          kind: 'Mark',
          wellKnownName: 'Circle'
        };
        return circleSymbolizer;
      case 'Square':
        const squareSymbolizer: SquareSymbolizer = {
          kind: 'Mark',
          wellKnownName: 'Square',
          angle: 45,
          points: 4
        };
        return squareSymbolizer;
      case 'Triangle':
        const triangleSymbolizer: TriangleSymbolizer = {
          kind: 'Mark',
          wellKnownName: 'Triangle',
          points: 3
        };
        return triangleSymbolizer;
      case 'Star':
        const starSymbolizer: StarSymbolizer = {
          kind: 'Mark',
          wellKnownName: 'Star',
          points: 5
        };
        return starSymbolizer;
      case 'Cross':
        const crossSymbolizer: CrossSymbolizer = {
          kind: 'Mark',
          wellKnownName: 'Cross',
          points: 4,
          radius2: 0
        };
        return crossSymbolizer;
      case 'X':
        const xSymbolizer: XSymbolizer = {
          kind: 'Mark',
          wellKnownName: 'X',
          points: 4,
          angle: 45,
          radius2: 0
        };
        return xSymbolizer;
      default:
        const defaultSymbolizer: CircleSymbolizer = {
          kind: 'Mark',
          wellKnownName: 'Circle'
        };
        return defaultSymbolizer;
    }
  }

  render() {
    const symbolizer = _cloneDeep(this.state.symbolizer);

    return (
      <div className="gs-mark-symbolizer-editor" >
        <WellKnownNameField
          wellKnownName={symbolizer.wellKnownName}
          onChange={(wkn: WellKnownName) => {
            const newSymbolizer = this.getDefaultMarkSymbolizer(wkn);
            this.onSymbolizerChange(newSymbolizer);
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
