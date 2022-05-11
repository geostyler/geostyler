/* eslint-disable no-undef */
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
import { act, fireEvent, render, screen } from '@testing-library/react';
import SldStyleParser from 'geostyler-sld-parser';
import { StyleLoader } from './StyleLoader';
import { StyleParser } from 'geostyler-style';

describe('StyleLoader', () => {
  let sldStyleParser: StyleParser;
  beforeEach(() => {
    sldStyleParser = new SldStyleParser();
  });

  it('is defined', () => {
    expect(StyleLoader).toBeDefined();
  });

  it('renders correctly', () => {
    const field = render(<StyleLoader parsers={[sldStyleParser]} />);
    expect(field.container).toBeInTheDocument();
  });

  describe('getParserOptions', () => {
    it('returns a Select.Option for every passed parser', async() => {
      const loader = render(<StyleLoader parsers={[sldStyleParser]} />);
      const input = await loader.findByRole('combobox');
      await act(async() => {
        fireEvent.mouseDown(input);
      });
      expect(document.body.querySelectorAll('.ant-select-item').length).toBe(1);
    });
  });

  describe('getInputFromParser', () => {
    it('is invisible if no active Parser is set', async() => {
      render(<StyleLoader parsers={[sldStyleParser]} />);
      expect(document.querySelector('.ant-upload')).not.toBeInTheDocument();
    });
    it('returns an UploadButton if activeParser is "GeoJSON Style Parser"', async() => {
      const loader = render(<StyleLoader parsers={[sldStyleParser]} />);
      expect(document.querySelector('.ant-upload')).not.toBeInTheDocument();
      const input = await loader.findByRole('combobox');
      await act(async() => {
        fireEvent.mouseDown(input);
      });
      fireEvent.click(await screen.findByTitle(sldStyleParser.title));
      expect(document.querySelector('.ant-upload')).toBeInTheDocument();
    });
  });

});
