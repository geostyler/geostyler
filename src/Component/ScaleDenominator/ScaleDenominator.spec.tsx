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
import { act, render, fireEvent } from '@testing-library/react';
import { ScaleDenominator } from './ScaleDenominator';

describe('ScaleDenominator', () => {

  let onChangeDummy: jest.Mock;
  beforeEach(() => {
    onChangeDummy = jest.fn();
  });

  it('is defined', () => {
    expect(ScaleDenominator).toBeDefined();
  });

  it('renders correctly', () => {
    const scaleDenominator = render(<ScaleDenominator />);
    expect(scaleDenominator.container).toBeInTheDocument();
  });

  describe('onMinScaleDenomChange', () => {
    it('calls a passed onChange function (no scaleDenominator prop)', async () => {
      const scaleDenominator = render(<ScaleDenominator onChange={onChangeDummy} />);
      const input = await scaleDenominator.findByPlaceholderText('Enter min. Scale (Optional)');
      await act(async() => {
        fireEvent.change(input, {
          target: { value: 1337 }
        });
      });
      expect(onChangeDummy).toHaveBeenCalledWith({
        min: 1337
      });
    });
    it('calls a passed onChange function (scaleDenominator prop)', async () => {
      const scaleDenominator = render(
        <ScaleDenominator
          onChange={onChangeDummy}
          scaleDenominator={{
            min: 0,
            max: 7355608
          }}
        />
      );
      const input = await scaleDenominator.findByPlaceholderText('Enter min. Scale (Optional)');
      await act(async() => {
        fireEvent.change(input, {
          target: { value: 1337 }
        });
      });
      expect(onChangeDummy).toHaveBeenCalledWith({
        min: 1337,
        max: 7355608
      });
    });
  });

  describe('onMaxScaleDenomChange', () => {
    it('calls a passed onChange function (no scaleDenominator prop)', async () => {
      const scaleDenominator = render(<ScaleDenominator onChange={onChangeDummy} />);
      const input = await scaleDenominator.findByPlaceholderText('Enter max. Scale (Optional)');
      await act(async() => {
        fireEvent.change(input, {
          target: { value: 1234 }
        });
      });
      expect(onChangeDummy).toHaveBeenCalledWith({
        max: 1234
      });
    });
    it('calls a passed onChange function (scaleDenominator prop)', async () => {
      const scaleDenominator = render(
        <ScaleDenominator
          onChange={onChangeDummy}
          scaleDenominator={{
            min: 0,
            max: 7355608
          }}
        />
      );
      const input = await scaleDenominator.findByPlaceholderText('Enter max. Scale (Optional)');
      await act(async() => {
        fireEvent.change(input, {
          target: { value: 1337 }
        });
      });
      expect(onChangeDummy).toHaveBeenCalledWith({
        min: 0,
        max: 1337
      });
    });
  });

});
