import * as React from 'react';

import {
  Select
} from 'antd';
import { WellKnownName } from 'geostyler-style';

import { localize } from '../../../LocaleWrapper/LocaleWrapper';

const Option = Select.Option;

// i18n
export interface WellKnownNameFieldLocale {
  label: string;
  wellKnownNames: {
    Circle: string;
    Square: string;
    Triangle: string;
    Star: string;
    Cross: string;
    X: string;
  };
}

// default props
interface WellKnownNameFieldDefaultProps {
  wellKnownName: WellKnownName;
  wellKnownNames: WellKnownName[];
  locale?: WellKnownNameFieldLocale;
}

// non default props
interface WellKnownNameFieldProps extends Partial<WellKnownNameFieldDefaultProps> {
  onChange: ((kind: WellKnownName) => void);
}

/**
 * WellKnownNameField
 */
export class WellKnownNameField extends React.Component<WellKnownNameFieldProps, {}> {

  static componentName: string = 'WellKnownNameField';

  public static defaultProps: WellKnownNameFieldDefaultProps = {
    wellKnownName: 'Circle',
    wellKnownNames: ['Circle', 'Square', 'Triangle', 'Star', 'Cross', 'X']
  };

  getWKNSelectOptions = (locale: WellKnownNameFieldLocale) => {
    return this.props.wellKnownNames!.map(name => {
      return (
        <Option
          key={name}
          value={name}
        >
          {locale.wellKnownNames[name]}
        </Option>
      );
    });
  }

  render() {
    const {
      wellKnownName,
      onChange,
      locale
    } = this.props;

    return (
      <div className="editor-field wellknownname-field">
        <span className="label">{`${locale.label}:`}</span>
        <Select
          value={wellKnownName}
          onChange={onChange}
        >
          {this.getWKNSelectOptions(locale)}
        </Select>
      </div>
    );
  }
}

export default localize(WellKnownNameField, WellKnownNameField.componentName);
