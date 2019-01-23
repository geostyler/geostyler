import * as React from 'react';

import {
  Select
} from 'antd';
import { SymbolizerKind } from 'geostyler-style';

import { localize } from '../../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../../locale/en_US';

const _isEqual = require('lodash/isEqual');

const Option = Select.Option;

// i18n
export interface KindFieldLocale {
  symbolizerKinds: {
    Mark: string;
    Fill: string;
    Icon: string;
    Line: string;
    Text: string;
  };
}

// default props
interface KindFieldDefaultProps {
  kind: SymbolizerKind;
  symbolizerKinds: SymbolizerKind[];
  locale: KindFieldLocale;
}

// non default props
export interface KindFieldProps extends Partial<KindFieldDefaultProps> {
  onChange?: (kind: SymbolizerKind) => void;
}

/**
 * KindField
 */
export class KindField extends React.Component<KindFieldProps> {

  public static defaultProps: KindFieldDefaultProps = {
    locale: en_US.GsKindField,
    kind: 'Mark',
    symbolizerKinds: ['Mark', 'Fill', 'Icon', 'Line', 'Text']
  };

  public shouldComponentUpdate(nextProps: KindFieldProps): boolean {
    const diffProps = !_isEqual(this.props, nextProps);
    return diffProps;
  }

  static componentName: string = 'KindField';

  getKindSelectOptions = (locale: KindFieldLocale) => {
    return this.props.symbolizerKinds!.map(kind => {
      return (
        <Option
          key={kind}
          value={kind}
        >
          {locale.symbolizerKinds[kind]}
        </Option>
      );
    });
  }

  render() {
    const {
      kind,
      onChange,
      locale
    } = this.props;

    return (
      <Select
        className="editor-field kind-field"
        value={kind}
        onChange={onChange}
      >
        {this.getKindSelectOptions(locale)}
      </Select>
    );
  }
}

export default localize(KindField, KindField.componentName);
