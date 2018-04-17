import FilterUtil from '../../util/FilterUtil/FilterUtil';
import Negation from './Negation';

describe(` ['!', false] is a valid negation filter`, () => {
  it('does not fail', () => {
    const filter: Negation = ['!', false];
    expect(FilterUtil.isExpressionFilter(filter)).toBe(true);
  });
});
