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
import { Editor, EditorProps } from './Editor';
import TestUtil from '../../../Util/TestUtil';
import SymbolizerUtil from '../../../Util/SymbolizerUtil';
import { render, act, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('antd', async (importOriginal) => {
  const antd = await importOriginal();
  return antd;
});

describe('SymbolizerEditor', () => {

  let dummySymbolizer = TestUtil.getPolygonStyle().rules[0].symbolizers[0];
  dummySymbolizer.kind = 'Fill';
  const props: EditorProps = {
    symbolizer: dummySymbolizer,
    onSymbolizerChange: vi.fn()
  };

  it('is defined', () => {
    expect(Editor).toBeDefined();
  });

  it('renders correctly', () => {
    const editor = render(<Editor {...props} />);
    expect(editor.container).toBeInTheDocument();
  });

  // TODO needs a different workaround instead of manipulating the antd module
  // describe('onSymbolizerChange', () => {
  //   it('calls the change handler passed via props', async () => {
  //     const editor = render(<Editor {...props} />);
  //     const input = editor.container.querySelector('select');
  //     await act(async() => {
  //       fireEvent.change(input as Element, {
  //         target: { value: 'Icon' }
  //       });
  //     });
  //     expect(props.onSymbolizerChange).toHaveBeenCalledWith(SymbolizerUtil.iconSymbolizer);
  //     await act(async() => {
  //       fireEvent.change(input as Element, {
  //         target: { value: 'Mark' }
  //       });
  //     });
  //     expect(props.onSymbolizerChange).toHaveBeenCalledWith(SymbolizerUtil.markSymbolizer);
  //   });
  // });

  describe('getUiFromSymbolizer', () => {
    it('returns a MarkEditor for Symbolizer with kind Mark', () => {
      const editor = render(<Editor
        symbolizer={SymbolizerUtil.generateSymbolizer('Mark')}
      />);
      const markEditor = editor.container.querySelector('.gs-mark-symbolizer-editor');
      expect(markEditor).toBeInTheDocument();
    });
    it('returns an IconEditor for Symbolizer with kind Icon', () => {
      const editor = render(<Editor
        symbolizer={SymbolizerUtil.generateSymbolizer('Icon')}
      />);
      const markEditor = editor.container.querySelector('.gs-icon-symbolizer-editor');
      expect(markEditor).toBeInTheDocument();
    });
    it('returns a LineEditor for Symbolizer with kind Line', () => {
      const editor = render(<Editor
        symbolizer={SymbolizerUtil.generateSymbolizer('Line')}
      />);
      const markEditor = editor.container.querySelector('.gs-line-symbolizer-editor');
      expect(markEditor).toBeInTheDocument();
    });
    it('returns a FillEditor for Symbolizer with kind Fill', () => {
      const editor = render(<Editor
        symbolizer={SymbolizerUtil.generateSymbolizer('Fill')}
      />);
      const markEditor = editor.container.querySelector('.gs-fill-symbolizer-editor');
      expect(markEditor).toBeInTheDocument();
    });
    it('returns a TextEditor for Symbolizer with kind Text', () => {
      const editor = render(<Editor
        symbolizer={SymbolizerUtil.generateSymbolizer('Text')}
      />);
      const markEditor = editor.container.querySelector('.gs-text-symbolizer-editor');
      expect(markEditor).toBeInTheDocument();
    });
  });

});
