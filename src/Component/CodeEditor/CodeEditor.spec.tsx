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
import { CodeEditor, CodeEditorProps } from './CodeEditor';
import { render, act, fireEvent, waitFor } from '@testing-library/react';
import TestUtil from '../../Util/TestUtil';

import SldStyleParser from 'geostyler-sld-parser';

describe('CodeEditor', () => {
  let dummyStyle = TestUtil.getMarkStyle();
  let onStyleChangeDummy: jest.Mock;
  let sldParser = new SldStyleParser();
  const delay = 1337;

  it('is defined', () => {
    expect(CodeEditor).toBeDefined();
  });

  it('renders correctly', () => {
    const codeEditor = render(<CodeEditor />);
    expect(codeEditor.container).toBeInTheDocument();
  });

  describe('defaultParser', () => {
    it('sets the defaultParser if passed as prop', async () => {
      const defaultParserProps: CodeEditorProps = {
        style: dummyStyle,
        onStyleChange: onStyleChangeDummy,
        parsers: [
          sldParser
        ],
        defaultParser: sldParser,
        delay
      };
      const codeEditor = render(<CodeEditor {...defaultParserProps} />);

      await waitFor(() => {
        const select = codeEditor.queryByText('SLD Style Parser');
        expect(select).toBeDefined();
      });
    });
  });

  describe('generates an option for every parser', () => {
    it('returns a Select.Option for every passed parser', async () => {
      onStyleChangeDummy = jest.fn();
      const props: CodeEditorProps = {
        style: dummyStyle,
        onStyleChange: onStyleChangeDummy,
        parsers: [
          sldParser
        ],
        delay
      };
      const codeEditor = render(<CodeEditor {...props} />);

      const combobox = await codeEditor.findByRole('combobox');

      await act(async () => {
        fireEvent.keyDown(combobox, { key: 'Enter' });
      });

      let entry = codeEditor.queryAllByText('GeoStyler Style');

      expect(entry.length).toBeGreaterThanOrEqual(1);

      entry = codeEditor.queryAllByText('SLD Style Parser');

      expect(entry.length).toBeGreaterThanOrEqual(1);
    });
  });

});
