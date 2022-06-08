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
import { BulkEditor } from './BulkEditor';

describe('BulkEditor', () => {

  let onStylePropChangeDummy: jest.Mock;
  beforeEach(() => {
    onStylePropChangeDummy = jest.fn();
  });

  it('is defined', () => {
    expect(BulkEditor).toBeDefined();
  });

  it('renders correctly', () => {
    const bulkEditor = render(<BulkEditor />);
    expect(bulkEditor.container).toBeInTheDocument();
  });

  describe('onStylePropChange', () => {

    it('calls a passed onStylePropChange function', async () => {
      const bulkEditor = render(<BulkEditor onStylePropChange={onStylePropChangeDummy} />);
      const input = bulkEditor.container.querySelector('input.ant-input-number-input');
      await act(async () => {
        fireEvent.change(input, {
          target: {
            value: 12
          }
        });
      });
      expect(onStylePropChangeDummy).toHaveBeenCalled();
    });

    it('calls a passed onStylePropChange function with the field name and new value as argument', async () => {
      const bulkEditor = render(<BulkEditor onStylePropChange={onStylePropChangeDummy} />);
      const input = bulkEditor.container.querySelector('input.ant-input-number-input');
      const inputValue = 12;
      await act(async () => {
        fireEvent.change(input, {
          target: {
            value: inputValue
          }
        });
      });
      expect(onStylePropChangeDummy).toHaveBeenCalledWith('radius', inputValue);
    });
  });

});
