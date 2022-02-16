import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from './auth';

type PrivateRouteProps = {
    component: React.ElementType;
    exact?: boolean | undefined;
    path: string
};

const AuthRoute: React.FunctionComponent<PrivateRouteProps> = ({ component: Component, ...rest }) => {
    const { user } = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={(props) =>
                !user  ? <Redirect to="/" /> : <Component {...props} />
            }
        />
    );
}

export default AuthRoute;