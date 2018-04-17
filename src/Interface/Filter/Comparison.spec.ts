import FilterUtil from '../../util/FilterUtil/FilterUtil';
import Comparison from './Comparison';

describe(` ['!=', 'peter', 12] is a valid comparison filter`, () => {
  it('does not fail', () => {
    const filter: Comparison = ['!=', 'peter', 12];
    expect(FilterUtil.isExpressionFilter(filter)).toBe(true);
  });
});
