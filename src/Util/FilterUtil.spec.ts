/* Released under the BSD 2-Clause License
 *
 * Copyright (c) 2018-present, terrestris GmbH & Co. KG
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

import FilterUtil from './FilterUtil';
import { Filter, Rule } from 'geostyler-style';
import TestUtil from './TestUtil';

describe('FilterUtil', () => {

  let filter: Filter;

  beforeEach(() => {
    filter = TestUtil.getDummyGsFilter();
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

  describe('calculateCountAndDuplicates', () => {
    it('returns the right number of duplicates, not considering scale constraints', () => {
      let dummyData = TestUtil.getComplexGsDummyData();
      let filter2 = TestUtil.getDummyGsFilter();

      dummyData.exampleFeatures.features[0].properties.state = 'germany';
      dummyData.exampleFeatures.features[0].properties.population = 150000;
      dummyData.exampleFeatures.features[0].properties.name = 'NotSchalke';

      const rules: Rule[] = [{
        name: 'rule1',
        symbolizers: [],
        filter: []
      }, {
        name: 'rule2',
        symbolizers: [],
        filter: filter2
      }];

      const result = FilterUtil.calculateCountAndDuplicates(rules, dummyData);

      expect(result.duplicates[0]).toBeCloseTo(1);
      expect(result.duplicates[1]).toBeCloseTo(1);
    });
    it('returns the right number of duplicates per scale', () => {
      let dummyData = TestUtil.getComplexGsDummyData();

      dummyData.exampleFeatures.features[0].properties.state = 'germany';
      dummyData.exampleFeatures.features[0].properties.population = 150000;
      dummyData.exampleFeatures.features[0].properties.name = 'NotSchalke';

      const rules: Rule[] = [
        {
          'name': 'Mehr als 4',
          'symbolizers': [
            {
              'kind': 'Mark',
              'wellKnownName': 'Circle'
            }
          ],
          'filter': [
            '>',
            'pop',
            4000000
          ],
          'scaleDenominator': {
            'max': 10000,
            'min': 0
          }
        },
        {
          'name': 'Mehr als 8',
          'symbolizers': [
            {
              'kind': 'Mark',
              'wellKnownName': 'Circle',
              'color': '#0E1058'
            }
          ],
          'filter': [
            '>',
            'pop',
            8000000
          ],
          'scaleDenominator': {
            'max': 10000,
            'min': 0
          }
        },
        {
          'name': 'Mehr als 4',
          'symbolizers': [
            {
              'kind': 'Mark',
              'wellKnownName': 'Circle',
              'color': '#0E1058'
            }
          ],
          'filter': [
            '>',
            'pop',
            4000000
          ],
          'scaleDenominator': {
            'min': 10000,
            'max': 0
          }
        },
        {
          'name': 'Mehr als 8',
          'symbolizers': [
            {
              'kind': 'Mark',
              'wellKnownName': 'Circle',
              'color': '#0E1058'
            }
          ],
          'filter': [
            '>',
            'pop',
            8000000
          ],
          'scaleDenominator': {
            'min': 10000,
            'max': null
          }
        }
      ];

      const result = FilterUtil.calculateCountAndDuplicates(rules, dummyData);

      expect(result.duplicates[0]).toBe(13);
      expect(result.duplicates[1]).toBe(9);
      expect(result.duplicates[2]).toBe(13);
      expect(result.duplicates[3]).toBe(9);
    });
  });

});
