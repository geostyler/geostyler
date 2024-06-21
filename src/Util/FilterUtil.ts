/* Released under the BSD 2-Clause License
 *
 * Copyright © 2018-present, terrestris GmbH & Co. KG and GeoStyler contributors
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

import {
  Filter,
  ComparisonFilter,
  Rule,
  CombinationFilter,
  NegationFilter,
  CombinationOperator
} from 'geostyler-style';

import {
  isCombinationFilter,
  isComparisonFilter,
  isNegationFilter,
  isComparisonOperator,
  isCombinationOperator,
  isNegationOperator,
  isFilter,
  isGeoStylerBooleanFunction
} from 'geostyler-style/dist/typeguards';

import {
  VectorData
} from 'geostyler-data';

import _get from 'lodash/get';
import _set from 'lodash/set';
import _uniqueId from 'lodash/uniqueId';
import { isBoolean } from 'lodash';
import FunctionUtil from './FunctionUtil';
import { Feature } from 'geojson';

export type CountResult = {
  counts?: number[];
  duplicates?: number[];
};

/**
 * @class FilterUtil
 */
class FilterUtil {

  static nestingOperators = ['&&', '||', '!'];

  /**
   * Handle nested filters.
   */
  static handleNestedFilter = (filter: CombinationFilter | NegationFilter, feature: any): boolean => {
    let intermediate;
    let restFilter;
    switch (filter[0]) {
      case '&&':
        intermediate = true;
        restFilter = filter.slice(1);
        restFilter.forEach((f: Filter | CombinationOperator) => {
          if (!FilterUtil.featureMatchesFilter(f, feature)) {
            intermediate = false;
          }
        });
        return intermediate;
      case '||':
        intermediate = false;
        restFilter = filter.slice(1);
        restFilter.forEach((f: Filter | CombinationOperator) => {
          if (FilterUtil.featureMatchesFilter(f, feature)) {
            intermediate = true;
          }
        });
        return intermediate;
      case '!':
        return !FilterUtil.featureMatchesFilter(filter[1], feature);
      default:
        throw new Error('Cannot parse Filter. Unknown combination or negation operator.');
    }
  };

  /**
   * Handle simple filters, i.e. non-nested filters.
   */
  static handleSimpleFilter = (filter: ComparisonFilter, feature: any): boolean => {
    const featureValue = _get(feature, 'properties[' + filter[1] + ']');
    let filterValue = filter[2];
    switch (filter[0]) {
      case '==':
        return (('' + featureValue) === ('' + filterValue));
      case '*=':
        filterValue = filterValue as string;
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
        return (parseFloat(featureValue) < Number(filterValue));
      case '<=':
        return (parseFloat(featureValue) <= Number(filterValue));
      case '>':
        return (parseFloat(featureValue) > Number(filterValue));
      case '>=':
        return (parseFloat(featureValue) >= Number(filterValue));
      default:
        throw new Error('Cannot parse Filter. Unknown comparison operator.');
    }
  };

  /**
   * Checks if a feature matches the specified filter.
   * Returns true if it matches, otherwise returns false.
   */
  static featureMatchesFilter = (filter: Filter | CombinationOperator, feature: Feature): boolean => {
    if (isBoolean(filter)) {
      return filter;
    }
    if (isGeoStylerBooleanFunction(filter)) {
      return FunctionUtil.evaluateFunction(filter, feature);
    }
    if (filter?.length === 0) {
      return true;
    }
    let matchesFilter: boolean = true;
    if (isComparisonFilter(filter)) {
      matchesFilter = FilterUtil.handleSimpleFilter(filter, feature);
    } else if (isCombinationFilter(filter) || isNegationFilter(filter)) {
      matchesFilter = FilterUtil.handleNestedFilter(filter, feature);
    }
    return matchesFilter;
  };

  /**
   * Returns those features that match a given filter.
   * If no feature matches, returns an empty array.
   *
   * @param {Filter} filter A geostyler filter object.
   * @param {VectorData} data A geostyler data object.
   * @return {Feature[]} An Array of geojson feature objects.
   */
  static getMatches = (filter: Filter, data: VectorData): Feature[] => {
    return data.exampleFeatures.features.filter((feature => {
      return FilterUtil.featureMatchesFilter(filter, feature);
    }));
  };

