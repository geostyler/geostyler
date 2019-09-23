import * as React from 'react';

export interface Compositions {
  LineEditor?: {
    widthField?: React.ReactElement | false;
    colorField?: React.ReactElement | false;
    opacityField?: React.ReactElement | false;
    lineDashField?: React.ReactElement | false;
    dashOffsetField?: React.ReactElement | false;
    capField?: React.ReactElement | false;
    joinField?: React.ReactElement | false;
    graphicStrokeField?: React.ReactElement | false;
    graphicFillField?: React.ReactElement | false;
  };
  IconEditor?: {
    imageField?: React.ReactElement | false;
    sizeField?: React.ReactElement | false;
    rotateField?: React.ReactElement | false;
    opacityField?: React.ReactElement | false;
  };
}

export const CompositionContext = React.createContext({});
