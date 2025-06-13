/* eslint-disable max-len */
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

import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { RuleTable } from './RuleTable';
import TestUtil from '../../Util/TestUtil';
import { Rule } from 'geostyler-style';
import { Data } from 'geostyler-data';
import { GeoStylerContext } from '../../context/GeoStylerContext/GeoStylerContext';

describe('RuleTable', () => {
  let dummyRules: Rule[];
  const data: Data = {
    schema: {
      type: 'foo',
      properties: {}
    },
    exampleFeatures: {
      type: 'FeatureCollection',
      features: [{
        id: 1,
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [102.0, 0.5]
        },
        properties: {
          name: 'Peter'
        }
      }, {
        id: 2,
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [102.0, 0.5]
        },
        properties: {
          name: 'Doris'
        }
      }]
    }
  };

  let ruleTable: RenderResult;
  beforeEach(() => {
    dummyRules = TestUtil.getTwoRulesStyle().rules;
    ruleTable = render(
      <GeoStylerContext.Provider value={{ data }}>
        <RuleTable
          rules={dummyRules}
        />
      </GeoStylerContext.Provider>
    );
  });

  it('is defined', () => {
    expect(RuleTable).toBeDefined();
  });

  test('… renders', () => {
    expect(ruleTable.container).toBeInTheDocument();
  });

  describe('SymbolizerRenderer', () => {
    it('… renders a symbolizer for every rule', () => {
      const symbolizerRenderer = ruleTable.container.querySelectorAll('.gs-symbolizer-olrenderer');
      expect(symbolizerRenderer).toHaveLength(2);
    });
  });

  describe('NameRenderer', () => {
    it('… renders the name for every rule', () => {
      const nameRenderers = ruleTable.container.querySelectorAll<HTMLInputElement>('input[name=name-renderer]');
      nameRenderers.forEach((nameRenderer, index) => {
        expect(nameRenderers[index].value).toBe(dummyRules[index].name);
      });
    });
  });

  describe('FilterRenderer', () => {
    it('… renders the filter for every rule', () => {
      const rulesWithFilter = TestUtil.getTwoRulesStyle().rules;
      rulesWithFilter[0].filter = ['==', 'name', 'Peter'];
      rulesWithFilter[1].filter = TestUtil.getDummyGsFilter();
      ruleTable.rerender(<RuleTable
        rules={rulesWithFilter}
      />);
      const filterRenderers = ruleTable.container.querySelectorAll<HTMLInputElement>('input[name=filter-renderer]');
      expect(filterRenderers[0].value).toBe('name = \'Peter\'');
      expect(filterRenderers[1].value).toBe('state = \'germany\' AND (population >= 100000 OR population < 200000) AND NOT ( name = \'Schalke\' )');
    });
  });

  describe('ScalesRenderer', () => {
    it('… renders scales for every rule', () => {
      const rulesWithScales = TestUtil.getTwoRulesStyle().rules;
      rulesWithScales[0].scaleDenominator = {
        min: 12,
        max: 24
      };
      ruleTable.rerender(
        <GeoStylerContext.Provider value={{data}}>
          <RuleTable rules={rulesWithScales} />
        </GeoStylerContext.Provider>
      );
      const minScaleDenominators = ruleTable.container.querySelectorAll<HTMLInputElement>('input[name=min-scale-denominator]');
      minScaleDenominators.forEach((_, index) => {
        const value = rulesWithScales[index].scaleDenominator?.min ?? undefined;
        expect(minScaleDenominators[index].value).toEqual(value ? `${value}` : '');
      });

      const maxScaleDenominators = ruleTable.container.querySelectorAll<HTMLInputElement>('input[name=max-scale-denominator]');
      maxScaleDenominators.forEach((_, index) => {
        const value = rulesWithScales[index].scaleDenominator?.max ?? undefined;
        expect(maxScaleDenominators[index].value).toEqual(value ? `${value}` : '');
      });
    });
  });

  describe('AmountRenderer', () => {
    it('… returns the count of features in the FeatureCollection', () => {
      const amountRenderers = ruleTable.container.querySelectorAll<HTMLInputElement>('.amount-renderer');
      expect(amountRenderers.length).toBe(2);
      expect(amountRenderers[0].innerHTML).toBe('2');
      expect(amountRenderers[1].innerHTML).toBe('2');
    });
    it('… returns the count of the matching features when filter and data present', () => {
      const rulesWithFilter = TestUtil.getTwoRulesStyle().rules;
      rulesWithFilter[0].filter = ['==', 'name', 'Peter'];
      rulesWithFilter[1].filter = TestUtil.getDummyGsFilter();
      ruleTable.rerender(
        <GeoStylerContext.Provider value={{ data }}>
          <RuleTable rules={rulesWithFilter} />
        </GeoStylerContext.Provider>
      );
      const amountRenderers = ruleTable.container.querySelectorAll<HTMLInputElement>('.amount-renderer');
      expect(amountRenderers).toHaveLength(2);
      expect(amountRenderers[0].innerHTML).toBe('1');
      expect(amountRenderers[1].innerHTML).toBe('0');
    });
  });

  describe('DuplicatesRenderer', () => {
    it('… returns duplicates when data and rules are present', () => {
      const rulesWithFilter = TestUtil.getTwoRulesStyle().rules;
      rulesWithFilter[0].filter = ['==', 'name', 'Peter'];
      rulesWithFilter[1].filter = ['!=', 'name', 'Hilde'];
      ruleTable.rerender(
        <GeoStylerContext.Provider value={{ data }}>
          <RuleTable rules={rulesWithFilter} />
        </GeoStylerContext.Provider>
      );
      const duplicatesRenderers = ruleTable.container.querySelectorAll<HTMLInputElement>('.duplicates-renderer');
      expect(duplicatesRenderers).toHaveLength(2);
      expect(duplicatesRenderers[0].innerHTML).toBe('1');
      expect(duplicatesRenderers[1].innerHTML).toBe('1');
    });
  });
});
