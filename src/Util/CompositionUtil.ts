import * as React from 'react';
import { Compositions } from '../Component/CompositionContext/CompositionContext';
const _get = require('lodash/get');

class CompositionUtil {

  static handleComposition(
    composition: Compositions,
    path: string,
    onChange: Function,
    field: string,
    value: any,
    defaultElement: React.ReactElement
  ): React.ReactElement {
    const compositionValue = _get(composition, path);
    const globalPath = path.split('.')[path.split('.').length - 1];
    const globalComposition = _get(composition, globalPath);

    if (compositionValue !== undefined) {
      if (compositionValue !== false) {
        return CompositionUtil.injectProperties(compositionValue, onChange, field, value);
      } else {
        return null;
      }
    }

    if (globalComposition !== undefined) {
      if (globalComposition !== false) {
        return CompositionUtil.injectProperties(globalComposition, onChange, field, value);
      } else {
        return null;
      }
    }

    return CompositionUtil.injectProperties(defaultElement, onChange, field, value);
  }

  static injectProperties(
    component: React.ReactElement, onChange: Function, field: string, value: any
  ): React.ReactElement {
    return (React.cloneElement(component, {[field]: value, onChange: onChange}));
  }

}

export default CompositionUtil;
