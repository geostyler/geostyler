import {
  Filter,
  Operator,
  CombinationOperator,
  NegationOpertaor
} from 'geostyler-style';

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

}

export default FilterUtil;
