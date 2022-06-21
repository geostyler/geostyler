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
import { RuleReorderButtons, RuleReorderButtonsProps } from './RuleReorderButtons';
import TestUtil from '../../../Util/TestUtil';

import {
  Rule as GsRule,
} from 'geostyler-style';

import _cloneDeep from 'lodash/cloneDeep';
import { render, act, fireEvent } from '@testing-library/react';

describe('RuleReorderButtons', () => {

  it('is defined', () => {
    expect(RuleReorderButtons).toBeDefined();
  });

  it('renders correctly', () => {
    const ruleReorderButtons = render(
      <RuleReorderButtons
        rules={TestUtil.getTwoRulesStyle().rules}
        ruleIndex={0}
      />
    );
    expect(ruleReorderButtons.container).toBeInTheDocument();
  });

  describe('onRuleOrderChange', () => {
    it('reorders the rules downwards', async () => {
      let rules: GsRule[] = [];
      const onRulesMove = (reorderedRules: GsRule[]) => {
        rules = reorderedRules;
      };
      const ruleReorderButtons = render(
        <RuleReorderButtons
          rules={TestUtil.getTwoRulesStyle().rules}
          ruleIndex={0}
          onRulesMove={onRulesMove}
        />
      );
      const moveDownButton = (await ruleReorderButtons.findAllByRole('button'))[1];
      await act(async() => {
        fireEvent.click(moveDownButton);
      });
      expect(rules[0].name).toBe('rule1');
    });

    it('reorders the rules upwards',async () => {
      let rules: GsRule[] = [];
      const onRulesMove = (reorderedRules: GsRule[]) => {
        rules = reorderedRules;
      };
      const ruleReorderButtons = render(
        <RuleReorderButtons
          rules={TestUtil.getTwoRulesStyle().rules}
          ruleIndex={1}
          onRulesMove={onRulesMove}
        />
      );
      const moveUpButton = (await ruleReorderButtons.findAllByRole('button'))[0];
      await act(async() => {
        fireEvent.click(moveUpButton);
      });
      expect(rules[0].name).toBe('rule1');
    });

    it('calls the onRulesChange with the reordered rules ', async () => {
      let rules: GsRule[] = TestUtil.getTwoRulesStyle().rules;
      // reordered rules
      const rulesClone = _cloneDeep(rules);
      rulesClone.splice(1, 0, rulesClone.splice(0, 1)[0]);
      const onRulesMove =jest.fn();
      const ruleReorderButtons = render(
        <RuleReorderButtons
          rules={rules}
          ruleIndex={1}
          onRulesMove={onRulesMove}
        />
      );
      const moveUpButton = (await ruleReorderButtons.findAllByRole('button'))[0];
      await act(async() => {
        fireEvent.click(moveUpButton);
      });
      expect(onRulesMove).toHaveBeenCalledWith(rulesClone);
    });
  });

});
