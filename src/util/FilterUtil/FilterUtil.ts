/**
 * This UtilClass provides some helpful functions to be used with mapbox-gl
 * expressions.
 *
 * The intial version of this util is almost a copy (dated 03-06-2018) of:
 * https://github.com/mapbox/mapbox-gl-js/blob/master/src/style-spec/feature_filter/index.js
 *
 * @class FilterUtil
 */
class FilterUtil {
  /**
   *
   * @param filter
   */
  static isExpressionFilter(filter: Array<any>): boolean {
    if (!Array.isArray(filter) || filter.length < 1) {
      return false;
    }
    let isFilter;
    switch (filter[0]) {
      case '!':
        return filter.length === 2;
      case '==':
      case '!=':
      case '>':
      case '>=':
      case '<':
      case '<=':
      case '*=':
        isFilter = filter.length === 3;
        filter.forEach((param, i: number) => {
          if (i > 0 && !(param === null || typeof param === 'string' || typeof param === 'number')) {
            isFilter = false;
          }
        });
        return isFilter;
      case '&&':
      case '||':
        isFilter = filter.length > 2;
        filter.forEach((f: Array<any>, i: number) => {
          if (i > 1) {
            if (!FilterUtil.isExpressionFilter(f) && typeof f !== 'boolean') {
              isFilter = false;
            }
          }
        });
        return isFilter;
      default:
          return true;
    }
  }
}

export default FilterUtil;
