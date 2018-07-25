import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface LocaleProps {
    locale: object;
}

// type HOC<PWrapped, PHoc> = React.ComponentClass<PWrapped & PHoc>;

// export function test<P>(Component: React.ComponentType<P>): React.ComponentClass<P & LocaleProps>{
//     class Wrap extends React.Component<P & LocaleProps, {}> {
//         static contextTypes = {
//             antLocale: PropTypes.object
//         };

//         constructor(props: any) {
//             super(props);
//         }

//         render() {
//             console.log('Receiving props', this.props);
//             const { antLocale } = this.context;
//             return (
//                 <Component 
//                     locale={antLocale['Gs' + Component.name]}
//                     {...this.props}
//                 />
//             );
//         }
//     }

//     return Wrap;
// }

export const localize = <P extends {}>(Component: React.ComponentType<P & LocaleProps>) => {
    class Wrap extends React.Component<P & LocaleProps> {
        static contextTypes = {
            antLocale: PropTypes.object
        };

        render() {
            const { antLocale } = this.context;
            return (
                <Component 
                    locale={antLocale['Gs' + Component.name]}
                    {...this.props}
                />
            );
        }
    }
    return Wrap;
};

// export function wrapper<P, S>(Component: HOC<P, S>) {
//     class C extends React.Component<P & LocaleProps, S> {
//         static contextTypes = {
//             antLocale: PropTypes.object
//         };

//         constructor(props: any) {
//             super(props);
//         }

//         render() {
//             console.log('Receiving props', this.props);
//             const { antLocale } = this.context;
//             return (
//                 <Component 
//                     locale={antLocale['Gs' + Component.name]}
//                     {...this.props}
//                 />
//             );
//         }
//     }

//     return C;
// }

// https://dev.to/danhomola/react-higher-order-components-in-typescript-made-simple
//
// export const localeWrap = <TOriginalProps extends {}>(
//     Component: (React.Component<TOriginalProps>
//                 | React.StatelessComponent<TOriginalProps>)
// ) => {
//     class LocaleWrapper extends React.Component<TOriginalProps & LocaleProps> {
//         static contextTypes = {
//             antLocale: PropTypes.object
//         };

//         constructor(props: any) {
//             super(props);
//         }

//         render() {
//             // const { antLocale } = this.context;
//             return (
//                 <Component
//                     // locale={antLocale['Gs' + Component.name]}
//                     {...this.props}
//                 />
//             );
//         }
//     }
//     return LocaleWrapper;
// };
