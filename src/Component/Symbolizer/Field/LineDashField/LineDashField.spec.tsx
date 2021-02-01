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

import { LineDashField, LineDashFieldProps } from './LineDashField';
import TestUtil from '../../../../Util/TestUtil';

describe('OffsetField', () => {

  let wrapper: any;
  let onChangeDummy: jest.Mock;
  const dashArray = [20, 10, 1, 10];
  beforeEach(() => {
    onChangeDummy = jest.fn();
    const props: LineDashFieldProps = {
      dashArray,
      onChange: onChangeDummy
    };
    wrapper = TestUtil.shallowRenderComponent(LineDashField, props);
  });

  it('is defined', () => {
    expect(LineDashField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
    const buttons = wrapper.find('Button');
    // const numberInputs = wrapper.find('InputNumber');
    expect(buttons.length).toBe(2);
    // expect(numberInputs.length).toBe(dashArray.length);
  });

  describe('InputFields', () => {
    it('change handlers call the onChange prop method correctly', () => {
      const numberInputs = wrapper.find('InputNumber');
      numberInputs.forEach((numberInput: any, index: number) => {
        const inputOnChangeDummy = numberInput.props().onChange;
        inputOnChangeDummy(12);
        const newDashArray = [...dashArray];
        newDashArray[index] = 12;
        expect(onChangeDummy).toBeCalledWith(newDashArray);
      });
    });
  });

  describe('onAddDash', () => {
    it('calls a passed onChange function with the new dashArray', () => {
      wrapper.instance().onAddDash();
      expect(onChangeDummy).toHaveBeenCalledWith([...dashArray, 1]);
    });
  });

  describe('onRemoveDash', () => {
    it('calls a passed onChange function with the new dashArray', () => {
      let newDashArray = [...dashArray];
      newDashArray.splice(newDashArray.length - 1, 1);
      wrapper.instance().onRemoveDash();
      expect(onChangeDummy).toHaveBeenCalledWith(newDashArray);
    });
  });

});
