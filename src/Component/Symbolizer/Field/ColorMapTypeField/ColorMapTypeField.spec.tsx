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

import { ColorMapTypeField, ColorMapTypeFieldProps } from './ColorMapTypeField';
import TestUtil from '../../../../Util/TestUtil';

describe('ColorMapTypeField', () => {

  let wrapper: any;
  beforeEach(() => {
    const props: ColorMapTypeFieldProps = {
      onChange: jest.fn()
    };
    wrapper = TestUtil.shallowRenderComponent(ColorMapTypeField, props);
  });

  it('is defined', () => {
    expect(ColorMapTypeField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });
  
  describe('getColorMapTypeOptions', () => {
    it('returns the right amount of options', () => {
      const options = wrapper.instance().getColorMapTypeOptions();
      expect(options).toHaveLength(3);
      const dummyTypeOptions = ['ramp'];
      wrapper.setProps({colorMapTypeOptions: dummyTypeOptions});
      const newOptions = wrapper.instance().getColorMapTypeOptions();
      expect(newOptions).toHaveLength(1);
    });
  });

  describe('onColorMapTypeChange', () => {
    it('calls onChange', () => {
      const dummyEvent = {
        target: {
          value: 'ramp'
        }
      }
      wrapper.instance().onColorMapTypeChange(dummyEvent);
      expect(wrapper.instance().props.onChange).toHaveBeenCalled();
    });
  });
});
