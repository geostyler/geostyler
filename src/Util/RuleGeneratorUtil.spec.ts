/* Released under the BSD 2-Clause License
 *
 * Copyright © 2018-present, terrestris GmbH & Co. KG and GeoStyler contributors
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

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
      expect(distinctValues).toHaveLength(16);

      const dummyWithDuplicates = _cloneDeep(dummyData);
      dummyWithDuplicates.exampleFeatures.features[0].properties.GEN = 'same';
      dummyWithDuplicates.exampleFeatures.features[1].properties.GEN = 'same';
      const newDistinct = RuleGeneratorUtil.getDistinctValues(dummyWithDuplicates, 'GEN');
      expect(newDistinct).toHaveLength(15);
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

  describe('#generateBackgroundStyleFromColors', () => {
    it('is defined', () => {
      expect(RuleGeneratorUtil.generateBackgroundStyleFromColors).toBeDefined();
      const colors = ['#FF00FF', '#00FF00'];
      const got = RuleGeneratorUtil.generateBackgroundStyleFromColors(colors);
      expect(got).toEqual({
        backgroundImage: 'linear-gradient(#FF00FF, #FF00FF),linear-gradient(#00FF00, #00FF00)',
        backgroundSize: '50% 100%,100% 100%',
        backgroundRepeat: 'no-repeat',
        color: '#FFFFFF'
      });
    });
  });

  describe('#getRanges', () => {
    it('is defined', () => {
      expect(RuleGeneratorUtil.getRanges).toBeDefined();
    });
  });

  describe('#getQuantileRanges', () => {

    it('returns quantiles', () => {
      let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      let numberOfRules = 3;
      let ranges = RuleGeneratorUtil.getRanges(values, numberOfRules, 'q');
      expect(ranges).toEqual([[1, 4], [4, 7], [7, 10]]);

      numberOfRules = 6;
      ranges = RuleGeneratorUtil.getRanges(values, numberOfRules, 'q');
      expect(ranges).toEqual([[1, 2.5], [2.5, 4], [4, 5.5], [5.5, 7], [7, 8.5], [8.5, 10]]);

      values = [1, 1, 1, 2, 2, 2, 3, 3, 3];
      numberOfRules = 4;
      ranges = RuleGeneratorUtil.getRanges(values, numberOfRules, 'q');
      expect(ranges).toEqual([[1, 1], [1, 2], [2, 3], [3, 3]]);
    });
  });

  describe('#boundsToRanges', () => {
    it('is defined', () => {
      expect(RuleGeneratorUtil.boundsToRanges).toBeDefined();
    });
  });

});
