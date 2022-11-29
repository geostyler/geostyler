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

import { Rule, RuleProps } from './Rule';
import SymbolizerUtil from '../../Util/SymbolizerUtil';
import TestUtil from '../../Util/TestUtil';
import en_US from '../../locale/en_US';
import {
  Rule as GsRule
} from 'geostyler-style';
import { SLDRenderer } from '../Renderer/SLDRenderer/SLDRenderer';
import { Renderer } from '../Renderer/Renderer/Renderer';

describe('Rule', () => {

  let wrapper: any;
  let onRuleChangeDummmy: jest.Mock;
  let onRemoveDummmy: jest.Mock;
  let dummyRule: GsRule = TestUtil.getLineStyle().rules[0] as GsRule;
  beforeEach(() => {
    const dummyData = TestUtil.getDummyGsData();
    onRuleChangeDummmy = jest.fn();
    onRemoveDummmy = jest.fn();
    const props: RuleProps = {
      internalDataDef: dummyData,
      onRuleChange: onRuleChangeDummmy,
      onRemove: onRemoveDummmy,
      locale: en_US.Rule,
      rule: dummyRule
    };
    wrapper = TestUtil.shallowRenderComponent(Rule, props);
  });

  it('is defined', () => {
    expect(Rule).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  describe('onNameChange', () => {
    it('calls the onNameChange prop with correct symbolizer ', () => {
      const onNameChange = wrapper.instance().onNameChange;
      const newRule = {...dummyRule};
      newRule.name = 'Peter';
      onNameChange('Peter');
      expect(onRuleChangeDummmy).toBeCalledWith(newRule, wrapper.state().rule);
    });
  });

  describe('onScaleDenominatorChange', () => {
    it('calls the onScaleDenominatorChange prop with correct symbolizer ', () => {
      const onScaleDenominatorChange = wrapper.instance().onScaleDenominatorChange;
      const newRule = {...dummyRule};
      newRule.scaleDenominator = {
        min: 12,
        max: 24
      };
      onScaleDenominatorChange({
        min: 12,
        max: 24
      });
      expect(onRuleChangeDummmy).toBeCalledWith(newRule, wrapper.state().rule);
    });
  });

  describe('onFilterChange', () => {
    it('calls the onFilterChange prop with correct symbolizer ', () => {
      const onFilterChange = wrapper.instance().onFilterChange;
      const newRule = {...dummyRule};
      const filter = TestUtil.getDummyGsFilter();
      newRule.filter = filter;
      onFilterChange(filter);
      expect(onRuleChangeDummmy).toBeCalledWith(newRule, wrapper.state().rule);
    });
  });

  describe('onSymbolizersChange', () => {
    it('calls the onSymbolizersChange prop with correct symbolizer ', () => {
      const onSymbolizersChange = wrapper.instance().onSymbolizersChange;
      const newRule = {...dummyRule};
      const symbolizers = [
        SymbolizerUtil.generateSymbolizer('Icon'),
        SymbolizerUtil.generateSymbolizer('Mark')
      ];
      newRule.symbolizers = symbolizers;
      onSymbolizersChange(symbolizers);
      expect(onRuleChangeDummmy).toBeCalledWith(newRule, wrapper.state().rule);
    });
  });

  describe('onScaleCheckChange', () => {
    it('calls the onScaleCheckChange prop with correct symbolizer ', () => {
      const onScaleCheckChange = wrapper.instance().onScaleCheckChange;
      const newRule = {...dummyRule};
      const fakeEvent = {
        target: {
          checked: false
        }
      };
      delete newRule.scaleDenominator;
      onScaleCheckChange(fakeEvent);
      expect(onRuleChangeDummmy).toBeCalledWith(newRule, wrapper.state().rule);
    });
    it('restors a storedScaleDenominator if present', () => {
      const onScaleCheckChange = wrapper.instance().onScaleCheckChange;
      const storedScaleDenominator = {
        min: 12,
        max: 24
      };
      wrapper.setProps({
        rule: {
          ...dummyRule,
          scaleDenominator: storedScaleDenominator
        }
      });
      const uncheckEvent = {
        target: {
          checked: false
        }
      };
      onScaleCheckChange(uncheckEvent);
      // TODO getDerivedStateFromProps is breaking the state if the rule is not
      // repassed as prop (no onRuleChange method implemented as expected)

      // expect(wrapper.state().rule.scaleDenominator).toBeUndefined();
      // expect(wrapper.state().storedScaleDenominator).toEqual(storedScaleDenominator);
      const checkEvent = {
        target: {
          checked: true
        }
      };
      onScaleCheckChange(checkEvent);
      expect(wrapper.state().rule.scaleDenominator).toEqual(storedScaleDenominator);
    });
  });

  describe('onFilterCheckChange', () => {
    it('calls the onFilterCheckChange prop with correct symbolizer ', () => {
      const onFilterCheckChange = wrapper.instance().onFilterCheckChange;
      const newRule = {...dummyRule};
      const fakeEvent = {
        target: {
          checked: false
        }
      };
      delete newRule.filter;
      onFilterCheckChange(fakeEvent);
      expect(onRuleChangeDummmy).toBeCalledWith(newRule, wrapper.state().rule);
    });
    it('restors a storedFilter if present', () => {
      const onFilterCheckChange = wrapper.instance().onFilterCheckChange;
      const storedFilter = TestUtil.getDummyGsFilter();
      wrapper.setProps({
        rule: {
          ...dummyRule,
          filter: storedFilter
        }
      });
      const uncheckEvent = {
        target: {
          checked: false
        }
      };
      onFilterCheckChange(uncheckEvent);
      // TODO getDerivedStateFromProps is breaking the state if the rule is not
      // repassed as prop (no onRuleChange method implemented as expected)

      // expect(wrapper.state().rule.filter).toBeUndefined();
      // expect(wrapper.state().storedFilter).toEqual(storedFilter);
      const checkEvent = {
        target: {
          checked: true
        }
      };
      onFilterCheckChange(checkEvent);
      expect(wrapper.state().rule.filter).toEqual(storedFilter);
    });
  });

  describe('A click on the Renderer', () => {
    it('toggles the editorVisibility', () => {
      const editorVisible = wrapper.state().editorVisible;
      const renderer = wrapper.find('OlRenderer');
      renderer.simulate('click');
      expect(wrapper.state().editorVisible).toBe(!editorVisible);
      renderer.simulate('click');
      expect(wrapper.state().editorVisible).toBe(editorVisible);
    });
  });

  describe('renders configured: ', () => {
    it('SLD renderer', () => {
      wrapper.setProps({
        rendererType: 'SLD'
      });
      const targetRenderer = wrapper.find(SLDRenderer);
      expect(targetRenderer).toBeDefined();
    });

    it('OpenLayers renderer', () => {
      wrapper.setProps({
        rendererType: 'OpenLayers'
      });
      const targetRenderer = wrapper.find(Renderer);
      expect(targetRenderer).toBeDefined();
    });
  });

  describe('A click on the Remove Button', () => {
    it('calls the onRemove function passed as prop ', () => {
      const removeButton = wrapper.find('Button.gs-rule-remove-button');
      removeButton.simulate('click');
      expect(onRemoveDummmy).toBeCalled();
    });
  });

  describe('onEditorWindowClose', () => {
    it('sets editorVisible to false', () => {
      wrapper.instance().onEditorWindowClose();
      expect(wrapper.state().editorVisible).toBe(false);
    });
  });

});
