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
import { render, act, fireEvent } from '@testing-library/react';
import { ColorMapTypeField } from './ColorMapTypeField';
import en_US from '../../../../locale/en_US';

describe('ColorMapTypeField', () => {

  it('is defined', () => {
    expect(ColorMapTypeField).toBeDefined();
  });

  it('renders correctly', () => {
    const field = render(<ColorMapTypeField />);
    expect(field.container).toBeInTheDocument();
  });

  describe('getContrastEnhancementSelectOptions', () => {
    it('returns the right amount of default options', async () => {
      render(<ColorMapTypeField />);
      expect(document.body.querySelectorAll('.ant-radio-button-wrapper').length).toBe(3);
    });

    it('returns the right amount of passed options', async () => {
      render(<ColorMapTypeField colorMapTypeOptions={['ramp', 'intervals']}/>);
      expect(document.body.querySelectorAll('.ant-radio-button-wrapper').length).toBe(2);
    });
  });

  describe('onColorMapTypeChange', () => {
    it('calls onChange', async () => {
      const onChangeMock = jest.fn();
      const field = render(<ColorMapTypeField onChange={onChangeMock} />);
      const rampInput = await field.findByLabelText(en_US.GsColorMapTypeField.rampMapTypeLabel);
      const intervalsInput = await field.findByLabelText(en_US.GsColorMapTypeField.intervalsMapTypeLabel);
      const valuesInput = await field.findByLabelText(en_US.GsColorMapTypeField.valuesMapTypeLabel);
      fireEvent.click(intervalsInput);
      expect(onChangeMock).toHaveBeenCalledWith('intervals');
      fireEvent.click(valuesInput);
      expect(onChangeMock).toHaveBeenCalledWith('values');
      fireEvent.click(rampInput);
      expect(onChangeMock).toHaveBeenCalledWith('ramp');
    });
  });

});
