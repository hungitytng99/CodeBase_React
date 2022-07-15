import { lazy } from 'react';
import AuthLayout from '~/components/Layout/AuthLayout';
export const loginModule = { key: 'login', path: 'Login' };

const container = 'authentication';
export default {
    path: '/auth/login',
    exact: true,
    isPrivate: false,
    layout: AuthLayout,
    component: lazy(async () => {
        return import('.');
    }),
};
