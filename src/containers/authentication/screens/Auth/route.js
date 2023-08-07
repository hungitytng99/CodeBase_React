import { lazy } from 'react';
import AuthLayout from '~/components/Layout/AuthLayout';
import { featureModule } from '~/containers/app/screens/Feature/route';
import { initModules } from '~/router';
export const loginModule = { key: 'login', path: 'Login' };

const container = 'authentication';
export default {
    path: '/auth/login',
    exact: true,
    isPrivate: false,
    layout: AuthLayout,
    component: lazy(async () => {
        await initModules([featureModule]);
        return import('./pages/Login');
    }),
};
