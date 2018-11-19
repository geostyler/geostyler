import RuleGeneratorUtil from './RuleGeneratorUtil';
import TestUtil from './TestUtil';
const _cloneDeep = require('lodash/cloneDeep');

describe('RuleGeneratorUtil', () => {
  const dummyData = TestUtil.getComplexGsDummyData();

  describe('#getDistinctValues', () => {
    it('is defined', () => {
      expect(RuleGeneratorUtil.getDistinctValues).toBeDefined();
    });

    it('returns distinct values', () => {
      const distinctValues = RuleGeneratorUtil.getDistinctValues(dummyData, 'GEN');
      expect(distinctValues).toHaveLength(10);

      let dummyWithDuplicates = _cloneDeep(dummyData);
      dummyWithDuplicates.exampleFeatures.features[0].properties.GEN = 'same';
      dummyWithDuplicates.exampleFeatures.features[1].properties.GEN = 'same';
      const newDistinct = RuleGeneratorUtil.getDistinctValues(dummyWithDuplicates, 'GEN');
      expect(newDistinct).toHaveLength(9);
    });
  });

  describe('#guessSymbolizerFromData', () => {
    it('is defined', () => {
      expect(RuleGeneratorUtil.guessSymbolizerFromData).toBeDefined();
    });
  });

  describe('#generateRules', () => {
    it('is defined', () => {
      expect(RuleGeneratorUtil.generateRules).toBeDefined();
    });
  });

  describe('#getColorRamp', () => {
    it('is defined', () => {
      expect(RuleGeneratorUtil.getColorRamp).toBeDefined();
    });
  });

  describe('#getEqualIntervalRanges', () => {
    it('is defined', () => {
      expect(RuleGeneratorUtil.getEqualIntervalRanges).toBeDefined();
    });
  });

  describe('#getQuantileRanges', () => {
    it('is defined', () => {
      expect(RuleGeneratorUtil.getQuantileRanges).toBeDefined();
    });

    it('returns quantiles', () => {
      let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      let numberOfRules = 3;
      let ranges = RuleGeneratorUtil.getQuantileRanges(values, numberOfRules);
      expect(ranges).toEqual([[1, 4], [4, 7], [7, 10]]);

      numberOfRules = 5;
      ranges = RuleGeneratorUtil.getQuantileRanges(values, numberOfRules);
      expect(ranges).toEqual([[1, 3], [3, 5], [5, 7], [7, 9], [9, 10]]);

      values = [1, 1, 1, 2, 2, 2, 3, 3, 3];
      numberOfRules = 3;
      ranges = RuleGeneratorUtil.getQuantileRanges(values, numberOfRules);
      expect(ranges).toEqual([[1, 2], [2, 3], [3, 3]]);
    });
  });

  describe('#boundsToRanges', () => {
    it('is defined', () => {
      expect(RuleGeneratorUtil.boundsToRanges).toBeDefined();
    });
  });

});
