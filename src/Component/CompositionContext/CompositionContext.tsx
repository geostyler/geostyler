import * as React from 'react';

export interface Compositions {
  LineEditor?: {
    colorField?: React.ReactNode | false;
  }
}

export const CompositionContext = React.createContext({});