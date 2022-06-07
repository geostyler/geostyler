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
      const matchingFeature = dummyData.exampleFeatures.features[0];
      matchingFeature.properties.state = 'germany';
      matchingFeature.properties.population = 150000;
      matchingFeature.properties.name = 'NotSchalke';
      const matches = FilterUtil.featureMatchesFilter(filter, matchingFeature);
      expect(matches).toBe(true);
    });

    it('returns false if a feature does not match the filter', () => {
      const dummyData = TestUtil.getComplexGsDummyData();
      const matchingFeature = dummyData.exampleFeatures.features[0];
      matchingFeature.properties.state = 'belgium';
      matchingFeature.properties.population = 150000;
      matchingFeature.properties.name = 'NotSchalke';
      const matches = FilterUtil.featureMatchesFilter(filter, matchingFeature);
      expect(matches).toBe(false);
    });
  });

  describe('getMatches', () => {
    it('returns an array of all matched features', () => {
      const dummyData = TestUtil.getComplexGsDummyData();
      dummyData.exampleFeatures.features[0].properties.state = 'germany';
      dummyData.exampleFeatures.features[0].properties.population = 150000;
      dummyData.exampleFeatures.features[0].properties.name = 'NotSchalke';
      const matchingFeature = dummyData.exampleFeatures.features[0];
      const matches = FilterUtil.getMatches(filter, dummyData);
      expect(matches).toEqual([matchingFeature]);
    });

    it('returns an empty array if no matches found', () => {
      const dummyData = TestUtil.getComplexGsDummyData();
      const matches = FilterUtil.getMatches(filter, dummyData);
      expect(matches).toHaveLength(0);
    });
  });

  describe('calculateCountAndDuplicates', () => {
    it('returns the right number of duplicates, not considering scale constraints', () => {
      const dummyData = TestUtil.getComplexGsDummyData();
      const filter2 = TestUtil.getDummyGsFilter();

      dummyData.exampleFeatures.features[0].properties.state = 'germany';
      dummyData.exampleFeatures.features[0].properties.population = 150000;
      dummyData.exampleFeatures.features[0].properties.name = 'NotSchalke';

      const rules: Rule[] = [{
        name: 'rule1',
        symbolizers: []
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
      const dummyData = TestUtil.getComplexGsDummyData();

      dummyData.exampleFeatures.features[0].properties.state = 'germany';
      dummyData.exampleFeatures.features[0].properties.population = 150000;
      dummyData.exampleFeatures.features[0].properties.name = 'NotSchalke';

      const rules: Rule[] = [
        {
          'name': 'Mehr als 4',
          'symbolizers': [
            {
              'kind': 'Mark',
              'wellKnownName': 'circle'
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
              'wellKnownName': 'circle',
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
              'wellKnownName': 'circle',
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
              'wellKnownName': 'circle',
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

  describe('positionArrayAsString', () => {
    it('transforms positionArrays to strings as expected', () => {
      const array1 = [1, 3, 6, 2];
      const array2 = [3, 3, 5];
      const array3 = [4, 7];
      const string1 = '[1][3][6][2]';
      const string2 = '[3][3][5]';
      const string3 = '[4][7]';
      expect(FilterUtil.positionArrayAsString(array1)).toEqual(string1);
      expect(FilterUtil.positionArrayAsString(array2)).toEqual(string2);
      expect(FilterUtil.positionArrayAsString(array3)).toEqual(string3);
    });
  });

  describe('positionStringAsArray', () => {
    it('transforms positionStrings to arrays as expected', () => {
      const array1 = [1, 3, 6, 2];
      const array2 = [3, 3, 5];
      const array3 = [4, 7];
      const string1 = '[1][3][6][2]';
      const string2 = '[3][3][5]';
      const string3 = '[4][7]';
      expect(FilterUtil.positionStringAsArray(string1)).toEqual(array1);
      expect(FilterUtil.positionStringAsArray(string2)).toEqual(array2);
      expect(FilterUtil.positionStringAsArray(string3)).toEqual(array3);
    });
  });

  describe('getFilterAtPosition', () => {
    it('returns the expected filter', () => {
      expect(FilterUtil.getFilterAtPosition(filter, '')).toEqual(filter);
      expect(FilterUtil.getFilterAtPosition(filter, '[1]')).toEqual(filter[1]);
      expect(FilterUtil.getFilterAtPosition(filter, '[1][1]')).toEqual(filter[1][1]);
      expect(FilterUtil.getFilterAtPosition(filter, '[1][2]')).toEqual(filter[1][2]);
      expect(FilterUtil.getFilterAtPosition(filter, '[2][1]')).toEqual(filter[2][1]);
    });
  });

  describe('removeFilter', () => {
    it('removes a filter at a given position', () => {
      const got1: Filter = [
        '&&',
        [
          '||',
          ['>=', 'population', 100000],
          ['<', 'population', 200000]
        ],
        [
          '!',
          ['==', 'name', 'Schalke']
        ]
      ];
      const newFilter1 = FilterUtil.removeFilter(filter, '[1]');
      expect(newFilter1).toEqual(got1);
    });
  });

  describe('changeFilter', () => {
    it('changes a Filter at a given position', () => {
      const got1: Filter = [
        '||',
        ['==', 'state', 'germany'],
        [
          '||',
          ['>=', 'population', 100000],
          ['<', 'population', 200000]
        ],
        [
          '!',
          ['==', 'name', 'Schalke']
        ]
      ];
      const newFilter1 = FilterUtil.changeFilter(filter, '', 'or');
      expect(newFilter1).toEqual(got1);

      const got2: Filter = [
        '&&',
        ['==', 'state', 'germany'],
        ['!', ['==', '', '']],
        ['!', ['==', 'name', 'Schalke']]
      ];
      const newFilter2 = FilterUtil.changeFilter(filter, '[2]', 'not');
      expect(newFilter2).toEqual(got2);

      const got3: Filter = [
        '&&',
        ['==', 'state', 'germany'],
        ['==', '', ''],
        [
          '!',
          ['==', 'name', 'Schalke']
        ]
      ];
      const newFilter3 = FilterUtil.changeFilter(filter, '[2]', 'comparison');
      expect(newFilter3).toEqual(got3);
    });
  });

  describe('addFilter', () => {
    it('adds a filter of a given type at the given position.', () => {
      const got1: Filter = [
        '&&',
        ['==', 'state', 'germany'],
        [
          '||',
          ['>=', 'population', 100000],
          ['<', 'population', 200000]
        ],
        [
          '!',
          ['==', 'name', 'Schalke']
        ],
        ['&&', ['==', '', ''], ['==', '', '']]
      ];
      const newFilter1 = FilterUtil.addFilter(filter, '', 'and');
      expect(newFilter1).toEqual(got1);

      const got2: Filter = [
        '&&',
        ['==', 'state', 'germany'],
        [
          '||',
          ['>=', 'population', 100000],
          ['<', 'population', 200000],
          ['==', '', '']
        ],
        [
          '!',
          ['==', 'name', 'Schalke']
        ]
      ];
      const newFilter2 = FilterUtil.addFilter(filter, '[2]', 'comparison');
      expect(newFilter2).toEqual(got2);
    });
  });

  describe('removeAtPosition', () => {
    it('removes a filter at the expected position', () => {
      const got = [
        '&&',
        ['==', 'state', 'germany'],
        [
          '!',
          ['==', 'name', 'Schalke']
        ]
      ];
      const newFilter = FilterUtil.removeAtPosition(filter, '[2]');
      expect(newFilter).toEqual(got);

      const got2 = [
        '&&',
        [
          '!',
          ['==', 'name', 'Schalke']
        ]
      ];
      const newFilter2 = FilterUtil.removeAtPosition(newFilter, '[1]');
      expect(newFilter2).toEqual(got2);
    });
  });

  describe('insertAtPosition', () => {
    it('insterts a filter at the expected position', () => {
      const baseFilter: Filter = [
        '&&',
        ['==', 'state', 'germany']
      ];
      const got = [
        '&&',
        ['==', 'state', 'germany'],
        [
          '||',
          ['>=', 'population', 100000],
          ['<', 'population', 200000]
        ]
      ];
      const newFilter = FilterUtil.insertAtPosition(
        baseFilter,
        [
          '||',
          ['>=', 'population', 100000],
          ['<', 'population', 200000]
        ],
        '[1]'
      );
      expect(newFilter).toEqual(got);

      const newFilter2 = FilterUtil.insertAtPosition(
        newFilter,
        [
          '!',
          ['==', 'name', 'Schalke']
        ],
        '[1]'
      );
      expect(newFilter2).toEqual(filter);
    });
  });

  describe('filterToTree', () => {
    it('creates a tree from a comparison filter', () => {
      const baseFilter: Filter = ['==', 'foo', 'bar'];
      const got = [{
        title: 'foo == bar',
      }];
      const tree = FilterUtil.filterToTree(baseFilter);
      expect(tree[0].title).toEqual(got[0].title);
    });

    it('creates a tree from a combination filter', () => {
      const baseFilter: Filter = ['&&', ['==', 'foo', 'bar'], ['==', 'foo', 'bar']];
      const got = [{
        title: '&&',
        children: [{
          title: 'foo == bar',
        }, {
          title: 'foo == bar',
        }]
      }];
      const tree = FilterUtil.filterToTree(baseFilter);
      expect(tree[0].title).toEqual(got[0].title);
      expect(tree[0].children.length).toEqual(got[0].children.length);
      expect(tree[0].children[0].title).toEqual(got[0].children[0].title);
      expect(tree[0].children[1].title).toEqual(got[0].children[1].title);
    });

    it('creates a tree from a negation filter', () => {
      const baseFilter: Filter = ['!', ['==', 'foo', 'bar']];
      const got = [{
        title: '!',
        children: [{
          title: 'foo == bar',
        }]
      }];
      const tree = FilterUtil.filterToTree(baseFilter);
      expect(tree[0].title).toEqual(got[0].title);
      expect(tree[0].children.length).toEqual(got[0].children.length);
      expect(tree[0].children[0].title).toEqual(got[0].children[0].title);
    });

  });

});
