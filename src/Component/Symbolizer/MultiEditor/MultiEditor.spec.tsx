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

import { MultiEditor, MultiEditorProps } from './MultiEditor';
import TestUtil from '../../../Util/TestUtil';
import en_US from '../../../locale/en_US';
import { Symbolizer } from 'geostyler-style';

describe('Renderer', () => {

  let wrapper: any;
  let dummyOnSymbolizerChange: jest.Mock;
  const dummySymbolizers: Symbolizer[] = [{
    kind: 'Mark',
    wellKnownName: 'circle',
    color: '#FF0000'
  }, {
    kind: 'Mark',
    wellKnownName: 'circle',
    color: '#FF00FF'
  }];

  beforeEach(() => {
    dummyOnSymbolizerChange = jest.fn();
    const props: MultiEditorProps = {
      locale: en_US.MultiEditor,
      onSymbolizersChange: dummyOnSymbolizerChange,
      symbolizers: dummySymbolizers
    };
    wrapper = TestUtil.shallowRenderComponent(MultiEditor, props);
  });

  it('is defined', () => {
    expect(MultiEditor).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  it('adds a Symbolizer', () => {
    wrapper.instance().addSymbolizer();
    expect(dummyOnSymbolizerChange).toHaveBeenCalledTimes(1);
    dummyOnSymbolizerChange.mockRestore();
  });

  it('removes a Symbolizer', () => {
    wrapper.instance().removeSymbolizer(1);
    expect(dummyOnSymbolizerChange).toHaveBeenCalledTimes(1);
    dummyOnSymbolizerChange.mockRestore();
  });
});
