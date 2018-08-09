import * as React from 'react';

import {
  Select
} from 'antd';
import { SymbolizerKind } from 'geostyler-style';

import { localize } from '../../../LocaleWrapper/LocaleWrapper';

const Option = Select.Option;

// i18n
export interface KindFieldLocale {
  label: string;
  symbolizerKinds: {
    Circle: string;
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
  locale?: KindFieldLocale;
}

// non default props
interface KindFieldProps extends Partial<KindFieldDefaultProps> {
  onChange: ((kind: SymbolizerKind) => void);
}

/**
 * KindField
 */
class KindField extends React.Component<KindFieldProps, {}> {

  public static defaultProps: KindFieldDefaultProps = {
    kind: 'Circle',
    symbolizerKinds: ['Circle', 'Fill', 'Icon', 'Line', 'Text']
  };

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
      <div className="editor-field kind-field">
        <span className="label">{`${locale.label}:`}</span>
        <Select
          value={kind}
          onChange={onChange}
        >
          {this.getKindSelectOptions(locale)}
        </Select>
      </div>
    );
  }
}

export default localize(KindField, KindField.componentName);
