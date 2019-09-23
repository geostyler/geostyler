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
  FillEditor?: {
    fillColorField?: React.ReactElement | false;
    fillOpacityField?: React.ReactElement | false;
    outlineColorField?: React.ReactElement | false;
    outlineWidthField?: React.ReactElement | false;
    outlineDasharrayField?: React.ReactElement | false;
    graphicEditorField?: React.ReactElement | false;
  };
  TextEditor?: {
    templateField?: React.ReactElement | false;
    colorField?: React.ReactElement | false;
    fontField?: React.ReactElement | false;
    opacityField?: React.ReactElement | false;
    sizeField?: React.ReactElement | false;
    offsetXField?: React.ReactElement | false;
    offsetYField?: React.ReactElement | false;
    rotateField?: React.ReactElement | false;
    haloColorField?: React.ReactElement | false;
    haloWidthField?: React.ReactElement | false;
  };
  RasterEditor?: {
    opacityField?: React.ReactElement | false;
    contrastEnhancementField?: React.ReactElement | false;
    gammaValueField?: React.ReactElement | false;
    rasterChannelField?: React.ReactElement | false;
    colorMapField?: React.ReactElement | false;
  };
  MarkEditor?: {
    wellKnownNameField?: React.ReactElement | false;
  };
}

export const CompositionContext = React.createContext({});
