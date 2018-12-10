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

  describe('featureMatchesFilter', () => {
    it('returns true if a feature matches the filter', () => {
      const dummyData = TestUtil.getComplexGsDummyData();
      let matchingFeature = dummyData.exampleFeatures.features[0];
      matchingFeature.properties.state = 'germany';
      matchingFeature.properties.population = 150000;
      matchingFeature.properties.name = 'NotSchalke';
      const matches = FilterUtil.featureMatchesFilter(filter, matchingFeature);
      expect(matches).toBe(true);
    });

    it('returns false if a feature does not match the filter', () => {
      const dummyData = TestUtil.getComplexGsDummyData();
      let matchingFeature = dummyData.exampleFeatures.features[0];
      matchingFeature.properties.state = 'belgium';
      matchingFeature.properties.population = 150000;
      matchingFeature.properties.name = 'NotSchalke';
      const matches = FilterUtil.featureMatchesFilter(filter, matchingFeature);
      expect(matches).toBe(false);
    });
  });

  describe('getMatches', () => {
    it('returns an array of all matched features', () => {
      let dummyData = TestUtil.getComplexGsDummyData();
      dummyData.exampleFeatures.features[0].properties.state = 'germany';
      dummyData.exampleFeatures.features[0].properties.population = 150000;
      dummyData.exampleFeatures.features[0].properties.name = 'NotSchalke';
      const matchingFeature = dummyData.exampleFeatures.features[0];
      const matches = FilterUtil.getMatches(filter, dummyData);
      expect(matches).toEqual([matchingFeature]);
    });

    it('returns an empty array if no matches found', () => {
      let dummyData = TestUtil.getComplexGsDummyData();
      const matches = FilterUtil.getMatches(filter, dummyData);
      expect(matches).toHaveLength(0);
    });
  });

});
