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
import { render, fireEvent } from '@testing-library/react';

import { RgbChannelField } from './RgbChannelField';

describe('RgbChannelField', () => {

  it('is defined', () => {
    expect(RgbChannelField).toBeDefined();
  });

  it('renders correctly', () => {
    const field = render(<RgbChannelField />);
    expect(field.container).toBeInTheDocument();
  });

  describe('onRedChannelChange', () => {
    it('every SourceChannelNameField change calls passed onChange', async () => {
      const dummyChannelName = 'dummy band';
      const onChangeMock = jest.fn();
      const field = render(<RgbChannelField onChange={onChangeMock} />);
      const inputs = await field.findAllByPlaceholderText('Name of band');
      await Promise.all(inputs.map(input => fireEvent.change(input, { target: { value: dummyChannelName }})));
      expect(onChangeMock).toHaveBeenCalledTimes(3);
    });
  });

});
