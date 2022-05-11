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

import { IconSelector, IconSelectorProps, IconLibrary } from './IconSelector';
import TestUtil from '../../../Util/TestUtil';

describe('IconSelector', () => {

  let wrapper: any;
  let dummyLibraries: IconLibrary[] = TestUtil.getDummyGsIconLibraries();

  beforeEach(() => {
    const props: IconSelectorProps = {
      iconLibraries: dummyLibraries
    };
    wrapper = TestUtil.shallowRenderComponent(IconSelector, props);
  });

  it('is defined', () => {
    expect(IconSelector).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  describe('getSelectedIconFromSrc', () => {
    it('returns an object with undefined vals if no match was found', () => {
      const nonMatchSrc = 'not.included';
      const match = IconSelector.getSelectedIconFromSrc(nonMatchSrc, dummyLibraries);
      expect(match.libIndex).toBeUndefined();
      expect(match.iconIndex).toBeUndefined();
    });

    it('returns the index of the matching object', () => {
      const expecLibIndex = 0;
      const expecIconIndex = 1;
      const matchSrc = dummyLibraries[expecLibIndex].icons[expecIconIndex].src;
      const match = IconSelector.getSelectedIconFromSrc(matchSrc, dummyLibraries);
      expect(match.libIndex).toBeCloseTo(expecLibIndex);
      expect(match.iconIndex).toBeCloseTo(expecIconIndex);
    });
  });
});
