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
import { Compositions } from '../Component/CompositionContext/CompositionContext';
const _get = require('lodash/get');

export interface CompositionUtilOptions {
  composition: Compositions;
  path: string;
  propName: string;
  propValue: any;
  defaultElement: React.ReactElement;
  onChange: Function;
  onChangeName?: string;
}

interface CompositionUtilInjectOptions {
  component: React.ReactElement;
  onChange: Function;
  propName: string;
  propValue: any;
  onChangeName?: string;
}

/**
 * Utility functions for the composition context.
 *
 * In order to allow replacement and disablement of certain components
 * we use the CompositionContext. These functions contain the logic for
 * handling which components should be replaced/disabled within a
 * customisable component.
 */
class CompositionUtil {

  /**
   * Main function for handling compositions.
   *
   * Takes the composition context, the component to be checked, etc. and
   * either replaces, disables or returns the original component. Will also
   * inject the required functions and properties for the replaced components.
   *
   * @param options CompositionUtilOptions
   */
  static handleComposition(options: CompositionUtilOptions): React.ReactElement {
    const {
      composition,
      path,
      propName,
      propValue,
      defaultElement,
      onChange,
      onChangeName
    } = options;

    const compositionValue = _get(composition, path);
    const globalPath = path.split('.')[path.split('.').length - 1];
    const globalComposition = _get(composition, globalPath);

    const injectOptions: CompositionUtilInjectOptions = {
      onChange,
      propName,
      propValue,
      onChangeName
    } as CompositionUtilInjectOptions;

    if (compositionValue !== undefined) {
      if (compositionValue !== false) {
        injectOptions.component = compositionValue;
        return CompositionUtil.injectProperties(injectOptions);
      } else {
        return null;
      }
    }

    if (globalComposition !== undefined) {
      if (globalComposition !== false) {
        injectOptions.component = globalComposition;
        return CompositionUtil.injectProperties(injectOptions);
      } else {
        return null;
      }
    }

    injectOptions.component = defaultElement;
    return CompositionUtil.injectProperties(injectOptions);
  }

  /**
   * Injects the value and onChange properties to a given component.
   *
   * @param options CompositionUtilInjectOptions
   */
  static injectProperties(options: CompositionUtilInjectOptions): React.ReactElement {
    const {
      component,
      onChange,
      propName,
      propValue,
      onChangeName,
    } = options;

    if (onChangeName !== undefined && onChangeName !== '') {
      return (React.cloneElement(component, {[propName]: propValue, [onChangeName]: onChange}));
    }
    return (React.cloneElement(component, {[propName]: propValue, onChange: onChange}));
  }

}

export default CompositionUtil;
