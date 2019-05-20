import * as React from 'react';

import {
  FunctionFilter as GsFunctionFilter
} from 'geostyler-style';

import {
  Data as Data
} from 'geostyler-data';
import StrMatchesFunctionFilter from './StrMatchesFunctionFilter/StrMatchesFunctionFilter';

// non default props
export interface FunctionFilterProps {
  /** Reference to internal data object (holding schema and example features) */
  internalDataDef?: Data;
  /** Callback function for onFilterChange */
  filter: GsFunctionFilter;
  /** Callback function for onFilterChange */
  onFilterChange: ((FunctionFilter: GsFunctionFilter) => void);
}

/**
 * UI for a FunctionFilter
 *
 */
export class FunctionFilter extends React.Component<FunctionFilterProps> {

  getFilterUi(): React.ReactNode {
    const {
      filter,
      onFilterChange
    } = this.props;
    const functionName = filter[0];

    switch (functionName) {
      case 'FN_strMatches':
        return <StrMatchesFunctionFilter
          filter={filter}
          onFilterChange={onFilterChange}
        />;
      default:
        return <StrMatchesFunctionFilter
        filter={filter}
          onFilterChange={onFilterChange}
        />;
    }

  }

  render() {
    return this.getFilterUi();
  }
}

export default FunctionFilter;
