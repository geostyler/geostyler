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

import * as React from 'react';
import CompositionUtil from './CompositionUtil';

describe('CompositionUtil', () => {
  let dummyComponent;
  let dummyField;
  let dummyOnChange;
  let dummyValue;
  let dummyPath;
  let dummyDefaultElement;
  let dummyGlobalComponent;
  let dummyComposition;

  beforeEach(() => {
    dummyComponent = (<div />);
    dummyGlobalComponent = (<br />);
    dummyField = 'dummy';
    dummyOnChange = () => {};
    dummyValue = 1;
    dummyPath = 'dummyEditor.dummyField';
    dummyComposition = {
      dummyField: dummyGlobalComponent,
      dummyEditor: {
        dummyField: dummyComponent
      }
    };
    dummyDefaultElement = (<p />);
  });


  describe('injectProperties', () => {
    it('injects properties into a component', () => {
      expect(dummyComponent.props).not.toHaveProperty('onChange');
      expect(dummyComponent.props).not.toHaveProperty(dummyField);

      const injected = CompositionUtil.injectProperties({
        component: dummyComponent,
        onChange: dummyOnChange,
        propName: dummyField,
        propValue: dummyValue
      });

      expect(injected.props).toHaveProperty('onChange');
      expect(injected.props).toHaveProperty(dummyField);
      expect(injected.props[dummyField]).toEqual(dummyValue);
    });
  });

  describe('handleComposition', () => {
    it('returns default element if no composition was defined', () => {
      dummyComposition = {};
      const composition = CompositionUtil.handleComposition({
        composition: dummyComposition,
        path: dummyPath,
        onChange: dummyOnChange,
        propName: dummyField,
        propValue: dummyValue,
        defaultElement: dummyDefaultElement
      });

      expect(composition).toBeDefined();
      expect(composition.type).toEqual(dummyDefaultElement.type);
      expect(composition.type).not.toEqual(dummyComponent.type);
      expect(composition.type).not.toEqual(dummyGlobalComponent.type);
    });

    it('prefers nested options over global options', () => {
      const composition = CompositionUtil.handleComposition({
        composition: dummyComposition,
        path: dummyPath,
        onChange: dummyOnChange,
        propName: dummyField,
        propValue: dummyValue,
        defaultElement: dummyDefaultElement
      });

      expect(composition).toBeDefined();
      expect(composition.type).toEqual(dummyComponent.type);
      expect(composition.type).not.toEqual(dummyGlobalComponent.type);
      expect(composition.type).not.toEqual(dummyDefaultElement.type);
    });

    it('uses the global option if not nested option is defined', () => {
      delete dummyComposition.dummyEditor.dummyField;
      const composition = CompositionUtil.handleComposition({
        composition: dummyComposition,
        path: dummyPath,
        onChange: dummyOnChange,
        propName: dummyField,
        propValue: dummyValue,
        defaultElement: dummyDefaultElement
      });

      expect(composition).toBeDefined();
      expect(composition.type).toEqual(dummyGlobalComponent.type);
      expect(composition.type).not.toEqual(dummyComponent.type);
      expect(composition.type).not.toEqual(dummyDefaultElement.type);
    });

    it('returns null if property is set to false', () => {
      dummyComposition.dummyEditor.dummyField = false;
      const composition = CompositionUtil.handleComposition({
        composition: dummyComposition,
        path: dummyPath,
        onChange: dummyOnChange,
        propName: dummyField,
        propValue: dummyValue,
        defaultElement: dummyDefaultElement
      });

      expect(composition).toBeDefined();
      expect(composition).toBeFalsy();

    });
  });
});
