import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface LocaleProps {
    locale?: object;
}

export const localize = <P extends {}>(Component: React.ComponentType<P & LocaleProps>, componentName: string) => {
    class Wrap extends React.Component<P & LocaleProps> {
        static contextTypes = {
            antLocale: PropTypes.object
        };

        render() {
            const { antLocale } = this.context;
            return (
                <Component 
                    locale={antLocale['Gs' + componentName]}
                    {...this.props}
                />
            );
        }
    }
    return Wrap;
};
