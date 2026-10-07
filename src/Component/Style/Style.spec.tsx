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
import { Style, StyleProps } from './Style';
import TestUtil from '../../Util/TestUtil';
import defaultLocale from '../../locale/en_US';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Style as GsStyle } from 'geostyler-style';

vi.mock('../RuleTable/RuleTable', () => ({
  RuleTable: (props: any) => {
    const { rules, rowSelection, footer: Footer } = props;
    return (
      <div>
        {rules.map((_: any, idx: number) => (
          <input
            key={idx}
            type="checkbox"
            aria-label={`Rule ${idx}`}
            checked={rowSelection.selectedRowKeys.includes(idx)}
            onChange={() => {
              const keys = rowSelection.selectedRowKeys;
              rowSelection.onChange(
                keys.includes(idx) ? keys.filter((k: number) => k !== idx) : [...keys, idx]
              );
            }}
          />
        ))}
        {Footer && Footer()}
      </div>
    );
  }
}));

describe('Style', () => {

  const props: StyleProps = {
    onStyleChange: vi.fn(),
    style: TestUtil.getLineStyle()
  };

  const renderStyle = (style: GsStyle) => {
    const onStyleChange = vi.fn();
    const user = userEvent.setup();
    const utils = render(<Style style={style} onStyleChange={onStyleChange} />);
    return { onStyleChange, user, ...utils };
  };

  // antd menu items render an icon before the label, so the accessible name is
  // "iconLabel <text>" - match on the label substring.
  const menuName = (label: string) => new RegExp(label);
  const addRuleBtn = () => screen.getByRole('menuitem', { name: menuName(defaultLocale.Style.addRuleBtnText) });
  const cloneRulesBtn = () => screen.getByRole('menuitem', { name: menuName(defaultLocale.Style.cloneRulesBtnText) });
  const removeRulesBtn = () => screen.getByRole('menuitem', { name: menuName(defaultLocale.Style.removeRulesBtnText) });
  const multiEditBtn = () => screen.getByRole('menuitem', { name: menuName(defaultLocale.Style.multiEditLabel) });
  const nameInput = () => screen.getByRole('textbox');
  const ruleCheckbox = (index: number) => screen.getByRole('checkbox', { name: `Rule ${index}` });

  it('is defined', () => {
    expect(Style).toBeDefined();
  });

  it('renders correctly', () => {
    render(<Style {...props} />);
    expect(nameInput()).toBeInTheDocument();
    expect(addRuleBtn()).toBeInTheDocument();
  });

  it('onNameChange changes Style.name', async () => {
    const style = TestUtil.getLineStyle();
    const { onStyleChange, user } = renderStyle(style);
    await user.clear(nameInput());
    await user.type(nameInput(), 'Peter');
    expect(onStyleChange).toBeCalledWith({ ...style, name: 'Peter' });
  });

  it('adds a Rule', async () => {
    const { onStyleChange, user } = renderStyle(TestUtil.getTwoRulesStyle());
    await user.click(addRuleBtn());
    expect(onStyleChange).toHaveBeenCalledTimes(1);
    expect(onStyleChange.mock.calls[0][0].rules).toHaveLength(3);
  });

  it('clones Rules', async () => {
    const { onStyleChange, user } = renderStyle(TestUtil.getTwoRulesStyle());
    await user.click(ruleCheckbox(0));
    await user.click(ruleCheckbox(1));
    await user.click(cloneRulesBtn());
    const updatedStyle = onStyleChange.mock.calls.at(-1)[0];
    expect(updatedStyle.rules).toHaveLength(4);
    expect(updatedStyle.rules[0].symbolizer).toEqual(updatedStyle.rules[2].symbolizer);
    expect(updatedStyle.rules[1].symbolizer).toEqual(updatedStyle.rules[3].symbolizer);
  });

  it('removes a Rule', async () => {
    const { onStyleChange, user } = renderStyle(TestUtil.getTwoRulesStyle());
    await user.click(ruleCheckbox(0));
    await user.click(removeRulesBtn());
    const updatedStyle = onStyleChange.mock.calls.at(-1)[0];
    expect(updatedStyle.rules).toHaveLength(1);
  });

  it('enables the multi edit menu when multiple rules are selected', async () => {
    const { user } = renderStyle(TestUtil.getTwoRulesStyle());
    const multiEdit = multiEditBtn();
    expect(multiEdit).toHaveAttribute('aria-disabled', 'true');
    await user.click(ruleCheckbox(0));
    await user.click(ruleCheckbox(1));
    expect(multiEdit).not.toHaveAttribute('aria-disabled', 'true');
  });

  it('enables the clone menu item when rules are selected', async () => {
    const { user } = renderStyle(TestUtil.getTwoRulesStyle());
    const cloneItem = cloneRulesBtn();
    expect(cloneItem).toHaveAttribute('aria-disabled', 'true');
    await user.click(ruleCheckbox(0));
    expect(cloneItem).not.toHaveAttribute('aria-disabled', 'true');
  });
});
