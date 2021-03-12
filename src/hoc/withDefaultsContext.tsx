import * as React from 'react';
import { DefaultValueContext, DefaultValues } from '../Component/DefaultValueContext/DefaultValueContext';

const withDefaultsContext = (Component: any) => {
  return (props: any) => {
    return <DefaultValueContext.Consumer>
      {(defaults: DefaultValues) => <Component defaultValues={defaults} {...props} />}
    </DefaultValueContext.Consumer>;
  };
};

export default withDefaultsContext;
