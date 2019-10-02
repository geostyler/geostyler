import * as React from 'react';

/**
 * Creates the CompositionContext used for customising
 * specified components. Components can be replaced or
 * disabled.
 *
 * Definition of the compositions object.
 * This object can be used for a CompositionContext
 * to describe which components should be replaced
 * or disabled. For replacing a component, another
 * React component needs to be set as value. By
 * assigning "false", the component will be disabled.
 *
 * Important: Context overrides the onChange and value
 * properties for a custom component. This may lead to
 * sideeffects if these props are used elsewhere.
 */
export interface Compositions {
  Editor?: {
    kindField?: React.ReactElement | false;
    markEditor?: React.ReactElement | false;
    iconEditor?: React.ReactElement | false;
    lineEditor?: React.ReactElement | false;
    fillEditor?: React.ReactElement | false;
    textEditor?: React.ReactElement | false;
    rasterEditor?: React.ReactElement | false;
  };
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
  WellKnownNameEditor?: {
    radiusField?: React.ReactElement | false;
    fillColorField?: React.ReactElement | false;
    fillOpacityField?: React.ReactElement | false;
    strokeColorField?: React.ReactElement | false;
    strokeWidthField?: React.ReactElement | false;
    strokeOpacityField?: React.ReactElement | false;
    rotateField?: React.ReactElement | false;
  };
}

export const CompositionContext = React.createContext({});
