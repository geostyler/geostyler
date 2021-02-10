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

import { WellKnownNameField, WellKnownNameFieldProps } from './WellKnownNameField';
import TestUtil from '../../../../Util/TestUtil';
import en_US from '../../../../locale/en_US';

describe('WellKnownNameField', () => {

  let wrapper: any;
  beforeEach(() => {
    const props: WellKnownNameFieldProps = {
      locale: en_US.GsWellKnownNameField
    };
    wrapper = TestUtil.shallowRenderComponent(WellKnownNameField, props);
  });

  it('is defined', () => {
    expect(WellKnownNameField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  it('creates 6 default options', () => {
    expect(wrapper.instance().getWKNSelectOptions()).toHaveLength(15);
  });

  it('can handle wellKnownNames property', () => {
    expect.assertions(2);
    wrapper.setProps({
      wellKnownNames: ['Circle', 'Square']
    });
    expect(wrapper.instance().props.wellKnownNames).toHaveLength(2);
    expect(wrapper.instance().getWKNSelectOptions()).toHaveLength(2);
  });

  it('can handle wellKnownName property', () => {
    expect.assertions(2);
    wrapper.setProps({
      wellKnownName: 'Square'
    });
    expect(wrapper.instance().props.wellKnownName).toEqual('Square');
    const selectValue = wrapper.props().value;
    expect(selectValue).toEqual('Square');
  });
});
