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
console.log('appRoutes: ', appRoutes);
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
    await Promise.all([
        modules.map(async (item) => {
            const [reducer, saga] = await Promise.all([
                import(`src/containers/${container}/screens/${item.path}/reducer`),
                import(`src/containers/${container}/screens/${item.path}/saga`),
            ]);
            store.injectReducer(item.key, reducer.default);
            store.injectSaga(item.key, saga.default);
        }),
    ]);
    // To ensure that modules in injected
    await appDelay(100);
};
