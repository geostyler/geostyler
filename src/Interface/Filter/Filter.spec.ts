import FilterUtil from '../../util/FilterUtil/FilterUtil';
import Filter from './Filter';

describe(` ['!', false] is a valid filter`, () => {
  it('does not fail', () => {
    const filter: Filter = ['!', false];
    expect(FilterUtil.isExpressionFilter(filter)).toBe(true);
  });
});

describe(` ['!=', 'peter', 12] is a valid comparison filter`, () => {
  it('does not fail', () => {
    const filter: Filter = ['!=', 'peter', 12];
    expect(FilterUtil.isExpressionFilter(filter)).toBe(true);
  });
});
