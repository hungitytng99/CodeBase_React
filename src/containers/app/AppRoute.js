import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '~/router/PrivateRoute';
import PublicRoute from '~/router/PublicRoute';
import { appRoutes } from '~/router/index';
import FullPageLoading from '~/components/Loading/FullPageLoading/FullPageLoading';

function AppRoute() {
    return (
        <Suspense fallback={<FullPageLoading />}>
            <Switch>
                {appRoutes.map(
                    ({ component: Component, exact = true, path, isPrivate, ...rest }) => {
                        if (isPrivate) {
                            return (
                                <PrivateRoute
                                    key={path}
                                    component={Component}
                                    exact={exact}
                                    path={path}
                                    {...rest}
                                />
                            );
                        } else
                            return (
                                <PublicRoute
                                    key={path}
                                    exact={exact}
                                    path={path}
                                    component={Component}
                                    {...rest}
                                />
                            );
                    },
                )}
            </Switch>
        </Suspense>
    );
}

export default AppRoute;
