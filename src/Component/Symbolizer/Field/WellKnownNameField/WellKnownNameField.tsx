import * as React from 'react';

import {
  Select
} from 'antd';
import { WellKnownName } from 'geostyler-style';

import { localize } from '../../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../../locale/en_US';

const _get = require('lodash/get');
const _isEqual = require('lodash/isEqual');
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
  locale: WellKnownNameFieldLocale;
}

// non default props
export interface WellKnownNameFieldProps extends Partial<WellKnownNameFieldDefaultProps> {
  onChange?: (kind: WellKnownName) => void;
}

/**
 * WellKnownNameField
 */
export class WellKnownNameField extends React.Component<WellKnownNameFieldProps> {

  static componentName: string = 'WellKnownNameField';

  public static defaultProps: WellKnownNameFieldDefaultProps = {
    locale: en_US.GsWellKnownNameField,
    wellKnownName: 'Circle',
    wellKnownNames: ['Circle', 'Square', 'Triangle', 'Star', 'Cross', 'X',
                    'shape://backslash', 'shape://carrow', 'shape://dot',
                    'shape://horline', 'shape://oarrow', 'shape://plus',
                    'shape://slash', 'shape://times', 'shape://vertline']
  };

  public shouldComponentUpdate(nextProps: WellKnownNameFieldProps): boolean {
    const diffProps = !_isEqual(this.props, nextProps);
    return diffProps;
  }

  getWKNSelectOptions = (locale: WellKnownNameFieldLocale) => {
    return this.props.wellKnownNames!.map(name => {
      // if locales are not available, set Option text to name value
      const loc = _get(locale, 'wellKnownNames[' + name + ']') || name;
      return (
        <Option
          key={name}
          value={name}
        >
          {loc}
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
        <span className="label">{`${_get(locale, 'label')}:`}</span>
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
