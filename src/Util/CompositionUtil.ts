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
