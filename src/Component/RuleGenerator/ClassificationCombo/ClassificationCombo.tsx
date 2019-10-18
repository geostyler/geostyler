import * as React from 'react';

import { Select } from 'antd';

import en_US from '../../../locale/en_US';
import { localize } from '../../LocaleWrapper/LocaleWrapper';

const _isEqual = require('lodash/isEqual');

export type ClassificationMethod = 'equalInterval' | 'quantile' | 'logarithmic' | 'kmeans';

// i18n
export interface ClassificationComboLocale {
  equalInterval: string;
  quantile: string;
  logarithmic: string;
  kmeans: string;
}

// default props
export interface ClassificationComboDefaultProps {
  /** Locale object containing translated text snippets */
  locale: ClassificationComboLocale;
  /** List of supported classification methods */
  classifications: ClassificationMethod[];
}

// non default props
export interface ClassificationComboProps extends Partial<ClassificationComboDefaultProps> {
  /** The callback method that is triggered when the state changes */
  onChange?: (classification: ClassificationMethod) => void;
  /** The selected classification method */
  classification?: ClassificationMethod;
}

/**
 * Symbolizer editorwindow UI.
 */
export class ClassificationCombo extends React.Component<ClassificationComboProps> {

  public static defaultProps: ClassificationComboDefaultProps = {
    locale: en_US.GsClassificationCombo,
    classifications: ['equalInterval', 'quantile', 'logarithmic', 'kmeans']
  };

  public shouldComponentUpdate(nextProps: ClassificationComboProps): boolean {
    return !_isEqual(this.props, nextProps);
  }

  static componentName: string = 'ClassificationCombo';

  getClassificationOptions = () => {
    const {
      classifications,
      locale
    } = this.props;
    return classifications.map((classification: ClassificationMethod) => {
      return (
        <Select.Option
          className="classification-option"
          key={classification}
          value={classification}
        >
          {locale[classification] || classification}
        </Select.Option>
      );
    });
  }

  render() {
    const {
      classification,
      onChange
    } = this.props;

    return (
      <Select
        className="color-space-select"
        optionFilterProp="children"
        value={classification}
        onChange={onChange}
      >
        {this.getClassificationOptions()}
      </Select>
    );
  }
}

export default localize(ClassificationCombo, ClassificationCombo.componentName);
