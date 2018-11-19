import FilterUtil from './FilterUtil';
import { Filter } from 'geostyler-style';
import TestUtil from './TestUtil';

describe('FilterUtil', () => {

  let filter: Filter;

  beforeEach(() => {
    filter = TestUtil.getDummyGsFilter();
  });

  describe('writeAsCql', () => {
    it('writes a geostyler-style filter as an cql string', () => {
        const cql = 'state = germany AND (population >= 100000 OR population < 200000) AND (NOT name = Schalke)';
        const got = FilterUtil.writeAsCql(filter);
        expect(got).toEqual(cql);
    });
  });

});
