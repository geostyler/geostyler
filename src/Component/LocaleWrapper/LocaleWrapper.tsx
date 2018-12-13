import * as React from 'react';
import * as PropTypes from 'prop-types';
const _get = require('lodash/get');

export interface LocaleProps {
    locale?: object;
}

export const localize = <P extends {}>(Component: React.ComponentType<P & LocaleProps>, componentName: string) => {
  return class Wrap extends React.Component<P & LocaleProps> {
    static contextTypes = {
      antLocale: PropTypes.object
    };

    render() {
      const { antLocale } = this.context;
      const locale = _get(antLocale, 'Gs' + componentName);
      return (
        <Component
          locale={locale}
          {...this.props}
        />
      );
    }
  };
};
