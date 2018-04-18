import Filter from '../../Interface/Filter/Filter';
import Symbolizer from '../Symbolizer/Symbolizer';
import FilterUtil from '../../util/FilterUtil/FilterUtil';
import ScaleDenominator from '../../Type/ScaleDenominator';

/**
 * A Rule aggregates the three key parts of a style representation:
 * The Symbolizer
 * The Filter
 * The ScaleDenominator
 *
 * @class Rule
 */
class Rule {
  /**
   * The Filter
   *
   * @private
   * @type {Filter}
   * @memberof Rule
   */
  private _filter: Filter;

  /**
   * The ScaleDenominator
   *
   * @private
   * @type {ScaleDenominator}
   * @memberof Rule
   */
  private _scaleDenominator: ScaleDenominator;

  /**
   * The Symbolizer
   *
   * @private
   * @type {Symbolizer}
   * @memberof Rule
   */
  private _symbolizer: Symbolizer;

  /**
   * Creates an instance of Rule.
   *
   * @param {Symbolizer} symbolizer The Symbolizer
   * @param {Filter} [filter] The Filter
   * @param {ScaleDenominator} [scaleDenominator] The ScaleDenominator
   * @memberof Rule
   */
  constructor(
    symbolizer: Symbolizer,
    filter?: Filter,
    scaleDenominator?: ScaleDenominator
  ) {
    this._symbolizer = symbolizer;
    if (filter && FilterUtil.isExpressionFilter(filter)) {
      this._filter = filter;
    }
    if (scaleDenominator) {
      this._scaleDenominator = scaleDenominator;
    }
  }

  /**
   * Gets the Filter.
   *
   * @type {Filter}
   * @memberof Rule
   */
  get filter(): Filter {
    return this._filter;
  }

  /**
   * Sets the Filter.
   *
   * @memberof Rule
   */
  set filter(filter: Filter) {
    this._filter = filter;
  }

  /**
   * Gets the ScaleDenominator.
   *
   * @type {ScaleDenominator}
   * @memberof Rule
   */
  get scaleDenominator(): ScaleDenominator {
    return this._scaleDenominator;
  }

  /**
   * Sets the ScaleDenominator.
   *
   * @memberof Rule
   */
  set scaleDenominator(scaleDenominator: ScaleDenominator) {
    this._scaleDenominator = scaleDenominator;
  }

  /**
   * Gets the Symbolizer.
   *
   * @type {Symbolizer}
   * @memberof Rule
   */
  get symbolizer(): Symbolizer {
    return this._symbolizer;
  }

  /**
   * Sets the Symbolizer.
   *
   * @memberof Rule
   */
  set symbolizer(symbolizer: Symbolizer) {
    this._symbolizer = symbolizer;
  }
}

export default Rule;
