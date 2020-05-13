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

import { FilterTree, FilterTreeProps } from './FilterTree';
import TestUtil from '../../../Util/TestUtil';

import { Filter as GsFilter } from 'geostyler-style';

describe('FilterTree', () => {

  let wrapper: any;
  let dummyData;
  let dummyFilter: GsFilter;
  let onFilterChangeDummy: any;

  beforeEach(() => {
    dummyData = TestUtil.getDummyGsData();
    dummyFilter = TestUtil.getDummyGsFilter();
    onFilterChangeDummy = jest.fn();
    const props: FilterTreeProps = {
      filter: dummyFilter,
      internalDataDef: dummyData,
      onFilterChange: onFilterChangeDummy
    };
    wrapper = TestUtil.shallowRenderComponent(FilterTree, props);
  });

  it('is defined', () => {
    expect(FilterTree).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  describe('positionArrayAsString', () => {
    it('transforms positionArrays to strings as expected', () => {
      const positionArrayAsString = wrapper.instance().positionArrayAsString;
      const array1 = [1, 3, 6, 2];
      const array2 = [3, 3, 5];
      const array3 = [4, 7];
      const string1 = '[1][3][6][2]';
      const string2 = '[3][3][5]';
      const string3 = '[4][7]';
      expect(positionArrayAsString(array1)).toEqual(string1);
      expect(positionArrayAsString(array2)).toEqual(string2);
      expect(positionArrayAsString(array3)).toEqual(string3);
    });
  });

  describe('positionStringAsArray', () => {
    it('transforms positionStrings to arrays as expected', () => {
      const positionArrayAsString = wrapper.instance().positionStringAsArray;
      const array1 = [1, 3, 6, 2];
      const array2 = [3, 3, 5];
      const array3 = [4, 7];
      const string1 = '[1][3][6][2]';
      const string2 = '[3][3][5]';
      const string3 = '[4][7]';
      expect(positionArrayAsString(string1)).toEqual(array1);
      expect(positionArrayAsString(string2)).toEqual(array2);
      expect(positionArrayAsString(string3)).toEqual(array3);
    });
  });

  describe('getFilterAtPosition', () => {
    it('returns the expected filter', () => {
      const getFilterAtPosition = wrapper.instance().getFilterAtPosition;
      expect(getFilterAtPosition('')).toEqual(dummyFilter);
      expect(getFilterAtPosition('[1]')).toEqual(dummyFilter[1]);
      expect(getFilterAtPosition('[1][1]')).toEqual(dummyFilter[1][1]);
      expect(getFilterAtPosition('[1][2]')).toEqual(dummyFilter[1][2]);
      expect(getFilterAtPosition('[2][1]')).toEqual(dummyFilter[2][1]);
    });
  });

  describe('removeFilter', () => {
    it('calls removeAtPosition with the positionString', () => {
      const removeFilter = wrapper.instance().removeFilter;
      const spy = jest.spyOn(wrapper.instance(), 'removeAtPosition');
      removeFilter('[1]');
      expect(spy).toHaveBeenCalledWith(dummyFilter, '[1]');
      expect(onFilterChangeDummy).toHaveBeenCalled();
    });
  });

  describe('changeFilter', () => {
    it('changes a Filter at a given position', () => {
      const changeFilter = wrapper.instance().changeFilter;
      const got1: GsFilter = [
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
      changeFilter('', 'or');
      expect(onFilterChangeDummy).toHaveBeenLastCalledWith(got1);

      const got3: GsFilter = [
        '&&',
        ['==', 'state', 'germany'],
        ['!', ['==', '', '']],
        [
          '!',
          ['==', 'name', 'Schalke']
        ]
      ];
      changeFilter('[2]', 'not');
      expect(onFilterChangeDummy).toHaveBeenLastCalledWith(got3);
      onFilterChangeDummy.mockRestore();

      const got4: GsFilter = [
        '&&',
        ['==', 'state', 'germany'],
        ['==', '', ''],
        [
          '!',
          ['==', 'name', 'Schalke']
        ]
      ];
      changeFilter('[2]', 'comparison');
      expect(onFilterChangeDummy).toHaveBeenLastCalledWith(got4);
    });
  });

  describe('addFilter', () => {
    it('adds a filter of a given type at the given position.', () => {
      const addFilter = wrapper.instance().addFilter;
      const got1: GsFilter = [
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
      addFilter('', 'and');
      expect(onFilterChangeDummy).toHaveBeenLastCalledWith(got1);

      const got4: GsFilter = [
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
      addFilter('[2]', 'comparison');
      expect(onFilterChangeDummy).toHaveBeenLastCalledWith(got4);
    });
  });

  describe('removeAtPosition', () => {
    it('removes a filter at the expected position', () => {
      const removeAtPosition = wrapper.instance().removeAtPosition;
      const filter = [...dummyFilter];
      const got = [
        '&&',
        ['==', 'state', 'germany'],
        [
          '!',
          ['==', 'name', 'Schalke']
        ]
      ];
      const newFilter = removeAtPosition(filter, '[2]');
      expect(newFilter).toEqual(got);

      const got2 = [
        '&&',
        [
          '!',
          ['==', 'name', 'Schalke']
        ]
      ];
      const newFilter2 = removeAtPosition(newFilter, '[1]');
      expect(newFilter2).toEqual(got2);
    });
  });

  describe('insertAtPosition', () => {
    it('insterts a filter at the expected position', () => {
      const insertAtPosition = wrapper.instance().insertAtPosition;
      const baseFilter = [
        '&&',
        [
          '!',
          ['==', 'name', 'Schalke']
        ]
      ];
      const got = [
        '&&',
        ['==', 'state', 'germany'],
        [
          '!',
          ['==', 'name', 'Schalke']
        ]
      ];
      const newFilter = insertAtPosition(baseFilter, ['==', 'state', 'germany'], '[1]', 0);
      expect(newFilter).toEqual(got);

      const newFilter2 = insertAtPosition(
        newFilter,
        [
          '||',
          ['>=', 'population', 100000],
          ['<', 'population', 200000]
        ],
        '[1]',
        2
      );
      expect(newFilter2).toEqual(dummyFilter);
    });
  });

});