  /**
   * Calculates the number of features that are covered by more then one rule per
   * rule.
   *
   * @param {object} matches An object containing the count of matches for every
   *  filter. Separated by scales.
   * @returns {number[]} An array containing the number of duplicates for each
   *  rule.
   */
  static calculateDuplicates(matches: any): number[] {
    const duplicates: number[] = [];

    const ids: any[] = [];

    matches.forEach((features: any, index: number) => {
      const idMap: any = {};
      features.forEach((feat: any) => idMap[feat.id] = true);
      ids[index] = idMap;
    });

    matches.forEach((features: any, index: number) => {
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

    return duplicates;
  }

  /**
   * Calculates the amount of matched and duplicate matched features for the rules.
   *
   * @param {Rule[]} rules An array of GeoStyler rule objects.
   * @param {VectorData} data A geostyler data object.
   * @returns {CountResult} An object containing array with the amount of matched
   * and duplicate matched features reachable through keys'counts' and 'duplicates'.
   */
  static calculateCountAndDuplicates(rules: Rule[], data: VectorData): CountResult {
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

    const matches: any = [];
    rules.forEach((rule, index) => {
      const currentMatches = rule.filter ? FilterUtil.getMatches(rule.filter, data) : data.exampleFeatures.features;
      result.counts.push(currentMatches.length);
      matches[index] = currentMatches;
    });

    result.duplicates = FilterUtil.calculateDuplicates(matches);
    return result;
  }

  /**
   * Transforms a position String like '[2][3]' to an positionArray like [2, 3].
   */
  static positionStringAsArray(positionString: string) {
    return positionString
      .replace(/\]\[/g, ',')
      .replace(/\]/g, '')
      .replace(/\[/g, '')
      .split(',')
      .map(i => parseInt(i, 10));
  }

  /**
   * Transforms am positionArray like [2, 3] to a string like '[2][3]'.
   */
  static positionArrayAsString(positionArray: number[] | string[]) {
    return `[${positionArray.toString().replace(/,/g, '][')}]`;
  }

  /**
   * Returns the filter at a specific position.
   */
  static getFilterAtPosition(rootFilter: Filter, position: string) {
    if (position === '') {
      return rootFilter;
    } else {
      return _get(rootFilter, position);
    }
  }

  /**
   * Removes a subfilter from a given filter at the given position.
   */
  static removeAtPosition(filter: Filter, position: string): Filter {
    if (!Array.isArray(filter)) {
      throw new Error(`Passed filter is not an array: ${filter}`);
    }
    let newFilter = structuredClone(filter);
    const dragNodeSubPosition = position.substr(position.length - 3);
    const dragNodeIndex = parseInt(dragNodeSubPosition.slice(1, 2), 10);
    const parentPosition = position.substring(0, position.length - 3);

    let parentFilter = newFilter;
    if (parentPosition !== '') {
      parentFilter = _get(newFilter, parentPosition);
    }
    parentFilter.splice(dragNodeIndex, 1);
    return newFilter;
  }

  /**
     * Inserts a given subfilter to a given parentfilter by its position and its
     * dropPosition.
     */
  static insertAtPosition(
    baseFilter: Filter,
    insertFilter: Filter,
    position: string
  ): Filter {
    if (!Array.isArray(baseFilter) || !Array.isArray(insertFilter)) {
      throw new Error(`Can not insert Filter ${insertFilter} into ${baseFilter}. Arrays are required.`);
    }
    const dropTargetParentPosition = position.substring(0, position.length - 3);
    const dropTargetSubPosition = position.substring(position.length - 3);
    const dropTargetSubIndex = parseInt(dropTargetSubPosition.slice(1, 2), 10);
    const dropTargetIsComparison = !['&&', '||', '!'].includes(insertFilter[0]);
    let newFilter: Filter = structuredClone(baseFilter);

    const newSubFilter = dropTargetParentPosition === ''
      ? newFilter
      : _get(newFilter, dropTargetParentPosition);

    if (dropTargetIsComparison) {
      if (newFilter.length - 1 === dropTargetSubIndex) {
        newSubFilter.push(insertFilter);
      } else {
        newSubFilter.splice(dropTargetSubIndex, 0, insertFilter);
      }
    } else {
      newSubFilter.push(insertFilter);
    }

    return newFilter;
  }

  /**
   * Handler for the add button.
   * Adds a filter of a given type at the given position.
   *
   */
  static addFilter(rootFilter: Filter, position: string, type: string) {

    let addedFilter: Filter ;
    let newFilter: Filter = structuredClone(rootFilter);

    switch (type) {
      case 'and':
        addedFilter = ['&&', ['==', '', ''], ['==', '', '']] as CombinationFilter;
        break;
      case 'or':
        addedFilter = ['||', ['==', '', ''], ['==', '', '']] as CombinationFilter;
        break;
      case 'not':
        addedFilter = ['!', ['==', '', '']] as NegationFilter;
        break;
      case 'comparison':
      default:
        addedFilter = ['==', '', ''] as ComparisonFilter;
        break;
    }

    if (position === '') {
      newFilter = newFilter as CombinationFilter;
      newFilter.push(addedFilter);
    } else {
      if (!Array.isArray(newFilter)) {
        throw new Error(`Cannot add filter to filter ${rootFilter}. Root filter has to be an array.`);
      }
      const previousFilter: CombinationFilter = _get(newFilter, position);
      previousFilter.push(addedFilter);
      _set(newFilter, position, previousFilter);
    }

    return newFilter;
  }

  /**
   * Changes a filter at a position to a given typ.
   *
   */
  static changeFilter(rootFilter: Filter, position: string, type: string) {

    let addedFilter: Filter;
    const newFilter: Filter = structuredClone(rootFilter);
    const previousFilter = position === '' ? newFilter : _get(newFilter, position);

    switch (type) {
      case 'and':
        if (previousFilter && (previousFilter[0] === '&&' || previousFilter[0] === '||' )) {
          addedFilter = previousFilter;
          if (!Array.isArray(addedFilter)) {
            throw new Error('Cannot change filter. Filter is not an array.');
          }
          addedFilter[0] = '&&';
        } else {
          addedFilter = ['&&', ['==', '', ''], ['==', '', '']];
        }
        break;
      case 'or':
        if (previousFilter && (previousFilter[0] === '&&' || previousFilter[0] === '||' )) {
          addedFilter = previousFilter;
          if (!Array.isArray(addedFilter)) {
            throw new Error('Cannot change filter. Filter is not an array.');
          }
          addedFilter[0] = '||';
        } else {
          addedFilter = ['||', ['==', '', ''], ['==', '', '']];
        }
        break;
      case 'not':
        addedFilter = ['!', ['==', '', '']];
        break;
      case 'comparison':
      default:
        addedFilter = ['==', '', ''];
        break;
    }

    if (position === '') {
      return addedFilter;
    } else {
      if (!Array.isArray(newFilter)) {
        throw new Error('Cannot change filter. Filter is not an array.');
      }
      _set(newFilter, position, addedFilter);
      return newFilter;
    }

  }

  /**
   * Removes a filter at a given position.
   *
   */
  static removeFilter = (rootFilter: Filter, position: string) => {
    const parentPosition = position.substring(0, position.length - 3);
    const parentFilter: Filter = FilterUtil.getFilterAtPosition(rootFilter, parentPosition);
    let newFilter: Filter;

    if (position === '') {
      newFilter = undefined;
    } else {
      if (!Array.isArray(parentFilter)) {
        throw new Error('Cannot remove filter. Filter is not an array.');
      }
      if (parentFilter.length <= 2) {
        newFilter = FilterUtil.removeAtPosition(rootFilter, parentPosition);
      } else {
        newFilter = FilterUtil.removeAtPosition(rootFilter, position);
      }
    }

    return newFilter;
  };

  /**
   * Helper method for FilterUtil.filterToTree().
   */
  static filterToTreeHelper = (filter: Filter) => {
    let tree: any = {
      key: _uniqueId()
    };

    if (!Array.isArray(filter)) {
      throw new Error('Filter is not an array.');
    }

    let filterClone = structuredClone(filter);
    const operator = filterClone.shift();
    if (isComparisonOperator(operator)) {
      tree.title = `${filterClone[0]} ${operator} ${filterClone[1]}`;
    } else if (isCombinationOperator(operator)) {
      tree.title = operator;
      tree.children = filterClone.map((f: any) => {
        if (isFilter(f)) {
          return FilterUtil.filterToTreeHelper(f);
        }
      });
    } else if (isNegationOperator(operator)) {
      tree.title = operator;
      tree.children = filterClone.map((f: any) => {
        if (isFilter(f)) {
          return FilterUtil.filterToTreeHelper(f);
        }
      });
    }
    // TODO str_matchesFilter is missing but also not yet supported in UI
    return tree;

  };

  /**
   * Maps a GeoStyler filter to an antd treeData object.
   */
  static filterToTree = (filter: Filter) => {
    return [FilterUtil.filterToTreeHelper(filter)];
  };

}

export default FilterUtil;
