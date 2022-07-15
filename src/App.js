import React, { lazy, Suspense, useEffect } from 'react';
import { Switch, Route, Router, Redirect, useRouteMatch } from 'react-router-dom';
import AppRoute from '~/containers/app/AppRoute';
import AuthenticationRoute from '~/containers/authentication/AuthenticationRoute';
import { notification, Spin } from 'antd';
import history from '~/helpers/history';
import { listAppRoutes, listAuthenticationRoutes } from '~/router';
import { ConnectedRouter } from 'connected-react-router';
import NotFound from '~/components/NotFound';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RESET_NOTIFY_STATE } from '~/redux/actions/notify';
import { REQUEST_STATE } from '~/app-configs';
import AppLayout from '~/components/Layout/AppLayout/AppLayout';
import AuthLayout from '~/components/Layout/AuthLayout/AuthLayout';
import 'antd/dist/antd.css';

console.debug('listAppRoutes =>', listAppRoutes);
console.debug('listAuthenticationRoutes =>', listAuthenticationRoutes);

function App() {
    const dispatch = useDispatch();

    const notify = useSelector((state) => state.notify);
    const initialNavigation = '/accounts/list';

    useEffect(() => {
        if (notify.requestState === REQUEST_STATE.SUCCESS) {
            notification.success({
                message: 'Thành công',
                description: notify.message,
            });
            dispatch(RESET_NOTIFY_STATE());
        } else if (notify.requestState === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Thất bại',
                description: notify?.message ?? 'Một lỗi đã xảy ra',
            });
            dispatch(RESET_NOTIFY_STATE());
        }
    }, [notify.requestState]);

    return (
        <ConnectedRouter history={history}>
            <Suspense fallback={<Spin />}>
                <Switch>
                    {listAppRoutes.map(({ layout, path, exactContainer = true }) => (
                        <Route
                            path={path}
                            render={() => {
                                let RouteLayout = AppLayout;
                                if (layout) {
                                    RouteLayout = layout;
                                }

                                return (
                                    <RouteLayout>
                                        <AppRoute />
                                    </RouteLayout>
                                );
                            }}
                            key={path}
                            exact={exactContainer}
                        />
                    ))}
                    {listAuthenticationRoutes.map(({ layout, path, exactContainer = true }) => (
                        <Route
                            path={path}
                            render={() => {
                                let RouteLayout = AppLayout;
                                console.log('layout: ', layout);
                                if (layout) {
                                    RouteLayout = layout;
                                }

                                return (
                                    <RouteLayout>
                                        <AuthenticationRoute />
                                    </RouteLayout>
                                );
                            }}
                            key={path}
                            exact={exactContainer}
                        />
                    ))}
                    <Redirect exact from="/" to={initialNavigation} />
                    <Route exact={true} path="/not-found-page">
                        <NotFound />
                    </Route>
                    <Redirect from="*" to="/not-found-page" />
                </Switch>
            </Suspense>
        </ConnectedRouter>
    );
}

export default App;
