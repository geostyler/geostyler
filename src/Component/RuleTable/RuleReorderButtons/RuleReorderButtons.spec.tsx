/* eslint-disable no-undef */
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

import { RuleReorderButtons, RuleReorderButtonsProps } from './RuleReorderButtons';
import TestUtil from '../../../Util/TestUtil';

import {
  Rule as GsRule,
} from 'geostyler-style';

import _cloneDeep from 'lodash/cloneDeep';

describe('ReorderButtonGroup', () => {

  let wrapper: any;
  let onRulesMoveDummy: jest.Mock;
  let dummyRules: any;
  beforeEach(() => {
    dummyRules = TestUtil.getTwoRulesStyle().rules;
    onRulesMoveDummy = jest.fn();
    const props: RuleReorderButtonsProps = {
      ruleIndex: 1,
      rules: dummyRules,
      onRulesMove: onRulesMoveDummy
    };
    wrapper = TestUtil.shallowRenderComponent(RuleReorderButtons, props);
  });

  it('is defined', () => {
    expect(RuleReorderButtons).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  describe('onRuleOrderChange', () => {
    it('reorders the rules downwards', () => {
      const ruleIndex = 0;
      const rules = [...dummyRules];
      let reorderRules: GsRule[];
      const onRulesMove = (_reorderedRules) => {
        reorderRules = _reorderedRules;
      };
      wrapper.setProps({
        ruleIndex,
        rules,
        onRulesMove
      });

      // move first item downwards
      wrapper.instance().onRuleOrderChange(true);
      expect(reorderRules[0].name).toBe('rule1');
    });

    it('reorders the rules upwards', () => {
      const ruleIndex = 1;
      const rules = [...dummyRules];
      let reorderRules: GsRule[];
      const onRulesMove = (_reorderedRules) => {
        reorderRules = _reorderedRules;
      };
      wrapper.setProps({
        ruleIndex,
        rules,
        onRulesMove
      });
      // move second item upwards
      wrapper.instance().onRuleOrderChange(false);
      expect(reorderRules[0].name).toBe('rule1');
    });

    it('calls the onRulesChange with the reordered rules ', () => {
      const ruleIndex = 0;
      const rules = [...dummyRules];
      // re-order rules
      const rulesClone = _cloneDeep(rules);
      rulesClone.splice(1, 0, rulesClone.splice(0, 1)[0]);
      const onRulesMove = jest.fn();
      wrapper.setProps({
        ruleIndex,
        rules,
        onRulesMove
      });
      wrapper.instance().onRuleOrderChange(true);
      expect(onRulesMove).toHaveBeenCalledWith(rulesClone);
    });
  });

});
