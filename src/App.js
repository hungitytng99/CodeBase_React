import { ConnectedRouter } from 'connected-react-router';
import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';
import { REQUEST_STATE } from '~/app-configs';
import AppLayout from '~/components/Layout/AppLayout/AppLayout';
import NotFound from '~/components/NotFound';
import AppRoute from '~/containers/app/AppRoute';
import AuthenticationRoute from '~/containers/authentication/AuthenticationRoute';
import history from '~/helpers/history';
import { RESET_NOTIFY_STATE } from '~/redux/actions/notify';
import { listAppRoutes, listAuthenticationRoutes } from '~/router';

function App() {
    const dispatch = useDispatch();

    const notify = useSelector((state) => state.notify);
    const initialNavigation = '/accounts/list';

    useEffect(() => {
        if (notify.requestState === REQUEST_STATE.SUCCESS) {
            toast.success(notify?.message ?? 'Bạn đã thực hiện thành công', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            dispatch(RESET_NOTIFY_STATE());
        } else if (notify.requestState === REQUEST_STATE.ERROR) {
            toast.error(notify?.message ?? 'Một lỗi đã xảy ra', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            dispatch(RESET_NOTIFY_STATE());
        }
    }, [notify.requestState]);

    return (
        <ConnectedRouter history={history}>
            <Suspense fallback={<div>Loading</div>}>
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
