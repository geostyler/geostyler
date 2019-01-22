import {
  Filter,
  Operator,
  Rule
} from 'geostyler-style';

import {
  Data
} from 'geostyler-data';

const _get = require('lodash/get');

export type CountResult = {
  counts?: number[],
  duplicates?: number[]
};

/**
 * @class SymbolizerUtil
 */
class FilterUtil {

  static nestingOperators = ['&&', '||', '!'];

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
    const isNestedFilter = FilterUtil.nestingOperators.includes(operator);

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
   *
   * @param {Filter} filter A geostyler filter object.
   * @param {Data} data A geostyler data object.
   * @return {Feature[]} An Array of geojson feature objects.
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

  /**
   * Calculates the number of features that are covered by more then one rule per
   * rule.
   *
   * @param {object} matches An object containing the count of matches for every
   *  filter. Seperate by scales.
   * @returns {number[]} An array containing the number of duplicates for each
   *  rule.
   */
  static calculateDuplicates(matches: any): number[] {
    const scales = Object.keys(matches);
    const duplicates: number[] = [];

    scales.forEach((scale) => {

      const ids: object[] = [];

      matches[scale].forEach((features: any, index: number) => {
        const idMap = {};
        features.forEach((feat: any) => idMap[feat.id] = true);
        ids[index] = idMap;
      });

      matches[scale].forEach((features: any, index: number) => {
        let counter = 0;
        ids.forEach((idMap, idIndex) => {
          if (index !== idIndex) {
            features.forEach((feat: any) => {
              if (idMap[feat.id]) {
                ++counter;
              }
            });
          }
        });
        duplicates[index] = counter;
      });

    });

    return duplicates;
  }

  /**
   * Calculates the amount of matched and duplicate matched features for the rules.
   *
   * @param {Rule[]} rules An array of GeoStyler rule objects.
   * @param {Data} data A geostyler data object.
   * @returns {CountResult} An object containing array with the amount of matched
   * and duplicate matched features reachable through keys'counts' and 'duplicates'.
   */
  static calculateCountAndDuplicates(rules: Rule[], data: Data): CountResult {
    if (!rules || !data) {
      return {};
    }
    const result: CountResult = {
      counts: [],
      duplicates: []
    };

    // Add id to feature if missing
    data.exampleFeatures.features = data.exampleFeatures.features.map((feature, idx) => {
      if (!feature.id) {
        feature.id = idx;
      }
      return feature;
    });

    const matches: any = {};
    rules.forEach((rule, index) => {
      const minScale = _get(rule, 'scaleDenominator.min') || '';
      const maxScale = _get(rule, 'scaleDenominator.max') || '';
      const scaleKey = `${minScale}-${maxScale}`;
      const currentMatches = rule.filter ? FilterUtil.getMatches(rule.filter, data) : data.exampleFeatures.features;
      result.counts.push(currentMatches.length);
      if (!matches[scaleKey]) {
        matches[scaleKey] = [];
      }
      matches[scaleKey][index] = currentMatches;
    });

    result.duplicates = FilterUtil.calculateDuplicates(matches);
    return result;
  }

}

export default FilterUtil;
