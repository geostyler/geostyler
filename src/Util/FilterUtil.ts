import {
  Filter,
  Operator,
  CombinationOperator,
  NegationOpertaor
} from 'geostyler-style';

import {
  Data
} from 'geostyler-data';

const _get = require('lodash/get');

/**
 * @class SymbolizerUtil
 */
class FilterUtil {

  static operatorMapping = {
    '&&': 'AND',
    '||': 'OR',
    '!': 'NOT'
  };

  /**
   * Transforms a filter into a CQL string.
   *
   * @param {Filter} filter A geostyler-style Filter.
   * @returns {string} A CQL string representation of the geostyler-style Filter.
   */
  static writeAsCql(filter: Filter, isChildFilter?: boolean): string {
    if (!filter) {
      return '';
    }
    const operator: Operator = filter[0];
    let cql: string = '';
    let isNestedFilter = false;

    if (FilterUtil.operatorMapping[operator]) {
      isNestedFilter = true;
    }

    if (isNestedFilter) {
      const nestedOperator: CombinationOperator | NegationOpertaor = FilterUtil.operatorMapping[operator];
      if (operator === '!') {
        const childFilter = FilterUtil.writeAsCql(filter[1]);
        cql = `(${nestedOperator} ${childFilter})`;
      } else {
        const childFilters = [...filter];
        childFilters.shift();
        const childCqls = childFilters.map((childFilter: Filter) => {
          return FilterUtil.writeAsCql(childFilter, true);
        });
        const joinedCqls = childCqls.join(` ${nestedOperator} `);
        cql += isChildFilter ? '(' : '';
        cql += `${joinedCqls}`;
        cql += isChildFilter ? ')' : '';
      }
    } else {
      const cqlOperator = operator === '==' ? '=' : operator;
      cql = `${filter[1]} ${cqlOperator} ${filter[2]}`;
    }

    return cql;
  }

  // TODO Parse cqlString and create a filter

  // /**
  //  * Transforms a CQL string into a filter.
  //  *
  //  * @param {string} cqlString  A CQL string representation of the geostyler-style Filter.
  //  * @returns {Filter}  A geostyler-style Filter
  //  */
  // static readFromCql(cqlString: string): Filter {
  //   let filter: Filter = [];
  //   return filter;
  // }

  /**
   * Handle nested filters.
   */
  static handleNestedFilter = (filter: Filter, feature: any): boolean => {
    switch (filter[0]) {
      case '&&':
        let intermediate = true;
        let restFilter = filter.slice(1);
        restFilter.forEach((f: Filter) => {
          if (!FilterUtil.featureMatchesFilter(f, feature)) {
            intermediate = false;
          }
        });
        return intermediate;
      case '||':
        intermediate = false;
        restFilter = filter.slice(1);
        restFilter.forEach((f: Filter) => {
          if (FilterUtil.featureMatchesFilter(f, feature)) {
            intermediate = true;
          }
        });
        return intermediate;
      case '!':
        return !FilterUtil.featureMatchesFilter(filter[1], feature);
      default:
        throw new Error(`Cannot parse Filter. Unknown combination or negation operator.`);
    }
  }

  /**
   * Handle simple filters, i.e. non-nested filters.
   */
  static handleSimpleFilter = (filter: Filter, feature: any): boolean => {
    const featureValue: any = _get(feature, 'properties[' + filter[1] + ']');
    const filterValue = filter[2];
    switch (filter[0]) {
      case '==':
        return (('' + featureValue) === ('' + filterValue));
      case '*=':
        if (featureValue && filterValue.length > featureValue.length) {
          return false;
        } else if (featureValue) {
          return (featureValue.indexOf(filterValue) !== -1);
        } else {
          return false;
        }
      case '!=':
        return (('' + featureValue) !== ('' + filterValue));
      case '<':
        return (parseFloat(featureValue) < parseFloat(filterValue));
      case '<=':
        return (parseFloat(featureValue) <= parseFloat(filterValue));
      case '>':
        return (parseFloat(featureValue) > parseFloat(filterValue));
      case '>=':
        return (parseFloat(featureValue) >= parseFloat(filterValue));
      default:
        throw new Error(`Cannot parse Filter. Unknown comparison operator.`);
    }
  }

  /**
   * Checks if a feature matches the specified filter.
   * Returns true if it matches, otherwise returns false.
   */
  static featureMatchesFilter = (filter: Filter, feature: any): boolean => {
    if (filter.length === 0) {
      return true;
    }
    let matchesFilter: boolean = true;
    const operator: Operator = filter[0];
    let isNestedFilter: boolean = false;
    if (FilterUtil.operatorMapping[operator]) {
      isNestedFilter = true;
    }
    if (isNestedFilter) {
      matchesFilter = FilterUtil.handleNestedFilter(filter, feature);
    } else {
      matchesFilter = FilterUtil.handleSimpleFilter(filter, feature);
    }
    return matchesFilter;
  }

  /**
   * Returns those features that match a given filter.
   * If no feature matches, returns an empty array.
   */
  static getMatches = (filter: Filter, data: Data): any[] => {
    const matches: any[] = [];
    data.exampleFeatures.features.forEach(feature => {
      const match = FilterUtil.featureMatchesFilter(filter, feature);
      if (match) {
        matches.push(feature);
      }
    });
    return matches;
  }

}

export default FilterUtil;
