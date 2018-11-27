import {
  Filter,
  Operator,
  CombinationOperator,
  NegationOpertaor,
  Rule
} from 'geostyler-style';

import {
  Data
} from 'geostyler-data';

const _get = require('lodash/get');
const _isEqual = require('lodash/isEqual');
const _cloneDeep = require('lodash/cloneDeep');

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
    const prop: any = _get(feature, 'properties[' + filter[1] + ']');
    switch (filter[0]) {
      case '==':
        return (prop === filter[2]);
      case '*=':
        if (prop && filter[2].length > prop.length) {
          return false;
        } else if (prop) {
          return (prop.indexOf(filter[2]) !== -1);
        } else {
          return false;
        }
      case '!=':
        return (prop !== filter[2]);
      case '<':
        if (typeof prop === typeof filter[2]) {
          return (prop < filter[2]);
        } else {
          return false;
        }
      case '<=':
        if (typeof prop === typeof filter[2]) {
          return (prop <= filter[2]);
        } else {
          return false;
        }
      case '>':
        if (typeof prop === typeof filter[2]) {
          return (prop > filter[2]);
        } else {
          return false;
        }
      case '>=':
        if (typeof prop === typeof filter[2]) {
          return (prop >= filter[2]);
        } else {
          return false;
        }
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
      try {
        const match = FilterUtil.featureMatchesFilter(filter, feature);
        if (match) {
          matches.push(feature);
        }
      } catch (error) {
        throw error;
      }
    });
    return matches;
  }

  /**
   * Returns the number of features that match a given filter.
   */
  static getNumberOfMatches = (filter: Filter, data: Data): number => {
    let matches: any[];
    try {
      matches = FilterUtil.getMatches(filter, data);
    } catch (error) {
      throw error;
    }
    return matches.length;
  }

  /**
   * Returns the number of features that match the filter at a given rulekey
   * as well as any other rule's filter.
   */
  static getNumberOfDuplicates = (rules: Rule[], data: Data, rulekey: number): number => {
    try {
      // create filters array
      // if a rule does not have a filter, an empty array will be pushed instead
      const filters: Filter[] = [];
      rules.forEach((rule: Rule) => {
        if (rule.filter) {
          filters.push(rule.filter);
        } else {
          filters.push([]);
        }
      });

      // get all matches of all filters
      const allFiltersMatches: any[][] = [];
      filters.forEach((filter: Filter) => {
        try {
          const matches: any[] = FilterUtil.getMatches(filter, data);
          allFiltersMatches.push(matches);
        } catch (error) {
          throw error;
        }
      });

      // check for duplicates
      let duplicates: number = 0;

      // create flat array of all matches except the ones of currently checked filter results
      const restFiltersMatches = _cloneDeep(allFiltersMatches);
      restFiltersMatches.splice(rulekey, 1);
      const flatRestMatches: any[] = restFiltersMatches.reduce((acc: any, val: any) => acc.concat(val), []);

      // check for each match if it also exists in other filters matches
      // if so, increase counter
      allFiltersMatches[rulekey].forEach((match: any) => {
        let contained: boolean = false;
        for (let i = 0; i < flatRestMatches.length; i++) {
          if (_isEqual(match, flatRestMatches[i])) {
            contained = true;
            break;
          }
        }
        if (contained) {
          duplicates++;
        }
      });
      return duplicates;
    } catch (error) {
      throw error;
    }
  }
}

export default FilterUtil;
