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
  static writeAsCql(filter: Filter): string {
    const operator: Operator = filter[0];
    let cql: string;
    let isNestedFilter = false;

    if (FilterUtil.operatorMapping[operator]) {
      isNestedFilter = true;
    }

    if (isNestedFilter) {
      const nestedOperator: CombinationOperator | NegationOpertaor = FilterUtil.operatorMapping[operator];
      if (nestedOperator === '!') {
        const childFilter = FilterUtil.writeAsCql(filter[1]);
        cql = `(${nestedOperator} ${childFilter})`;
        return cql;
      }
      const childFilters = [...filter];
      childFilters.shift();
      const childCqls = childFilters.map(FilterUtil.writeAsCql);
      const joinedCqls = childCqls.join(` ${nestedOperator} `);
      cql = `(${joinedCqls})`;
      return cql;
    } else {
      cql = `${filter[1]} = ${filter[2]}`;
      return cql;
    }
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
