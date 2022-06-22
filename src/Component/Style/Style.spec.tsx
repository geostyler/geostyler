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
import en_US from '../../locale/en_US';
import _cloneDeep from 'lodash/cloneDeep';
import { render, act, fireEvent } from '@testing-library/react';
import { Style as GsStyle } from 'geostyler-style';

describe('Style', () => {

  const props: StyleProps = {
    locale: en_US.Style,
    onStyleChange: jest.fn(),
    style: TestUtil.getLineStyle()
  };

  it('is defined', () => {
    expect(Style).toBeDefined();
  });

  it('renders correctly', () => {
    const wellKnownNameEditor = render(<Style {...props} />);
    expect(wellKnownNameEditor.container).toBeInTheDocument();
  });

  it('onNameChange changes Style.name', async () => {
    const style = render(<Style {...props} />);
    const newStyle = {...props.style};
    newStyle.name = 'Peter';
    const input = style.container.querySelector('.gs-style-name-classification-row input');
    await act(async() => {
      fireEvent.change(input, {
        target: { value: 'Peter' }
      });
    });
    expect(props.onStyleChange).toBeCalledWith(newStyle);
  });

  it('onRuleChange updates the right rule', async () => {
    const twoRulesStyle = TestUtil.getTwoRulesStyle();
    let newStyle: GsStyle = _cloneDeep(twoRulesStyle);
    newStyle.rules[1].name = 'Hilde';
    const style = render(<Style
      {...props}
      style={twoRulesStyle}
    />);
    const input = style.container.querySelectorAll('.gs-rule-left-fields input')[1];
    await act(async() => {
      fireEvent.change(input, {
        target: { value: 'Hilde' }
      });
    });
    expect(props.onStyleChange).toBeCalledWith(newStyle);
  });

  it('adds a Rule', async () => {
    const twoRulesStyle = TestUtil.getTwoRulesStyle();
    const mock = jest.fn();
    const style = render(<Style
      {...props}
      onStyleChange={mock}
      style={twoRulesStyle}
    />);
    const addButton = await style.findByText(en_US.Style.addRuleBtnText);
    await act(async() => {
      fireEvent.click(addButton);
    });
    expect(mock.mock.calls[0][0].rules).toHaveLength(3);
  });

  it('clones Rules', async () => {
    const twoRulesStyle = TestUtil.getTwoRulesStyle();
    const mock = jest.fn();
    const style = render(<Style
      {...props}
      compact={true}
      onStyleChange={mock}
      style={twoRulesStyle}
    />);
    const checkbox = style.container.querySelectorAll('input[type="checkbox"]')[0];
    await act(async() => {
      fireEvent.click(checkbox);
    });
    const cloneButton = await style.findByText(en_US.Style.cloneRulesBtnText);
    await act(async() => {
      fireEvent.click(cloneButton);
    });
    const updatedStyle = mock.mock.calls[0][0];
    expect(updatedStyle.rules).toHaveLength(4);
    expect(updatedStyle.rules[0].symbolizer).toEqual(updatedStyle.rules[2].symbolizer);
    expect(updatedStyle.rules[1].symbolizer).toEqual(updatedStyle.rules[3].symbolizer);
  });

  it('removes a Rule', async () => {
    const twoRulesStyle = TestUtil.getTwoRulesStyle();
    const mock = jest.fn();
    const style = render(<Style
      {...props}
      compact={true}
      onStyleChange={mock}
      style={twoRulesStyle}
    />);
    const checkbox = style.container.querySelectorAll('input[type="checkbox"]')[1];
    await act(async() => {
      fireEvent.click(checkbox);
    });
    const cloneButton = await style.findByText(en_US.Style.removeRulesBtnText);
    await act(async() => {
      fireEvent.click(cloneButton);
    });
    const updatedStyle = mock.mock.calls[0][0];
    expect(updatedStyle.rules).toHaveLength(1);
  });

  it('enables the multi edit menu when multiple rules are selected', async () => {
    const twoRulesStyle = TestUtil.getTwoRulesStyle();
    const mock = jest.fn();
    const style = render(<Style
      {...props}
      compact={true}
      onStyleChange={mock}
      style={twoRulesStyle}
    />);
    const checkbox = style.container.querySelectorAll('input[type="checkbox"]')[0];
    const multiEditLabel = await style.findByText(en_US.Style.multiEditLabel);
    const multiEditMenu = multiEditLabel?.closest('li');
    expect(multiEditMenu?.classList).toContain('ant-menu-submenu-disabled');
    await act(async() => {
      fireEvent.click(checkbox);
    });
    // all rules should be selected
    expect(multiEditMenu?.classList).not.toContain('ant-menu-submenu-disabled');
  });

  it('enables the clone button when multiple rules are selected', async () => {
    const twoRulesStyle = TestUtil.getTwoRulesStyle();
    const mock = jest.fn();
    const style = render(<Style
      {...props}
      compact={true}
      onStyleChange={mock}
      style={twoRulesStyle}
    />);
    const checkbox = style.container.querySelectorAll('input[type="checkbox"]')[0];
    const cloneButtonLabel = await style.findByText(en_US.Style.multiEditLabel);
    const cloneButton = cloneButtonLabel?.closest('li');
    expect(cloneButton?.classList).toContain('ant-menu-submenu-disabled');
    await act(async() => {
      fireEvent.click(checkbox);
    });
    // all rules should be selected
    expect(cloneButton?.classList).not.toContain('ant-menu-item-disabled');
  });

  // it('disables the color menu item', () => {
  //   let twoRules = TestUtil.getTwoRulesStyle();
  //   wrapper.instance().setState({style: twoRules});
  //   let disabled = wrapper.instance().disableMenu('color', [0, 1]);
  //   expect(disabled).toEqual(false);
  //   twoRules.rules[0].symbolizers[0].kind = 'Icon';
  //   wrapper.instance().setState({style: twoRules});
  //   disabled = wrapper.instance().disableMenu('color', [0, 1]);
  //   expect(disabled).toEqual(true);
  // });

  // it('disables the size menu item', () => {
  //   let twoRules = TestUtil.getTwoRulesStyle();
  //   wrapper.instance().setState({style: twoRules});
  //   let disabled = wrapper.instance().disableMenu('size', [0, 1]);
  //   expect(disabled).toEqual(false);
  //   twoRules.rules[0].symbolizers[0].kind = 'Line';
  //   wrapper.instance().setState({style: twoRules});
  //   disabled = wrapper.instance().disableMenu('size', [0, 1]);
  //   expect(disabled).toEqual(true);
  // });

  // it('disables the symbol menu item', () => {
  //   let twoRules = TestUtil.getTwoRulesStyle();
  //   wrapper.instance().setState({style: twoRules});
  //   let disabled = wrapper.instance().disableMenu('symbol', [0, 1]);
  //   expect(disabled).toEqual(false);
  //   twoRules.rules[0].symbolizers[0].kind = 'Line';
  //   wrapper.instance().setState({style: twoRules});
  //   disabled = wrapper.instance().disableMenu('symbol', [0, 1]);
  //   expect(disabled).toEqual(true);
  // });
});
