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

import { Style, StyleProps } from './Style';
import TestUtil from '../../Util/TestUtil';
import en_US from '../../locale/en_US';
import _cloneDeep from 'lodash/cloneDeep';

describe('Style', () => {

  let wrapper: any;
  let lineStyle = TestUtil.getLineStyle();
  beforeEach(() => {
    const props: StyleProps = {
      locale: en_US.GsStyle,
      style: lineStyle
    };
    wrapper = TestUtil.shallowRenderComponent(Style, props);
  });

  it('is defined', () => {
    expect(Style).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  it('sets the state to props.style', () => {
    expect(wrapper.state().style).toEqual(lineStyle);
  });

  it('onNameChange changes Style.name', () => {
    expect(wrapper.state().style.name).toEqual(lineStyle.name);
    wrapper.instance().onNameChange('new Name');
    expect(wrapper.state().style.name).toEqual('new Name');
  });

  it('onRuleChange updates the right rule', () => {
    const twoRules = TestUtil.getTwoRulesStyle();
    wrapper.setState({style: twoRules});
    let newRule = _cloneDeep(twoRules.rules[1]);
    newRule.symbolizers[0].color = '#000';

    wrapper.instance().onRuleChange(newRule, twoRules.rules[1]);
    const newStyle = wrapper.state().style;
    expect(newStyle).toBeDefined();
    expect(newStyle.rules[0]).toEqual(twoRules.rules[0]);
    expect(newStyle.rules[1]).toEqual(newRule);
    expect(newStyle.rules[1]).not.toEqual(twoRules.rules[1]);
  });

  it('adds a Rule', () => {
    expect(wrapper.state().style.rules).toHaveLength(1);
    wrapper.instance().addRule();
    expect(wrapper.state().style.rules).toHaveLength(2);
  });

  it('clones Rules', () => {
    expect(wrapper.state().style.rules).toHaveLength(1);
    wrapper.state().selectedRowKeys = [0];
    wrapper.instance().cloneRules();
    expect(wrapper.state().style.rules).toHaveLength(2);
  });

  it('removes a Rule', () => {
    expect(wrapper.state().style.rules).toHaveLength(1);
    wrapper.instance().removeRule(lineStyle.rules[0]);
    expect(wrapper.state().style.rules).toHaveLength(0);
  });

  it('disables the color menu item', () => {
    let twoRules = TestUtil.getTwoRulesStyle();
    wrapper.instance().setState({style: twoRules});
    let disabled = wrapper.instance().disableMenu('color', [0, 1]);
    expect(disabled).toEqual(false);
    twoRules.rules[0].symbolizers[0].kind = 'Icon';
    wrapper.instance().setState({style: twoRules});
    disabled = wrapper.instance().disableMenu('color', [0, 1]);
    expect(disabled).toEqual(true);
  });

  it('disables the size menu item', () => {
    let twoRules = TestUtil.getTwoRulesStyle();
    wrapper.instance().setState({style: twoRules});
    let disabled = wrapper.instance().disableMenu('size', [0, 1]);
    expect(disabled).toEqual(false);
    twoRules.rules[0].symbolizers[0].kind = 'Line';
    wrapper.instance().setState({style: twoRules});
    disabled = wrapper.instance().disableMenu('size', [0, 1]);
    expect(disabled).toEqual(true);
  });

  it('disables the symbol menu item', () => {
    let twoRules = TestUtil.getTwoRulesStyle();
    wrapper.instance().setState({style: twoRules});
    let disabled = wrapper.instance().disableMenu('symbol', [0, 1]);
    expect(disabled).toEqual(false);
    twoRules.rules[0].symbolizers[0].kind = 'Line';
    wrapper.instance().setState({style: twoRules});
    disabled = wrapper.instance().disableMenu('symbol', [0, 1]);
    expect(disabled).toEqual(true);
  });
});
