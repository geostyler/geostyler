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
import { MarkEditor, MarkEditorProps } from './MarkEditor';
import { render, act, fireEvent } from '@testing-library/react';
import { MarkSymbolizer } from 'geostyler-style';
import SymbolizerUtil from '../../../Util/SymbolizerUtil';

jest.mock('antd', () => {
  const antd = jest.requireActual('antd');

  const Select = ({ children, onChange }) => {
    return <select onChange={e => onChange(e.target.value)}>{children}</select>;
  };

  Select.Option = ({ children, ...otherProps }) => {
    return <option {...otherProps}>{children}</option>;
  };

  return {
    ...antd,
    Select,
  };
});

describe('MarkEditor', () => {

  let dummySymbolizer: MarkSymbolizer = SymbolizerUtil.generateSymbolizer('Mark') as MarkSymbolizer;
  const props: MarkEditorProps = {
    symbolizer:dummySymbolizer,
    onSymbolizerChange: jest.fn(),
    defaultValues: undefined
  };

  it('is defined', () => {
    expect(MarkEditor).toBeDefined();
  });

  it('renders correctly', () => {
    const markEditor = render(<MarkEditor {...props} />);
    expect(markEditor.container).toBeInTheDocument();
  });

  describe('onWellKnownNameChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', async () => {
      const markEditor = render(<MarkEditor {...props} />);
      const newSymbolizer = {...props.symbolizer};
      newSymbolizer.wellKnownName = 'square';
      const input = markEditor.container.querySelector('select');
      await act(async() => {
        fireEvent.change(input!, {
          target: { value: 'square' }
        });
      });
      expect(props.onSymbolizerChange).toBeCalledWith(newSymbolizer);
    });
  });

});
