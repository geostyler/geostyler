
import { Filter } from '../../Interface/Filter/Filter';
import FilterUtil from './FilterUtil';

describe('Negation', () => {
  const good = [
    ['!', false],
    ['!', ['==', 2, 3]],
    ['==', 2, 2],
    ['!=', 2, 3],
    ['*=', 'Peter', 'ete'],
    ['>', 3, null],
    ['>=', 4, 4],
    ['<', 2, 3],
    ['<=', null, 4],
    ['&&', ['==', 2, 3], ['>', 3, 2], true],
    ['||', false, ['!=', 2, 3]]
  ];

  const bad = [
    ['!'],
    ['!', ['==', 2, 3], 'peter'],
    ['==', 2],
    ['!=', true],
    ['*=', 'Peter', []],
    ['>', 3, {}],
    ['>=', 4],
    ['<', 2, class Peter {}],
    ['<=', 2, ],
    ['&&', ['==', 2, 3]],
    ['||', false]
  ];

  it(`should return true for valid filters`, () => {
    good.forEach((filter: Filter) => {
      expect(FilterUtil.isExpressionFilter(filter)).toBe(true);
    });
  });

  it(`should return false for invalid filters`, () => {
    bad.forEach((filter: Filter) => {
      expect(FilterUtil.isExpressionFilter(filter)).toBe(false);
    });
  });

});
