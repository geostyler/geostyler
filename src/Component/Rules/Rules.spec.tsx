/* Released under the BSD 2-Clause License
 *
 * Copyright © 2021-present, terrestris GmbH & Co. KG and GeoStyler contributors
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
import { act, fireEvent, render } from '@testing-library/react';
import { Rules } from './Rules';
import { Rule } from 'geostyler-style';
import { vi } from 'vitest';

describe('Rules', () => {

  let onRulesChangeDummy;
  let onEditRuleClickDummy;
  let onClassificationClickDummy;
  let onEditSelectionClickDummy;
  let dummyRule: Rule;

  beforeEach(() => {
    onRulesChangeDummy = vi.fn();
    onEditRuleClickDummy = vi.fn();
    onClassificationClickDummy = vi.fn();
    onEditSelectionClickDummy = vi.fn();
    dummyRule = {
      name: 'foo',
      symbolizers: []
    };
  });

  it('is defined', () => {
    expect(Rules).toBeDefined();
  });

  it('renders correctly', () => {
    const rules = render(<Rules rules={[]} />);
    expect(rules.container).toBeInTheDocument();
  });

  describe('Add Rule Button', () => {

    it('calls a passed onRulesChange function', async () => {
      const rules = render(<Rules rules={[]} onRulesChange={onRulesChangeDummy} />);
      const addButton = rules.container.querySelector('.gs-add-rule-button');
      await act(async() => {
        fireEvent.click(addButton as Element);
      });

      expect(onRulesChangeDummy).toHaveBeenCalled();
    });

    it('adds a new rule', async () => {
      const rules = render(<Rules rules={[]} onRulesChange={onRulesChangeDummy} />);
      const addButton = rules.container.querySelector('.gs-add-rule-button');
      await act(async() => {
        fireEvent.click(addButton as Element);
      });

      const changedRules = onRulesChangeDummy.mock.lastCall[0];
      expect(changedRules).toHaveLength(1);
    });
  });

  describe('Rule Card', () => {

    it('calls passed onEditRuleClick function when clicked', async () => {
      const rules = render(<Rules rules={[dummyRule]} onEditRuleClick={onEditRuleClickDummy} />);
      const ruleCard = rules.container.querySelector('.gs-rule-card');
      await act(async() => {
        fireEvent.click(ruleCard as Element);
      });
      expect(onEditRuleClickDummy).toHaveBeenCalled();
    });

    it('calls passed onEditRuleClick function with rule index as argument', async () => {
      const rules = render(<Rules rules={[dummyRule]} onEditRuleClick={onEditRuleClickDummy} />);
      const ruleCard = rules.container.querySelector('.gs-rule-card');
      await act(async() => {
        fireEvent.click(ruleCard as Element);
      });
      expect(onEditRuleClickDummy).toHaveBeenCalledWith(0);
    });
  });

  describe('Remove Rule Button', () => {

    it('calls passed onRulesChange function', async () => {
      const rules = render(<Rules rules={[dummyRule]} onRulesChange={onRulesChangeDummy} />);
      const removeButton = rules.container.querySelector('.gs-removable-item-icon');
      await act(async() => {
        fireEvent.click(removeButton as Element);
      });

      expect(onRulesChangeDummy).toHaveBeenCalled();
    });

    it('calls passed onRulesChange function without the removed rule', async () => {
      const rules = render(<Rules rules={[dummyRule]} onRulesChange={onRulesChangeDummy} />);
      const removeButton = rules.container.querySelector('.gs-removable-item-icon');
      await act(async() => {
        fireEvent.click(removeButton as Element);
      });

      expect(onRulesChangeDummy).toHaveBeenCalledWith([]);
    });
  });

  describe('Classification Button', () => {

    it('calls passed onClassificationClick function', async () => {
      const rules = render(<Rules rules={[dummyRule]} onClassificationClick={onClassificationClickDummy} />);
      const classificationButton = rules.container.querySelector('.gs-classification-button');
      await act(async() => {
        fireEvent.click(classificationButton as Element);
      });

      expect(onClassificationClickDummy).toHaveBeenCalled();
    });
  });

  describe('Multi Select Toggle', () => {

    it('activates multi selection mode when clicked once', async () => {
      const rules = render(<Rules rules={[dummyRule]} />);
      const selectToggle = rules.container.querySelector('.gs-multi-select-toggle');
      await act(async() => {
        fireEvent.click(selectToggle as Element);
      });
      const ruleActions = rules.container.querySelector('.gs-rules-actions');
      expect(ruleActions?.children).toHaveLength(3);
    });

    it('deactivates multi selection mode when clicked twice', async () => {
      const rules = render(<Rules rules={[dummyRule]} />);
      const selectToggle = rules.container.querySelector('.gs-multi-select-toggle');
      await act(async() => {
        fireEvent.click(selectToggle as Element);
      });
      await act(async() => {
        fireEvent.click(selectToggle as Element);
      });
      const ruleActions = rules.container.querySelector('.gs-rules-actions');
      expect(ruleActions?.children).toHaveLength(2);
    });
  });

  describe('Remove Selection Button', () => {

    it('calls passed onRulesChange function', async () => {
      const rules = render(<Rules rules={[dummyRule, {...dummyRule}]} onRulesChange={onRulesChangeDummy} />);
      const selectToggle = rules.container.querySelector('.gs-multi-select-toggle');
      await act(async() => {
        fireEvent.click(selectToggle as Element);
      });

      const removeButton = rules.container.querySelector('.gs-remove-rules-button');
      await act(async () => {
        fireEvent.click(removeButton as Element);
      });

      expect(onRulesChangeDummy).toHaveBeenCalled();
    });

    it('calls passed onRulesChange function without removed rules', async () => {
      const rules = render(<Rules rules={[dummyRule, {...dummyRule}]} onRulesChange={onRulesChangeDummy} />);
      const selectToggle = rules.container.querySelector('.gs-multi-select-toggle');
      await act(async() => {
        fireEvent.click(selectToggle as Element);
      });

      // The click event triggers a new rendering of the component. Therefore,
      // we have to query the dom elements again, since the old references are
      // deprecated after a click.
      const firstRuleItem = rules.container.querySelectorAll('.gs-selectable-item')[0];
      await act(async () => {
        fireEvent.click(firstRuleItem);
      });
      const secondRuleItem = rules.container.querySelectorAll('.gs-selectable-item')[1];
      await act(async () => {
        fireEvent.click(secondRuleItem);
      });

      const removeButton = rules.container.querySelector('.gs-remove-rules-button');
      await act(async () => {
        fireEvent.click(removeButton as Element);
      });

      const changedRules = onRulesChangeDummy.mock.lastCall[0];
      expect(changedRules).toHaveLength(0);
    });
  });

  describe('Clone Rules Button', () => {

    it('calls passed onRulesChange function', async () => {
      const rules = render(<Rules rules={[dummyRule, {...dummyRule}]} onRulesChange={onRulesChangeDummy} />);
      const selectToggle = rules.container.querySelector('.gs-multi-select-toggle');
      await act(async() => {
        fireEvent.click(selectToggle as Element);
      });

      const cloneButton = rules.container.querySelector('.gs-clone-rules-button');
      await act(async() => {
        fireEvent.click(cloneButton as Element);
      });

      expect(onRulesChangeDummy).toHaveBeenCalled();
    });

    it('calls passed onRulesChange function with cloned rules', async () => {
      const rules = render(<Rules rules={[dummyRule, {...dummyRule}]} onRulesChange={onRulesChangeDummy} />);
      const selectToggle = rules.container.querySelector('.gs-multi-select-toggle');
      await act(async() => {
        fireEvent.click(selectToggle as Element);
      });

      const ruleItem = rules.container.querySelector('.gs-selectable-item');
      await act(async () => {
        fireEvent.click(ruleItem as Element);
      });

      const cloneButton = rules.container.querySelector('.gs-clone-rules-button');
      await act(async() => {
        fireEvent.click(cloneButton as Element);
      });

      const changedRules = onRulesChangeDummy.mock.lastCall[0];
      expect(changedRules).toHaveLength(3);
    });
  });

  describe('Edit Rules Button', () => {

    it('calls passed onEditSelectionClick function', async () => {
      const rules = render(
        <Rules rules={[dummyRule, {...dummyRule}]} onEditSelectionClick={onEditSelectionClickDummy} />
      );
      const selectToggle = rules.container.querySelector('.gs-multi-select-toggle');
      await act(async() => {
        fireEvent.click(selectToggle as Element);
      });

      const editButton = rules.container.querySelector('.gs-edit-rules-button');
      await act(async() => {
        fireEvent.click(editButton as Element);
      });

      expect(onEditSelectionClickDummy).toHaveBeenCalled();
    });

    it('calls passed onEditSelectionClick function with selected rule indices', async () => {
      const rules = render(
        <Rules rules={[dummyRule, {...dummyRule}]} onEditSelectionClick={onEditSelectionClickDummy} />
      );
      const selectToggle = rules.container.querySelector('.gs-multi-select-toggle');
      await act(async() => {
        fireEvent.click(selectToggle as Element);
      });

      const ruleItem = rules.container.querySelector('.gs-selectable-item');
      await act(async () => {
        fireEvent.click(ruleItem as Element);
      });

      const editButton = rules.container.querySelector('.gs-edit-rules-button');
      await act(async() => {
        fireEvent.click(editButton as Element);
      });

      expect(onEditSelectionClickDummy).toHaveBeenCalledWith([0]);
    });
  });
});
