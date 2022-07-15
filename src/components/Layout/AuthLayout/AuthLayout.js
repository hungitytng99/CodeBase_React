import React, { Suspense } from 'react';
import './AuthLayout.sass';

function AuthLayout({ children }) {
    return (
        <>
            <div className="auth-layout">{children}</div>
        </>
    );
}

export default AuthLayout;
