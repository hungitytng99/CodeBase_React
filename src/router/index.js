import { appDelay } from '~/helpers/timer';
import store from '~/redux/index';

export function getRoutesFromContainer(context) {
    let routes = [];
    context.keys().forEach((path) => {
        routes.push(context(`${path}`).default);
        if (context(`${path}`).childRoutes) {
            context(`${path}`).childRoutes.forEach((childRoute) => {
                routes.push(childRoute);
            });
        }
    });
    return routes;
}

const appContext = require.context('src/containers/app', true, /route.js$/);
const authenticationContext = require.context('src/containers/authentication', true, /route.js$/);

export const appRoutes = getRoutesFromContainer(appContext);
export const authenticationRoutes = getRoutesFromContainer(authenticationContext);

export const listAppRoutes = appRoutes.map((item) => {
    return {
        path: item.path,
        exactContainer: item?.exactContainer ?? true,
        layout: item.layout,
    };
});

export const listAuthenticationRoutes = authenticationRoutes.map((item) => {
    return {
        path: item.path,
        exactContainer: item?.exactContainer ?? true,
        layout: item.layout,
    };
});

export const initModules = async (modules = [], container = 'app') => {
    for (let module of modules) {
        const saga = await import(`src/containers/${container}/screens/${module.path}/redux/saga`);
        const reducer = await import(`src/containers/${container}/screens/${module.path}/redux/reducer`);
        store.injectReducer(module.key, reducer.default);
        store.injectSaga(module.key, saga.default);
    }
};
