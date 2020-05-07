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

import { RuleTable, RuleTableProps, RuleRecord } from './RuleTable';
import TestUtil from '../../Util/TestUtil';
import { Rule } from 'geostyler-style';
import { Input, Popover, InputNumber, Button } from 'antd';
import { mount } from 'enzyme';
import { Data } from 'geostyler-data';
import RuleReorderButtons from './RuleReorderButtons/RuleReorderButtons';

const _cloneDeep = require('lodash/cloneDeep');

describe('RuleTable', () => {
  let wrapper: any;
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

  beforeEach(() => {
    dummyRules = TestUtil.getTwoRulesStyle().rules;
    dummyRules[1].filter = TestUtil.getDummyGsFilter();
    const props: RuleTableProps = {
      rules: dummyRules
    };
    wrapper = TestUtil.shallowRenderComponent(RuleTable, props);
  });

  it('is defined', () => {
    expect(RuleTable).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  describe('getRuleRecords', () => {
    it('returns a RuleRecord for every Rule', () => {
      const getRuleRecords = wrapper.instance().getRuleRecords;
      const got = getRuleRecords();
      expect(got.length).toEqual(dummyRules.length);
      expect(got[0]).toEqual({...dummyRules[0], key: 0});
      expect(got[1]).toEqual({...dummyRules[1], key: 1});
    });
  });

  describe('onSymbolizerClick', () => {
    it('sets the state correctly', () => {
      const onSymbolizerClick = wrapper.instance().onSymbolizerClick;
      const dummyRect: DOMRect = {
        x: 12,
        y: 24,
        width: 36,
        height: 48,
        bottom: 60,
        top: 72,
        left: 84,
        right: 96,
        toJSON: jest.fn()
      };
      onSymbolizerClick(wrapper.instance().getRuleRecords()[1], dummyRect);
      const state = wrapper.state();
      const newValues = {
        ruleEditIndex: 1,
        symbolizerEditorVisible: true,
        symbolizerEditorPosition: dummyRect,
        filterEditorVisible: false
      };
      const got = {...state, ...newValues};
      expect(state).toEqual(got);
    });
  });

  describe('nameRenderer', () => {
    it('returns an Input with PopOver', () => {
      const record: RuleRecord = {
        key: 0,
        name: 'name',
        symbolizers: []
      };
      const got = wrapper.instance().nameRenderer(undefined, record);
      const mountRenderer = mount(got);
      const instance = mountRenderer.instance();
      expect(instance).toBeInstanceOf(Popover);
      expect(mountRenderer.find(Input).length).toEqual(1);
    });
  });

  describe('filterRenderer', () => {
    it('returns an Input.Search if filter is undefined', () => {
      const record: RuleRecord = {
        key: 0,
        name: 'name',
        symbolizers: []
      };
      const got = wrapper.instance().filterRenderer(undefined, record);
      const mountRenderer = mount(got);
      const popover = mountRenderer.instance();
      expect(popover).toBeInstanceOf(Input.Search);
    });
    it('returns an Input.Search with PopOver if filter is defined', () => {
      const record: RuleRecord = {
        key: 0,
        name: 'name',
        symbolizers: [],
        filter: ['==', 'as', 'cd']
      };
      const got = wrapper.instance().filterRenderer(undefined, record);
      const mountRenderer = mount(got);
      const instance = mountRenderer.instance();
      expect(instance).toBeInstanceOf(Popover);
      expect(mountRenderer.find(Input.Search).length).toEqual(1);
    });
  });

  describe('minScaleRenderer', () => {
    it('returns an InputNumber', () => {
      const record: RuleRecord = {
        key: 0,
        name: 'name',
        symbolizers: [],
        scaleDenominator: {
          min: 12,
          max: 24
        }
      };
      const got = wrapper.instance().minScaleRenderer(undefined, record);
      const mountRenderer = mount(got);
      const instance = mountRenderer.instance();
      expect(instance).toBeInstanceOf(InputNumber);
    });
  });

  describe('maxScaleRenderer', () => {
    it('returns an InputNumber', () => {
      const record: RuleRecord = {
        key: 0,
        name: 'name',
        symbolizers: [],
        scaleDenominator: {
          min: 12,
          max: 24
        }
      };
      const got = wrapper.instance().maxScaleRenderer(undefined, record);
      const mountRenderer = mount(got);
      const instance = mountRenderer.instance();
      expect(instance).toBeInstanceOf(InputNumber);
    });
  });

  describe('amountRenderer', () => {
    it('returns div with the count of features in the FeatureCollection', () => {
      const record: RuleRecord = {
        key: 0,
        name: 'name',
        symbolizers: [],
        scaleDenominator: {
          min: 12,
          max: 24
        }
      };
      wrapper.setProps({data});
      const got = wrapper.instance().amountRenderer(undefined, record);
      const mountRenderer = mount(got);
      const instance = mountRenderer.instance();
      expect(instance).toBeInstanceOf(HTMLDivElement);
      expect(mountRenderer.prop('children')).toBe(2);
    });
    it('returns div with the state.counts[record.key] when filter and data present', () => {
      const record: RuleRecord = {
        key: 0,
        name: 'name',
        symbolizers: [],
        scaleDenominator: {
          min: 12,
          max: 24
        },
        filter: ['==', 'name', 'Peter']
      };
      wrapper.setProps({data});
      const got = wrapper.instance().amountRenderer(undefined, record);
      const mountRenderer = mount(got);
      const instance = mountRenderer.instance();
      expect(instance).toBeInstanceOf(HTMLDivElement);
      expect(mountRenderer.prop('children')).toBe(wrapper.state().counts[0]);
    });
  });

  describe('duplicatesRenderer', () => {
    it('returns div with the state.duplicates[record.key] when data and rules are present', () => {
      const record: RuleRecord = {
        key: 0,
        name: 'name',
        symbolizers: [],
        scaleDenominator: {
          min: 12,
          max: 24
        }
      };
      wrapper.setProps({data});
      const got = wrapper.instance().duplicatesRenderer(undefined, record);
      const mountRenderer = mount(got);
      const instance = mountRenderer.instance();
      expect(instance).toBeInstanceOf(HTMLDivElement);
      expect(mountRenderer.prop('children')).toBe(wrapper.state().duplicates[0]);
    });
  });

  describe('ruleOrderRenderer', () => {
    it('returns a ReorderButtonGroup', () => {
      const record: RuleRecord = {
        key: 0,
        name: 'name',
        symbolizers: [],
        scaleDenominator: {
          min: 12,
          max: 24
        }
      };
      const got = wrapper.instance().ruleReorderRenderer(record);
      const mountRenderer = mount(got);
      const instance = mountRenderer.instance();
      expect(instance).toBeInstanceOf(RuleReorderButtons);
    });
  });

  describe('onSymbolizersChange', () => {
    it('calls the onSymbolizersChange prop function with the value', () => {
      const symbolizers = ['a'];
      wrapper.setState({
        ruleEditIndex: 1337
      });
      const mock = wrapper.instance().setValueForRule = jest.fn();
      wrapper.instance().onSymbolizersChange(symbolizers);
      expect(mock).toHaveBeenCalledWith(1337, 'symbolizers', symbolizers);
    });
  });

  describe('onFilterChange', () => {
    it('calls the onFilterChange prop function with the value', () => {
      const filter = ['a'];
      wrapper.setState({
        ruleEditIndex: 1337
      });
      const mock = wrapper.instance().setValueForRule = jest.fn();
      wrapper.instance().onFilterChange(filter);
      expect(mock).toHaveBeenCalledWith(1337, 'filter', filter);
    });
  });

  describe('setValueForRule', () => {
    it('calls onRulesChange with the newRules', () => {
      const onRulesChange = jest.fn();
      wrapper.setProps({
        onRulesChange
      });
      const newRules = [...dummyRules];
      newRules[1].filter =  ['==', 'name', 'Peter'];
      wrapper.instance().setValueForRule(1, 'filter', ['==', 'name', 'Peter']);
      expect(onRulesChange).toHaveBeenCalledWith(newRules);
    });
  });

  describe('onSymbolizerEditorWindowClose', () => {
    it('sets symbolizerEditorVisible to false ', () => {
      wrapper.instance().onSymbolizerEditorWindowClose();
      expect(wrapper.state('symbolizerEditorVisible')).toBe(false);
    });
  });

  describe('onFilterEditorWindowClose', () => {
    it('sets filterEditorVisible to false ', () => {
      wrapper.instance().onFilterEditorWindowClose();
      expect(wrapper.state('filterEditorVisible')).toBe(false);
    });
  });

});
