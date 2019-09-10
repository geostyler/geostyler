import * as React from 'react';

export interface Compositions {
  LineEditor?: {
    widthField?: React.ReactElement | false;
    colorField?: React.ReactElement | false;
    opacityField?: React.ReactElement | false;
    dashPatternField?: React.ReactElement | false;
    dashOffsetField?: React.ReactElement | false;
    capField?: React.ReactElement | false;
    JoinField?: React.ReactElement | false;
    GraphicStrokeField?: React.ReactElement | false;
    GraphicFillField?: React.ReactElement | false;
  }
}

export const CompositionContext = React.createContext({});
